import nodemailer from 'nodemailer'

async function sendTempPasswordEmail(
  receiveEmail: string,
  tempPassword: string,
) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true,
  })

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: receiveEmail,
    subject: '새로운 비밀번호 발급',
    text: `새로운 비밀번호: ${tempPassword}`,
  }

  await transporter.sendMail(mailOptions)
}

export default sendTempPasswordEmail
