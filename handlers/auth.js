const BaseAutoBindedClass = require("../base.autobind");
const jsonwebtoken = require("jsonwebtoken");

class AuthHandler extends BaseAutoBindedClass {
  constructor() {
    super();
  }

  authenticate(req, callback) {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "JWT"
    ) {
      jsonwebtoken.verify(
        req.headers.authorization.split(" ")[1],
        "RESTFULAPIs",
        function(err, decode) {
          if (err) req.user = undefined;
          req.user = decode;
          callback(user);
        }
      );
    } else {
      callback(null);
    }
  }
}

module.exports = AuthHandler;
