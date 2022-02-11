const nodemailer = require('nodemailer')
const UserDao = require('../../dao/user/UserDao')
const { PassRecoveryJWT } = require('../../helpers/GenerarJWT')

const userDao = new UserDao()

exports.send = async (req, res) => {
  const { email } = req.body.form
  const userData = await userDao.getUserByEmail(email)
  const token = await PassRecoveryJWT(email, userData.password)

  const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  })

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Recuperación de contraseña',
    html: `
        <!DOCTYPE html>
        <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
          <head>
            <meta charset="utf-8">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
            <!--[if mso]>
            <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
            <style>
              td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
            </style>
          <![endif]-->
            <title>Reset your Password</title>
            <link href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700" rel="stylesheet" media="screen">
            <style>
              .hover-underline:hover {
                text-decoration: underline !important;
              }
        
              @keyframes spin {
                to {
                  transform: rotate(360deg);
                }
              }
        
              @keyframes ping {
        
                75%,
                100% {
                  transform: scale(2);
                  opacity: 0;
                }
              }
        
              @keyframes pulse {
                50% {
                  opacity: .5;
                }
              }
        
              @keyframes bounce {
        
                0%,
                100% {
                  transform: translateY(-25%);
                  animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
                }
        
                50% {
                  transform: none;
                  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
                }
              }
        
              @media (max-width: 600px) {
                .sm-px-24 {
                  padding-left: 24px !important;
                  padding-right: 24px !important;
                }
        
                .sm-py-32 {
                  padding-top: 32px !important;
                  padding-bottom: 32px !important;
                }
        
                .sm-w-full {
                  width: 100% !important;
                }
              }
            </style>
          </head>
        
          <body style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; --bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity));">
            <div style="display: none;">A request to reset password was received from your PixInvent Account</div>
            <div role="article" aria-roledescription="email" aria-label="Reset your Password" lang="en">
              <table style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center" style="--bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity)); font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;" bgcolor="rgba(236, 239, 241, var(--bg-opacity))">
                    <table class="sm-w-full" style="font-family: 'Montserrat',Arial,sans-serif; width: 600px;" width="600" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td align="center" class="sm-px-24" style="font-family: 'Montserrat',Arial,sans-serif;">
                          <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td class="sm-px-24" style="--bg-opacity: 1; background-color: #ffffff; background-color: rgba(255, 255, 255, var(--bg-opacity)); border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1; color: #626262; color: rgba(98, 98, 98, var(--text-opacity));" bgcolor="rgba(255, 255, 255, var(--bg-opacity))" align="left">
                                <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">¡Hola!</p>
                                <p style="font-weight: 700; font-size: 20px; margin-top: 0; --text-opacity: 1; color: #ff5850; color: rgba(255, 88, 80, var(--text-opacity));">${userData.fullname}</p>
                                <p style="margin: 0 0 24px;">
                                    Se ha recibido una petición para restablecer su contraseña.
                                </p>
                                <p style="margin: 0 0 24px;">Usa este enlace para reestablecerla.</p>
                                <table style="font-family: 'Montserrat',Arial,sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td style="mso-padding-alt: 16px 24px; --bg-opacity: 1; background-color: #7367f0; background-color: rgba(115, 103, 240, var(--bg-opacity)); border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;" bgcolor="rgba(115, 103, 240, var(--bg-opacity))">
                                      <a href="${process.env.ORIGIN}/reset-password/${token}" style="display: block; font-weight: 600; font-size: 14px; line-height: 100%; padding: 16px 24px; --text-opacity: 1; color: #ffffff; color: rgba(255, 255, 255, var(--text-opacity)); text-decoration: none;">Reestablecer contraseña</a>
                                    </td>
                                  </tr>
                                </table>
                                <p style="margin: 24px 0;">
                                  <span style="font-weight: 600;">Nota:</span> 
                                  Este enlace solo es válido para los próximos 10 minutos y solo puede ser usado una sola vez.
                                </p>
                                <p style="margin: 0;">
                                    Si no has sido tú quien ha realizado la petición, hágaselo saber a su administrador.
                                </p>
                                <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td style="font-family: 'Montserrat',Arial,sans-serif; padding-top: 32px; padding-bottom: 32px;">
                                      <div style="--bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity)); height: 1px; line-height: 1px;">&zwnj;</div>
                                    </td>
                                  </tr>
                                </table>
                                <p style="margin: 0 0 16px;">Gracias, <br>Grupo SFP</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </body>
        
        </html>`
  }

  try {
    let emailMessage
    smtpTransport.sendMail(mailOptions, (error, response) => {

      if (error) {
        emailMessage = error;
      } else {
        emailMessage = "Message sent: " + response;
      }
      return res.json({ ok: true, msg: emailMessage })
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}