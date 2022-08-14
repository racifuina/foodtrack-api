import nodemailer from 'nodemailer';
import smtpTransportRequire from 'nodemailer-smtp-transport';
import dotenv from 'dotenv';
dotenv.config();

const smtpTransport = nodemailer.createTransport(
	smtpTransportRequire({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		}
	})
);

export default smtpTransport