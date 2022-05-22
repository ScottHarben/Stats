export default function authHeader() {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const sessionUser = JSON.parse(sessionStorage.getItem("user"));
  const user = localUser || sessionUser;
  if (user && user.token) {
    return { "x-access-token": user.token };
  } else {
    return {};
  }
}