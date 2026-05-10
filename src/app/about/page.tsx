import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex-shrink-0">
          <Image
            src="/cartoon2.png"
            alt="Sebastian Weszler"
            fill
            className="object-contain rounded-2xl"
            priority
          />
        </div>
        
        <div className="flex flex-col gap-4 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            About Me
          </h1>
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Born and raised in Poland, I studied Electronic Engineering, which laid the foundation for my technical journey.
          </p>
        </div>
      </div>
      
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          After graduation, I worked as a Technician before venturing into entrepreneurship, 
          where I founded and operated a successful online bicycle store.
        </p>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          My passion for building and innovating eventually led me back to my technical roots. 
          Today, I am a full-time Software Engineer, leveraging my diverse background to build 
          robust, user-centric applications.
        </p>
      </div>
      
      <div className="flex justify-center sm:justify-start">
        <Link 
          href="/"
          className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to home
        </Link>
      </div>
    </div>
  );
}
