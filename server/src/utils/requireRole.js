module.exports = function requireRole(role) {
    return async function(ctx, next) {
		var user = ctx.session.user

        if (user && user.role === role)
            await next()
        else
            ctx.status = 403
    }
}
