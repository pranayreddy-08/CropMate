import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const UploadBox = ({ onFileSelect, accept = 'image/jpeg,image/png', maxSize = 5242880 }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    if (!file) return 'No file selected';
    
    const acceptedTypes = accept.split(',').map(t => t.trim());
    const fileType = file.type;
    
    if (!acceptedTypes.includes(fileType)) {
      return 'Please upload a JPG or PNG image';
    }
    
    if (file.size > maxSize) {
      return `File size must be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
    }
    
    return null;
  };

  const handleFile = (selectedFile) => {
    const validationError = validateFile(selectedFile);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setFile(selectedFile);
    onFileSelect(selectedFile);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setError('');
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="hidden"
        aria-label="File upload input"
      />

      {!preview ? (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-primary bg-primary/5 scale-[1.02]'
              : 'border-border hover:border-primary hover:bg-muted/50'
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground mb-1">
            Drop your soil image here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Accepts JPG, PNG (max {(maxSize / 1024 / 1024).toFixed(1)}MB)
          </p>
        </div>
      ) : (
        <div className="relative border-2 border-border rounded-xl overflow-hidden">
          <img
            src={preview}
            alt="Soil preview"
            className="w-full h-64 object-cover"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-2 hover:bg-destructive/90 transition-colors shadow-lg"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <span className="text-sm font-medium truncate">{file.name}</span>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-destructive font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default UploadBox;
