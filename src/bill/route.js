import express from "express";
import createRoute from "./createRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import renderInvoice from "./renderInvoice";
const verifyToken = require("../../middleware/verifyToken");

const billRoute = express.Router();

billRoute.post("/", createRoute);
billRoute.get("/search/", verifyToken, searchRoute);
billRoute.get("/", verifyToken, getRoute);
billRoute.get("/:id/render", verifyToken, renderInvoice);

export default billRoute;
