
export interface AuthCredentials {
  GITHUB_TOKEN: string;
  REPO_OWNER: string;
  REPO_NAME: string;
}

export interface FileUpload {
  file: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  url?: string;
  progress?: number;
  preview?: string;
}
