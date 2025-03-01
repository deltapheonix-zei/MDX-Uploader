import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { Brush, Code, Gem, Zap } from 'lucide-react';

const featureItems = [
  {
    icon: <Code className="h-6 w-6 text-green-400" />,
    title: 'Secure Authentication',
    description: 'Robust session-based authentication keeps your files safe, ensuring only authorized uploads.',
    bgColor: 'bg-sapphire/10',
  },
  {
    icon: <Zap className="h-6 w-6 text-blue-400" />,
    title: 'Real-time Updates',
    description: 'Track upload progress with instant feedback, keeping you informed at every stage.',
    bgColor: 'bg-sky/10',
  },
  {
    icon: <Brush className="h-6 w-6 text-purple-400" />,
    title: 'Intuitive Interface',
    description: 'Designed for simplicity, the UI ensures seamless navigation and effortless file uploads.',
    bgColor: 'bg-lavender/10',
  },
  {
    icon: <Gem className="h-6 w-6 text-rose-400" />,
    title: 'GitHub Integration',
    description: 'Connect seamlessly with your repositories for efficient and automated file management.',
    bgColor: 'bg-blue/10',
  },
];

const Index = () => {
  return (
    <Layout>
      <Hero />
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium px-3 py-1 mb-6 rounded-full bg-[#8caaee]/10 text-mauve border border-[#8caaee]/30"
            >
              Features
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-2 font-display text-4xl font-bold"
            >
              Crafted with <span className="text-primary">Excellence</span>
            </motion.h2>
          </div>

          {/* Staggered Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featureItems.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="p-6 rounded-xl bg-card backdrop-blur-sm border border-border hover:border-primary/20 transition-all duration-300"
              >
                <div className={`h-12 w-12 rounded-lg ${item.bgColor} flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
