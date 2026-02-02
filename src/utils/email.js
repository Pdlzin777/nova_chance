import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function emailCadastroEmpresa(empresa) {
  await transporter.sendMail({
    to: empresa.email,
    subject: "Cadastro realizado",
    html: `<h2>Olá ${empresa.nome}</h2><p>Cadastro realizado com sucesso.</p>`
  });
}

export async function emailNovaDemanda(email) {
  await transporter.sendMail({
    to: email,
    subject: "Nova demanda disponível",
    html: `<p>Uma nova demanda foi cadastrada no sistema.</p>`
  });
}
