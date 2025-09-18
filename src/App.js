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
import QuickLinks from './components/QuickLinks/QuickLinks';

function App() {
  const controllerRef = useRef(null);

  const [mode, setMode] = useState('common');
  const [prevMode, setPrevMode] = useState(null);

  const [bodyImage, setBodyImage] = useState(null);
  const [bodyFile, setBodyFile] = useState(null);

  const [resultImage, setResultImage] = useState(null);
  const [fromHistory, setFromHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cancelRequested, setCancelRequested] = useState(false);

  const [extraOptionsOpen, setExtraOptionsOpen] = useState(false);
  const [promptText, setPromptText] = useState(null);

  const [clothesImages, setClothesImages] = useState([null, null, null, null, null]);
  const [clothesFiles, setClothesFiles] = useState([null, null, null, null, null]);

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

  const handleBodyUpload = (url, file) => {
    setBodyImage(url);
    setBodyFile(file);
  };

  const handleAddClothes = (file, index) => {
    const newImages = [...clothesImages];
    const newFiles = [...clothesFiles];
    newImages[index] = URL.createObjectURL(file);
    newFiles[index] = file;
    setClothesImages(newImages);
    setClothesFiles(newFiles);
  };

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
              setResultImage({ result: entry.result, before: entry.before });
              setFromHistory(true);
              setMode('result');
            }}
          />
        );
      default:
        return (
          <>
            <CommonUploadSection imageUrl={bodyImage} onUpload={handleBodyUpload} />
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
        <div className={`section-wrapper ${mode === 'history' ? 'history-wrapper' : ''}`}>
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
            <QuickLinks visible={!extraOptionsOpen} />
            <ActionButton
              mode={mode}
              bodyImage={bodyImage}
              bodyFile={bodyFile}
              clothesImages={clothesImages}
              clothesFiles={clothesFiles}
              promptText={promptText}
              setLoading={setLoading}
              setResultImage={setResultImage}
              setMode={setMode}
              cancelRequested={cancelRequested}
              setCancelRequested={setCancelRequested}
              extraOptionsOpen={extraOptionsOpen}
              controllerRef={controllerRef}
              isEnabled={!!bodyFile && clothesFiles.some((f) => f !== null)}
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  const renderResultPageWithHistorySave = () => {
    const history = JSON.parse(localStorage.getItem('historyImages') || '[]');
    const beforeImageUrl = resultImage?.before || localStorage.getItem('beforeImage');

    if (resultImage && resultImage.result) {
      const newEntry = {
        result: resultImage.result,
        before: beforeImageUrl,
      };
      const isAlreadyInHistory = history.some(
        (entry) => entry.result === resultImage.result
      );

      if (!isAlreadyInHistory) {
        history.unshift(newEntry);
        localStorage.setItem('historyImages', JSON.stringify(history.slice(0, 30)));
      }
    }

    return (
      <ResultPage
        imageUrl={resultImage?.result}
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
