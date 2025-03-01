
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { AuthCredentials } from '@/types/mdx-upload';

interface AuthFormProps {
  onAuthenticate: (credentials: AuthCredentials) => void;
}

export const AuthForm = ({ onAuthenticate }: AuthFormProps) => {
  const { toast } = useToast();

  const handleJsonUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        
        if (!json.GITHUB_TOKEN || !json.REPO_OWNER || !json.REPO_NAME) {
          throw new Error('Missing required fields: GITHUB_TOKEN, REPO_OWNER, or REPO_NAME');
        }

        onAuthenticate({
          GITHUB_TOKEN: json.GITHUB_TOKEN,
          REPO_OWNER: json.REPO_OWNER,
          REPO_NAME: json.REPO_NAME
        });
        
        toast({
          title: "Authentication Successful",
          description: "You can now upload MDX files",
        });

        event.target.value = '';
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Invalid JSON format",
        });
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <span className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full  bg-[#8caaee]/10 text-mauve border border-[#8caaee]/30">
        Authentication
      </span>
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
        Upload Authentication File
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Please upload your JSON authentication file to continue
      </p>
      <div className="border-2 border-dashed border-primary rounded-lg p-12 transition-colors hover:bg-card cursor-pointer">
        <input
          type="file"
          accept=".json"
          className="hidden"
          id="json-upload"
          onChange={handleJsonUpload}
        />
        <label
          htmlFor="json-upload"
          className="flex flex-col items-center gap-4 cursor-pointer"
        >
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <span className="text-sm font-medium">
            Click to upload or drag and drop
          </span>
          <span className="text-xs text-muted-foreground">
            JSON file only
          </span>
        </label>
      </div>
    </>
  );
};
