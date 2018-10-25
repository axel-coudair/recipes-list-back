function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error("You must be logged in to view this page.");
        err.status = 401;
        return next(err);
    }
}

function findById(model,populate, req, res, next) {
    if (populate){

        model.findById(req.params.id).populate(populate).exec(function(err, recipe){
          if (err) {
            return next(err);
          } else {
            return res.json({ recipe });
          }
        })
    } else {
        model.findById(req.params.id, function(err, recipe){
            if (err) {
              return next(err);
            } else {
              return res.json({ recipe });
            }
          })
    }
  }
module.exports = {
    requiresLogin,
    findById
}