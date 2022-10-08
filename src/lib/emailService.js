import nodemailer from 'nodemailer';
import smtpTransportRequire from 'nodemailer-smtp-transport';
import dotenv from 'dotenv';
dotenv.config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export const emailTemplates = {
    nuevoPedido: 'd-a8f537396e9b466a87c56446d2115eb2',
    crearPassword: 'd-0f16731282f84f4a9183d5efae5565e9',
    cambiarPassword: 'd-8ec568bd96e44f838af2833abb9b8926',
    facturaPedido: 'd-1e391e8c06294e4c9f04aeb780ca63d1'
};

const smtpTransport = nodemailer.createTransport(
    smtpTransportRequire({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })
);

export const sendEmail = (to, templateId, dynamicTemplateData) => {
    return sgMail.send({
        templateId: templateId ?? emailTemplates.nuevoPedido,
        to,
        from: {
            name: 'FoodTrack',
            email: 'rigoberto.acifuina@gmail.com',
        },
        dynamicTemplateData: dynamicTemplateData ?? {
            nombreUsuario: 'Estuardo Coronado',
            link: 'https://foodtrack-ui.web.app',
            pedidoId: '987654321',
            direccionPedido: '3 avenida 21-37 zona 12',
            totalPedido: '125.00',
        },
    });
};

export const sendHtmlEmail = (to, subject, html) => {
    return sgMail.send({
        to,
        subject,
        from: {
            name: 'FoodTrack',
            email: 'rigoberto.acifuina@gmail.com',
        },
        html,
    });
};

export default smtpTransport;
