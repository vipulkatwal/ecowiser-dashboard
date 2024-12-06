import React, { useCallback } from 'react';
import { ImageType } from '../../../types';
import { ImagePreview } from './ImagePreview';
import { UploadButton } from './UploadButton';

interface ImageUploaderProps {
  images: ImageType[];
  onChange: (images: ImageType[]) => void;
  maxImages?: number;
  uploaderId?: string;
}

export function ImageUploader({
  images,
  onChange,
  maxImages = 4,
  uploaderId = 'file-upload',
}: ImageUploaderProps) {
  // Handle file upload
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Check if the total images exceed maxImages
    if (files.length + images.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }

    // Map files to image objects and update the state
    const newImages: ImageType[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file,
      type: 'file'
    }));

    onChange([...images, ...newImages]);
  }, [images, maxImages, onChange]);

  // Handle URL image addition
  const handleUrlAdd = useCallback(() => {
    const url = prompt('Enter image URL');
    if (!url) return;

    // Check if the total images exceed maxImages
    if (images.length >= maxImages) {
      alert(`You can only add up to ${maxImages} images`);
      return;
    }

    // Create a new image object from the URL and update the state
    const newImage: ImageType = {
      id: Math.random().toString(36).substr(2, 9),
      url,
      type: 'url'
    };

    onChange([...images, newImage]);
  }, [images, maxImages, onChange]);

  // Handle removing an image
  const handleRemove = useCallback((id: string) => {
    onChange(images.filter(img => img.id !== id));
  }, [images, onChange]);

  return (
    <div className="space-y-4">
      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {images.map((image) => (
          <ImagePreview
            key={image.id}
            image={image}
            onRemove={handleRemove}
          />
        ))}

        {/* Display upload buttons if there is space */}
        {images.length < maxImages && (
          <>
            <UploadButton
              onFileSelect={() => document.getElementById(uploaderId)?.click()}
              onUrlAdd={handleUrlAdd}
            />
            <input
              id={uploaderId}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </>
        )}
      </div>
    </div>
  );
}
