/* auth.js
Balachander Rao Palepu, 301170247, 07-02-2021
*/

module.exports = {
  ensureAuthenticated(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }
    next();
  },
};
