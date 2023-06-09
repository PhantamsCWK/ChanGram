import rateLimit from "express-rate-limit";

export const loginRateLimit = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: { name: "rateLimit" , message: "Too many login attempts from this IP, please try again after a 1 hour" },
    handler: (req, res, next, options) => {
        res.status(options.statusCode)
        next(options.message)
    },
    standardHeaders: true,
    legacyHeaders: false
});

export const globalRateLimit = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 100,
    message: { name: "rateLimit", message: "Too many request from this IP, please try again after a 5 minutes" },
    handler: (req, res, next, options) => {
        res.status(options.statusCode)
        next(options.message)
    },
    standardHeaders: true,
    legacyHeaders: false
})