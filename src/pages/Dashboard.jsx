import React, { useState, useEffect, useMemo } from "react";
import JobTable from "../components/JobTable";
import AddEditJobModal from "../components/AddEditJobModal";
import ConfirmationModal from "../components/ConfirmationModal";
import ViewJobModal from "../components/ViewJobModal";
import Header from "../components/Header";
import { ApplicationStatus } from "../constants/ApplicationStatus";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

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

  useEffect(() => {
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/jobs`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.status === 401) throw new Error("Unauthorized, please login again.");
        if (!res.ok) throw new Error("Failed to fetch jobs");
        return res.json();
      })
      .then(data => setJobs(data))
      .catch(err => toast.error(err.message));
  }, [token]);

  const filteredAndSortedJobs = useMemo(() => {
    let temp = [...jobs];
    if (statusFilter !== "all") temp = temp.filter(j => j.status === statusFilter);
    if (sortConfig) {
      const { key, direction } = sortConfig;
      temp.sort((a, b) => {
        const valA = a[key];
        const valB = b[key];
        if (key === "date") return direction === "asc" ? new Date(valA) - new Date(valB) : new Date(valB) - new Date(valA);
        return direction === "asc" ? valA.toLowerCase().localeCompare(valB.toLowerCase()) : valB.toLowerCase().localeCompare(valA.toLowerCase());
      });
    }
    return temp;
  }, [jobs, statusFilter, sortConfig]);

  const handleSort = key => setSortConfig(prev => ({
    key,
    direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
  }));

  const handleAddNew = () => { setEditingJob(null); setIsAddEditModalOpen(true); };
  const handleEdit = job => { setEditingJob(job); setIsAddEditModalOpen(true); };
  const handleView = job => { setViewJob(job); setIsViewModalOpen(true); };

const handleConfirmDelete = async () => {
  if (!jobToDeleteId) {
    toast.error("No job selected");
    return;
  }

  console.log("Deleting job with ID:", jobToDeleteId);

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${jobToDeleteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to delete job");

    // Remove from list
    setJobs(prev => prev.filter(j => j._id !== jobToDeleteId));
    toast.success("Job deleted successfully");
  } catch (err) {
    toast.error(err.message);
  } finally {
    setIsConfirmModalOpen(false);
    setJobToDeleteId(null);
  }
};



  const handleSave = async job => {
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
        setJobs(jobs.map(j => j._id === savedJob._id ? savedJob : j));
        toast.success("Job updated successfully");
      } else {
        setJobs([savedJob, ...jobs]);
        toast.success("Job added successfully");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsAddEditModalOpen(false);
      setEditingJob(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 font-sans">
      <div className="container mx-auto px-4 py-8">
        <Header user={user} onAddNew={handleAddNew} onLogout={logout} />

        {/* Filter */}
        <div className="flex justify-end mb-4">
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

        {/* Job Table */}
       <JobTable
          jobs={filteredAndSortedJobs}
          onEdit={handleEdit}
          
          
          onDelete={(job) => {
          setJobToDeleteId(job?._id || null);
          setIsConfirmModalOpen(true);
        }}

          onView={handleView}
          onSort={handleSort}
          sortConfig={sortConfig}
        />

      </div>

      {/* Modals */}
      {isAddEditModalOpen && (
        <AddEditJobModal
          isOpen={isAddEditModalOpen}
          onClose={() => setIsAddEditModalOpen(false)}
          onSave={handleSave}
          jobToEdit={editingJob}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmDelete}
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
