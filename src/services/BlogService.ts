import blogData from '@/knowledge-base/blog.json';
import { BlogPost } from '@/types';

export class BlogService {
  public static getAllPosts(): BlogPost[] {
    return (blogData as unknown) as BlogPost[];
  }

  public static getPostBySlug(slug: string): BlogPost | undefined {
    return ((blogData as unknown) as BlogPost[]).find((p) => p.slug === slug);
  }
}
