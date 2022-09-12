import { MainLayout } from 'layouts/MainLayout'
import { GenericMeta } from 'components/DefaultMeta'
import Link from 'next/link'
import { SubLayout } from 'layouts/SubLayout'
import { useState } from 'react'
import toast from 'react-hot-toast'
export default function Index() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const save = () => {
    return true
  }
  const submit = (i) => {
    i.preventDefault()
    console.log({ name, message, email })
    toast.error('This is not complete yet!')
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
          description="My door's always open for a good chat with a cup of ☕"
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
                  className="shadow-lg input input-ghost w-full p-6 border border-lightText rounded-md relative input-lg resize-y min-h-10"
                ></textarea>
              </div>
              <div className="mt-10 btn-group grid grid-cols-2 justify-between md:justify-end w-full">
                <button className="btn btn-success" type="submit">
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
          </div>
        </SubLayout>
      </MainLayout>
    </>
  )
}
