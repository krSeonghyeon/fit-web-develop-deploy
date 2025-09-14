// src/components/QuickLinks/QuickLinks.js
import './QuickLinks.css';

const QuickLinks = ({ visible }) => {
  if (!visible) return null; // 숨김 처리

  return (
    <div className="quick-links">
      <a
        href="https://www.musinsa.com"
        target="_blank"
        rel="noopener noreferrer"
        className="quick-link-btn"
      >
        무신사 바로가기
      </a>
      <a
        href="https://www.a-bly.com"
        target="_blank"
        rel="noopener noreferrer"
        className="quick-link-btn"
      >
        에이블리 바로가기
      </a>
    </div>
  );
};

export default QuickLinks;
