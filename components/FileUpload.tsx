"use client";

import { CldUploadWidget } from "next-cloudinary";
import { FileUp, Trash2, FileText } from "lucide-react";

interface FileUploadProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function FileUpload({ value, onChange, disabled }: FileUploadProps) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (value) {
    return (
      <div className="relative w-full max-w-sm flex items-center justify-between p-3 rounded-md border border-line bg-page text-ink">
        <div className="flex items-center gap-3 overflow-hidden">
          <FileText className="w-5 h-5 text-brass shrink-0" />
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs font-mono hover:text-brass truncate">
            {value.split('/').pop()}
          </a>
        </div>
        <button
          onClick={() => onChange("")}
          className="p-1.5 bg-red-500/10 text-red-500 rounded hover:bg-red-500 hover:text-white transition shrink-0 ml-2"
          type="button"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <CldUploadWidget onSuccess={onUpload} uploadPreset="portfolio_preset" options={{ clientAllowedFormats: ['pdf', 'doc', 'docx'] }}>
      {({ open }) => {
        return (
          <button
            type="button"
            disabled={disabled}
            onClick={() => open()}
            className="flex flex-col items-center justify-center w-full max-w-sm h-24 rounded-md border-2 border-dashed border-slate/40 text-slate hover:bg-slate/5 hover:border-slate transition-colors"
          >
            <FileUp className="w-6 h-6 mb-2" />
            <span className="font-mono text-xs uppercase">Upload Document (PDF)</span>
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
