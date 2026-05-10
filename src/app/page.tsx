import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-start mb-8">
        <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
          <Image
            src="/replay.svg"
            alt="replay"
            width={20}
            height={20}
            className="dark:invert"
          />
        </button>
      </div>

      <div className="flex flex-col items-center gap-6 text-center">
        <div className="mb-4">
          <Image
            src="/logo_02.png"
            alt="Logo"
            width={150}
            height={300}
            className="object-contain dark:invert"
            priority
          />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-serif">
            Sebastian Weszler
          </h1>
          <p className="text-xl font-medium text-zinc-600 dark:text-zinc-400">
            Software Engineer | Technology Enthusiast | Problem-Solver
          </p>
        </div>
        
        <p className="max-w-md text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
          I&apos;m passionate about using technology to solve problems and improve people&apos;s lives. 
          I&apos;m always looking for new ways to innovate and create. 
          If you have an idea, let&apos;s talk!
        </p>
        
        <Link 
          href="/about"
          className="mt-4 text-zinc-900 dark:text-zinc-50 font-semibold border-b-2 border-zinc-900 dark:border-zinc-50 hover:pb-1 transition-all"
        >
          More about me...
        </Link>
      </div>
    </div>
  );
}
