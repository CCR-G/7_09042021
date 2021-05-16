import { CommentType } from "@/types";
  
export async function postNewComment(comment: CommentType): Promise<CommentType> {
  const request = await fetch(`http://localhost:3000/posts/${comment.post}/comments`, {
      method: "POST",
      body: JSON.stringify({ content: comment.content, author: comment.author, post: comment.post }),
      headers: { "Content-type": "application/json" }
  });

  if (!request.ok) {
      throw new Error(`Error ${request.status} : There has been a problem with your new post request.`);
  }

  return comment;
}

export async function getRestOfComments(post_id: string): Promise<CommentType[]> {
  const api_response = await fetch(`http://localhost:3000/posts/${post_id}/comments`);

  if (!api_response.ok) {
    throw new Error(`Error ${api_response.status} : Comments could not be retrieved.`);
  }

  const comments_list: CommentType[] = [];

  const json_comments_list = await api_response.json();
  json_comments_list.forEach((comment: { content: any; author: any; }) => {
    comments_list.push({ content: comment.content, author: comment.author });
  });

  return comments_list;
}
