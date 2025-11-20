import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";

import { EditIcon } from "./icons/EditIcon";
import { TrashIcon } from "./icons/TrashIcon";
import { ChevronUpIcon } from "./icons/ChevronUpIcon";
import { ChevronDownIcon } from "./icons/ChevronDownIcon";
import { SortIcon } from "./icons/SortIcon";
import { ExternalLinkIcon } from "./icons/ExternalLinkIcon";
import { EyeIcon } from "./icons/EyeIcon";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { statusColors } from "@/constants/statusColors";

const JobTable = ({ jobs, onEdit, onDelete, onView, onSort, sortConfig }) => {
  if (!jobs.length) {
    return (
      <div className="text-center py-16 px-6 bg-gray-800/50 rounded-lg border border-dashed border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-400">
          No Applications Found
        </h2>
        <p className="mt-2 text-gray-500">
          Try adjusting your filters or add a new application!
        </p>
      </div>
    );
  }

  const SortableHeader = ({ title, sortKey }) => {
    const isSorting = sortConfig?.key === sortKey;
    const direction = sortConfig?.direction;

    return (
      <TableHead
        className="p-4 font-semibold text-gray-300 text-left"
        aria-sort={
          isSorting ? (direction === "asc" ? "ascending" : "descending") : "none"
        }
      >
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 text-gray-300 hover:text-gray-600"
          onClick={() => onSort(sortKey)}
        >
          {title}
          {isSorting ? (
            direction === "asc" ? <ChevronUpIcon /> : <ChevronDownIcon />
          ) : (
            <SortIcon className="opacity-30" />
          )}
        </Button>
      </TableHead>
    );
  };

  return (
    <div className="overflow-x-auto bg-gray-800/50 rounded-lg shadow-lg border border-gray-700">
      <Table variant="default" className="w-full">
        <TableHeader className="bg-gray-900/70">
          <TableRow>
            <SortableHeader title="Company" sortKey="company" />
            <SortableHeader title="Job Title" sortKey="title" />
            <TableHead className="p-4 font-semibold text-gray-300 text-left">
              Status
            </TableHead>
            <SortableHeader title="Date Applied" sortKey="date" />
            <TableHead className="p-4 font-semibold text-gray-300 text-left">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobs.map((job) => (
            <TableRow
              key={job._id}
              className="transition-colors duration-150 even:bg-gray-900/40 hover:bg-gray-800"
            >
              <TableCell className="p-4 font-medium">{job.company}</TableCell>

              <TableCell className="p-4 text-gray-300">
                {job.link ? (
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 group"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="group-hover:underline">{job.title}</span>
                    <ExternalLinkIcon className="opacity-70 group-hover:opacity-100" />
                  </a>
                ) : (
                  job.title
                )}
              </TableCell>

              <TableCell className="p-4">
                <Badge className={statusColors[job.status]}>
                  {job.status}
                </Badge>
              </TableCell>

              <TableCell className="p-4 text-gray-400">
                {new Date(job.date).toLocaleDateString()}
              </TableCell>

              <TableCell className="p-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(job)}
                    aria-label={`View ${job.title}`}
                  >
                    <EyeIcon />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(job)}
                    aria-label={`Edit ${job.title}`}
                  >
                    <EditIcon />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(job)}
                    aria-label={`Delete ${job.title}`}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobTable;
