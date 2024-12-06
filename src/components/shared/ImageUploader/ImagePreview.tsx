import React from 'react';
import { X } from 'lucide-react';
import { ImageType } from '../../../types';

interface ImagePreviewProps {
  image: ImageType;
  onRemove: (id: string) => void;
}

export function ImagePreview({ image, onRemove }: ImagePreviewProps) {
  return (
    <div className="relative group">
      {/* Image preview */}
      <img
        src={image.url}
        alt="Preview"
        className="w-full h-32 object-cover rounded-lg"
      />

      {/* Remove button */}
      <button
        onClick={() => onRemove(image.id)}
        className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
