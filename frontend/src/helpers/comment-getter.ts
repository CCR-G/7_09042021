import { CommentType } from "@/types";
import { getHttpHeaders } from './http-header-getter';
  
export async function postNewComment(comment: CommentType): Promise<CommentType> {
  const request = await fetch(`http://localhost:3000/posts/${comment.post}/comments`, {
      method: "POST",
      body: JSON.stringify({ content: comment.content, user_id: comment.author, post_id: comment.post }),
      headers: getHttpHeaders()
  });

  const response = await request.json();

  if (!request.ok) {
    throw new Error(`Error ${request.status} : ${response.error}`);
  }

  return response;
}

export async function getAllComments(post_id: number): Promise<CommentType[]> {
  const request = await fetch(`http://localhost:3000/posts/${post_id}/comments`, {
    headers: getHttpHeaders()
  });

  const response = await request.json();

  if (!request.ok) {
    throw new Error(`Error ${request.status} : ${response.error}`);
  }

  const comments_list: CommentType[] = [];

  response.forEach((comment: { content: any; author: any; }) => {
    comments_list.push({ content: comment.content, author: comment.author });
  });

  return comments_list;
}
