import './ActionButton.css';
import { PiCoatHangerBold } from 'react-icons/pi';

const ActionButton = ({
  mode,
  bodyFile,
  clothesFiles,
  promptText,
  setLoading,
  setResultImage,
  setMode,
  controllerRef,
  isEnabled,
}) => {
  const handleClick = async () => {
    if (!isEnabled) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('person', bodyFile);

      clothesFiles.forEach((file) => {
        if (file) formData.append('clothes', file);
      });

      if (promptText) {
        formData.append('user_prompt', promptText);
      }

      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${baseUrl}/virtual-tryon`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('API 요청 실패');
      }

      const data = await response.json();
      console.log("✅ 서버 응답:", data);

      if (data.result_url) {
        setResultImage({ result: data.result_url });
        setMode('result'); // ✅ 결과 페이지로 전환
      } else {
        throw new Error("result_url 없음");
      }
    } catch (error) {
      console.error('❌ API 요청 에러:', error);
      alert('요청 실패: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`action-button ${!isEnabled ? 'disabled' : ''}`}
      disabled={!isEnabled}
      onClick={handleClick}
    >
      <PiCoatHangerBold size={22} className="mr-2" />
      <span>마법을 지켜보세요!</span>
    </button>
  );
};

export default ActionButton;
