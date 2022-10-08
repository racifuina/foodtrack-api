import { sendEmail } from "./emailService";

describe("email send", () => {
  test("should send email", () => {
    const email = sendEmail("rigoberto.acifuina@gmail.com");
    console.log("email", email);
  });
});
