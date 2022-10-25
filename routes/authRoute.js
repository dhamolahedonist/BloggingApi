const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const EXPIRES_IN = `1h`;
require("dotenv").config();

const authRouter = express.Router();
