'use client';

import { motion } from 'framer-motion';

interface FloatingOrbProps {
  delay?: number;
  duration?: number;
  size?: number;
  color?: string;
  position?: { x: string; y: string };
}

function FloatingOrb({ 
  delay = 0, 
  duration = 20, 
  size = 300, 
  color = 'primary',
  position = { x: '50%', y: '50%' }
}: FloatingOrbProps) {
  const colorClasses: Record<string, string> = {
    primary: 'from-primary/20 to-primary/5',
    purple: 'from-purple-500/20 to-purple-500/5',
    blue: 'from-blue-500/20 to-blue-500/5',
    green: 'from-green-500/20 to-green-500/5',
    orange: 'from-orange-500/20 to-orange-500/5',
  };

  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-radial ${colorClasses[color] || colorClasses.primary} blur-3xl`}
      style={{
        width: size,
        height: size,
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.2, 1],
        x: [0, 30, -30, 0],
        y: [0, -20, 20, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

interface GridPatternProps {
  className?: string;
}

function GridPattern({ className }: GridPatternProps) {
  return (
    <svg
      className={`absolute inset-0 h-full w-full opacity-[0.02] dark:opacity-[0.03] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="grid"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 32V0h32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

const particleConfigs = [
  { x: 10, y: 20, size: 3, duration: 18, delay: 0 },
  { x: 25, y: 45, size: 2, duration: 22, delay: 1 },
  { x: 40, y: 15, size: 4, duration: 16, delay: 2 },
  { x: 55, y: 70, size: 2, duration: 20, delay: 3 },
  { x: 70, y: 35, size: 3, duration: 24, delay: 1.5 },
  { x: 85, y: 60, size: 2, duration: 19, delay: 2.5 },
  { x: 15, y: 80, size: 4, duration: 21, delay: 0.5 },
  { x: 30, y: 55, size: 3, duration: 17, delay: 3.5 },
  { x: 45, y: 25, size: 2, duration: 23, delay: 1 },
  { x: 60, y: 90, size: 3, duration: 18, delay: 2 },
  { x: 75, y: 10, size: 4, duration: 20, delay: 0 },
  { x: 90, y: 40, size: 2, duration: 22, delay: 1.5 },
  { x: 5, y: 65, size: 3, duration: 19, delay: 3 },
  { x: 20, y: 30, size: 2, duration: 21, delay: 0.5 },
  { x: 35, y: 85, size: 4, duration: 17, delay: 2.5 },
  { x: 50, y: 50, size: 3, duration: 23, delay: 1 },
  { x: 65, y: 75, size: 2, duration: 18, delay: 2 },
  { x: 80, y: 20, size: 3, duration: 20, delay: 3 },
  { x: 95, y: 55, size: 4, duration: 22, delay: 0.5 },
  { x: 12, y: 95, size: 2, duration: 16, delay: 1.5 },
];

interface ParticleProps {
  config: typeof particleConfigs[0];
}

function Particle({ config }: ParticleProps) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/30"
      style={{
        width: config.size,
        height: config.size,
        left: `${config.x}%`,
        top: `${config.y}%`,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        y: [0, -100],
        scale: [1, 0.5],
      }}
      transition={{
        duration: config.duration,
        delay: config.delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  );
}

interface BackgroundEffectsProps {
  variant?: 'default' | 'accent' | 'code' | 'dark';
}

export function BackgroundEffects({ variant = 'default' }: BackgroundEffectsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <GridPattern />
      
      {variant === 'accent' && (
        <>
          <FloatingOrb 
            color="primary" 
            size={400} 
            position={{ x: '20%', y: '30%' }} 
            duration={25}
          />
          <FloatingOrb 
            color="purple" 
            size={300} 
            position={{ x: '80%', y: '60%' }} 
            delay={2}
            duration={20}
          />
          <FloatingOrb 
            color="blue" 
            size={250} 
            position={{ x: '60%', y: '80%' }} 
            delay={4}
            duration={22}
          />
        </>
      )}

      {variant === 'code' && (
        <>
          <FloatingOrb 
            color="green" 
            size={350} 
            position={{ x: '15%', y: '40%' }} 
            duration={18}
          />
          <FloatingOrb 
            color="blue" 
            size={280} 
            position={{ x: '85%', y: '70%' }} 
            delay={3}
            duration={23}
          />
        </>
      )}

      {(variant === 'default' || variant === 'dark') && (
        <>
          <FloatingOrb 
            color="primary" 
            size={300} 
            position={{ x: '10%', y: '20%' }} 
            duration={30}
          />
          <FloatingOrb 
            color="purple" 
            size={200} 
            position={{ x: '90%', y: '80%' }} 
            delay={5}
            duration={25}
          />
        </>
      )}

      <div className="absolute inset-0">
        {particleConfigs.map((config, i) => (
          <Particle key={i} config={config} />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
    </div>
  );
}
