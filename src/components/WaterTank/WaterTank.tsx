import React from "react";
import "./WaterTank.css";

interface WaterTankProps {
  level: number; // 0-100
  size?: "small" | "medium" | "large";
}

export const WaterTank: React.FC<WaterTankProps> = ({
  level,
  size = "medium",
}) => {
  const getWaterColor = (level: number) => {
    if (level < 20) return "#ff4444"; // Vermelho - nível crítico
    if (level < 50) return "#ffaa00"; // Laranja - nível baixo
    if (level < 80) return "#44aaff"; // Azul - nível normal
    return "#00aa44"; // Verde - nível alto
  };

  const getLevelText = (level: number) => {
    if (level < 20) return "Crítico";
    if (level < 50) return "Baixo";
    if (level < 80) return "Normal";
    return "Alto";
  };

  const waterHeight = Math.max(5, (level / 100) * 80); // Mínimo 5% para mostrar algo

  return (
    <div className={`water-tank ${size}`}>
      <div className="tank-container">
        {/* Tank Structure */}
        <div className="tank-structure">
          {/* Water Level */}
          <div
            className="water-level"
            style={{
              height: `${waterHeight}%`,
              backgroundColor: getWaterColor(level),
            }}
          >
            <div className="water-surface">
              <div className="water-ripple"></div>
            </div>
          </div>

          {/* Tank Frame */}
          <div className="tank-frame">
            <div className="tank-top"></div>
            <div className="tank-sides">
              <div className="tank-left"></div>
              <div className="tank-right"></div>
            </div>
            <div className="tank-bottom"></div>
          </div>
        </div>

        {/* Level Indicators */}
        <div className="level-indicators">
          <div className="level-marker" style={{ top: "20%" }}>
            <span>80%</span>
          </div>
          <div className="level-marker" style={{ top: "40%" }}>
            <span>60%</span>
          </div>
          <div className="level-marker" style={{ top: "60%" }}>
            <span>40%</span>
          </div>
          <div className="level-marker" style={{ top: "80%" }}>
            <span>20%</span>
          </div>
        </div>

        {/* Current Level Display */}
        <div className="current-level">
          <div className="level-value">{level}%</div>
          <div className="level-status">{getLevelText(level)}</div>
        </div>

        {/* Water Drops Animation */}
        {level > 0 && (
          <div className="water-drops">
            <div className="drop drop-1"></div>
            <div className="drop drop-2"></div>
            <div className="drop drop-3"></div>
          </div>
        )}
      </div>

      {/* Tank Info */}
      <div className="tank-info">
        <div className="info-item">
          <span className="info-label">Capacidade:</span>
          <span className="info-value">1000L</span>
        </div>
        <div className="info-item">
          <span className="info-label">Nível Atual:</span>
          <span className="info-value">{level}%</span>
        </div>
        <div className="info-item">
          <span className="info-label">Volume:</span>
          <span className="info-value">
            {Math.round((level / 100) * 1000)}L
          </span>
        </div>
      </div>
    </div>
  );
};
