import { useRef, useState } from 'react';
import { FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from '@/types/mdx-upload';

// Helper function to generate a simple unique id.
const generateId = (file: File) => `${file.name}-${file.size}-${Date.now()}`;

interface FileUploadZoneProps {
  onFilesSelected: (files: FileUpload[]) => void;
  targetPath: string;
}

export const FileUploadZone = ({ onFilesSelected, targetPath }: FileUploadZoneProps) => {
  const { toast } = useToast();
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => 
      file.name.endsWith('.mdx')
    );

    if (droppedFiles.length > 5) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Maximum 5 files can be uploaded at once",
      });
      return;
    }

    handleFiles(droppedFiles);
  };

  const handleFiles = (selectedFiles: File[]) => {
    const invalidFiles = selectedFiles.filter(file => file.size > MAX_FILE_SIZE);
    if (invalidFiles.length > 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Some files exceed the 5MB limit: ${invalidFiles.map(f => f.name).join(', ')}`,
      });
      return;
    }

    const newFiles: FileUpload[] = selectedFiles.map(file => ({
      id: generateId(file), // Assign a unique id
      file,
      status: 'pending',
      preview: URL.createObjectURL(file),
      progress: 0,
    }));

    onFilesSelected(newFiles);
  };

  const handleMdxUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    handleFiles(selectedFiles);
    event.target.value = '';
  };

  return (
    <div
      ref={dropZoneRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`min-h-[200px] flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-all duration-300 ${
        isDragging
          ? 'border-primary bg-primary'
          : 'border-primary hover:bg-card'
      } cursor-pointer bg-card/30`}
    >
      <input
        type="file"
        accept=".mdx"
        className="hidden"
        id="mdx-upload"
        onChange={handleMdxUpload}
        multiple
      />
      <label
        htmlFor="mdx-upload"
        className="flex flex-col items-center gap-4 cursor-pointer p-6"
      >
        <div className="h-12 w-12 rounded-lg flex items-center justify-center text-primary">
          <FileText className="h-8 w-8" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-lg font-medium">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-muted-foreground">
            MDX files only (max 5MB each)
          </p>
        </div>
      </label>
    </div>
  );
};
