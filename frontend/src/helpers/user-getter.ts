import { RegistrationInformation, LoginCredentials, User } from "../types";
import { getHttpHeaders } from "./http-header-getter";

export async function postNewUser(
  registration_info: RegistrationInformation
): Promise<{ user: User; token: string }> {
  const request = await fetch("http://localhost:3000/user/register", {
    method: "POST",
    body: JSON.stringify({
      username: registration_info.username,
      email: registration_info.email,
      password: registration_info.password,
    }),
    headers: getHttpHeaders(),
  });

  const response = await request.json();

  if (!request.ok) {
    throw new Error(`Error ${request.status} : ${response.error}.`);
  }

  return response;
}

export async function loginUser(
  user: LoginCredentials
): Promise<{ user: User; token: string }> {
  const request = await fetch("http://localhost:3000/user/login", {
    method: "POST",
    body: JSON.stringify({ email: user.email, password: user.password }),
    headers: getHttpHeaders(),
  });

  const response = await request.json();

  if (!request.ok) {
    throw new Error(`Error ${request.status} : ${response.error}`);
  }

  return response;
}

export async function authenticateUser(): Promise<User> {
  const request = await fetch("http://localhost:3000/user/authenticate", {
    method: "POST",
    headers: getHttpHeaders(),
  });

  const response = await request.json();

  if (!request.ok) {
    throw new Error(`Error ${request.status} : ${response.error}`);
  }

  return response.user;
}

export async function deleteUser(
  user_id: number,
  user_password: string
): Promise<any> {
  const request = await fetch(`http://localhost:3000/user/${user_id}/delete`, {
    method: "POST",
    body: JSON.stringify({ password: user_password }),
    headers: getHttpHeaders(),
  });

  const response = await request.json();

  if (!request.ok) {
    throw new Error(`Error ${request.status} : ${response.error}`);
  }

  return response;
}
