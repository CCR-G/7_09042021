export function getToken(): string | null {
  const token = sessionStorage.getItem("token");
  return token ? token : null;
}
