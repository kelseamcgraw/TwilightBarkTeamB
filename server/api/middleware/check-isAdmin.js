module.exports = (req, res, next) => {

        if(req.userData.isAdmin) {
            next()
        } else {
            return res.status(403).json({
                error: "Access Denied"
            });
        }
};