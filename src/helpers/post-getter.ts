import { CommentType, PostClass } from "@/types";

export async function getPosts() {
    const api_response = await fetch('http://localhost:3000/posts');

    if (!api_response.ok) {
      throw new Error(`Error ${api_response.status} : List of posts could not be retrieved.`);
    }

    const posts_list: PostClass[] = [];

    const json_posts_list = await api_response.json();
    json_posts_list.forEach(async (json_post: { post_id: string; post_content: string; post_author: string; post_date: string; comments_number: number, last_comment: CommentType; }) => {

      posts_list.push(new PostClass(
          json_post.post_id,
          json_post.post_content,
          json_post.post_author,
          json_post.post_date,
          json_post.comments_number,
          json_post.last_comment
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
