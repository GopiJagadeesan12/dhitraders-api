import { invoiceController } from "./invoiceController";

module.exports = (req, res) => invoiceController.createInvoiceHtml(req, res);
