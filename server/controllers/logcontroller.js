const Express = require('express');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
//Import the log model
const { LogModel } = require('../models');

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey!! This is a practice route!')
});

//Create
router.post("/", validateJWT, async (req, res) => {
const {
    description,
    definition,
    result,
    owner_id,
} = req.body;
try {
    const Log = await LogModel.create({
    description,
    definition,
    result,
    owner_id,
    });
    res.status(201).json({
        message: "Log successfully created",
        Log
    });
} catch (err) {
    console.log(err)
    res.status(500).json({
        message: `Failed to create log: ${err}`
    })
}
});

//Find One
router.get("/:id", async (req, res) => {
    try {
        const locatedLog = await LogModel.findOne({
            where: {
                owner_id: req.params.id
            }
        });
        res.status(200).json({
            message: "Log successfully retrieved",
            locatedLog
        });
    } catch (err) {
        res.status(500).json({
            message: `Failed to retrieve log: ${err}`,
        });
    }
});

//Find All
router.get("/", async (req, res) => {
    try {
        const logs = await LogModel.findAll();
        res.status(200).json(logs); 
    } catch (err) {
        res.status(500).json({ error: err });
    }
    });

//Update
router.put("/:id", async (req, res) => {
    const {
        description,
        definition,
        result,
        owner_id,
    } = req.body;
    try {
        await LogModel.update(
            { description, definition, result, owner_id },
            { where: { id: req.params.id }, returning: true }
        ).then((result) => {
            res.status(200).json({
                message: "Log successfully updated",
                updatedLog: result,
            });
        });
    } catch (err) {
        res.status(500).json({
            message: `Failed to update log: ${err}`,
        })
    }
});

//Delete
router.delete("/:id", async (req, res) => {
    try {
        await LogModel.destroy({
            where: {
                id: req.params.id
            },
        }).then ((result) => {
            res.status(200).json({
                message: "Log successfully deleted",
                deletedLog: result,
            });
        });
    } catch (err) {
        res.status(500) ({
            message: `Failed to delete pie: ${err}`
        });
    }
});


// router.get("/about", (req, res) => {
//     res.send("This is the about route")
// });

module.exports = router;