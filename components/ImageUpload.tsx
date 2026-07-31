"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (value) {
    return (
      <div className="relative w-40 h-40 rounded-md overflow-hidden border border-line">
        <Image fill style={{ objectFit: 'cover' }} alt="Upload" src={value} />
        <button
          onClick={() => onChange("")}
          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          type="button"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <CldUploadWidget onSuccess={onUpload} uploadPreset="portfolio_preset">
      {({ open }) => {
        return (
          <button
            type="button"
            disabled={disabled}
            onClick={() => open()}
            className="flex flex-col items-center justify-center w-40 h-40 rounded-md border-2 border-dashed border-slate/40 text-slate hover:bg-slate/5 hover:border-slate transition-colors"
          >
            <ImagePlus className="w-8 h-8 mb-2" />
            <span className="font-mono text-xs uppercase">Upload Image</span>
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
