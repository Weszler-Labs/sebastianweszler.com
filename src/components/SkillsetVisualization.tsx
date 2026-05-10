"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillData: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Redux / Zustand", level: 80 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js / Express", level: 88 },
      { name: "Python / FastAPI / Django", level: 82 },
      { name: "PostgreSQL / MongoDB", level: 78 },
      { name: "REST & GraphQL", level: 85 },
    ],
  },
  {
    title: "DevOps",
    skills: [
      { name: "Docker / Kubernetes", level: 75 },
      { name: "GitHub Actions", level: 80 },
      { name: "AWS / Vercel", level: 72 },
      { name: "Linux / Shell", level: 85 },
    ],
  },
];

function SkillBar({ name, level, index }: Skill & { index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
          {name}
        </span>
        <motion.span
          className="text-xs font-mono text-zinc-400 dark:text-zinc-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
        >
          {isInView || isHovered ? `${level}%` : ""}
        </motion.span>
      </div>
      <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-zinc-700 to-zinc-500 dark:from-zinc-400 dark:to-zinc-500"
          initial={{ width: 0 }}
          animate={{
            width: isInView ? `${level}%` : 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1 * index,
            ease: "easeOut",
          }}
          style={{
            width: isHovered && !isInView ? `${level}%` : undefined,
          }}
          role="progressbar"
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name}: ${level}%`}
        />
      </div>
    </div>
  );
}

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      className="bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
    >
      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-50" />
        {category.title}
      </h3>
      <div className="space-y-3">
        {category.skills.map((skill, i) => (
          <SkillBar key={skill.name} {...skill} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsetVisualization() {
  return (
    <section aria-label="Technical Skills">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {skillData.map((category, i) => (
          <SkillCard key={category.title} category={category} index={i} />
        ))}
      </div>
    </section>
  );
}
