import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { statusColors } from "@/constants/statusColors";


const ViewJobModal = ({ isOpen, onClose, job }) => {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={val => !val && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{job.title}</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-2 text-gray-600">
          <p>
            <strong>Company:</strong> {job.company}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <Badge className={statusColors[job.status]}>{job.status}</Badge>
          </p>
          <p>
            <strong>Applied on:</strong>{" "}
            {new Date(job.date).toLocaleDateString()}
          </p>
          {job.notes && (
            <p>
              <strong>Notes:</strong> {job.notes}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewJobModal;
