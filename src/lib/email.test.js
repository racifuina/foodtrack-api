import { sendEmail, sendHtmlEmail } from "./emailService";

describe("email send", () => {
  test("should send email", () => {
    const email = sendEmail("rigoberto.acifuina@gmail.com");
    console.log("email", email);
  });

  test("should send html", () => {
    const email = sendHtmlEmail('rigoberto.acifuina@gmail.com', `Factura de pedido 877474`, '<p>test <b>BOLD</b></p>')
    console.log("htmlEmail", email);
  });
});
