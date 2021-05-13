import { CommentType } from "@/types";
import { getUserName } from "./user-getter";

export async function getComments(post_id: string): Promise<CommentType[]> {
    const comments_request = await fetch(`http://localhost:3000/posts/${post_id}/comments`);
    if (!comments_request.ok) {
      throw new Error(`Error ${comments_request.status} : List of commments could not be retrieved.`);
    }

    const comments_list: CommentType[] = [];

    const json_comments_list = await comments_request.json();

    console.log(json_comments_list);
    json_comments_list.forEach(async (json_comment: CommentType) => {

      const username = await getUserName(json_comment.user);

      comments_list.push({
          user: username,
          content: json_comment.content,
          post: post_id
        });
    });

    return comments_list;
  }
  
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
