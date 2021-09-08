const jwt = require('jsonwebtoken');

const createToken = async (email, roles) => {
  try {
    const payload = {
      user: email,
      roles,
    };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1d' });
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = createToken;
