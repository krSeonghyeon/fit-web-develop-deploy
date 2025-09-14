// src/components/CommonSection/CommonUploadSection.js
import './CommonSection.css';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { IoBody } from 'react-icons/io5';
import RecentPreviewSlider from '../RecentPreviewSlider/RecentPreviewSlider';

const CommonUploadSection = ({ imageUrl, onUpload }) => {
  return (
    <div className="common-upload-container">
      <label
        htmlFor="body-upload"
        className="common-upload-box relative"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          cursor: 'pointer',
        }}
      >
        {!imageUrl && (
          <>
            <div className="common-upload-icon">
              <IoBody size={40} />
            </div>
            <p className="common-upload-label">
              <PiUploadSimpleBold size={18} className="text-rose-500" /> 내 사진 선택
            </p>
            <p className="common-upload-subtext">
              전신 사진을<br /> 선택하세요
            </p>
          </>
        )}

        <input
          id="body-upload"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            if (e.target.files[0]) {
              const file = e.target.files[0];
              const url = URL.createObjectURL(file);
              onUpload(url, file);
            }
          }}
        />
      </label>

      <div className="common-slider-wrapper">
        <RecentPreviewSlider title="추천 모델" images={[]} />
      </div>
    </div>
  );
};

export default CommonUploadSection;
