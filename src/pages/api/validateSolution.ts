import { NextApiRequest, NextApiResponse } from 'next'
import FormData from 'form-data'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { solution } = req.body
  const { FRIENDLY_CAPTCHA_API_KEY, FRIENDLY_CAPTCHA_SITEKEY } = process.env

  let response
  try {
    const form: any = new FormData()
    form.append('solution', solution)
    form.append('secret', FRIENDLY_CAPTCHA_API_KEY)
    form.append('sitekey', FRIENDLY_CAPTCHA_SITEKEY)

    response = await fetch(
      'https://api.friendlycaptcha.com/api/v1/siteverify',
      {
        method: 'POST',
        body: form,
      },
    )
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({ error: error.message })
  }
  return res.status(200).json({ response })
}
