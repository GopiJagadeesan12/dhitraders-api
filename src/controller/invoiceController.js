import path from "path";
import moment from "moment";
import BaseController from "./baseController";
import { invoiceService } from "../bill/invoiceService";
import { ejsClient } from "../ejs/ejsClient";
import { billService } from "../bill/service";
import { customerService } from "../customer/service";

import models from "../../db/models";
const { bill_relation } = models;
class InvoiceController extends BaseController {
    async createInvoiceHtml(req, res) {
        try {
            // Get Invoice Details
            const invoiceData = await billService.findOne({
                where: { id: req.params.id },
            });
            let customer_id = invoiceData && invoiceData.customer_id;
            // Get Customer Details by Id
            const customerDetails = await customerService.findOne({
                where: { id: customer_id },
            });

            const customerName = customerDetails.first_name;
            const customerAddress = customerDetails.address;
            const customerStreet = customerDetails.street;
            const customerCity = customerDetails.city;
            const customerState = customerDetails.state;
            const customerPinCode = customerDetails.pin_code;
            const customerPhone = customerDetails.phone_number;

            //Get Total Amount and bill details
            const billDetails = await bill_relation.findAll({
                where: { bill_id: invoiceData.id },
            });

            // Get total Bill amount
            let bill_amount = [];
            if (billDetails) {
                billDetails.forEach(data => {
                    if (data.amount) {
                        bill_amount.push(data.amount);
                    }
                });
            }

            let totalAmount = 0;
             bill_amount.forEach(data => {
                totalAmount = totalAmount + data;
            });

            // Get template path
            const invoiceTemplatesPath = path.resolve(
                __dirname,
                "..",
                "templates",
                "invoice"
            );
            let templatePath = path.resolve(
                invoiceTemplatesPath,
                "invoice.ejs"
            );

            const logourl =
                "https://partners-api-staging.torchlite.com/v1/media/491/logo.jpg";
            const invoiceRender = {
                path: templatePath,
                data: {
                    id: invoiceData.id,
                    isPdf: true,
                    companyName: "Dinesh",
                    companyAddress: "Marusuran St",
                    companyCity: `${"ARANI"} ${"TN"} ${"85"}`,
                    companyCountry: "INDIA",
                    companyPhone: "9876543211",

                    description: "Total Amount to be paid",
                    billingName: customerName,
                    billingAddress: customerAddress + customerStreet,
                    billingCity: `${customerCity +
                        ","} ${customerState} ${customerPinCode}`,
                    billingCountry: "INDIA",
                    billingPhone: customerPhone,
                    currentYear: moment().format("YYYY"),
                    date: moment(invoiceData.createdAt).format("MMM DD, YYYY"),
                    dueDate: "DUE AT",
                    // dueDate: invoiceData.due_at
                    //     ? moment(invoiceData.due_at).format("MMM DD, YYYY")
                    //     : "",
                    logoUrl: logourl,
                    amount: totalAmount,
                    dueAmount: totalAmount,
                    rate: totalAmount,
                    statusBadge: "PAID",
                },
            };
            const html = await ejsClient.renderHtml(
                invoiceRender.path,
                invoiceRender.data
            );

            return res.status(200).send(html);
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}

module.exports = {
    InvoiceController,
    invoiceController: new InvoiceController(invoiceService),
};
