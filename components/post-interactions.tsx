"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Bookmark, Share2, Eye, MessageCircle, ThumbsUp, ThumbsDown, Hash } from "lucide-react"
import { authClient } from "@/components/auth-provider"
import { handlePostInteraction, getInteractionStatus } from "@/app/actions/interactions"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

interface PostInteractionsProps {
  postSlug: string
  likes: number
  dislikes: number
  views: number
  commentsCount: number
  tags: string[]
}

export function PostInteractions({ postSlug, likes, dislikes, views, commentsCount, tags }: PostInteractionsProps) {
  const [user, setUser] = useState<any>(null)
  const [interactions, setInteractions] = useState({
    liked: false,
    disliked: false,
    saved: false,
  })
  const [counts, setCounts] = useState({ likes, dislikes })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        const session = await authClient.getSession()
        const currentUser = session.data?.user
        setUser(currentUser)

        if (currentUser?.email) {
          const status = await getInteractionStatus(postSlug, currentUser.email)
          setInteractions(status)
        }
      } catch (error) {
        console.error("Error getting user:", error)
      }
    }

    getUser()
  }, [postSlug])

  const handleInteraction = async (type: "like" | "dislike" | "save") => {
    if (!user?.email) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to interact with posts.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const result = await handlePostInteraction(postSlug, type, user.email)

      if (result.success) {
        setInteractions((prev) => ({
          ...prev,
          [type === "like" ? "liked" : type === "dislike" ? "disliked" : "saved"]: result.isActive,
        }))
 
        if (type === "like") {
          setCounts((prev) => ({
            ...prev,
            likes: result.isActive ? prev.likes + 1 : prev.likes - 1,
          }))
          
          if (interactions.disliked && result.isActive) {
            setInteractions((prev) => ({ ...prev, disliked: false }))
            setCounts((prev) => ({ ...prev, dislikes: prev.dislikes - 1 }))
          }
        } else if (type === "dislike") {
          setCounts((prev) => ({
            ...prev,
            dislikes: result.isActive ? prev.dislikes + 1 : prev.dislikes - 1,
          }))
          
          if (interactions.liked && result.isActive) {
            setInteractions((prev) => ({ ...prev, liked: false }))
            setCounts((prev) => ({ ...prev, likes: prev.likes - 1 }))
          }
        }

        toast({
          title: "Success",
          description: `Post ${result.isActive ? "added to" : "removed from"} your ${type === "save" ? "saved posts" : type + "d posts"}.`,
        })
      }
    } catch (error) {
      console.error("Error handling interaction:", error)
      toast({
        title: "Error",
        description: "Failed to update interaction. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/blog/${postSlug}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: url,
        })
      } catch (error) {
        
      }
    } else {
      
      try {
        await navigator.clipboard.writeText(url)
        toast({
          title: "Link Copied",
          description: "Post link has been copied to your clipboard.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to copy link to clipboard.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Button
            variant={interactions.liked ? "default" : "outline"}
            size="sm"
            onClick={() => handleInteraction("like")}
            disabled={loading}
            className="gap-2 hover:scale-105 transition-transform"
          >
            <ThumbsUp className="h-4 w-4" />
            {counts.likes}
          </Button>

          <Button
            variant={interactions.disliked ? "destructive" : "outline"}
            size="sm"
            onClick={() => handleInteraction("dislike")}
            disabled={loading}
            className="gap-2 hover:scale-105 transition-transform"
          >
            <ThumbsDown className="h-4 w-4" />
            {counts.dislikes}
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <Button
          variant={interactions.saved ? "default" : "outline"}
          size="sm"
          onClick={() => handleInteraction("save")}
          disabled={loading}
          className="gap-2 hover:scale-105 transition-transform"
        >
          <Bookmark className={`h-4 w-4 ${interactions.saved ? "fill-current" : ""}`} />
          {interactions.saved ? "Saved" : "Save"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="gap-2 bg-transparent hover:scale-105 transition-transform"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>

      
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          {views.toLocaleString()} views
        </div>
        <Link href="#comments" className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
          <MessageCircle className="h-4 w-4" />
          {commentsCount} comments
        </Link>
      </div>

      
      {tags.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Hash className="h-4 w-4" />
            Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, "-"))}`}>
                <Badge
                  variant="secondary"
                  className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer hover:scale-105 transform"
                >
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
