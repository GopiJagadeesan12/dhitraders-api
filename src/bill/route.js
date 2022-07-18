import express from "express";
import createRoute from "./createRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import renderInvoice from "./renderInvoice";
import getBillRelationDetails from "./getBillRelationDetails";

const verifyToken = require("../../middleware/verifyToken");

const billRoute = express.Router();

billRoute.post("/", createRoute);
billRoute.get("/search/", verifyToken, searchRoute);
billRoute.get("/details/", verifyToken, getRoute);
billRoute.get("/:id/render", verifyToken, renderInvoice);
billRoute.get("/products/:id", verifyToken, getBillRelationDetails);

export default billRoute;
