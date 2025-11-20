import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { WarningIcon } from "./icons/WarningIcon";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, loading = false }) => {
  return (
    <Dialog open={isOpen} onOpenChange={val => !val && onClose()}> 
      <DialogContent className="sm:max-w-md">as
        <DialogHeader className="flex items-start gap-4">
          <div className="shrink-0">
            <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center">
              <WarningIcon className="h-6 w-6 text-red-400" />
            </div>
          </div>
          <div className="grow">
            <DialogTitle className="text-xl font-bold text-gray-100">{title}</DialogTitle>
            <p className="mt-2 text-gray-400">{message}</p>
          </div>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
            )}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
