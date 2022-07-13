import path from "path";
import moment from "moment";
// Service
import BaseService from "../controller/baseService";
import { formatCurrency, formatPhone } from "../../helpers/format";
 
import { invoiceRepository } from "../../db/repositories/invoiceRepository";


class InvoiceService extends BaseService {
    async findInvoice(query, options) {
        try {
            return this.repository.findOne(query, options);
        } catch (err) {
            throw err;
        }
    }
    async getInvoiceRenderData(id, isPdf, isError) {
        const invoiceTemplatesPath = path.resolve(
            __dirname,
            "..",
            "templates",
            "invoice"
        );
            let templatePath = path.resolve(invoiceTemplatesPath, "invoice.ejs");
        const errorTemplatePath = path.resolve(
            invoiceTemplatesPath,
            "invoice-error.ejs"
        );

        let country = "",
            state = "",
            city = "",
            postal_code = "",
            phone = "",
            display_company_name = "ID Traders",
            address = "",
            countryCode = "",
            stateCode = "",
            rate = "",
            companyLogo = "LOGO",
            companyStateCode = "560085",
            companyCountryCode = "",
            dueAmount = 0,
            statusBadge = "",
            isPaid = false;
        try {
            const marketplaceCompanyName =
               "Company Name";
            const marketplaceCompanyAddress =
                "marketplaceCompanyAddress";
            const marketplaceCompanyCity =
                "marketplaceCompanyCity";
            const marketplaceCompanyState =
               "marketplaceCompanyState";
            const marketplaceCompanyCountry =
              "marketplaceCompanyCountry";
            const marketplaceCompanyZipCode =
                "marketplaceCompanyZipCode";
            const marketplaceCompanyPhone =
                 "9245400915";
           
       
            if (isError) {
                return {
                    path: errorTemplatePath,
                    data: {},
                };
            }

            return {
                path: templatePath,
                data: {
                    id,
                    isPdf,
                    companyName: marketplaceCompanyName,
                    companyAddress: marketplaceCompanyAddress,
                    companyCity: `${
                        marketplaceCompanyCity
                            ? marketplaceCompanyCity + ","
                            : ""
                    } ${
                        companyStateCode ? companyStateCode : ""
                    } ${marketplaceCompanyZipCode}`,
                    companyCountry: marketplaceCompanyCountry,
                    companyPhone: formatPhone(marketplaceCompanyPhone),
                    description: "HELLO TEST",
                    billingName: display_company_name,
                    billingAddress: address,
                    billingCity: `${city ? city + "," : ""} ${
                        stateCode ? stateCode : ""
                    } ${postal_code}`,
                    billingCountry: country,
                    billingPhone: formatPhone(phone),
                    currentYear: moment().format("YYYY"),
                    // date: moment(invoice.createdAt).format("MMM DD, YYYY"),
                    date: "CREATED AT",
                    dueDate: "DUE AT",
                    // dueDate: invoice.due_at
                    //     ? moment(invoice.due_at).format("MMM DD, YYYY")
                    //     : "",
                    logoUrl: companyLogo,
                    amount: formatCurrency("2457"),
                    dueAmount: formatCurrency("345"),
                    rate: rate ? rate : formatCurrency("2457"),
                    statusBadge: statusBadge,
                    isPaid,
                    paidDate: "paid date",
                    // paidDate: invoice.paid_at
                    //     ? moment(invoice.paid_at).format("MMM DD, YYYY")
                    //     : "",
                    accountNumber: "12345690",
                    routingNumber: "234567890",
                    partnerName: concatName(
                        "First Name",
                        "Last Name"
                    ),
                },
            };
        } catch (err) {
            throw err;
        }
    }
}

module.exports = {
    InvoiceService,
    invoiceService: new InvoiceService(invoiceRepository),
};
