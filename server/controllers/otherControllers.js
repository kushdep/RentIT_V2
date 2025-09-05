import mailSender from "../utils/mailSender.js"

export const setContactQuery = async (req, res) => {
    try {
        const { locAuthEmail = null, locAuthName = null, prptrSpecific = null, locName = null, locId, locAddress = null, firstName, lastName, email, phoneNo, message } = req.body

        let emailBody = ''
        let emailTitle = ''
        let senderEmail = prptrSpecific ? locAuthEmail ?? 'kushdep017@gmail.com' : 'kushdep017@gmail.com'

        if (prptrSpecific) {
            if (locAuthEmail !== null && locAddress !== null) {
                emailTitle = `Rental Inquiry for ${locName}`
                emailBody = `<p>Hello ${locAuthName},</p><p> </br> You have received a new inquiry for your rental property <b>${locName} located at ${locAddress}</b></p></br><b>User Details:</b></br><ul><li>Name: ${firstName} ${lastName ?? ""}</li><li>Email: ${email}</li><li>Phone: ${phoneNo}</li></ul></br><b>Message: </b></br><p>${message}</p></br><p>Please reach out to the user directly to proceed further.</p>`
            } else {
                emailTitle = `Unable to Send Rental Inquiry`
                emailBody = `<p>Error Details -</p> </br> <p>Unable to send query to <b>${locAuthEmail ?? 'Email undefined'}</b><p> for the location address : ${(locAddress ?? locId) ?? locName}</p></br> </p></br>  Query raised by :</b></br><ul><li>Name: ${firstName} ${lastName ?? ""}</li><li>Email: ${email}</li><li>Phone: ${phoneNo}</li></ul></br><b>Message: </b></br><p>${message}</p></br>`
            }
        } else {
            emailTitle = `New Contact Form Submission`
            emailBody = `<p>Hello Team,</p> </br><p> You have received a new message from the contact form.</p>
            </br><b>User Details:</b></br><ul><li>Name: ${firstName} ${lastName ?? ""}</li><li>Email: ${email}</li><li>Phone: ${phoneNo}</li></ul></br><b>Message: </b></br><p>${message}</p></br><p>Please reach out to the user as soon as possible.</p>`
        }
        console.log(emailTitle)
        console.log(emailBody)
        console.log(senderEmail)
        if (emailBody !== '' && emailTitle !== '') {
            const mailResponse = await mailSender(
                senderEmail,
                emailTitle,
                emailBody
            );
            if (mailResponse === undefined || mailResponse === null) {
                throw Error(`Unable to send Email`)
            } else {
                return res.status(200).send({
                    success: true,
                    message: "Email Sent"
                })
            }
        } else {
            throw Error(`${emailBody ?? 'Email Body is null or undefined'} ${emailTitle ?? 'Email Title is null or undefined'}`)
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Something Went wrong'
        })
    }
}