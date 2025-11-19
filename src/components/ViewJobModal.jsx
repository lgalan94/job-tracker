import React from 'react';

const ViewJobModal = ({ isOpen, onClose, job }) => {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-out"
        onClick={onClose}
      />
      {/* Modal content */}
      <div className="relative bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl p-6 transform transition-transform duration-300 ease-out scale-95">
        <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
        <p className="mb-2"><strong>Company:</strong> {job.company}</p>
        <p className="mb-2"><strong>Status:</strong> {job.status}</p>
        <p className="mb-2"><strong>Applied on:</strong> {job.date}</p>
        {job.notes && <p className="mb-2"><strong>Notes:</strong> {job.notes}</p>}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewJobModal;
