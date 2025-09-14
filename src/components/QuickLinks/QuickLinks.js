// src/components/QuickLinks/QuickLinks.js
import './QuickLinks.css';

const QuickLinks = ({ visible }) => {
  if (!visible) return null;

  // 앱 스킴 + fallback 처리 함수
  const openWithFallback = (appUrl, webUrl) => {
    const now = Date.now();
    // 앱 실행 시도
    window.location.href = appUrl;

    // 일정 시간 안에 앱이 열리지 않으면 웹으로 fallback
    setTimeout(() => {
      if (Date.now() - now < 1500) {
        window.open(webUrl, '_blank');
      }
    }, 1200);
  };

  return (
    <div className="quick-links">
      {/* 무신사 */}
      <button
        type="button"
        className="quick-link-btn"
        onClick={() =>
          openWithFallback('musinsa://store', 'https://www.musinsa.com')
        }
      >
        <img src="/musinsa.png" alt="무신사" className="quick-link-icon" />
        <div className="quick-link-text">
          <span>무신사</span>
          <span>바로가기</span>
        </div>
      </button>

      {/* 에이블리 */}
      <button
        type="button"
        className="quick-link-btn"
        onClick={() =>
          openWithFallback('ably://home', 'https://www.a-bly.com')
        }
      >
        <img src="/ably.png" alt="에이블리" className="quick-link-icon" />
        <div className="quick-link-text">
          <span>에이블리</span>
          <span>바로가기</span>
        </div>
      </button>
    </div>
  );
};

export default QuickLinks;
