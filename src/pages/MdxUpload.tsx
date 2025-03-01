import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { FileText, Folder } from "lucide-react";
import { AuthForm } from '@/components/mdx-upload/AuthForm';
import { FileUploadZone } from '@/components/mdx-upload/FileUploadZone';
import { FileList } from '@/components/mdx-upload/FileList';
import { GitHubService } from '@/services/github';
import { AuthCredentials, FileUpload } from '@/types/mdx-upload';

const MdxUpload = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState<AuthCredentials | null>(null);
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [commitMessage, setCommitMessage] = useState('');
  const [targetPath, setTargetPath] = useState('');
  const { toast } = useToast();

  const handleAuthentication = (creds: AuthCredentials) => {
    setCredentials(creds);
    setIsAuthenticated(true);
  };

  const handleTargetPathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let path = e.target.value;
    if (!path) {
      path = '.';
    } else {
      path = path.replace(/^\/+|\/+$/g, '');
      path = path.replace(/\/+/g, '/');
    }
    setTargetPath(path);
  };

  const handleCommitMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommitMessage(e.target.value);
  };

  // Files now include a unique "id" for reliable state updates.
  const handleFilesSelected = (newFiles: FileUpload[]) => {
    setFiles(prev => [...prev, ...newFiles].slice(0, 5));
  };

  const removeFile = (fileToRemove: FileUpload) => {
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    setFiles(prev => prev.filter(f => f.id !== fileToRemove.id));
  };

  // Upload a single file—using its id for state updates—and sync toast notifications with file status.
  const uploadToGitHub = async (fileUpload: FileUpload) => {
    if (!credentials) return;
    
    // Mark file as uploading
    setFiles(prev =>
      prev.map(f =>
        f.id === fileUpload.id ? { ...f, status: 'uploading', progress: 0 } : f
      )
    );
    toast({
      title: "Uploading",
      description: `Uploading ${fileUpload.file.name}...`,
    });

    try {
      const githubService = new GitHubService(credentials);
      const { url } = await githubService.uploadFile(
        fileUpload,
        targetPath,
        commitMessage,
        (progress: number) => {
          setFiles(prev =>
            prev.map(f =>
              f.id === fileUpload.id ? { ...f, progress } : f
            )
          );
        }
      );
      
      // On success, update file status to success and show success toast
      setFiles(prev => 
        prev.map(f => 
          f.id === fileUpload.id ? { ...f, status: 'success', url, progress: 100 } : f
        )
      );
      toast({
        title: "Success",
        description: `${fileUpload.file.name} uploaded successfully`,
      });
    } catch (error: any) {
      // On error, update file status to error and show error toast
      setFiles(prev => 
        prev.map(f => 
          f.id === fileUpload.id 
            ? { ...f, status: 'error', error: error instanceof Error ? error.message : 'Upload failed', progress: 0 }
            : f
        )
      );
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to upload ${fileUpload.file.name}`,
      });
    }
  };

  // Trigger upload for all pending files
  const uploadAllFiles = () => {
    files.forEach(file => {
      if (file.status === 'pending') {
        uploadToGitHub(file);
      }
    });
  };

  return (
    <Layout>
      <section className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto space-y-6"
          >
            {!isAuthenticated ? (
              <AuthForm onAuthenticate={handleAuthentication} />
            ) : (
              <div className="space-y-6">
                <h1 className="text-4xl font-display py-8 text-center">
                  Upload MDX Files
                </h1>
                
                <div className="space-y-6">
                  <div className="relative">
                    <Input
                      placeholder="Enter a descriptive commit message"
                      value={commitMessage}
                      onChange={handleCommitMessageChange}
                      className="text-left pl-10 h-12 bg-card/80 border-none"
                    />
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <Input
                        placeholder="Enter target directory (default: root)"
                        value={targetPath}
                        onChange={handleTargetPathChange}
                        className="text-left pl-10 h-12 bg-card/80 border-none"
                      />
                      <Folder className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>

                  <FileUploadZone
                    onFilesSelected={handleFilesSelected}
                    targetPath={targetPath}
                  />

                  {files.length > 0 && (
                    <FileList
                      files={files}
                      targetPath={targetPath}
                      onRemoveFile={removeFile}
                      onUploadAll={uploadAllFiles}
                      commitMessage={commitMessage}
                    />
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default MdxUpload;
