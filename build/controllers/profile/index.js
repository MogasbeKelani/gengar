"use strict";
const Users = require("../../models/general/user-model");

/**
 * @return A single user's data
 */
const userProfile = async (req, res) => {
    await Users.findOne({ _id: req.params.id}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}

exports.userProfile = userProfile;


