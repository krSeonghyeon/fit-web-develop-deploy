import './Header.css';
import { WiStars } from 'react-icons/wi';
import { HiOutlineChevronLeft } from 'react-icons/hi';

const Header = ({ showBackButton, onBack }) => (
  <div className="header">
    <div className="header-inner">
      <div className="header-back-wrapper">
        {showBackButton && (
          <button onClick={onBack} className="header-back-button">
            <HiOutlineChevronLeft size={20} />
          </button>
        )}
      </div>

      <span className="header-text">
        <WiStars size={20} className="text-yellow-400 mr-1" />
        사진을 업로드하고 가상피팅을 경험해보세요!
        <WiStars size={20} className="text-yellow-400 ml-1" />
      </span>

      <div className="header-back-placeholder" />
    </div>
  </div>
);

export default Header;
