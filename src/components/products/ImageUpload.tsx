import React, { useCallback } from "react";
import { Upload, X, Link as LinkIcon } from "lucide-react";
import { ProductImage } from "../../types";
import { Button } from "../ui/Button";

interface ImageUploadProps {
  images: ProductImage[]; // Array of images to display and manage
  onChange: (images: ProductImage[]) => void; // Callback to update the image list
  maxImages?: number; // Maximum number of images allowed
}

export function ImageUpload({
  images,
  onChange,
  maxImages = 4, // Default maximum is 4 images
}: ImageUploadProps) {
  /**
   * Handles file uploads by creating new image objects for each selected file.
   * Prevents exceeding the maximum allowed images.
   */
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []); // Convert FileList to an array
      if (files.length + images.length > maxImages) {
        alert(`You can only upload up to ${maxImages} images`); // Alert user if exceeding max
        return;
      }

      // Map files to new ProductImage objects
      const newImages: ProductImage[] = files.map((file) => ({
        id: Math.random().toString(36).substr(2, 9), // Generate unique ID
        url: URL.createObjectURL(file), // Create preview URL for file
        file, // Store file for uploading
        type: "file", // Indicate the type as file
      }));

      // Update the image list
      onChange([...images, ...newImages]);
    },
    [images, maxImages, onChange]
  );

  /**
   * Handles adding an image by URL. Prompts the user for a URL and adds it to the list.
   * Ensures the maximum image limit is not exceeded.
   */
  const handleUrlAdd = useCallback(() => {
    const url = prompt("Enter image URL"); // Prompt the user to input a URL
    if (!url) return; // Exit if no URL is provided

    if (images.length >= maxImages) {
      alert(`You can only add up to ${maxImages} images`); // Alert user if exceeding max
      return;
    }

    // Create a new ProductImage object for the URL
    const newImage: ProductImage = {
      id: Math.random().toString(36).substr(2, 9), // Generate unique ID
      url, // Use the provided URL
      type: "url", // Indicate the type as URL
    };

    // Update the image list
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
      {/* Grid layout for displaying uploaded or added images */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            {/* Display the image with a rounded border */}
            <img
              src={image.url}
              alt="Product"
              className="w-full h-32 object-cover rounded-lg"
            />
            {/* Remove button, visible on hover */}
            <button
              onClick={() => handleRemove(image.id)} // Trigger the remove handler
              className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" /> {/* Icon for remove */}
            </button>
          </div>
        ))}
        {/* Placeholder for uploading new images if below maxImages */}
        {images.length < maxImages && (
          <div className="relative w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <p className="text-xs text-gray-500 text-center">
              PNG, JPG up to 5MB
              <br />
              500x500px recommended
            </p>
          </div>
        )}
      </div>

      {/* Buttons for uploading a file or adding an image by URL */}
      <div className="flex space-x-4 justify-center mt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => document.getElementById("file-upload")?.click()} // Trigger file input click
          className="bg-blue-200 hover:bg-blue-400"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleUrlAdd} // Trigger URL add handler
          className="bg-green-200 hover:bg-green-400"
        >
          <LinkIcon className="h-4 w-4 mr-2" />
          URL
        </Button>
      </div>

      {/* Hidden file input for handling uploads */}
      <input
        id="file-upload"
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload} // Trigger file upload handler
      />
    </div>
  );
}
