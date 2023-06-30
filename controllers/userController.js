"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUserByEmailIdAndPassword = void 0;
const userModel_1 = require("../models/userModel");
const getUserByEmailIdAndPassword = (email, password) => {
    let user = userModel_1.userModel.findOne(email);
    if (isUserValid(user, password)) {
        return user;
    }
    else {
        throw new Error("Your password didn't match!");
    }
};
exports.getUserByEmailIdAndPassword = getUserByEmailIdAndPassword;
const getUserById = (id) => {
    let user = userModel_1.userModel.findById(id);
    if (user) {
        return user;
    }
    return null;
};
exports.getUserById = getUserById;
function isUserValid(user, password) {
    return user.password === password;
}
