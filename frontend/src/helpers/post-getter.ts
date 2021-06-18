import { CommentType, PostClass } from "@/types";
import { getHttpHeaders } from "./http-header-getter";

export async function getPosts(): Promise<PostClass[]> {
  const api_response = await fetch("http://localhost:3000/posts", {
    headers: getHttpHeaders(),
  });

  if (!api_response.ok) {
    throw new Error(
      `Error ${api_response.status} : List of posts could not be retrieved.`
    );
  }

  const posts_list: PostClass[] = [];

  const json_posts_list = await api_response.json();

  json_posts_list.forEach((json_post: JSONPost) => {
    const id = json_post.post_id;
    const content = json_post.post_content;
    const image_url = json_post.image_url;
    const author = json_post.post_author;
    const date = new Date(json_post.post_date);
    const comments_number = json_post.comments_number;
    const comments = json_post.last_comment ? [json_post.last_comment] : [];

    const new_post = new PostClass(
      id,
      content,
      author,
      date,
      comments_number,
      comments,
      image_url
    );

    posts_list.push(new_post);
  });

  return posts_list;
}

type JSONPost = {
  post_id: number;
  post_content: string;
  image_url: string | null;
  post_author: string;
  post_date: string;
  comments_number: number;
  last_comment: CommentType;
};

export async function postNewPost(
  content: string,
  author: number,
  image_url: string | null = null
) {
  const request = await fetch("http://localhost:3000/posts", {
    method: "POST",
    body: JSON.stringify({
      content: content,
      user: author,
      image_url: image_url,
    }),
    headers: getHttpHeaders(),
  });

  const response = await request.json();

  if (!request.ok) {
    throw new Error(`Error ${request.status} : ${response.error}`);
  }

  return response;
}

export async function deletePost(post_id: number): Promise<any> {
  const request = await fetch(`http://localhost:3000/posts/${post_id}/delete`, {
    method: "POST",
    headers: getHttpHeaders(),
  });

  const response = await request.json();

  if (!request.ok) {
    throw new Error(`Error ${request.status} : ${response.error}`);
  }

  return response;
}
