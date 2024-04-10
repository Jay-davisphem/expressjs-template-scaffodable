"use strict";
/**
 * Pre-start is where we want to place things that must run BEFORE the express
 * server is started. This is useful for environment variables, command-line
 * arguments, and cron-jobs.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// NOTE: DO NOT IMPORT ANY SOURCE CODE HERE
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const ts_command_line_args_1 = require("ts-command-line-args");
// **** Setup **** //
// Command line arguments
const args = (0, ts_command_line_args_1.parse)({
    env: {
        type: String,
        defaultValue: "development",
        alias: "e",
    },
});
// Set the env file
const result2 = dotenv_1.default.config({
    path: path_1.default.join(__dirname, `../.env${args.env === 'development' ? '.' + args.env : ''}`),
});
if (result2.error) {
    throw result2.error;
}
