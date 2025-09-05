import { auth, db } from "../lib/firebaseconfig";
import { doc, setDoc, getDoc, type Unsubscribe } from "firebase/firestore";
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
  FirebaseError,
} from "../types/user";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import getFirebaseErrorMessage from "../components/ui/ErrorMessage";

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const firebaseUser = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

      if (!userDoc.exists()) {
        throw new Error("Usuário não encontrado");
      }

      const userData = userDoc.data() as User;

      return userData;
    } catch (error) {
      const message = getFirebaseErrorMessage(error as FirebaseError);
      throw new Error(message);
    }
  },

  async register(credentials: RegisterCredentials): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const firebaseUser = userCredential.user;

      const userData: User = {
        uid: firebaseUser.uid,
        name: credentials.name,
        email: credentials.email,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: credentials.role || "user",
      };

      await setDoc(doc(db, "users", firebaseUser.uid), userData);

      return userData;
    } catch (error) {
      const message = getFirebaseErrorMessage(error as FirebaseError);
      throw new Error(message);
    }
  },

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      const message = getFirebaseErrorMessage(error as FirebaseError);
      throw new Error(message);
    }
  },

  observeAuthState(callback: (user: User | null) => void): Unsubscribe {
    try {
      return onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          // Usuário está logado, busca dados completos no Firestore
          try {
            const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data() as User;
              callback(userData);
            } else {
              callback(null); // Usuário não encontrado no Firestore
            }
          } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
            callback(null);
          }
        } else {
          // Usuário não está logado
          callback(null);
        }
      });
    } catch (error) {
      throw new Error("Erro ao observar estado de autenticação: " + error);
    }
  },
};
