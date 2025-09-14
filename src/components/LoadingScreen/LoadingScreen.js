import './LoadingScreen.css';

const LoadingScreen = ({ bodyImage, onCancel }) => {
  return (
    <div className="loading-photo-wrapper">
      <div className="loading-photo-inner">
        <img src={bodyImage} alt="model" className="loading-photo" />
        <div className="scan-bar" />
      </div>

      <div className="loading-text-section">
        <br />
        <p className="loading-message">가상 피팅 생성 중...</p>

        <div className="loading-dots">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>

        <p className="loading-subtext">예상 소요 시간: 10 ~ 20초</p>

        <button className="cancel-button" onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default LoadingScreen;
