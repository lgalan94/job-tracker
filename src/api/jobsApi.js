
const API_URL = import.meta.env.VITE_API_URL;

export const fetchJobs = async (token) => {
  const res = await fetch(`${API_URL}/api/jobs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) throw new Error("Unauthorized, please login again.");
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
};

export const createJob = async (token, job) => {
  const res = await fetch(`${API_URL}/api/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(job),
  });
  if (!res.ok) throw new Error("Failed to create job");
  return res.json();
};

export const updateJob = async (token, job) => {
  const res = await fetch(`${API_URL}/api/jobs/${job._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(job),
  });
  if (!res.ok) throw new Error("Failed to update job");
  return res.json();
};

export const deleteJob = async (token, jobId) => {
  const res = await fetch(`${API_URL}/api/jobs/${jobId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Failed to delete job");
  return data;
};
