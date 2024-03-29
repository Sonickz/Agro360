import jwt from 'jsonwebtoken'
import { SECRET_TOKEN } from '../config/config.js'
import { errorResponse } from '../libs/libs.js';
import { Forms } from '../models/models.js';

//* Funcion para validar un token de una cookie
export const validateTokenCookie = (req, res, next) => {
    try {
        if (!req.header('Authorization')) return res.status(401).json({ message: ["No token, authorization denied"] });
        const token = req.header('Authorization').replace('Bearer ', '');
        jwt.verify(token, SECRET_TOKEN, (err, user) => {
            if (err) return res.status(403).json({ message: ["Invalid token"] });
            req.user = user;
            next();
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

//* Funcion para validar un token por parametro
export const validateTokenParam = (req, res, next) => {
    try {
        const { token } = req.params
        if (!token) return res.status(401).json({ message: ["No token, authorization denied"] });
        jwt.verify(token, SECRET_TOKEN, (err, user) => {
            if (err) return res.status(403).json({ message: ["Token invalido"] });
            req.user = user;
            next();
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

//* Funcion para parsear un validator de un modelo
export const validate = (validator, type) => (req, res, next) => {
    try {
        type == "query" ? validator.parse(req.query) : validator.parse(req.body)
        next()
    } catch (error) {
        return res.status(400).json({ message: error.errors.map(err => err.message) });
    }
}

//* Funcion para cambiar el estado de los formularios segun la fecha
export const validateStatusForm = async (req, res, next) => {
    try {
        await Forms.updateMany(
            { end: { $lt: new Date() } },
            { $set: { status: false } }
        )
        next()
    } catch (error) {
        errorResponse(res, error)
    }
}