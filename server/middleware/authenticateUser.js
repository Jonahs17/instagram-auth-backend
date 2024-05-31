const JWT = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.cookies?.token || null;
    if (!token) {
        return res.status(400).json({
            success: false,
            data: "Unauthorized access"
        });
    }

    try {
        const payload = JWT.verify(token, process.env.SECRET);
        req.user = { id: payload.id, email: payload.email };
    } catch (e) {
        return res.status(400).json({
            success: false,
            data: e.message
        });
    }
    next();
}

module.exports=authenticateUser;
