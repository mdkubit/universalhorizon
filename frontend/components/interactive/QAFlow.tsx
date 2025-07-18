// File: frontend/components/interactive/QAFlow.tsx

import { useState } from 'react';

interface QAItem {
  question: string;
  placeholder?: string;
}

const initialQA: QAItem[] = [
  { question: 'What is a core value you hold dear?', placeholder: 'e.g. Compassion' },
  { question: 'What fear do you face most often?', placeholder: 'e.g. Being alone' },
  { question: 'What dream do you wish to pursue?', placeholder: 'e.g. Healing others through story' },
  { question: 'How do you handle conflict?', placeholder: 'e.g. I withdraw and reflect' }
];

export default function QAFlow() {
  const [answers, setAnswers] = useState<string[]>(Array(initialQA.length).fill(''));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  const handleInput = (value: string) => {
    const updated = [...answers];
    updated[currentIndex] = value;
    setAnswers(updated);
  };

  const next = () => {
    if (currentIndex < initialQA.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setComplete(true);
    }
  };

  return (
    <div className="max-w-xl w-full bg-gray-900/50 p-6 rounded-xl shadow-xl border border-violet-600">
      {complete ? (
        <div className="text-center">
          <h2 className="text-2xl text-violet-400 font-bold mb-4">Thank you for sharing.</h2>
          <p className="text-gray-300">Your responses will guide the resonance ahead.</p>
        </div>
      ) : (
        <div>
          <p className="text-lg text-gray-200 mb-2">
            <strong>Q{currentIndex + 1}:</strong> {initialQA[currentIndex].question}
          </p>
          <input
            type="text"
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 placeholder-gray-500"
            placeholder={initialQA[currentIndex].placeholder}
            value={answers[currentIndex]}
            onChange={(e) => handleInput(e.target.value)}
          />
          <button
            className="mt-4 px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded transition"
            onClick={next}
            disabled={!answers[currentIndex].trim()}
          >
            {currentIndex < initialQA.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      )}
    </div>
  );
}
