import './ExtraOptions.css';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { FaRegSquareCheck } from "react-icons/fa6";

const ExtraOptions = ({ open, setOpen, promptText, setPromptText }) => {
  return (
    <div className="extra-options">
      {/* 토글 헤더 */}
      <div className="extra-line cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="extra-label flex items-center gap-2 text-sm font-medium text-gray-800">
          <FaRegSquareCheck size={18} className="text-rose-500" />
          추가 옵션
        </div>
        {open ? (
          <ChevronDown size={18} className="text-gray-400" />
        ) : (
          <ChevronRight size={18} className="text-gray-400" />
        )}
      </div>

      {/* 텍스트 입력창 */}
      {open && (
        <div className="mt-2 px-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none"
            rows={3}
            placeholder="추가 프롬프트를 입력하세요"
            value={promptText ?? ''}
            onChange={(e) => {
              const value = e.target.value;
              setPromptText(value.trim() === '' ? null : value);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ExtraOptions;
