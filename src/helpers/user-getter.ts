export async function getUserName(user_id: string): Promise<string> {
    const author_request = await fetch(`http://localhost:3000/users/${user_id}/username`);
    if (!author_request.ok) {
    throw new Error(`Error ${author_request.status} : Author could not be retrieved.`);
    }

    const author = await author_request.json();
    return author.username;
}
