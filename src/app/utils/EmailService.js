import nodemailer from "nodemailer";

const email_senha = process.env.EMAIL_SENHA;
const email_email = process.env.EMAIL_EMAIL;

class EmailService {
  constructor() {
  }

  
  async enviarEmailReset(destinatario, senhaTemporaria) {
  // Configuração do transporte (SMTP ou serviço de e-mail)

  console.log("destinatario: " + destinatario);
  console.log("senhaTemporaria: " + senhaTemporaria);

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "leandro.oliveira.developer@gmail.com",
//       pass: "gzksnjdcvhjzowzn"
//     }
//   });

//    const transporter = nodemailer.createTransport({
//      host: "smtp.gmail.com",
//      port: 465,
//      secure: true, // true para 465
//      auth: {
//        user: "leandro.oliveira.developer@gmail.com",
//        pass: "gzksnjdcvhjzowzn"
//      }
//    });

    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "leandro.oliveira.developer@gmail.com",
        pass: "gzksnjdcvhjzowzn"
    },
    tls: {
        rejectUnauthorized: false
    }
    });



  // Conteúdo do e-mail
  const info = await transporter.sendMail({
    from: '"Suporte" <leandro.oliveira.developer@gmail.com>',
    to: destinatario,
    subject: "Recuperação de senha",
    text: `Sua senha temporária é: ${senhaTemporaria}. Faça login e altere imediatamente.`,
    html: `<p>Sua senha temporária é: <b>${senhaTemporaria}</b></p>
           <p>Faça login e altere imediatamente.</p>`
  });

  return info.messageId;

}

async gerarSenhaTemporaria(){
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let senha = "";
  for (let i = 0; i < 6; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    senha += caracteres[indice];
  }
  return senha;
}


}

// exporta como default
export default new EmailService();
