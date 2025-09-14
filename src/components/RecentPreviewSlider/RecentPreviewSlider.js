import './RecentPreviewSlider.css';
import { Plus, X } from 'lucide-react';

const RecentPreviewSlider = ({ previews = [], onUpload, onRemove }) => {
  const safePreviews = Array.isArray(previews)
    ? previews
    : [null, null, null, null, null];

  return (
    <div className="recent-scroll-container">
      {safePreviews.map((preview, i) => (
        <div key={i} className="recent-tile">
          {preview ? (
            <>
              <img
                src={preview}
                alt={`의상 ${i + 1}`}
                className="recent-img"
              />
              <button
                type="button"
                className="remove-button"
                onClick={() => onRemove(i)}
                aria-label={`의상 ${i + 1} 제거`}
              >
                <X />
              </button>
            </>
          ) : (
            <>
              <input
                id={`upload-${i}`}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files[0]) {
                    onUpload(e.target.files[0], i);
                  }
                }}
              />
              <label htmlFor={`upload-${i}`} className="recent-tile is-empty">
                <Plus className="recent-plus" />
              </label>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecentPreviewSlider;
