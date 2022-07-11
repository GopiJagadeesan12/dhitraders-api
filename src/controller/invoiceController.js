import path from "path";
import moment from "moment";
import BaseController from "./baseController";
import { invoiceService } from "../bill/invoiceService";
import { ejsClient } from "../ejs/ejsClient";
class InvoiceController extends BaseController {
    async createInvoiceHtml(req, res) {
        let companyId = "1";
        try {
            // const invoiceRender = await this.service.getInvoiceRenderData(
            //     req.params.id,
            //     companyId
            // );
            console.log("enter function");
            const invoiceTemplatesPath = path.resolve(
                __dirname,
                "..",
                "templates",
                "invoice"
            );
            console.log("invoiceTemplatesPath ====>", invoiceTemplatesPath);
            let templatePath = path.resolve(
                invoiceTemplatesPath,
                "invoice.ejs"
            );
            console.log("templatePath ======>", templatePath);
            const errorTemplatePath = path.resolve(
                invoiceTemplatesPath,
                "invoice-error.ejs"
            );
            const invoiceRender = {
                path: templatePath,
                data: {
                    id: "1",
                    isPdf: true,
                    companyName: "ID TRADERS",
                    companyAddress: "Marusuran St",
                    companyCity: `${"ARANI"} ${"56085"} ${"85"}`,
                    companyCountry: "INDIA",
                    companyPhone: "9876543211",
                    description: "HELLO TEST",
                    billingName: "IDT",
                    billingAddress: "address",
                    billingCity: `${"Chennai" + ","} ${"TN"} ${"60028"}`,
                    billingCountry: "INDIA",
                    billingPhone: "0987654321",
                    currentYear: moment().format("YYYY"),
                    // date: moment(invoice.createdAt).format("MMM DD, YYYY"),
                    date: "CREATED AT",
                    dueDate: "DUE AT",
                    // dueDate: invoice.due_at
                    //     ? moment(invoice.due_at).format("MMM DD, YYYY")
                    //     : "",
                    logoUrl: "LOGO",
                    amount: "2457",
                    dueAmount: "345",
                    rate: "2457",
                    statusBadge: "PAID",
                    isPaid: true,
                    paidDate: "paid date",
                    // paidDate: invoice.paid_at
                    //     ? moment(invoice.paid_at).format("MMM DD, YYYY")
                    //     : "",
                    accountNumber: "12345690",
                    routingNumber: "234567890",
                    partnerName: "First Name",
                },
            };
            console.log("invoice renderer --->", invoiceRender);
            const html = await ejsClient.renderHtml(
                invoiceRender.path,
                invoiceRender.data
            );
            console.log("html ---->", html);

            return res.status(200).send(html);
        } catch (err) {
            console.log("error ====>", err);
            // const errorRender = this.service.getInvoiceRenderData(
            //     req.params.id,
            //     companyId,
            //     false,
            //     true
            // );
            // const html = await ejsClient.renderHtml(
            //     errorRender.path,
            //     errorRender.data
            // );

            return res.status(400).send("html");
        }
    }
}

module.exports = {
    InvoiceController,
    invoiceController: new InvoiceController(invoiceService),
};
