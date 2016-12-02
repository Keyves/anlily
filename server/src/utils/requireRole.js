module.exports = function requireRole(role) {
    return async function(ctx, next) {
		var user = ctx.session.user

        if (user && user.role === role)
            next();
        else
            ctx.status = 403
    }
}
