
import { AuthCredentials, FileUpload } from '@/types/mdx-upload';

export class GitHubService {
  constructor(private credentials: AuthCredentials) {}

  async uploadFile(
    file: FileUpload, 
    targetPath: string, 
    commitMessage: string,
    onProgress: (progress: number) => void
  ): Promise<{ url: string }> {
    const reader = new FileReader();
    
    // Start with initial progress
    onProgress(0);
    
    // Ensure minimum animation duration of 2 seconds
    const startTime = Date.now();
    const minDuration = 2000; // 2 seconds minimum animation
    
    // Simulate progress in smaller increments
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / minDuration) * 90, 90); // Max 90% until actual completion
      onProgress(progress);
    }, 100); // Update every 100ms for smooth animation

    try {
      const base64Content = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const base64 = reader.result?.toString().split(',')[1];
          if (base64) resolve(base64);
          else reject('Failed to read file');
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file.file);
      });

      const filePath = `${targetPath === '' ? '.' : targetPath}/${file.file.name}`;
      let sha: string | undefined;
      
      try {
        const existingFile = await fetch(
          `https://api.github.com/repos/${this.credentials.REPO_OWNER}/${this.credentials.REPO_NAME}/contents/${filePath}`,
          {
            headers: {
              Authorization: `token ${this.credentials.GITHUB_TOKEN}`,
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );
        if (existingFile.ok) {
          const data = await existingFile.json();
          sha = data.sha;
        }
      } catch (error) {
        console.error('Error checking existing file:', error);
      }

      const response = await fetch(
        `https://api.github.com/repos/${this.credentials.REPO_OWNER}/${this.credentials.REPO_NAME}/contents/${filePath}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `token ${this.credentials.GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
          },
          body: JSON.stringify({
            message: commitMessage,
            content: base64Content,
            ...(sha && { sha }),
          }),
        }
      );

      // Ensure minimum duration has passed
      const elapsed = Date.now() - startTime;
      if (elapsed < minDuration) {
        await new Promise(resolve => setTimeout(resolve, minDuration - elapsed));
      }

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Set final progress to 100%
      onProgress(100);
      
      return { url: data.content.html_url };
    } catch (error) {
      clearInterval(progressInterval);
      throw error;
    }
  }
}
