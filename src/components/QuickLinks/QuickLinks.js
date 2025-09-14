// src/components/QuickLinks/QuickLinks.js
import './QuickLinks.css';

const QuickLinks = ({ visible }) => {
  if (!visible) return null;

  // 앱 스킴 + fallback 처리 함수 (에이블리 전용)
  const openWithFallback = (appUrl, webUrl) => {
    const now = Date.now();
    window.location.href = appUrl;

    setTimeout(() => {
      if (Date.now() - now < 1500) {
        window.open(webUrl, '_blank');
      }
    }, 1200);
  };

  return (
    <div className="quick-links">
      {/* 무신사 → 그냥 웹 링크 */}
      <a
        href="https://www.musinsa.com"
        target="_blank"
        rel="noopener noreferrer"
        className="quick-link-btn"
      >
        <img src="/musinsa.png" alt="무신사" className="quick-link-icon" />
        <div className="quick-link-text">
          <span>무신사</span>
          <span>바로가기</span>
        </div>
      </a>

      {/* 에이블리 → 앱 시도 후 fallback */}
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
