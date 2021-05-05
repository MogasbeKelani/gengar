"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatethread = exports.deletethread = exports.getThreadByUserId = exports.getByForumId = exports.getById = exports.createThread = void 0;
var ObjectId = require("mongodb").ObjectID;
function createThread(original) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!original) {
                return { message: "no body in the request" };
            }
            const result = yield client.db("GitGud").collection("thread").insertOne(original);
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.createThread = createThread;
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield client.db("GitGud").collection("thread").findOne({ _id: ObjectId(id) });
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getById = getById;
function getByForumId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield client.db("GitGud").collection("thread").find({ forumId: id }).toArray();
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getByForumId = getByForumId;
function getThreadByUserId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.db("GitGud").collection("thread").find({ creator: id }).toArray();
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getThreadByUserId = getThreadByUserId;
function deletethread(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield client.db("GitGud").collection("thread").deleteOne({ _id: ObjectId(id) });
            if (!result) {
                return { success: false };
            }
            return { success: true };
        }
        catch (err) {
            throw err;
        }
    });
}
exports.deletethread = deletethread;
function updatethread(patch) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.db("GitGud").collection("thread").findOneAndUpdate({ _id: ObjectId(patch._id) }, {
                $set: {
                    text: patch.text,
                    update_date: Date.now,
                },
            }, { new: true });
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updatethread = updatethread;
