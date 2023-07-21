import jwt from "jsonwebtoken";

const verify = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (error) => {
      if (error) return reject();
      return resolve();
    });
  });

const protectApi = async (req, res, next) => {
  try {
    const authorization = req.header("Authorization");
    if (authorization) {
      // verify the JWT token here
      const token = authorization.split(" ")[1]; // Bearer abcdef
      await verify(token);
      return next();
    }

    res.status(403).json({ message: "Unauthorized access!" });
  } catch (error) {
    res.status(403).json({ message: "Unauthorized access!" });
  }
};

export default protectApi;
