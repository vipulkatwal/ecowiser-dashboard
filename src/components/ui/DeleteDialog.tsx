import React from 'react';
import { Dialog } from '@headlessui/react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export default function DeleteDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <Dialog.Title className="text-lg font-medium text-gray-900">
              {title}
            </Dialog.Title>
          </div>

          <p className="mt-3 text-sm text-gray-500">{description}</p>

          <div className="mt-6 flex justify-end space-x-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" variant="danger" onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}