export class PostClass {
    id: string;
    content: string;
    author: string;
    postdate: string;
    comments_number: number;
    last_comment: CommentType;

    constructor(id: string, content: string, author: string, postdate: string, comments_number: number, last_comment: CommentType) {
        this.id = id;
        this.content = content;
        this.author = author;
        this.postdate = postdate;
        this.comments_number = comments_number;
        this.last_comment = last_comment;
    }
}

export interface CommentType {
    author: string;
    content: string;
    post?: string;
}

export interface User {
    name: string,
    email: string,
    password: string,
}
