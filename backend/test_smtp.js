require('dotenv').config();
const nodemailer = require('nodemailer');

async function testSMTP() {
  console.log('Testing SMTP with:');
  console.log(`User: ${process.env.SMTP_USER}`);
  console.log(`Host: ${process.env.SMTP_HOST}`);
  console.log(`Port: ${process.env.SMTP_PORT}`);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    console.log('Attempting to send test email...');
    const info = await transporter.sendMail({
      from: `"Resumify Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: 'Resumify SMTP Test',
      text: 'If you see this, your SMTP settings are correct!',
      html: '<h1>Success!</h1><p>Your SMTP settings are working perfectly.</p>',
    });
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (err) {
    console.error('❌ SMTP Test Failed:');
    console.error(err.message);
    if (err.message.includes('Invalid login')) {
      console.log('\n💡 SUGGESTION: Your password was rejected. This usually means you are using your regular Gmail password instead of an "App Password". Please create one in your Google account security settings.');
    }
  }
}

testSMTP();
