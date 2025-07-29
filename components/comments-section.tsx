"use client"

import { useState } from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { MessageCircle, Reply, Heart } from "lucide-react"
import { addPostComment, addCommentReply } from "@/app/actions/interactions"
import { authClient } from "@/components/auth-provider"
import { useEffect } from "react"
import type { Comment } from "@/lib/blog-posts"

interface CommentsSectionProps {
  postSlug: string
  comments: Comment[]
}

export function CommentsSection({ postSlug, comments }: CommentsSectionProps) {
  const [user, setUser] = useState<any>(null)
  const [showCommentForm, setShowCommentForm] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        const session = await authClient.getSession()
        setUser(session.data?.user)
      } catch (error) {
        console.error("Error getting user:", error)
      }
    }

    getUser()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <MessageCircle className="h-6 w-6" />
          Comments ({comments.length})
        </h3>
        {user && (
          <Button
            onClick={() => setShowCommentForm(!showCommentForm)}
            variant={showCommentForm ? "outline" : "default"}
          >
            {showCommentForm ? "Cancel" : "Add Comment"}
          </Button>
        )}
      </div>

     
      {showCommentForm && user && (
        <CommentForm postSlug={postSlug} user={user} onSuccess={() => setShowCommentForm(false)} />
      )}

     
      {!user && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Please{" "}
              <a href="/signin" className="text-primary hover:underline">
                sign in
              </a>{" "}
              to leave a comment.
            </p>
          </CardContent>
        </Card>
      )}

     
      <div className="space-y-4">
        {comments.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => <CommentItem key={comment.id} comment={comment} postSlug={postSlug} user={user} />)
        )}
      </div>
    </div>
  )
}

function CommentForm({
  postSlug,
  user,
  onSuccess,
}: {
  postSlug: string
  user: any
  onSuccess?: () => void
}) {
  const [state, formAction, isPending] = useActionState(addPostComment, {
    success: false,
    message: "",
  })

  useEffect(() => {
    if (state.success) {
      onSuccess?.()
    }
  }, [state.success, onSuccess])

  return (
    <Card>
      <CardHeader>
        <h4 className="font-semibold">Add a Comment</h4>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="postSlug" value={postSlug} />
          <input type="hidden" name="authorName" value={user.name || user.email} />
          <input type="hidden" name="authorEmail" value={user.email} />

          <Textarea name="content" placeholder="Share your thoughts..." rows={4} required minLength={10} />

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Commenting as {user.name || user.email}</p>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Posting..." : "Post Comment"}
            </Button>
          </div>

          {state.message && (
            <p className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>{state.message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

function CommentItem({
  comment,
  postSlug,
  user,
}: {
  comment: Comment
  postSlug: string
  user: any
}) {
  const [showReplyForm, setShowReplyForm] = useState(false)

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* معلومات المعلق */}
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarFallback>{comment.authorName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h5 className="font-semibold">{comment.authorName}</h5>
                <span className="text-sm text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm leading-relaxed">{comment.content}</p>

      
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="gap-1 h-8">
                  <Heart className="h-3 w-3" />
                  {comment.likes}
                </Button>
                {user && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 h-8"
                    onClick={() => setShowReplyForm(!showReplyForm)}
                  >
                    <Reply className="h-3 w-3" />
                    Reply
                  </Button>
                )}
              </div>
            </div>
          </div>

          
          {showReplyForm && user && (
            <div className="ml-12">
              <ReplyForm
                commentId={comment.id}
                postSlug={postSlug}
                user={user}
                onSuccess={() => setShowReplyForm(false)}
              />
            </div>
          )}

          
          {comment.replies.length > 0 && (
            <div className="ml-12 space-y-3">
              <Separator />
              {comment.replies.map((reply) => (
                <div key={reply.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{reply.authorName.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h6 className="font-medium text-sm">{reply.authorName}</h6>
                      <span className="text-xs text-muted-foreground">
                        {new Date(reply.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{reply.content}</p>
                    <Button variant="ghost" size="sm" className="gap-1 h-6 text-xs">
                      <Heart className="h-2 w-2" />
                      {reply.likes}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function ReplyForm({
  commentId,
  postSlug,
  user,
  onSuccess,
}: {
  commentId: string
  postSlug: string
  user: any
  onSuccess?: () => void
}) {
  const [state, formAction, isPending] = useActionState(addCommentReply, {
    success: false,
    message: "",
  })

  useEffect(() => {
    if (state.success) {
      onSuccess?.()
    }
  }, [state.success, onSuccess])

  return (
    <Card>
      <CardContent className="pt-4">
        <form action={formAction} className="space-y-3">
          <input type="hidden" name="commentId" value={commentId} />
          <input type="hidden" name="postSlug" value={postSlug} />
          <input type="hidden" name="authorName" value={user.name || user.email} />
          <input type="hidden" name="authorEmail" value={user.email} />

          <Textarea name="content" placeholder="Write a reply..." rows={3} required minLength={5} />

          <div className="flex justify-end">
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending ? "Replying..." : "Reply"}
            </Button>
          </div>

          {state.message && (
            <p className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>{state.message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
