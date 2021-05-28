export class PostClass {
    id: number;
    content: string;
    author: string;
    postdate: string;
    comments_number: number;
    comments: CommentType[];

    constructor(id: number, content: string, author: string, postdate: Date, comments_number: number, comments: CommentType[]) {
        this.id = id;
        this.content = content;
        this.author = author;
        this.postdate = postdate.toLocaleString();
        this.comments_number = comments_number;
        this.comments = comments;
    }
}

export interface CommentType {
    author: string;
    content: string;
    post?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegistrationInformation extends LoginCredentials {
    username: string;
}

export interface User {
    email: string;
    username: string;
}
