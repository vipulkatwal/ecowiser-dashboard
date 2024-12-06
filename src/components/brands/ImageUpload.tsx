import React, { useCallback } from 'react';
import { Upload, X, Link as LinkIcon } from 'lucide-react';
import { BrandImage } from '../../types';
import { Button } from '../ui/Button';

interface ImageUploadProps {
  images: BrandImage[]; // List of current images
  onChange: (images: BrandImage[]) => void; // Callback to update images
  maxImages?: number; // Maximum number of images allowed
}

export function ImageUpload({
  images,
  onChange,
  maxImages = 4, // Default maximum number of images is 4
}: ImageUploadProps) {
  /**
   * Handles file uploads from the user.
   * Converts selected files into image objects and updates the image list.
   */
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []); // Convert FileList to an array
      if (files.length + images.length > maxImages) {
        alert(`You can only upload up to ${maxImages} images`); // Prevent exceeding maxImages
        return;
      }

      // Create new image objects from uploaded files
      const newImages: BrandImage[] = files.map((file) => ({
        id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
        url: URL.createObjectURL(file), // Create a local preview URL
        file, // Save the file object for further use (e.g., uploading)
        type: 'file', // Mark the type as file
      }));

      // Update the image list with new images
      onChange([...images, ...newImages]);
    },
    [images, maxImages, onChange]
  );

  /**
   * Handles adding an image by URL.
   * Prompts the user for a URL and adds it as an image object.
   */
  const handleUrlAdd = useCallback(() => {
    const url = prompt('Enter image URL'); // Prompt user for the image URL
    if (!url) return; // Exit if no URL is provided

    if (images.length >= maxImages) {
      alert(`You can only add up to ${maxImages} images`); // Prevent exceeding maxImages
      return;
    }

    // Create a new image object from the URL
    const newImage: BrandImage = {
      id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
      url, // Use the provided URL
      type: 'url', // Mark the type as URL
    };

    // Update the image list with the new image
    onChange([...images, newImage]);
  }, [images, maxImages, onChange]);

  /**
   * Handles removing an image by its ID.
   */
  const handleRemove = useCallback(
    (id: string) => {
      // Filter out the image with the specified ID
      onChange(images.filter((img) => img.id !== id));
    },
    [images, onChange]
  );

  return (
    <div className="space-y-4">
      {/* Grid layout for displaying uploaded images */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            {/* Display image with a rounded border */}
            <img
              src={image.url}
              alt="Brand"
              className="w-full h-32 object-cover rounded-lg"
            />
            {/* Remove button, visible on hover */}
            <button
              onClick={() => handleRemove(image.id)} // Call remove handler
              className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" /> {/* Icon for remove */}
            </button>
          </div>
        ))}

        {/* Upload and URL input section, visible when image count is below maxImages */}
        {images.length < maxImages && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center space-y-2">
            {/* Buttons for uploading a file or adding a URL */}
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  document.getElementById('brand-file-upload')?.click()
                } // Trigger file input click
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleUrlAdd} // Call URL add handler
              >
                <LinkIcon className="h-4 w-4 mr-2" />
                URL
              </Button>
            </div>
            {/* Hidden file input for uploading images */}
            <input
              id="brand-file-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload} // Handle file upload
            />
            {/* Help text for users */}
            <p className="text-xs text-gray-500 text-center">
              PNG, JPG up to 5MB
              <br />
              500x500px recommended
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
