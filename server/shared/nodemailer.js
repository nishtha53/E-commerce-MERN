const nodemailer= require("nodemailer")
const sendingMail=(data,subject,reciever)=>{
   // app.get('/sendMail',(request,response)=>
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'nishthathakkar0503@gmail.com',
              pass: 'nishtha050302'
            }
          });
          
          var mailOptions = {
            from: 'nishthathakkar0503@gmail.com',
            to: reciever,
            subject: subject,
            text: data
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
module.exports={sendingMail};