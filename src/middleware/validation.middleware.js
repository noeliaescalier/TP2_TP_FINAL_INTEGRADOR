import { isValidObjectId } from "mongoose";

const validateId = (req, res, next) => {
    const { id } = req.params;

    if (id && !isValidObjectId(id)) {
        return res.status(400).json({ 
            status: "error", 
            message: `El ID proporcionado '${id}' no tiene un formato válido.` 
        });
    }

    next();
};

const validateRequiredFields = (fieldsArray) => {
    return (req, res, next) => {
        const missingFields = [];

        fieldsArray.forEach(field => {
            if (!req.body[field]) {
                missingFields.push(field);
            }
        });

        if (missingFields.length > 0) {
            return res.status(400).json({
                status: "error",
                message: `Faltan campos obligatorios: ${missingFields.join(", ")}`
            });
        }

        next();
    };

};

export default {
    validateId,
    validateRequiredFields
};