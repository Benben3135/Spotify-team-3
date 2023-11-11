"use strict";
exports.__esModule = true;
//streaming library for node.js
var path = require("path");
var crypto = require("crypto");
var multer = require("multer");
var GridFsStorage = require("multer-gridfs-storage");
var Grid = require("gridfs-stream");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
// sreaming middleware for node.js:
