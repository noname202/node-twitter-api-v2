"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readNextPartOf = exports.sleepSecs = exports.getMediaCategoryByMime = exports.getMimeType = exports.getFileSizeFromFileHandle = exports.getFileHandle = void 0;
const fs_1 = __importDefault(require("fs"));
function getFileHandle(file) {
    if (typeof file === 'string') {
        return fs_1.default.promises.open(file, 'r');
    }
    else if (typeof file === 'number') {
        return file;
    }
    else if (typeof file === 'object' && !(file instanceof Buffer)) {
        return file;
    }
    else if (!(file instanceof Buffer)) {
        throw new Error('Given file is not valid, please check its type.');
    }
    else {
        return file;
    }
}
exports.getFileHandle = getFileHandle;
async function getFileSizeFromFileHandle(fileHandle) {
    // Get the file size
    if (typeof fileHandle === 'number') {
        const stats = await new Promise((resolve, reject) => {
            fs_1.default.fstat(fileHandle, (err, stats) => {
                if (err)
                    reject(err);
                resolve(stats);
            });
        });
        return stats.size;
    }
    else if (fileHandle instanceof Buffer) {
        return fileHandle.length;
    }
    else {
        return (await fileHandle.stat()).size;
    }
}
exports.getFileSizeFromFileHandle = getFileSizeFromFileHandle;
function getMimeType(file, type) {
    if (typeof file === 'string' && !type) {
        return getMimeByName(file);
    }
    else if (typeof type === 'string') {
        return getMimeByType(type);
    }
    throw new Error('You must specify type if file is a file handle or Buffer.');
}
exports.getMimeType = getMimeType;
function getMimeByName(name) {
    if (name.endsWith('.jpeg') || name.endsWith('.jpg'))
        return 'image/jpeg';
    if (name.endsWith('.png'))
        return 'image/png';
    if (name.endsWith('.webp'))
        return 'image/webp';
    if (name.endsWith('.gif'))
        return 'image/gif';
    if (name.endsWith('.mpeg4') || name.endsWith('.mp4'))
        return 'video/mp4';
    if (name.endsWith('.srt'))
        return 'text/plain';
    return 'image/jpeg';
}
function getMimeByType(type) {
    if (type === 'gif')
        return 'image/gif';
    if (type === 'jpg')
        return 'image/jpeg';
    if (type === 'png')
        return 'image/png';
    if (type === 'webp')
        return 'image/webp';
    if (type === 'srt')
        return 'text/plain';
    if (type === 'mp4' || type === 'longmp4')
        return 'video/mp4';
    return type;
}
function getMediaCategoryByMime(name, target) {
    if (name === 'video/mp4')
        return target === 'tweet' ? 'TweetVideo' : 'DmVideo';
    if (name === 'image/gif')
        return target === 'tweet' ? 'TweetGif' : 'DmGif';
    if (name === 'text/plain')
        return 'Subtitles';
    else
        return target === 'tweet' ? 'TweetImage' : 'DmImage';
}
exports.getMediaCategoryByMime = getMediaCategoryByMime;
function sleepSecs(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
exports.sleepSecs = sleepSecs;
async function readNextPartOf(file, chunkLength, bufferOffset = 0, buffer) {
    if (file instanceof Buffer) {
        const rt = file.slice(bufferOffset, bufferOffset + chunkLength);
        return [rt, rt.length];
    }
    if (!buffer) {
        throw new Error('Well, we will need a buffer to store file content.');
    }
    let bytesRead;
    if (typeof file === 'number') {
        bytesRead = await new Promise((resolve, reject) => {
            fs_1.default.read(file, buffer, 0, chunkLength, bufferOffset, (err, nread) => {
                if (err)
                    reject(err);
                resolve(nread);
            });
        });
    }
    else {
        const res = await file.read(buffer, 0, chunkLength, bufferOffset);
        bytesRead = res.bytesRead;
    }
    return [buffer, bytesRead];
}
exports.readNextPartOf = readNextPartOf;
