"use client";

import React, { useState, useRef, useId } from "react";
import Image from "next/image";
import { Upload, Link as LinkIcon, X, Check, AlertCircle, RefreshCw } from "lucide-react";

export interface ImageUploadFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  placeholder?: string;
  className?: string;
  id?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif", "image/avif"];

export default function ImageUploadField({
  label,
  value,
  onChange,
  helperText,
  placeholder = "https://images.unsplash...",
  className = "",
  id: customId,
}: ImageUploadFieldProps) {
  const generatedId = useId();
  const inputId = customId || generatedId;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Determine initial mode based on whether current value is a data URL or external link
  const [mode, setMode] = useState<"upload" | "url">(() => {
    return value.startsWith("data:") ? "upload" : "upload";
  });
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const isDataUrl = value.startsWith("data:") || value.startsWith("blob:");

  const handleFileProcess = (file: File) => {
    setError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Please select a valid image file (JPG, PNG, WebP, SVG, GIF, or AVIF).");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image file exceeds the 5MB limit. Please choose a smaller image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setFileName(file.name);
        onChange(reader.result);
      }
    };
    reader.onerror = () => {
      setError("Failed to read the image file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
    // Reset file input so user can re-select the same file if desired
    if (e.target) {
      e.target.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleClear = () => {
    onChange("");
    setFileName(null);
    setError(null);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label & Mode Switcher Bar */}
      <div className="flex items-center justify-between">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
            {label}
          </label>
        )}

        {/* Mode Toggle Pills */}
        <div className="inline-flex rounded-md p-0.5 bg-stone-100 border border-stone-200">
          <button
            type="button"
            onClick={() => {
              setMode("upload");
              setError(null);
            }}
            className={`inline-flex items-center space-x-1 px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
              mode === "upload"
                ? "bg-white text-stone-900 shadow-2xs font-semibold"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("url");
              setError(null);
            }}
            className={`inline-flex items-center space-x-1 px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
              mode === "url"
                ? "bg-white text-stone-900 shadow-2xs font-semibold"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Image Link</span>
          </button>
        </div>
      </div>

      {/* Mode 1: File Upload */}
      {mode === "upload" && (
        <div>
          {value ? (
            /* Selected Image Preview Box */
            <div className="relative p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center space-x-3.5">
              <div
                className="relative w-16 h-16 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0"
                style={{ position: "relative" }}
              >
                <Image
                  src={value}
                  alt={fileName || "Selected Image"}
                  fill
                  className="object-cover"
                  unoptimized={isDataUrl}
                  sizes="64px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-stone-900 truncate">
                    {fileName || (isDataUrl ? "Uploaded Image" : "Linked Image")}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5 truncate">
                  {isDataUrl ? "Local image file ready" : value}
                </p>

                <div className="flex items-center space-x-2 mt-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center space-x-1 text-[11px] font-medium text-[#475438] hover:text-[#3A452E]"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Replace</span>
                  </button>
                  <span className="text-stone-300">•</span>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="inline-flex items-center space-x-1 text-[11px] font-medium text-red-600 hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Dropzone / Upload Trigger */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-[#475438] bg-[#475438]/5"
                  : "border-stone-300 hover:border-stone-400 bg-stone-50/50 hover:bg-stone-50"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-500 mb-2">
                <Upload className="w-5 h-5 text-stone-600" />
              </div>
              <p className="text-xs font-semibold text-stone-800">
                Click to browse or drag &amp; drop image here
              </p>
              <p className="text-[11px] text-stone-400 mt-1">
                Supports PNG, JPG, WebP, SVG, GIF or AVIF up to 5MB
              </p>
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            id={inputId}
            type="file"
            accept={ALLOWED_TYPES.join(",")}
            onChange={handleFileInputChange}
            className="sr-only"
            aria-label={label || "Upload image file"}
          />
        </div>
      )}

      {/* Mode 2: URL Link Input */}
      {mode === "url" && (
        <div className="space-y-2">
          <div className="relative">
            <input
              id={inputId}
              type="url"
              value={value}
              onChange={(e) => {
                setError(null);
                setFileName(null);
                onChange(e.target.value);
              }}
              placeholder={placeholder}
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-stone-50/50 focus:outline-hidden focus:ring-2 focus:ring-[#475438] focus:border-transparent font-mono"
            />
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700"
                title="Clear URL"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Small thumbnail preview for URL mode if value exists */}
          {value && (
            <div className="flex items-center space-x-2.5 p-2 bg-stone-50 rounded-lg border border-stone-200">
              <div
                className="relative w-10 h-10 rounded overflow-hidden bg-stone-100 border border-stone-200 shrink-0"
                style={{ position: "relative" }}
              >
                <Image
                  src={value}
                  alt="URL Preview"
                  fill
                  className="object-cover"
                  unoptimized={isDataUrl}
                  sizes="40px"
                />
              </div>
              <span className="text-[11px] text-stone-500 truncate flex-1 font-mono">
                {value}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-1.5 text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p className="text-[11px] text-stone-400 leading-relaxed">
          {helperText}
        </p>
      )}
    </div>
  );
}
