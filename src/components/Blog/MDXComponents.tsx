import Link from 'next/link'
import Image from 'next/future/image'
import { useState } from 'react'
const CustomLink = (props: any) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    )
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="italic underline text-[#36D399]"
      {...props}
    />
  )
}

function RoundedImage(props: any) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function Callout(props: any) {
  return (
    <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-4 my-8">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout">{props.children}</div>
    </div>
  )
}

function CodeBlock(props: any) {
  const [copied, setCopied] = useState(false)
  let lines: any[] = []
  let line = ''
  props.children.props.children.map((l: any, index: number) => {
    if (l.type === 'span') {
      line += l.props.children
    } else if (l === ' ') {
      line += ' '
    } else if (l.includes('\n')) {
      const split = l.split('\n')
      split.forEach((s: any) => {
        if (s !== '') {
          line += s
        } else {
          lines.push(line)
          line = ''
        }
      })
    }
  })
  lines = lines.filter((l) => l !== '')
  const copy = () => {
    navigator.clipboard.writeText(lines.join('\r\n'))
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }
  return (
    <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 my-8">
      <div className="italic">
        <code>
          {props.className.split('-').at(-1)} - {lines.length} lines
        </code>
      </div>
      <div className="mockup-code rounded-md">
        <button
          className={`btn btn-sm rounded-md ${
            copied ? 'btn-success btn-outline' : 'btn-ghost'
          } absolute bottom-0 right-0 m-1`}
          onClick={(e) => copy()}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        {lines.map((line: any, index: number) => (
          <pre key={line.key} data-prefix={index + 1}>
            <code>{line}</code>
          </pre>
        ))}
      </div>
    </div>
  )
}

function GithubCard(props: any) {
  const { title, description, username } = props
  const url = `https://github.com/${username}/${title}`
  return (
    <div className="flex flex-col sm:flex-row p-6 outline outline-2 outline-lightText rounded-md select-none hover:bg-cardLight dark:md:hover:bg-cardDark transition duration-300 ease-in-out transform hover:scale-105 mb-10">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="card-text">{description}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View on Github
          </a>
        </div>
    </div>
  )
}

export const MDXComponents = {
  Image: RoundedImage,
  a: CustomLink,
  Callout,
  pre: CodeBlock,
  GithubCard,
}
