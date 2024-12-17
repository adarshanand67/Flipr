const _ = require("lodash");
const User = require("../model/user");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found" });
    }
    req.profile = user;
    next();
  });
};

exports.hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: "User is not authorized" });
  }
  next();
};

exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json(users);
  }).select("name email created updated");
};

exports.getUser = (req, res) => {
  req.profile.hash_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    user.hash_password = undefined;
    user.salt = undefined;
    res.json(result);
  });
};

exports.deleteUser = (req, res) => {
  let user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json({ message: "User deleted successfully" });
  });
};
