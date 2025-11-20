import React from 'react';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ChevronUpIcon } from './icons/ChevronUpIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { SortIcon } from './icons/SortIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';
import { EyeIcon } from './icons/EyeIcon';

const statusColors = {
  APPLIED: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  INTERVIEWING: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  OFFER: 'bg-green-500/20 text-green-300 border-green-500/30',
  REJECTED: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const JobTable = ({ jobs, onEdit, onDelete, onView, onSort, sortConfig }) => {
  if (!jobs.length) {
    return (
      <div className="text-center py-16 px-6 bg-gray-800/50 rounded-lg border border-dashed border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-400">No Applications Found</h2>
        <p className="mt-2 text-gray-500">Try adjusting your filters or add a new application!</p>
      </div>
    );
  }

  const SortableHeader = ({ title, sortKey }) => {
    const isSorting = sortConfig?.key === sortKey;
    const direction = sortConfig?.direction;

    return (
      <th
        scope="col"
        className="p-4 font-semibold text-gray-300"
        aria-sort={
          isSorting ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'
        }
      >
        <button
          onClick={() => onSort(sortKey)}
          className="flex items-center gap-1.5 group transition-colors hover:text-white"
        >
          {title}
          <span className="w-4 h-4" aria-hidden="true">
            {isSorting ? (
              direction === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />
            ) : (
              <SortIcon className="opacity-30 group-hover:opacity-100" />
            )}
          </span>
        </button>
      </th>
    );
  };

  return (
    <div className="overflow-x-auto bg-gray-800/50 rounded-lg shadow-lg border border-gray-700">
      <table className="w-full text-left">
        <thead className="bg-gray-900/70">
          <tr>
            <SortableHeader title="Company" sortKey="company" />
            <SortableHeader title="Job Title" sortKey="title" />
            <th scope="col" className="p-4 font-semibold text-gray-300">Status</th>
            <SortableHeader title="Date Applied" sortKey="date" />
            <th scope="col" className="p-4 font-semibold text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {jobs.map(job => (
            <tr
              key={job._id}
              className="transition-colors duration-150 even:bg-gray-900/40 hover:bg-gray-800"
            >
              <td className="p-4 font-medium">{job.company}</td>
              <td className="p-4 text-gray-300">
                {job.link ? (
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 group"
                    onClick={e => e.stopPropagation()}
                  >
                    <span className="group-hover:underline">{job.title}</span>
                    <ExternalLinkIcon className="opacity-70 group-hover:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  job.title
                )}
              </td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[job.status]} border`}
                >
                  {job.status}
                </span>
              </td>
              <td className="p-4 text-gray-400">
                {new Date(job.date).toLocaleDateString()}
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onView(job)}
                    className="p-2 text-indigo-400 hover:text-indigo-300 hover:bg-gray-700 rounded-full transform transition-all duration-150 hover:scale-110"
                    aria-label={`View application for ${job.title} at ${job.company}`}
                  >
                    <EyeIcon /> 
                  </button>
                  <button
                    onClick={() => onEdit(job)}
                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-gray-700 rounded-full transform transition-all duration-150 hover:scale-110"
                    aria-label={`Edit application for ${job.title} at ${job.company}`}
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => onDelete(job)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-full transform transition-all duration-150 hover:scale-110"
                    aria-label={`Delete application for ${job.title} at ${job.company}`}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
