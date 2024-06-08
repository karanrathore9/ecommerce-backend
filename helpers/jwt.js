import { expressjwt } from "express-jwt";
import dotenv from "dotenv";

dotenv.config();

const authJwt = () => {
    const apiurl = process.env.API_URL;
  return expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: `${apiurl}/products`, methods: ["GET", "OPTIONS"] },
      { url: `${apiurl}/categories`, methods: ["GET", "OPTIONS"] },
      `${apiurl}/users/login`,
      `${apiurl}/users/register`,
    ],
  });
};

const isRevoked = async (req, payload, done) => {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
};

export default authJwt;
