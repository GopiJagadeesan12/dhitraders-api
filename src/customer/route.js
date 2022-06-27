import express from "express";
import createRoute from "./createRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
const verifyToken = require("../../middleware/verifyToken");

const customerRoute = express.Router();

customerRoute.post("/", createRoute);
customerRoute.get("/customers/search", verifyToken, searchRoute);
customerRoute.get("/", verifyToken, getRoute);

export default customerRoute;