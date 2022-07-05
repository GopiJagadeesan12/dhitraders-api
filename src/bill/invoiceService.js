import path from "path";
import moment from "moment";
// Service
import BaseService from "./baseService";
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
    async getInvoiceRenderData(id, companyId, isPdf, isError) {
        const invoiceTemplatesPath = path.resolve(
            __dirname,
            "..",
            "templates",
            "invoice"
        );
        console.log("invoiceTemplatesPath ====>", invoiceTemplatesPath);
        let templatePath = path.resolve(invoiceTemplatesPath, "invoice.ejs");
        console.log("templatePath ======>", templatePath);
        const errorTemplatePath = path.resolve(
            invoiceTemplatesPath,
            "invoice-error.ejs"
        );
        let projectCustomer, billingInfo, referralDetails, partnerDetails;

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
            // const invoice = await this.findInvoice(
            //     { id },
            //     this.repository.invoiceIncludeCustomer()
            // );

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
           
        

            // if (referralDetails) {
            //     templatePath = path.resolve(
            //         invoiceTemplatesPath,
            //         "invoiceReferral.ejs"
            //     );
            //     dueAmount =
            //         invoice.payment_status === invoiceConstants.status.PAID
            //             ? 0
            //             : invoice.amount;
            //     statusBadge =
            //         invoice.payment_status === invoiceConstants.status.PENDING
            //             ? "READY FOR PAYOUT"
            //             : invoice.payment_status ===
            //               invoiceConstants.status.PAID
            //             ? "PAID"
            //             : invoice.payment_status ===
            //               invoiceConstants.status.APPROVED
            //             ? "APPROVED"
            //             : invoice.payment_status ===
            //               invoiceConstants.status.PARTIALLY_PAID
            //             ? "PARTIALLY PAID"
            //             : "";
            //     isPaid =
            //         invoice.payment_status === invoiceConstants.status.PAID;
            // }

            // if (billingInfo) {
            //     country = billingInfo.country;
            //     state = billingInfo.state;
            //     city = billingInfo.city;
            //     postal_code = billingInfo.postal_code;
            //     phone = billingInfo.phone;
            //     display_company_name = invoice.account.company_name;
            //     address = billingInfo.address;
            // }

            // if (referralDetails && referralDetails.commission_percentage) {
            //     rate = `${referralDetails.commission_percentage}% Commission`;
            // }

            // if (partnerDetails) {
            //     companyLogo = partnerDetails.avatar
            //         ? await getPartnerMediaUrl(partnerDetails.avatar)
            //         : "";
            // }

            // if (country && state) {
            //     try {
            //         countryCode = Object.keys(countries).find(
            //             countryKey => countries[countryKey] === country
            //         );
            //         stateCode = Object.keys(states[countryCode]).find(
            //             stateKey => states[countryCode][stateKey] === state
            //         );
            //     } catch (err) {
            //         stateCode = "";
            //         console.log(err);
            //     }
            // }

            // if (marketplaceCompanyState && marketplaceCompanyCountry) {
            //     try {
            //         companyCountryCode = Object.keys(countries).find(
            //             countryKey =>
            //                 countries[countryKey] === marketplaceCompanyCountry
            //         );
            //         companyStateCode = Object.keys(
            //             states[companyCountryCode]
            //         ).find(
            //             stateKey =>
            //                 states[companyCountryCode][stateKey] ===
            //                 marketplaceCompanyState
            //         );
            //     } catch (err) {
            //         companyStateCode = "";
            //         console.log(err);
            //     }
            // }

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
