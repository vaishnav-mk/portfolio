import { MainLayout } from 'layouts/MainLayout'
import { GenericMeta } from 'components/DefaultMeta'
import Link from 'next/link'
import { SubLayout } from 'layouts/SubLayout'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Index() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [popupVisible, bringPopup] = useState(false)

  const finalSubmit = async () => {
    await toast.promise(sendEmail(), {
      loading: 'Sending Email...',
      error:
        'There was an error in sending that message, please try again later or email me at hello@vaishnav.tech!',
      success: `${name}, your email has been sent! I'll get back to you as soon as possible!`,
    })
    bringPopup(false)
  }

  const makeChanges = () => {
    toast(
      'Please make the changes you want to make and then click submit again!',
    )
    bringPopup(false)
  }

  const sendEmail = async () => {
    if (!email || !name || !message)
      return toast.error(
        'Please make sure that you have filled out all the fields! (message, name, email)',
      )
    let response = await fetch('/api/sendMail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        message,
      }),
    })
  }

  const submit = async (i: any) => {
    i.preventDefault()
    bringPopup(true)
  }

  const reset = () => {
    setEmail('')
    setMessage('')
    setName('')
    toast.success('Sucessfully reset the form!')
  }
  return (
    <>
      <GenericMeta
        title="Vaishnav | Contact"
        description="Get in touch with Vaishnav!"
      />
      <MainLayout margin={false}>
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
            <form onSubmit={submit}>
              <div className="rounded-xl">
                {' '}
                <div className="landingSectionTitle text-left relative m-4 ml-0 md:w-max">
                  <div className="btn btn-ghost outline outline-1">E-Mail</div>
                </div>
                <input
                  required
                  value={email}
                  type="email"
                  placeholder="someone@gmail.com"
                  className="shadow-lg input input-ghost w-full p-6 border border-lightText rounded-md relative"
                  id="email"
                  onChange={(i) => setEmail(i.target.value)}
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
                  id="Name"
                  value={name}
                  minLength={3}
                  onChange={(i) => setName(i.target.value)}
                  placeholder="Darth Vader"
                  className="shadow-lg input input-ghost w-full p-6 border border-lightText rounded-md relative"
                  required
                />
              </div>
              <div className="rounded-xl">
                {' '}
                <div className="landingSectionTitle text-left relative m-4 ml-0 md:w-max">
                  <div className="btn btn-ghost outline outline-1">Message</div>
                </div>
                <textarea
                  required
                  value={message}
                  id="message"
                  minLength={10}
                  maxLength={250}
                  onChange={(i) => setMessage(i.target.value)}
                  placeholder="I would like to talk to you about..."
                  className="shadow-lg input input-ghost w-full p-6 border border-lightText rounded-md relative resize-y h-24"
                ></textarea>
              </div>

              <div className="mt-10 btn-group grid grid-cols-2 justify-between md:justify-end w-full">
                <button className="btn btn-success modal-button" type="submit">
                  submit
                </button>
                <button
                  className="btn btn-error btn-outline w-full"
                  onClick={reset}
                >
                  reset
                </button>
              </div>
            </form>
            <input
              type="checkbox"
              id="my-modal"
              className="modal-toggle"
              checked={popupVisible}
              onChange={reset}
            />
            <div className="modal">
              <div className="modal-box rounded-md bg-bgLight dark:bg-bgDark outline outline-lightText outline-1">
                <h3 className="font-bold text-lg">
                  ...almost there! Please review your message and click submit
                </h3>
                <div className="btn-group btn-group-vertical outline outline-lightText rounded-md outline-1">
                  {Object.entries({ email, name, message }).map(([k, v]) => (
                    <button
                      key={uuidv4()}
                      className="btn btn-ghost btn-disabled text-lightText break-all h-auto p-2 gap-2 justify-start"
                    >
                      <span className="badge badge-outline dark:badge-info rounded-md">
                        {k} —
                      </span>{' '}
                      <code>{v}</code>
                    </button>
                  ))}
                </div>

                <div className="modal-action">
                  <div className="mt-10 btn-group grid grid-cols-2 justify-between md:justify-end w-full">
                    <button
                      className="btn btn-success btn-outline"
                      onClick={finalSubmit}
                    >
                      submit
                    </button>
                    <button
                      className="btn btn-warning btn-outline w-full"
                      onClick={makeChanges}
                    >
                      Make Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SubLayout>
      </MainLayout>
    </>
  )
}
