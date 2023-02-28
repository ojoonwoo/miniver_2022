const nodemailer = require('nodemailer');
const senderInfo = require('./../senderInfo.json');
// 메일발송 객체
const mailSender = {
  // 메일발송 함수
  sendGmail: function (param) {
    var transporter = nodemailer.createTransport({
      port: 587,
      host: 'smtp.worksmobile.com',  
      secure: true,  
      requireTLS: true,
      auth: {
        user: senderInfo.user,
        pass: senderInfo.pass
      }
    });
    // 메일 옵션
    var mailOptions = {
      from: '"미니버타이징 홈페이지" ' + senderInfo.user,
      to: param.toEmail,
      subject: param.subject,
      text: param.text,
      html: param.html,
    };
    
    // 메일 발송    
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  }
}

module.exports = mailSender;