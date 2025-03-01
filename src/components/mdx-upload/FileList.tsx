import { X, AlertCircle, Check, ExternalLink, Loader2 } from "lucide-react";
import { FileUpload } from '@/types/mdx-upload';

interface FileListProps {
  files: FileUpload[];
  targetPath: string;
  onRemoveFile: (file: FileUpload) => void;
  onUploadAll: () => void;
  commitMessage: string;
}

export const FileList = ({ files, targetPath, onRemoveFile, onUploadAll, commitMessage }: FileListProps) => {
  return (
    <div className="space-y-4">
      {files.map((file, index) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border"
        >
          <div className="flex-1 min-w-0 space-y-1">
            <p className="text-sm font-medium truncate">{file.file.name}</p>
            <p className="text-sm text-muted-foreground">
              {(file.file.size / 1024).toFixed(1)} KB
            </p>
            {file.status === 'pending' && (
              <p className="text-xs text-muted-foreground">
                Will be uploaded to: <span className="font-mono">{targetPath || '.'}/{file.file.name}</span>
              </p>
            )}
            {file.status === 'error' && (
              <p className="text-sm text-destructive">
                {file.error || "Upload failed. Try again."}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {file.status === 'uploading' && (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            )}
            {file.status === 'success' && file.url && (
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-green-500 hover:underline"
              >
                <Check className="h-5 w-5" />
                <span className="text-sm">View Live</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {file.status === 'error' && (
              <AlertCircle className="h-5 w-5 text-destructive" />
            )}
            {file.status === 'pending' && (
              <button
                onClick={() => onRemoveFile(file)}
                className="p-1 hover:bg-muted rounded"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ))}

      {files.some(f => f.status === 'pending') && (
        <button
          onClick={onUploadAll}
          className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          disabled={!commitMessage.trim()}
        >
          {!commitMessage.trim() ? "Please enter a commit message" : "Upload Files"}
        </button>
      )}
    </div>
  );
};
