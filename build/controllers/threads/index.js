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
exports.getByForumId = exports.deletethread = exports.getThreadByUserId = exports.updatethread = exports.getById = exports.createThread = void 0;
const threadSchema = require("../../models/general/schemas/thread-model");
function createThread(original) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!original) {
                return { message: "no body in the request" };
            }
            const schema = new threadSchema(original);
            var result = yield schema.save().then(() => {
                return {
                    success: true,
                    _id: schema._id,
                    creator: schema.creator,
                    forumId: schema.forumId,
                    title: schema.title,
                    message: "successfuly commented",
                };
            });
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
            var result = yield threadSchema.findOne({ _id: id }, (err, original) => {
                if (err) {
                    return { success: false, error: err };
                }
                if (!original) {
                    return { success: false, error: `thread not found` };
                }
                return { success: true, data: original };
            });
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getById = getById;
function updatethread(patch) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield threadSchema.findOneAndUpdate({ _id: patch._id }, {
                $set: {
                    creator: patch.creator,
                    forumId: patch.forumId,
                    text: patch.text,
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
function getThreadByUserId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield threadSchema.find({ creator: id }, (err, threads) => {
                if (err) {
                    return { success: false, error: err };
                }
                return { success: true, data: threads };
            });
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
            var result = yield threadSchema
                .findByIdAndRemove(id)
                .then((response) => {
                return response;
            })
                .catch((err) => {
                return err;
            });
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
function getByForumId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield threadSchema.find({ forumId: id }, (err, original) => {
                if (err) {
                    return { success: false, error: err };
                }
                if (!original) {
                    return { success: false, error: `Thread not found` };
                }
                return { success: true, data: original };
            });
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getByForumId = getByForumId;
