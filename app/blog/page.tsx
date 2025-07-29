import { getBlogPosts } from "@/lib/blog-posts"
import BlogPostCard from "@/components/blog-post-card"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Hash, FolderOpen, Users } from "lucide-react"

export default function BlogPage() {
  const posts = getBlogPosts()

  
  const categories = Array.from(new Set(posts.map((post) => post.category)))
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)))
  const authors = Array.from(new Set(posts.map((post) => post.author)))

 
  const popularPosts = [...posts].sort((a, b) => b.likes + b.views / 100 - (a.likes + a.views / 100)).slice(0, 3)

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <div className="space-y-8">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Our Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover insights, tutorials, and stories from our community of developers and designers.
          </p>
        </div>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{posts.length}</div>
              <p className="text-sm text-muted-foreground">Total Posts</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{categories.length}</div>
              <p className="text-sm text-muted-foreground">Categories</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{authors.length}</div>
              <p className="text-sm text-muted-foreground">Authors</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{tags.length}</div>
              <p className="text-sm text-muted-foreground">Tags</p>
            </CardContent>
          </Card>
        </div>

        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FolderOpen className="h-6 w-6" />
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const categoryCount = posts.filter((post) => post.category === category).length
              return (
                <Link key={category} href={`/blog/category/${encodeURIComponent(category.toLowerCase())}`}>
                  <Badge
                    variant="secondary"
                    className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer text-sm py-2 px-3"
                  >
                    {category} ({categoryCount})
                  </Badge>
                </Link>
              )
            })}
          </div>
        </div>

        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6" />
            Our Authors
          </h2>
          <div className="flex flex-wrap gap-2">
            {authors.map((author) => {
              const authorCount = posts.filter((post) => post.author === author).length
              return (
                <Link
                  key={author}
                  href={`/blog/author/${encodeURIComponent(author.toLowerCase().replace(/\s+/g, "-"))}`}
                >
                  <Badge
                    variant="outline"
                    className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer text-sm py-2 px-3"
                  >
                    {author} ({authorCount})
                  </Badge>
                </Link>
              )
            })}
          </div>
        </div>

       
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Hash className="h-6 w-6" />
            Popular Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 20).map((tag) => (
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

       
        {popularPosts.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              Trending Posts
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {popularPosts.map((post, index) => (
                <BlogPostCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          </div>
        )}

      
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">All Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post, index) => (
              <BlogPostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
