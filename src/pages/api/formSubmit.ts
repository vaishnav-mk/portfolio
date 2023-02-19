import { NextApiRequest, NextApiResponse } from 'next'

const CLOUDFLARE_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const { CF_SECRET_KEY } = process.env

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name, email, message, token } = req.body

  if (!name || !email || !message || !token) {
    return res.status(400).json({ error: 'Missing fields' })
  }
  let captchaVerification: any
  try {
    captchaVerification = await fetch(CLOUDFLARE_URL, {
      body: JSON.stringify({
        response: token,
        secret: CF_SECRET_KEY,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
  } catch (error: any) {
    console.log({ error })
    return res.status(500).json({ error: error.message })
  }

  if (!captchaVerification?.success) {
    return res
      .status(400)
      .json({ error: 'Captcha failed, retry again!', captchaVerification })
  }

  const form: any = new FormData()
  form.append('from', `Portfolio Contact Form <${name}> <${email}>`)
  form.append('to', `hello@vaishnav.tech`)
  form.append('subject', `Portfolio Contact Form - ${name}`)
  form.append('text', `${message} \n--contact me at ${email}`)

  const response = await fetch(process.env.DOMAIN + '/messages', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa('api' + ':' + process.env.MAILGUN_API_KEY),
    },
    body: form,
  })
    .then((res) => res.json())
    .catch((error: any) => {
      return res.status(error.statusCode || 500).json({ error: error.message })
    })

  return res.status(200).json({
    message: `${name}, your email has been sent! I'll get back to you as soon as possible!`,
  })
}
