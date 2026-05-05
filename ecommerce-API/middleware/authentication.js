import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: 'Access Denied. No Token Provided',
      });
    }

    const verified = jwt.verify(token, 'SECRET_KEY');

    req.user = verified;

    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid Token',
    });
  }
};

export default authMiddleware;