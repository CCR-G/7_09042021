import { CommentType } from "@/types";
import { getHttpHeaders } from "./http-header-getter";

export async function postNewComment(comment: CommentType): Promise<Comment> {
  // Correct return type ?
  const request = await fetch(
    `http://localhost:3000/posts/${comment.post}/comments`,
    {
      method: "POST",
      body: JSON.stringify({
        content: comment.content,
        user_id: comment.author,
      }),
      headers: getHttpHeaders(),
    }
  );

  const response = await request.json();

  if (!request.ok) {
    throw new Error(`Error ${request.status} : ${response.error}`);
  }

  return response;
}

export interface Comment {
  id: number;
  content: string;
  author_id: number;
  post_id: number;
}

export async function getAllComments(post_id: number): Promise<CommentType[]> {
  const request = await fetch(
    `http://localhost:3000/posts/${post_id}/comments`,
    {
      headers: getHttpHeaders(),
    }
  );

  const response = await request.json();

  if (!request.ok) {
    throw new Error(`Error ${request.status} : ${response.error}`);
  }

  const comments_list: CommentType[] = [];

  response.forEach((comment: CommentType) => {
    comments_list.push(comment);
  });

  return comments_list;
}

export async function deleteComment(comment_id: number): Promise<any> {
  const request = await fetch(
    `http://localhost:3000/comments/${comment_id}/delete`,
    {
      method: "POST",
      headers: getHttpHeaders(),
    }
  );

  const response = await request.json();

  if (!request.ok) {
    throw new Error(`Error ${request.status} : ${response.error}`);
  }

  return response;
}
