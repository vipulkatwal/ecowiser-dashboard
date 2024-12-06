import React from 'react';
import { Upload, Link as LinkIcon } from 'lucide-react';
import { Button } from '../../ui/Button';

interface UploadButtonProps {
  onFileSelect: () => void;
  onUrlAdd: () => void;
}

export function UploadButton({ onFileSelect, onUrlAdd }: UploadButtonProps) {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center space-y-2">
      {/* Button Group */}
      <div className="flex space-x-2">
        {/* Upload Button */}
        <Button
          type="button"
          variant="secondary"
          onClick={onFileSelect}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>

        {/* URL Button */}
        <Button
          type="button"
          variant="secondary"
          onClick={onUrlAdd}
        >
          <LinkIcon className="h-4 w-4 mr-2" />
          URL
        </Button>
      </div>

      {/* Instructions */}
      <p className="text-xs text-gray-500 text-center">
        PNG, JPG up to 5MB
        <br />
        500x500px recommended
      </p>
    </div>
  );
}
