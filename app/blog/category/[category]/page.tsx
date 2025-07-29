import { getBlogPosts } from "@/lib/blog-posts"
import BlogPostCard from "@/components/blog-post-card"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { FolderOpen, ArrowLeft } from "lucide-react"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = decodeURIComponent(params.category).replace(/-/g, " ")
  const allPosts = getBlogPosts()

  
  const categoryPosts = allPosts.filter((post) => post.category.toLowerCase() === categoryName.toLowerCase())

  if (categoryPosts.length === 0) {
    notFound()
  }

  
  const correctCategoryName = categoryPosts[0].category

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      
      <div className="mb-8 space-y-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all posts
        </Link>

        <div className="flex items-center gap-3">
          <FolderOpen className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{correctCategoryName}</h1>
            <p className="text-xl text-muted-foreground mt-2">
              {categoryPosts.length} {categoryPosts.length === 1 ? "post" : "posts"} in this category
            </p>
          </div>
        </div>
      </div>

     
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categoryPosts.map((post, index) => (
          <BlogPostCard key={post.slug} post={post} index={index} />
        ))}
      </div>

    
      <div className="mt-12 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-4">Explore Other Categories</h2>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(allPosts.map((post) => post.category)))
            .filter((cat) => cat.toLowerCase() !== categoryName.toLowerCase())
            .map((category) => (
              <Link key={category} href={`/blog/category/${encodeURIComponent(category.toLowerCase())}`}>
                <Badge
                  variant="outline"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {category}
                </Badge>
              </Link>
            ))}
        </div>
      </div>
    </main>
  )
}
