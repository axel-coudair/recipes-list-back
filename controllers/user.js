const get = async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  // let user = req.user;
  console.log(user);
  return res.json({user: "kjjkhkj"});

  // return ReS(res, {user:user.toWeb()});
}
module.exports.get = get;



// if (req.body.email &&
//   req.body.username &&
//   req.body.password &&
//   req.body.passwordConf) {
//   var userData = {
//     email: req.body.email,
//     username: req.body.username,
//     password: req.body.password,
//     passwordConf: req.body.passwordConf,
//   }
//   //use schema.create to insert data into the db
//   User.create(userData, function (err, user) {
//     if (err) {
//       return next(err)
//     } else {
//       return res.redirect('/profile');
//     }
//   });
// }