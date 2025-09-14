import { useRef, useState } from 'react';
import './components/AppWrapper/AppWrapper.css';
import Header from './components/Header/Header';
import CommonUploadSection from './components/CommonSection/CommonSection';
import ExtraOptions from './components/ExtraOptions/ExtraOptions';
import ActionButton from './components/ActionButton/ActionButton';
import BottomNav from './components/BottomNav/BottomNav';
import ResultPage from './components/ResultPage/ResultPage';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import HistorySection from './components/HistorySection/HistorySection';
import { AnimatePresence, motion } from 'framer-motion';
import RecentPreviewSlider from './components/RecentPreviewSlider/RecentPreviewSlider';

function App() {
  const controllerRef = useRef(null);

  const [mode, setMode] = useState('common');
  const [prevMode, setPrevMode] = useState(null);

  // 전신 사진 상태 (미리보기 URL + 파일)
  const [bodyImage, setBodyImage] = useState(null);
  const [bodyFile, setBodyFile] = useState(null);

  // 결과 이미지
  const [resultImage, setResultImage] = useState(null);
  const [fromHistory, setFromHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cancelRequested, setCancelRequested] = useState(false);

  // 추가 옵션 (토글 + 프롬프트 텍스트)
  const [extraOptionsOpen, setExtraOptionsOpen] = useState(false);
  const [promptText, setPromptText] = useState(null); // null 기반

  // 👕 의상 이미지 배열 상태 (최대 5개)
  const [clothesImages, setClothesImages] = useState([
    null, null, null, null, null,
  ]);
  const [clothesFiles, setClothesFiles] = useState([
    null, null, null, null, null,
  ]);

  const handleModeChange = (newMode) => {
    if (!bodyImage && newMode !== 'common' && newMode !== 'history') {
      alert('전신 사진을 먼저 업로드해주세요!');
      return;
    }

    setPrevMode(mode);
    setMode(newMode);
    setExtraOptionsOpen(false);
    setResultImage(null);
    setFromHistory(false);
  };

  // 전신 사진 업로드
  const handleBodyUpload = (url, file) => {
    setBodyImage(url);
    setBodyFile(file);
    localStorage.setItem('bodyImage', url);
  };

  // 의상 업로드
  const handleAddClothes = (file, index) => {
    const newImages = [...clothesImages];
    const newFiles = [...clothesFiles];
    newImages[index] = URL.createObjectURL(file);
    newFiles[index] = file;
    setClothesImages(newImages);
    setClothesFiles(newFiles);
  };

  // 의상 삭제
  const handleRemoveClothes = (index) => {
    const newImages = [...clothesImages];
    const newFiles = [...clothesFiles];
    newImages[index] = null;
    newFiles[index] = null;
    setClothesImages(newImages);
    setClothesFiles(newFiles);
  };

  const renderSectionContent = () => {
    switch (mode) {
      case 'history':
        return (
          <HistorySection
            onSelect={(entry) => {
              setResultImage(entry.result);
              localStorage.setItem('bodyImage', entry.before);
              setFromHistory(true);
              setMode('result');
            }}
          />
        );
      default:
        return (
          <>
            {/* 전신 사진 업로드 */}
            <CommonUploadSection
              imageUrl={bodyImage}
              onUpload={handleBodyUpload}
            />

            {/* 의상 선택 */}
            <p className="category-label">✨ 의상 선택</p>
            <RecentPreviewSlider
              previews={clothesImages}
              onUpload={handleAddClothes}
              onRemove={handleRemoveClothes}
            />
          </>
        );
    }
  };

  const renderAnimatedContent = () => (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflowY: 'auto',
          width: '100%',
          height: '100%',
          padding: '0 1rem',
        }}
      >
        <div
          className={`section-wrapper ${
            mode === 'history' ? 'history-wrapper' : ''
          }`}
        >
          {renderSectionContent()}
        </div>

        {mode !== 'history' && mode !== 'result' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ExtraOptions
              open={extraOptionsOpen}
              setOpen={setExtraOptionsOpen}
              promptText={promptText}
              setPromptText={setPromptText}
            />
            <ActionButton
              mode={mode}
              bodyImage={bodyImage}
              bodyFile={bodyFile}
              clothesImages={clothesImages}
              clothesFiles={clothesFiles}
              promptText={promptText}
              setLoading={setLoading}
              setResultImage={setResultImage}
              cancelRequested={cancelRequested}
              setCancelRequested={setCancelRequested}
              extraOptionsOpen={extraOptionsOpen}
              setMode={setMode}
              controllerRef={controllerRef}
              // ✅ 버튼 활성 조건
              isEnabled={!!bodyFile && clothesFiles.some((f) => f !== null)}
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  const renderResultPageWithHistorySave = () => {
    const history = JSON.parse(localStorage.getItem('historyImages') || '[]');
    const bodyImageUrl = localStorage.getItem('bodyImage');
    const newEntry = { result: resultImage, before: bodyImageUrl };
    const isAlreadyInHistory = history.some(
      (entry) => entry.result === resultImage
    );

    if (resultImage && !isAlreadyInHistory) {
      history.unshift(newEntry);
      localStorage.setItem(
        'historyImages',
        JSON.stringify(history.slice(0, 30))
      );
    }

    return (
      <ResultPage
        imageUrl={resultImage}
        onBack={() => {
          if (fromHistory) {
            setResultImage(null);
            setFromHistory(false);
            setMode('history');
          } else {
            setResultImage(null);
            setMode('common');
          }
        }}
      />
    );
  };

  return (
    <div className="app-container">
      <div className="card">
        <Header
          showBackButton={!loading && mode !== 'common'}
          onBack={() => {
            if (mode === 'result' && fromHistory) {
              setResultImage(null);
              setFromHistory(false);
              setMode('history');
            } else {
              setResultImage(null);
              setFromHistory(false);
              setMode('common');
            }
          }}
        />
        <div className="scrollable-content main-padding">
          {loading ? (
            <LoadingScreen
              bodyImage={bodyImage}
              onCancel={() => {
                setCancelRequested(true);
                setLoading(false);
                controllerRef.current?.abort();
              }}
            />
          ) : mode === 'result' && resultImage ? (
            renderResultPageWithHistorySave()
          ) : (
            renderAnimatedContent()
          )}
        </div>
        <BottomNav setMode={handleModeChange} />
      </div>
    </div>
  );
}

export default App;
