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
  cancelRequested,
  setCancelRequested,
}) => {
  const handleClick = async () => {
    if (!isEnabled) return;

    setLoading(true);
    setCancelRequested(false);

    // ✅ 새로운 AbortController 생성해서 ref에 저장
    const controller = new AbortController();
    controllerRef.current = controller;

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
        signal: controller.signal, // ✅ abort 지원
      });

      if (!response.ok) {
        throw new Error('API 요청 실패');
      }

      const data = await response.json();
      console.log("✅ 서버 응답:", data);

      if (cancelRequested) {
        console.log("❌ 취소됨: 응답 무시");
        return;
      }

      if (data.result_url) {
        setResultImage({ result: data.result_url });
        setMode('result');
      } else {
        throw new Error("result_url 없음");
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log("❌ 요청이 AbortController에 의해 취소됨");
      } else if (!cancelRequested) {
        console.error('❌ API 요청 에러:', error);
        alert('요청 실패: ' + error.message);
      }
    } finally {
      if (!cancelRequested) {
        setLoading(false);
      } else {
        setLoading(false);
        setCancelRequested(false);
      }
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
