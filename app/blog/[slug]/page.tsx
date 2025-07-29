import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog-posts"
import Image from "next/image"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { PostInteractions } from "@/components/post-interactions"
import { CommentsSection } from "@/components/comments-section"
import { Separator } from "@/components/ui/separator"
import { incrementViews } from "@/app/actions/interactions"
import { User, Calendar, FolderOpen } from "lucide-react"


export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

 
  await incrementViews(params.slug)

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <article className="prose prose-gray mx-auto dark:prose-invert max-w-4xl">
        <div className="space-y-6 not-prose mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-lg">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <span className="text-gray-400">•</span>
            <Link
              href={`/blog/author/${encodeURIComponent(post.author.toLowerCase().replace(/\s+/g, "-"))}`}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <User className="h-4 w-4" />
              <span>By {post.author}</span>
            </Link>
            <span className="text-gray-400">•</span>
            <Link href={`/blog/category/${encodeURIComponent(post.category.toLowerCase())}`}>
              <Badge
                variant="secondary"
                className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer flex items-center gap-1"
              >
                <FolderOpen className="h-3 w-3" />
                {post.category}
              </Badge>
            </Link>
          </div>
        </div>

        {post.image && (
          <figure className="mb-8">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.imageAlt || post.title}
              width={1200}
              height={600}
              className="aspect-video object-cover rounded-lg"
              priority
            />
            {post.imageAlt && (
              <figcaption className="text-center text-sm text-muted-foreground mt-2">{post.imageAlt}</figcaption>
            )}
          </figure>
        )}

        <div dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="mt-12 not-prose">
          <Separator className="mb-8" />

         
          <PostInteractions
            postSlug={post.slug}
            likes={post.likes}
            dislikes={post.dislikes}
            views={post.views}
            commentsCount={post.comments.length}
            tags={post.tags}
          />

          <Separator className="my-8" />

          
          <div id="comments">
            <CommentsSection postSlug={post.slug} comments={post.comments} />
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link href="/blog" className="text-primary hover:underline">
              ← Back to all posts
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
