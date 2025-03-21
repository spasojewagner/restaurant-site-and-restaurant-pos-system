const createHttpError = require("http-errors");
const Table = require("../models/tableModel");
const { default: mongoose } = require("mongoose");

const addTable = async (req, res, next) => {
    try {
        const { tableNo, seats } = req.body;

        if (!tableNo) {
            const err = createHttpError(400, "Please provide table number");
            return next(err);
        }

        const isTablePresent = await Table.findOne({ tableNo });
        if (isTablePresent) {
            const err = createHttpError(400, "Table already exists");
            return next(err);
        }

        const newTable = new Table({ tableNo, seats });
        await newTable.save();

        res.status(201).json({ success: true, message: "Table added!", data: newTable });
    } catch (error) {
        next(error);
    }
};

const getTables = async (req, res, next) => {
    try {
        const tables = await Table.find().populate({
            path: "currentOrder",
            select: "customerDetails"
        });
        res.status(200).json({ success: true, data: tables });
    } catch (error) {
        next(error);
    }
};

// const updateTable = async (req, res, next) => {
//     try {
//         const { status, orderId } = req.body;

//         const { id } = req.params;
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             const error = createHttpError(404, 'Ivalid ID!');
//             return next(error);
//         }

//         const table = await Table.findByIdAndUpdate(id,
//             { status, currentOrder: orderId },
//             { new: true }
//         );

//         if (!table) {
//             const err = createHttpError(404, "Table doesn't exist");
//             return next(err);
//         }

//         table.status = status;
//         table.currentOrder = orderId;

//         await table.save();
//         res.status(200).json({ success: true, message: "Table updated!", data: table });

//         //debug test
//         if (orderId && !mongoose.Types.ObjectId.isValid(orderId)) {
//             return next(createHttpError(400, "Invalid order ID!"));
//         }
        
//     } catch (error) {
//         next(error);
//     }
// };
const updateTable = async (req, res, next) => {
    try {
        const { status, orderId } = req.body;
        const { id } = req.params;

        // Validacija ID-a stola
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createHttpError(404, 'Invalid Table ID!'));
        }

        // Validacija orderId ako je prosleđen
        if (orderId && !mongoose.Types.ObjectId.isValid(orderId)) {
            return next(createHttpError(400, "Invalid order ID!"));
        }

        // Ažuriranje stola u jednoj operaciji
        const table = await Table.findByIdAndUpdate(
            id,
            { status, currentOrder: orderId },
            { new: true }
        );

        if (!table) {
            return next(createHttpError(404, "Table doesn't exist"));
        }

        res.status(200).json({ success: true, message: "Table updated!", data: table });
    } catch (error) {
        next(error);
    }
};

module.exports = { addTable, getTables, updateTable };
