import './ActionButton.css';
import { PiCoatHangerBold } from 'react-icons/pi';

const ActionButton = ({ isEnabled }) => {
  return (
    <button
      className={`action-button ${isEnabled ? 'enabled' : 'disabled'}`}
      disabled={!isEnabled}
    >
      <PiCoatHangerBold size={24} className="mr-2" />
      <span>마법을 지켜보세요!</span>
    </button>
  );
};

export default ActionButton;
