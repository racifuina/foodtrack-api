import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail'

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const emailTemplates = {
    nuevoPedido: 'd-a8f537396e9b466a87c56446d2115eb2',
    crearPassword: 'd-0f16731282f84f4a9183d5efae5565e9',
    cambiarPassword: 'd-8ec568bd96e44f838af2833abb9b8926',
    facturaPedido: 'd-1e391e8c06294e4c9f04aeb780ca63d1',
};

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
