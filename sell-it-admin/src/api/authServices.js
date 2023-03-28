export default function authHeader() {
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (admin && admin?.tokens?.accessToken) {
    // for Node.js Express back-end
    return { Authorization: "Bearer " + admin.tokens.accessToken };
  } else {
    return {};
  }
}
