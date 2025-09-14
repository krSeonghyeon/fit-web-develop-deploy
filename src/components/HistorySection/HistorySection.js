import { useEffect, useState } from 'react';
import './HistorySection.css';

const HistorySection = ({ onSelect }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('historyImages') || '[]');
    setImages(saved); // ✅ 객체 배열 [{ result, before }]
  }, []);

  return (
    <div className="history-scroll-container">
      <div className="history-title-wrapper">
        <div className="history-title">기록</div>
      </div>
      <div className="history-grid">
        {images.map((entry, index) => (
          <div
            key={index}
            className="history-item"
            onClick={() => onSelect?.(entry)} // ✅ 객체 통째로 전달
          >
            <img
              src={entry.result}
              alt={`history-${index}`}
              className="history-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorySection;
