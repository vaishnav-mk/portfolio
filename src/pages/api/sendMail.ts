import { NextApiRequest, NextApiResponse } from 'next'
import FormData from 'form-data'

async function sendMail(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' })
  }
  // const validation = await fetch('/api/validateSolution', {
  //   method: 'POST',
  //   body: { solution },
  // })
  let response
  try {
    const form: any = new FormData()
    form.append('from', `${name} ${email}`)
    form.append('to', `hello@vaishnav.tech`)
    form.append('subject', `Portfolio Contact Form - ${name}`)
    form.append('text', `${message} \n--contact me at ${email}`)

    response = await fetch(process.env.DOMAIN + '/messages', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' + btoa('api' + ':' + process.env.MAILGUN_API_KEY),
      },
      body: form,
    })
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({ error: error.message })
  }
  return res.status(200).json({ response })
}

export default sendMail
