import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER || 'e.factorials@gmail.com',
    pass: process.env.SMTP_PASS || 'cfxtdiapaoxmhxnr'
  }
});

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { to, subject, text } = req.body || {};
  const recipient = to || 'e.factorials@gmail.com';

  try {
    let info = await transporter.sendMail({
      from: `"Shinhan BIZ SCANNER" <e.factorials@gmail.com>`,
      to: recipient,
      subject: subject || '[Shinhan BIZ SCANNER] 사업자 분석 리포트',
      text: text
    });

    return res.status(200).json({
      success: true,
      message: `${recipient} 주소로 실제 리포트 이메일이 성공적으로 발송되었습니다!`,
      messageId: info.messageId
    });
  } catch (error) {
    console.error("Vercel Email Send Error:", error);
    return res.status(500).json({
      success: false,
      message: `Gmail 전송 실패: ${error.message}`
    });
  }
}
