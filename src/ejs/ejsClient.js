import ejs from "ejs";
import htmlToPdf from "html-pdf";

class EjsClient {
    async renderHtml(path, data) {

        return new Promise((resolve, reject) => {
            ejs.renderFile(path, data, (err, html) => {
                if (err) {
                    return reject(err);
                }

                return resolve(html);
            });
        });
    }

    async renderPdf(path, data) {
        try {
            const html = await this.renderHtml(path, data);

            return new Promise((resolve, reject) => {
                htmlToPdf
                    .create(html, {
                        format: "A4",
                    })
                    .toBuffer((err, buffer) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve({
                            name: `Invoice #${data.id}.pdf`,
                            file: `data:application/pdf;base64,${buffer.toString(
                                "base64"
                            )}`,
                        });
                    });
            });
        } catch (err) {
            throw err;
        }
    }
}

module.exports = {
    EjsClient,
    ejsClient: new EjsClient(),
};
