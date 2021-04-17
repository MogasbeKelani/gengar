"use strict";
const Users = require("../../models/general/user-model");

/**
 * @return List of users & their data
 */
const userList = async (req, res) => {
    await Users.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}

exports.userList = userList;


