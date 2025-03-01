
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-lavender/5 to-primary/5" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full  bg-[#8caaee]/10 text-mauve border border-[#8caaee]/30">
            Secure MDX Publishing
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight text-foreground">
            Upload MDX Files to{' '}
            <span className="text-primary">GitHub</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Securely upload your MDX files to GitHub repositories with session-based authentication and real-time status updates.
          </p>
          <Button
            onClick={() => navigate('/mdx-upload')}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-muted-foreground font-semibold px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Uploading
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
