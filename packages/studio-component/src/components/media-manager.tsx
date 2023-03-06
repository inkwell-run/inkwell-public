import { Button, TypographySubtle } from "@doom.sh/ui";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const MediaManager = () => {
  const [media, setMedia] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imageUrls = acceptedFiles.map((v) => URL.createObjectURL(v));
    // Do something with the files
    setMedia((prev) => [...prev, ...imageUrls]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex flex-wrap gap-4">
      {/* dropzone */}
      <div
        {...getRootProps({})}
        className="w-[25%] md:w-[150px] flex flex-col items-center justify-center gap-2 p-4 text-center bg-gray-200 rounded-md aspect-square"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <TypographySubtle>Drop files here</TypographySubtle>
        ) : (
          <>
            <TypographySubtle>Drag files here</TypographySubtle>
            <Button>Browse</Button>
          </>
        )}
      </div>
      {/* files */}
      {media.map((url) => {
        return (
          <div className="w-[25%] md:w-[150px] flex flex-col items-center justify-center gap-2 overflow-hidden text-center bg-gray-200 rounded-md aspect-square">
            <img src={url} alt="" className="object-cover w-full h-full" />
          </div>
        );
      })}
    </div>
  );
};

export default MediaManager;
