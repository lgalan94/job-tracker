import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const LoadingSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
    <div className="h-4 bg-gray-700 rounded w-full"></div>
    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
    <div className="h-4 bg-gray-700 rounded w-full"></div>
    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
  </div>
);

const QuestionsModal = ({ isOpen, onClose, questions, isLoading, company, title }) => {
  if (!isOpen) return null;

  const formatQuestions = text => {
    const lines = text.split('\n');
    let html = '';
    let inList = false;
    lines.forEach(line => {
      if (line.match(/^\d+\.\s/)) {
        if (!inList) {
          html += '<ol class="list-decimal list-inside space-y-2">';
          inList = true;
        }
        html += `<li>${line.replace(/^\d+\.\s/, '')}</li>`;
      } else {
        if (inList) {
          html += '</ol>';
          inList = false;
        }
        html += `<p>${line}</p>`;
      }
    });
    if (inList) html += '</ol>';
    return { __html: html };
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl border border-gray-700 max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-600">
            AI Interview Questions
          </h2>
          {company && title && <p className="text-gray-400 text-sm mt-1">For a {title} at {company}</p>}
        </div>
        <div className="p-6 grow overflow-y-auto">
          {isLoading ? <LoadingSkeleton /> : <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={formatQuestions(questions)} />}
        </div>
        <div className="p-4 bg-gray-900/50 border-t border-gray-700 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsModal;
