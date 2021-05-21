import { User } from '../types';

export async function postNewUser(user: User) {
    const request = await fetch(`http://localhost:3000/users`, {
        method: "POST",
        body: JSON.stringify({ username: user.name, email: user.email, userpassword: user.password }),
        headers: { "Content-type": "application/json" }
    });
  
    if (!request.ok) {
        throw new Error(`Error ${request.status} : There has been a problem with your new post request.`);
    }
  }
  
