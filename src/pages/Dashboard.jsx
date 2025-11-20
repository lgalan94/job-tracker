import React, { useState, useEffect, useMemo } from "react";
import JobTable from "../components/JobTable";
import AddEditJobModal from "../components/AddEditJobModal";
import ConfirmationModal from "../components/ConfirmationModal";
import ViewJobModal from "../components/ViewJobModal";
import Header from "../components/Header";
import { ApplicationStatus } from "../constants/ApplicationStatus";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// Add this at the top of your component
const statusColors = {
  APPLIED: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  INTERVIEWING: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  OFFER: 'bg-green-500/20 text-green-300 border-green-500/30',
  REJECTED: 'bg-red-500/20 text-red-300 border-red-500/30',
};


const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [jobToDeleteId, setJobToDeleteId] = useState(null);
  const [viewJob, setViewJob] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [viewMode, setViewMode] = useState("table"); // table | kanban

  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    if (!token) return;

    setLoadingJobs(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/jobs`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.status === 401) throw new Error("Unauthorized, please login again.");
        if (!res.ok) throw new Error("Failed to fetch jobs");
        return res.json();
      })
      .then(data => setJobs(data))
      .catch(err => toast.error(err.message))
      .finally(() => setLoadingJobs(false));
  }, [token]);

  const filteredJobs = useMemo(() => {
    return statusFilter === "all"
      ? jobs
      : jobs.filter(j => j.status === statusFilter);
  }, [jobs, statusFilter]);

  const handleSort = key =>
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));

  const handleAddNew = () => {
    setEditingJob(null);
    setIsAddEditModalOpen(true);
  };
  const handleEdit = job => {
    setEditingJob(job);
    setIsAddEditModalOpen(true);
  };
  const handleView = job => setViewJob(job) && setIsViewModalOpen(true);

  const handleConfirmDelete = async () => {
    if (!jobToDeleteId) return toast.error("No job selected");
    setLoadingDelete(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${jobToDeleteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to delete job");

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

  const handleSave = async job => {
    setLoadingSave(true);
    try {
      const method = editingJob ? "PUT" : "POST";
      const url = editingJob
        ? `${import.meta.env.VITE_API_URL}/api/jobs/${job._id}`
        : `${import.meta.env.VITE_API_URL}/api/jobs`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(job),
      });

      if (!res.ok) throw new Error("Failed to save job");

      const savedJob = await res.json();
      if (editingJob) {
        setJobs(jobs.map(j => (j._id === savedJob._id ? savedJob : j)));
        toast.success("Job updated successfully");
      } else {
        setJobs([savedJob, ...jobs]);
        toast.success("Job added successfully");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingSave(false);
      setIsAddEditModalOpen(false);
      setEditingJob(null);
    }
  };

  const handleDragEnd = result => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    setJobs(prev =>
      prev.map(j => (j._id === draggableId ? { ...j, status: destination.droppableId } : j))
    );

    const job = jobs.find(j => j._id === draggableId);
    if (job && job.status !== destination.droppableId) {
      fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${job._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...job, status: destination.droppableId }),
      }).catch(err => toast.error(err.message));
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 font-sans">
      <div className="container mx-auto px-4 py-8">
        <Header user={user} onAddNew={handleAddNew} onLogout={logout} />

        {/* View Mode Toggle */}
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
            onDelete={job => {
              setJobToDeleteId(job?._id || null);
              setIsConfirmModalOpen(true);
            }}
            onView={handleView}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-x-auto">
              {Object.values(ApplicationStatus).map(status => (
                <Droppable droppableId={status} key={status}>
                  {(provided) => (
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
