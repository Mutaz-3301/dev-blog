import { getBlogPosts } from "@/lib/blog-posts"
import BlogPostCard from "@/components/blog-post-card"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Hash, ArrowLeft } from "lucide-react"

interface TagPageProps {
  params: {
    tag: string
  }
}

export default function TagPage({ params }: TagPageProps) {
  const tagName = decodeURIComponent(params.tag).replace(/-/g, " ")
  const allPosts = getBlogPosts()

  // البحث عن المنشورات التي تحتوي على هذه العلامة
  const tagPosts = allPosts.filter((post) => post.tags.some((tag) => tag.toLowerCase() === tagName.toLowerCase()))

  if (tagPosts.length === 0) {
    notFound()
  }

  // الحصول على اسم العلامة الصحيح
  const correctTagName = tagPosts[0].tags.find((tag) => tag.toLowerCase() === tagName.toLowerCase()) || tagName

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      {/* رأس الصفحة */}
      <div className="mb-8 space-y-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all posts
        </Link>

        <div className="flex items-center gap-3">
          <Hash className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">#{correctTagName}</h1>
            <p className="text-xl text-muted-foreground mt-2">
              {tagPosts.length} {tagPosts.length === 1 ? "post" : "posts"} tagged with "{correctTagName}"
            </p>
          </div>
        </div>
      </div>

      {/* قائمة المنشورات */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tagPosts.map((post, index) => (
          <BlogPostCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {/* اقتراحات علامات أخرى */}
      <div className="mt-12 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-4">Related Tags</h2>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(allPosts.flatMap((post) => post.tags)))
            .filter((tag) => tag.toLowerCase() !== tagName.toLowerCase())
            .slice(0, 20) // عرض أول 20 علامة
            .map((tag) => (
              <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, "-"))}`}>
                <Badge
                  variant="outline"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  #{tag}
                </Badge>
              </Link>
            ))}
        </div>
      </div>
    </main>
  )
}
