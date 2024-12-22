const Users = require('../../model/user.mongo');
const Operator = require('../../model/operator.mongo');


// Return all registered users
async function getUsers(req, res) {
    try {
        const users = await Users.find({});
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Create user
async function addUser(req, res) {
    if (!req.body) {
        return res.status(400).json({ message: "Request body is missing" });
    }

    const {
        service,
        fullName,
        phone,
        // requestType,
        numOfPersons,
        address,
        geolocation,
        feedback,
        status,
    } = req.body;

    if (!service || !fullName || !phone || !numOfPersons || !address || !geolocation) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        let userExist = await Users.findOne({ phone: phone });

        if (userExist) {
            return res.status(409).json({ message: "User already exists" });
        }

        const newUser = await new Users({
            service,
            fullName,
            phone,
            // requestType,
            numOfPersons,
            address,
            geolocation,
            feedback,
            status,
        }).save();

        return res.status(201).json({
            data: newUser,
        });

    } catch (err) {
        return res.status(500).json({ message: err});
    }
}

// Edit all user information with their assigned operator's ID
// async function assignOperator(req, res) {
//     const { opId, geolocation } = req.body;

//     let operatorExists;
//     try {
//         operatorExists = await Users.updateMany(
//             { geolocation: geolocation },
//             { $set: { operatorId: opId } },
//             { new: true }
//         );

//         if (operatorExists) {
//             res.status(201).json(operatorExists)
//             console.log(operatorExists);
//         } else {
//             res.status(401).json("Error assigning operator")
//         }
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

module.exports = { getUsers, addUser};