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
exports.deleteDiscussion = exports.updateDiscussion = exports.getDiscussionByUserId = exports.getDiscussionByName = exports.getDiscussionByTopic = exports.getDiscussionById = exports.getDiscussions = exports.createDiscussion = void 0;
const discussionSchema = require("../../models/general/schemas/forum-model");
const mongoose = require("mongoose");
function createDiscussion(forum) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!forum) {
                return { message: "no body in the request" };
            }
            const schema = new discussionSchema(forum);
            var result = yield schema.save().then(() => {
                return {
                    success: true,
                    _id: schema._id,
                    creator: schema.creator,
                    message: "Discussion created!",
                    title: schema.title,
                    description: schema.description,
                    topics: schema.topics,
                };
            });
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.createDiscussion = createDiscussion;
function getDiscussions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield discussionSchema.find({}, (err, forums) => {
                return { success: true, data: forums };
            });
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getDiscussions = getDiscussions;
function getDiscussionById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield discussionSchema.findOne({ _id: id }, (err, forums) => {
                if (err) {
                    return { success: false, error: err };
                }
                if (!forums) {
                    return { success: false, error: `Discussion not found` };
                }
                return { success: true, data: forums };
            });
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getDiscussionById = getDiscussionById;
function getDiscussionByTopic(topic) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield discussionSchema.find({ topics: { $all: topic } }, (err, forums) => {
                if (err) {
                    return { success: false, error: err };
                }
                return { success: true, data: forums };
            });
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getDiscussionByTopic = getDiscussionByTopic;
function getDiscussionByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield discussionSchema.find({ title: { $regex: ".*" + name + ".*" } }, (err, forums) => {
                if (err) {
                    return { success: false, error: err };
                }
                return { success: true, data: forums };
            });
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getDiscussionByName = getDiscussionByName;
function getDiscussionByUserId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield discussionSchema.find({ creator: id }, (err, forums) => {
                if (err) {
                    return { success: false, error: err };
                }
                return { success: true, data: forums };
            });
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getDiscussionByUserId = getDiscussionByUserId;
function updateDiscussion(patch) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(patch);
            const result = yield discussionSchema.findOneAndUpdate({ _id: patch._id }, {
                $set: {
                    creator: patch.creator,
                    title: patch.title,
                    description: patch.description,
                    topics: patch.topics,
                },
            }, { new: true });
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updateDiscussion = updateDiscussion;
function deleteDiscussion(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield discussionSchema
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
exports.deleteDiscussion = deleteDiscussion;
