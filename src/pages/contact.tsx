import { MainLayout } from 'layouts/MainLayout'
import { GenericMeta } from 'components/DefaultMeta'
import { SubLayout } from 'layouts/SubLayout'
import toast from 'react-hot-toast'
import Script from 'next/script'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
class Page extends React.Component {
  static async getInitialProps(ctx: any) {
    let isMobileView = (
      ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
    ).match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
    )

    return {
      isMobileView: Boolean(isMobileView),
    }
  }
  render() {
    // @ts-ignore
    const isMobileView: boolean = this.props.isMobileView
    const handleSubmit = async (event: any) => {
      event.preventDefault()
      const toastId = toast.loading('Sending Email...')

      const form = event.target
      const name = form.name.value
      const email = form.email.value
      const message = form.message.value
      const token = new FormData(form).get('cf-turnstile-response')
      const data = {
        token,
        name,
        email,
        message,
      }
      const res = await fetch('/api/formSubmit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())

      if (res.status !== 200) {
        toast.error(
          res.error ||
            'There was an error in sending that message, please try again later or email me at hello@vaishnav.tech!',
          {
            id: toastId,
          },
        )
      } else {
        toast.success(
          `${name}, your email has been sent! I'll get back to you as soon as possible!`,
          {
            id: toastId,
          },
        )
      }
    }
    const resetForm = () => {
      const form = document.getElementById('contactForm') as HTMLFormElement
      form.reset()
      toast.success('Successfully reset the form!')
    }
    const turnstile_callback = (event: any) => {
      console.log("g")
      console.log({ event })
    }
    return (
      <>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async={true}
          defer={true}
        />
        <GenericMeta
          title="Contact"
          description="Contact me for any queries or suggestions!"
        />
        <MainLayout>
          <SubLayout
            title="Contact Me"
            iconDesc={['fas', 'coffee']}
            iconTitle={['fas', 'envelope']}
            description="My door's always open for a good chat with a cup of"
          >
            <div className="mb-8"></div>
            <div className="p-6 border border-lightText rounded-md mb-4 overflow-hidden">
              <h1 className="text-2xl font-bold mb-2">Get in touch</h1>
              <h3>
                <code>
                  Leave me a message and I&apos;ll get back to you soon!
                </code>
              </h3>
              <form onSubmit={handleSubmit} id="contactForm">
                <div className="rounded-xl">
                  {' '}
                  <div className="landingSectionTitle text-left relative m-4 ml-0 md:w-max">
                    <div className="btn btn-ghost outline outline-1">
                      E-Mail
                    </div>
                  </div>
                  <input
                    required
                    type="email"
                    placeholder="someone@gmail.com"
                    className="shadow-lg input input-ghost w-full p-6 border border-lightText rounded-md relative"
                    id="email"
                  />
                </div>
                <div className="rounded-xl">
                  {' '}
                  <div className="landingSectionTitle text-left relative m-4 ml-0 md:w-max">
                    <div className="btn btn-ghost outline outline-1">
                      Your name
                    </div>
                  </div>
                  <input
                    type="text"
                    id="name"
                    minLength={3}
                    placeholder="Darth Vader"
                    className="shadow-lg input input-ghost w-full p-6 border border-lightText rounded-md relative"
                    required
                  />
                </div>
                <div className="rounded-xl">
                  {' '}
                  <div className="landingSectionTitle text-left relative m-4 ml-0 md:w-max">
                    <div className="btn btn-ghost outline outline-1">
                      Message
                    </div>
                  </div>
                  <textarea
                    required
                    id="message"
                    minLength={10}
                    maxLength={250}
                    placeholder="I would like to talk to you about..."
                    className="shadow-lg input input-ghost w-full p-6 border border-lightText rounded-md relative resize-y h-24"
                  ></textarea>
                  <div className="landingSectionTitle text-left relative m-4 ml-0 md:w-max">
                    <div className="btn btn-error btn-outline">captcha</div>
                  </div>
                  <div className="p-6 border border-lightText rounded-md mb-4 w-auto h-auto">
                    <div className="badge badge-info rounded-sm">
                      Reload page if it&apos;s not visible
                    </div>
                    <div
                      className="cf-turnstile bg-transparent"
                      data-sitekey={
                        process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY
                      }
                      data-size={isMobileView ? 'compact' : 'normal'}
                      data-callback="turnstile_callback"
                      data-expired-callback="turnstile_callback"
                      data-timeout-callback="turnstile_callback"
                      data-error-callback="turnstile_callback"
                      data-theme="dark"
                      id="captcha"
                    ></div>
                  </div>
                </div>
                <div className="mt-10 btn-group grid grid-cols-2 justify-between md:justify-end w-full">
                  <button
                    className="btn btn-success modal-button"
                    type="submit"
                  >
                    submit
                  </button>
                  <button
                    className="btn btn-error btn-outline w-full"
                    onClick={resetForm}
                  >
                    reset
                  </button>
                </div>
              </form>
            </div>
          </SubLayout>
        </MainLayout>
      </>
    )
  }
}

export default Page
