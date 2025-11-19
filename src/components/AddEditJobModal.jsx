// src/components/AddEditJobModal.jsx
import React, { useState, useEffect } from "react";

export default function AddEditJobModal({ isOpen, onClose, onSave, jobToEdit }) {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    status: "APPLIED",
    notes: "",
    link: "",
  });

  useEffect(() => {
    if (jobToEdit) setFormData(jobToEdit);
  }, [jobToEdit]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(formData);
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
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 rounded text-white">{jobToEdit ? "Update" : "Add"}</button>
        </div>
      </form>
    </div>
  );
}
