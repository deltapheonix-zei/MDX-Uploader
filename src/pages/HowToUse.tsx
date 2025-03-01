import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { FileJson, Upload, Github, Code } from "lucide-react";

const HowToUse = () => {
  return (
    <Layout>
      <section className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full bg-[#8caaee]/10 text-mauve border border-[#8caaee]/30">
              Documentation
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              How to Use MDX Uploader
            </h1>
            <p className="text-lg text-muted-foreground">
              Follow these simple steps to upload your MDX files to GitHub
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 rounded-xl bg-card backdrop-blur-sm border border-border hover:border-mauve/20 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-lg bg-mauve/10 flex items-center justify-center mb-4">
                <FileJson className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Authenticate</h3>
              <p className="text-muted-foreground">
                Upload your GitHub authentication JSON file containing your
                token and repository details.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-xl bg-card backdrop-blur-sm border border-border hover:border-mauve/20 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-lg bg-mauve/10 flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Select Files</h3>
              <p className="text-muted-foreground">
                Choose your MDX files (up to 5 at once) by dragging and dropping
                or using the file picker.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 rounded-xl bg-card backdrop-blur-sm border border-border hover:border-mauve/20 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-lg bg-mauve/10 flex items-center justify-center mb-4">
                <Github className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Upload</h3>
              <p className="text-muted-foreground">
                Add a commit message, specify the target directory, and click
                upload to publish your files.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 space-y-6"
          >
            <div className="p-6 rounded-xl bg-card border">
              <div className="flex items-center mb-4">
                <Code className="h-5 w-5 mr-2 text-green-400" />
                <h3 className="text-xl font-semibold">
                  Authentication JSON Format
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Your authentication JSON file should follow this format:
              </p>
              <pre className="bg-accent-foreground p-4 rounded-lg overflow-x-auto">
                {`
                {
                  "GITHUB_TOKEN": "your-github-personal-access-token",
                  "REPO_OWNER": "your-github-username",
                  "REPO_NAME": "your-repository-name"
                }
                `}
              </pre>
              <ul className="mt-4 list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  GITHUB_TOKEN: Your personal access token with repo access
                </li>
                <li>REPO_OWNER: Your GitHub username or organization name</li>
                <li>REPO_NAME: The repository where files will be uploaded</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-card border">
              <h3 className="text-xl font-semibold mb-4">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Maximum file size is 5MB per file</li>
                <li>Only .mdx files are supported</li>
                <li>Your GitHub token needs repository write access</li>
                <li>Files with the same name will be overwritten</li>
                <li>Target directory will be created if it doesn't exist</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default HowToUse;
