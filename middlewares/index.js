function requiresLogin(req, res, next) {
    console.log(req.session)
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error("You must be logged in to view this page.");
        err.status = 401;
        return next(err);
    }
}

function findById(model, populateQuery, req, res, next) {
    if (populateQuery) {
        model.findById(req.params.id).populate(populateQuery).exec(function (err, recipe) {
            if (err) {
                return next(err);
            } else {
                return res.json({ recipe });
            }
        })
    } else {
        model.findById(req.params.id, function (err, recipe) {
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