const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('BKP Server Final Version is Live!');
});

app.get('/send-otp', async (req, res) => {
  const { email, otp } = req.query;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bkptournament@gmail.com',
      pass: 'aglo dmyb jgew ygkv'
    }
  });

  const mailOptions = {
    from: '"BKP ESPORTS" <bkptournament@gmail.com>',
    to: email,
    subject: 'OTP: ' + otp,
    text: 'Aapka OTP code hai: ' + otp
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email Sent Successfully');
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
