const tokenKey = 'token'

export function getToken(): string|null {
  return localStorage.getItem(tokenKey)
};

export function setToken(token:string): void {
  localStorage.setItem(tokenKey, token);
};

export function deleteToken(): void {
  localStorage.removeItem(tokenKey);
};