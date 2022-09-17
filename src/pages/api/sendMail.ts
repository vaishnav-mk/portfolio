import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, message } = req.body

  let response
  try {
    const form = new FormData()
    form.append('from', `${name} ${email}`)
    form.append('to', `hello@vaishnav.tech`)
    form.append('subject', `Portfolio Contact Form - ${name}`)
    form.append('text', `${message} --contact me at ${email}`)

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
  return res.status(200).json({ result: response })
}
