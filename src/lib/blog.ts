import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
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
      return {
        slug,
        title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
        date: "2026-04-14",
        description: "A blog post about " + slug,
      };
    });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}
