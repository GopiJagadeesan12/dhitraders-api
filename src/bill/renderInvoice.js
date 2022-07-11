import { invoiceController } from "../controller/invoiceController";

module.exports = (req, res) => invoiceController.createInvoiceHtml(req, res);
