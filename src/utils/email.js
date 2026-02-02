import nodemailer from "nodemailer";

export async function enviarEmail({ para, assunto, html }) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Nova Chance" <${process.env.EMAIL_USER}>`,
    to: para,
    subject: assunto,
    html,
  });
}
