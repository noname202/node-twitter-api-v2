"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_base_1 = __importDefault(require("./client.base"));
/**
 * Base subclient for every v1 and v2 client.
 */
class TwitterApiSubClient extends client_base_1.default {
    constructor(instance) {
        super();
        if (!(instance instanceof client_base_1.default)) {
            throw new Error('You must instance TwitterApiv1 instance from existing TwitterApi instance.');
        }
        const inst = instance;
        this._bearerToken = inst._bearerToken;
        this._consumerToken = inst._consumerToken;
        this._consumerSecret = inst._consumerSecret;
        this._accessToken = inst._accessToken;
        this._accessSecret = inst._accessSecret;
        this._basicToken = inst._basicToken;
        this._oauth = inst._oauth;
    }
}
exports.default = TwitterApiSubClient;
