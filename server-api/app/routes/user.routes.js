const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/userdetails/all", controller.allAccess);

  app.get("/api/userdetails/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/userdetails/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/userdetails/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.delete("/api/userdetails/deleteUser:id",[authJwt.verifyToken], controller.deleteUser);
};
