import express from "express";
import createRoute from "./createRoute";
import deleteRoute from "./deleteRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
const verifyToken = require("../../middleware/verifyToken");

const productRelation = express.Router();

productRelation.post("/", createRoute);
productRelation.get("/productRelation/search/:id", verifyToken, searchRoute);
productRelation.get("/", verifyToken, getRoute);
productRelation.put("/", verifyToken, updateRoute);
productRelation.delete("/:id", verifyToken, deleteRoute);

export default productRelation;
