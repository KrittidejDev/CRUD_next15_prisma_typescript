"use client";
import { useEffect, useRef, useState } from "react";

type InputUploadProps = {
  value?: File | null;
  onChange: (file: File | null) => void;
};

const InputUpload = ({ value, onChange }: InputUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null); // ✅ ใช้ ref

  useEffect(() => {
    if (value) {
      const objectUrl = URL.createObjectURL(value);
      setPreviewUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setPreviewUrl(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(file);
  };

  return (
    <div className="flex flex-col gap-2">
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="rounded-xl border max-w-[300px] max-h-[200px] object-cover"
        />
      )}
      <input
        ref={inputRef} // ✅ ผูก ref
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="px-4 py-2 rounded-xl border"
      />
    </div>
  );
};

export default InputUpload;
