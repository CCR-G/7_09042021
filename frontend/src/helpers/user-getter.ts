import { User } from '../types';
import { getHttpHeaders } from './http-header-getter';

export async function postNewUser(user: User) {
    const request = await fetch(`http://localhost:3000/user/register`, {
        method: "POST",
        body: JSON.stringify({ username: user.name, email: user.email, userpassword: user.password }),
        headers: getHttpHeaders()
    });
  
    if (!request.ok) {
        const request_message = await request.json();
        throw new Error(`Error ${request.status} : ${request_message.error}.`);
    }
  }
  
export async function loginUser(user: User) {
    const request = await fetch(`http://localhost:3000/user/login`, {
        method: "POST",
        body: JSON.stringify({ email: user.email, password: user.password }),
        headers: getHttpHeaders()
    });
  
    const request_message = await request.json();

    if (!request.ok) {
        throw new Error(`Error ${request.status} : ${request_message.error}`);
    }

    return request_message;
}