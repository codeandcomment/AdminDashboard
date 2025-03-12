import jwt from 'jsonwebtoken';

const REFRESH_SECRET = process.env.REFRESH_SECRET || "your-refresh-secret";
const refreshTokens = new Set();

export const authenticateJWT = (req,res,next)=>{
    const token = req.header('Authorization');

    if(!token) return res.status(403).json({ message: 'Access denied' });

    try{
        const decoded = jwt.verify(token.replace('Bearer ', ''),process.env.JWT_SECRET)
        req.user= decoded;
        next();
    }catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}


const refreshAccessToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
  
    if (!refreshToken || !refreshTokens.has(refreshToken)) {
      return res.status(403).json({ message: "Refresh token invalid" });
    }
  
    jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Refresh token expired" });
  
      const newAccessToken = jwt.sign({ id: user.id, email: user.email }, ACCESS_SECRET, {
        expiresIn: "15m",
      });
  
      res.setHeader("Authorization", `Bearer ${newAccessToken}`);
      req.user = user;
      next();
    });
  };
  
  module.exports = { authenticateToken, refreshAccessToken, refreshTokens };