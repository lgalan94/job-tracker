import React, { useState, useEffect } from "react";

export default function AddEditJobModal({ isOpen, onClose, onSave, jobToEdit }) {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    status: "APPLIED",
    notes: "",
    link: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (jobToEdit) setFormData(jobToEdit);
  }, [jobToEdit]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <form
        className="bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold text-white">{jobToEdit ? "Edit Job" : "Add New Job"}</h2>

        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          required
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          required
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
        >
          {["APPLIED", "INTERVIEWING", "OFFER", "REJECTED"].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input
          type="url"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="Application Link"
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-gray-600 rounded text-white hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 rounded text-white flex items-center justify-center gap-2 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading && (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
            )}
            {jobToEdit ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
