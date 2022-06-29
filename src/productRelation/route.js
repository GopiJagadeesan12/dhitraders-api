import express from "express";
import createRoute from "./createRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
const verifyToken = require("../../middleware/verifyToken");

const productRelation = express.Router();

productRelation.post("/", createRoute);
productRelation.get("/productRelation/search", verifyToken, searchRoute);
productRelation.get("/", verifyToken, getRoute);
productRelation.put("/", verifyToken, updateRoute);

export default productRelation;
