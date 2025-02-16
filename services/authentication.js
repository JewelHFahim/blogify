const jwt = require("jsonwebtoken");
const secret = "JewelHFahim@123$";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImgURL: user.profileImgURL,
    role: user.role,
  };

  const token = jwt.sign(payload, secret);

  return token;
}

function validateToken(token) {
  if (!token) return null;

  const payload = jwt.verify(token, secret);

  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
