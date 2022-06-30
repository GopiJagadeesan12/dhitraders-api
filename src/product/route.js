import express from "express";
import createRoute from "./createRoute";
import deleteRoute from "./deleteRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
const verifyToken = require("../../middleware/verifyToken");

const productRoute = express.Router();

productRoute.post("/", createRoute);
productRoute.get("/products/search", verifyToken, searchRoute);
productRoute.get("/", verifyToken, getRoute);
productRoute.put("/", verifyToken, updateRoute);
productRoute.delete("/:id", verifyToken, deleteRoute);

export default productRoute;
