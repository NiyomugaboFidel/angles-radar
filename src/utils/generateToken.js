import jwt from 'jsonwebtoken';

const SECRETKEY = process.env.JWT_SECRET;
const createToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, SECRETKEY, { expiresIn: '1h' });

  return token;
};

export default createToken;
