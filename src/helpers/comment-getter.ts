import { CommentType } from "@/types";
  
export async function postNewComment(comment: CommentType): Promise<CommentType> {
  const request = await fetch(`http://localhost:3000/posts/${comment.post}/comments`, {
      method: "POST",
      body: JSON.stringify({ content: comment.content, user: comment.user, post: comment.post }),
      headers: { "Content-type": "application/json" }
  });

  if (!request.ok) {
      throw new Error(`Error ${request.status} : There has been a problem with your new post request.`);
  }

  return comment;
}
