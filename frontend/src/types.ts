export class PostClass {
  id: number;
  content: string;
  image_url?: string | null;
  author: string;
  postdate: string;
  comments_number: number;
  comments: CommentType[];

  constructor(
    id: number,
    content: string,
    author: string,
    postdate: Date,
    comments_number: number,
    comments: CommentType[],
    image_url?: string | null
  ) {
    this.id = id;
    this.content = content;
    this.image_url = image_url;
    this.author = author;
    this.postdate = postdate.toLocaleString();
    this.comments_number = comments_number;
    this.comments = comments;
  }
}

export interface CommentType {
  id?: number;
  author: string | number;
  content: string;
  post: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationInformation extends LoginCredentials {
  username: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  admin: boolean;
}
