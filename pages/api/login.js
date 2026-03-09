export default function handler(req, res) {

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "123456";

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {

    return res.status(200).json({
      success: true,
      message: "Login successful"
    });

  }

  return res.status(401).json({
    success: false,
    message: "Invalid username or password"
  });

}
