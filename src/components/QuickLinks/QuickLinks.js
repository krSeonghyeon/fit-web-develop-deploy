import './QuickLinks.css';

const QuickLinks = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="quick-links">
      {/* 무신사 */}
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

      {/* 에이블리 */}
      <a
        href="https://www.a-bly.com"
        target="_blank"
        rel="noopener noreferrer"
        className="quick-link-btn"
      >
        <img src="/ably.png" alt="에이블리" className="quick-link-icon" />
        <div className="quick-link-text">
          <span>에이블리</span>
          <span>바로가기</span>
        </div>
      </a>
    </div>
  );
};

export default QuickLinks;
