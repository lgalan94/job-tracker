import React from 'react';
import { WarningIcon } from './icons/WarningIcon';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-md border border-gray-700">
        <div className="p-6 flex items-start">
          <div className="shrink-0 mr-4">
            <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center">
              <WarningIcon className="h-6 w-6 text-red-400" />
            </div>
          </div>
          <div className="grow">
            <h3 id="confirm-dialog-title" className="text-xl font-bold text-gray-100">{title}</h3>
            <p className="mt-2 text-gray-400">{message}</p>
          </div>
        </div>
        <div className="p-4 bg-gray-900/50 border-t border-gray-700 flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
