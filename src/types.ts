export class PostClass {
    id: string;
    content: string;
    author: string;
    postdate: string;
    comments: CommentType[];

    constructor(id: string, content: string, author: string, postdate: string, comments?: CommentType[]) {
        this.id = id;
        this.content = content;
        this.author = author;
        this.postdate = postdate;
        this.comments = comments ? comments : [];
    }
}

export interface CommentType {
    user: string;
    content: string;
    post: string;
}

export interface User {
    name: string,
    email: string,
    password: string,
}
