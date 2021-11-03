const jwt = require('jsonwebtoken');
const UserModel = require('../models/user')

module.exports = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      status: 0,
      message: 'Unauthorized Access',
    });
  }

  jwt.verify(token, 'text', (error, decoded) => {
    if (error) {
      return res.status(401).json({
        status: 0,
        message: `Unauthorized Access`,
      });
    }
    if (decoded) {
      UserModel.findOne({ "_id": decoded._id }).then((data) => {
        decoded._id = data._id;
          decoded.name = data.name;
          decoded.photo = data.photo;
          decoded.mobile = data.mobile;
          decoded.email = data.email;
          decoded.token = data.token;
          req.body.user_details = decoded;
          console.log("req.body.user_details", req.body.user_details);
          return next();
      })
    }
  });
};

