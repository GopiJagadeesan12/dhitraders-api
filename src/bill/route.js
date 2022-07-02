import express from "express";
import createRoute from "./createRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
const verifyToken = require("../../middleware/verifyToken");

const billRoute = express.Router();

billRoute.post("/", createRoute);
billRoute.get("/search/", verifyToken, searchRoute);
billRoute.get("/", verifyToken, getRoute);

export default billRoute;
