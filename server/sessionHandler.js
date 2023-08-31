const sessionHandler = {};
dbActions = require('./squeekwill/dbActions');
sessionHandler.isLoggedIn = async (req, res, next) => {
  const result = await dbActions.checkSession(req.cookies.session);
  if (result.length > 0) {
    res.locals.userid = result[0].userid;
    return next();
  } else {
    return res.status(401).send('please login before accessing Data');
  }
};
module.exports = sessionHandler;
