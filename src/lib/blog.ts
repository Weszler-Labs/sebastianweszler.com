import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
}

function extractMetadata(filePath: string): { title: string; date: string; description: string } | null {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const match = content.match(/export\s+const\s+metadata\s*=\s*\{([\s\S]+?)\n\};/);
    if (!match) return null;

    const block = match[1];
    const title = block.match(/title:\s*"([^"]+)"/)?.[1] ?? "";
    const date = block.match(/date:\s*"([^"]+)"/)?.[1] ?? "";
    const description = block.match(/description:\s*"([^"]+)"/)?.[1] ?? "";

    return { title, date, description };
  } catch {
    return null;
  }
}

export async function getPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const metadata = extractMetadata(path.join(BLOG_DIR, file));
      return {
        slug,
        title: metadata?.title ?? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
        date: metadata?.date ?? "2026-04-14",
        description: metadata?.description ?? "A blog post about " + slug,
      };
    });

  return posts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}
