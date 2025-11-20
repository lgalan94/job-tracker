// src/pages/Dashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import JobTable from "../components/JobTable";
import AddEditJobModal from "../components/AddEditJobModal";
import ConfirmationModal from "../components/ConfirmationModal";
import ViewJobModal from "../components/ViewJobModal";
import Header from "../components/Header";

import { useAuth } from "../context/AuthContext";
import { ApplicationStatus } from "../constants/ApplicationStatus";
import { statusColors } from "../constants/statusColors";
import { fetchJobs, createJob, updateJob, deleteJob } from "../api/jobsApi";

const Dashboard = () => {
  const { user, token, logout } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [editingJob, setEditingJob] = useState(null);
  const [viewJob, setViewJob] = useState(null);

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [jobToDeleteId, setJobToDeleteId] = useState(null);

  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [viewMode, setViewMode] = useState("table"); // "table" | "kanban"

  // Fetch jobs on mount
  useEffect(() => {
    if (!token) return;

    const loadJobs = async () => {
      setLoadingJobs(true);
      try {
        const data = await fetchJobs(token);
        setJobs(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoadingJobs(false);
      }
    };

    loadJobs();
  }, [token]);

  // Filtered jobs based on status
  const filteredJobs = useMemo(() => {
    return statusFilter === "all"
      ? jobs
      : jobs.filter(j => j.status === statusFilter);
  }, [jobs, statusFilter]);

  // Sorting
  const handleSort = key =>
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));

  // Modals
  const handleAddNew = () => { setEditingJob(null); setIsAddEditModalOpen(true); };
  const handleEdit = job => { setEditingJob(job); setIsAddEditModalOpen(true); };
  const handleView = job => { setViewJob(job); setIsViewModalOpen(true); };
  const handleDeleteClick = job => { setJobToDeleteId(job?._id || null); setIsConfirmModalOpen(true); };

  // Save job (create or update)
  const handleSave = async job => {
    setLoadingSave(true);
    try {
      const savedJob = editingJob
        ? await updateJob(token, job)
        : await createJob(token, job);

      setJobs(prev =>
        editingJob
          ? prev.map(j => (j._id === savedJob._id ? savedJob : j))
          : [savedJob, ...prev]
      );

      toast.success(editingJob ? "Job updated successfully" : "Job added successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingSave(false);
      setIsAddEditModalOpen(false);
      setEditingJob(null);
    }
  };

  // Confirm deletion
  const handleConfirmDelete = async () => {
    if (!jobToDeleteId) return toast.error("No job selected");
    setLoadingDelete(true);
    try {
      await deleteJob(token, jobToDeleteId);
      setJobs(prev => prev.filter(j => j._id !== jobToDeleteId));
      toast.success("Job deleted successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingDelete(false);
      setIsConfirmModalOpen(false);
      setJobToDeleteId(null);
    }
  };

  // Kanban drag & drop
  const handleDragEnd = async result => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const job = jobs.find(j => j._id === draggableId);
    if (!job || job.status === destination.droppableId) return;

    // Optimistic update
    setJobs(prev =>
      prev.map(j => (j._id === draggableId ? { ...j, status: destination.droppableId } : j))
    );

    try {
      await updateJob(token, { ...job, status: destination.droppableId });
    } catch (err) {
      toast.error(err.message);
      // rollback on failure
      setJobs(prev => prev.map(j => (j._id === draggableId ? job : j)));
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 font-sans">
      <div className="container mx-auto px-4 py-8">
        <Header user={user} onAddNew={handleAddNew} onLogout={logout} />

        {/* View Mode & Filter */}
        <div className="flex justify-between items-center my-4 flex-wrap gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 rounded ${viewMode === "table" ? "bg-blue-600" : "bg-gray-800"}`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`px-4 py-2 rounded ${viewMode === "kanban" ? "bg-blue-600" : "bg-gray-800"}`}
            >
              Kanban View
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-400 mr-2">Filter by status:</label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-md px-3 py-1.5 text-sm"
            >
              <option value="all">All</option>
              {Object.values(ApplicationStatus).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {loadingJobs ? (
          <div className="text-center py-16 text-gray-400">
            <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-12 h-12 mx-auto mb-4" />
            Loading jobs...
          </div>
        ) : viewMode === "table" ? (
          <JobTable
            jobs={filteredJobs}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onView={handleView}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-x-auto">
              {Object.values(ApplicationStatus).map(status => (
                <Droppable droppableId={status} key={status}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-gray-800 rounded-lg p-4 min-h-[300px] flex flex-col"
                    >
                      <h3 className="text-lg font-bold mb-2">{status}</h3>
                      {filteredJobs
                        .filter(job => job.status === status)
                        .map((job, index) => (
                          <Draggable key={job._id} draggableId={job._id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`
                                  p-4 mb-3 rounded shadow cursor-grab border
                                  ${statusColors[job.status] || 'bg-gray-700 text-gray-200 border-gray-600'}
                                  ${snapshot.isDragging ? 'shadow-lg scale-105' : ''}
                                `}
                                onClick={() => handleView(job)}
                                style={{ ...provided.draggableProps.style, userSelect: "none" }}
                              >
                                <h4 className="font-semibold">{job.title}</h4>
                                <p className="text-sm">{job.company}</p>
                                {job.link && (
                                  <a
                                    href={job.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs underline mt-1 block"
                                  >
                                    Link
                                  </a>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        )}
      </div>

      {/* Modals */}
      {isAddEditModalOpen && (
        <AddEditJobModal
          isOpen={isAddEditModalOpen}
          onClose={() => setIsAddEditModalOpen(false)}
          onSave={handleSave}
          jobToEdit={editingJob}
          loading={loadingSave}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmDelete}
          loading={loadingDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this application? This action cannot be undone."
        />
      )}
      {isViewModalOpen && (
        <ViewJobModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          job={viewJob}
        />
      )}
    </div>
  );
};

export default Dashboard;
