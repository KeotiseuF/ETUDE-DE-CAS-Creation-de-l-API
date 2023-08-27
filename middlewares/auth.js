const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const usersService = require("../api/users/users.service");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "not token";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);
    const user = usersService.get(decoded.userId);

    req.user = user.then(info => {
      return {
        decodedToken: decoded,
        info: info
      };
    })
    next();
  } catch (message) {
    next(new UnauthorizedError(message));
  }
};
