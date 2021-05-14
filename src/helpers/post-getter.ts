import { PostClass } from "@/types";
import { getComments } from "./comment-getter";

export async function getPosts() {
    const api_response = await fetch('http://localhost:3000/posts');

    if (!api_response.ok) {
      throw new Error(`Error ${api_response.status} : List of posts could not be retrieved.`);
    }

    const posts_list: PostClass[] = [];

    const json_posts_list = await api_response.json();
    json_posts_list.forEach(async (json_post: { id: string; content: string; user: string; postdate: string; }) => {

      const comments_list = await getComments(json_post.id);

      posts_list.push(new PostClass(
          json_post.id,
          json_post.content,
          json_post.user,
          json_post.postdate,
          comments_list
      ));
    });

    return posts_list;
}

export async function postNewPost(content: string, author: number) {
  const request = await fetch(`http://localhost:3000/posts`, {
      method: "POST",
      body: JSON.stringify({ content: content, user: author }),
      headers: { "Content-type": "application/json" }
  });

  if (!request.ok) {
      throw new Error(`Error ${request.status} : There has been a problem with your new post request.`);
  }
}
