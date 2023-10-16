import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'

export const BlogImage = ({
  code,
  image,
  window,
}: {
  image?: string
  window?: string[]
  code?: string[]
}) => {
  if (code)
    return (
      <>
        <div className="mockup-code rounded-md">
          {code?.map((line) => (
            <pre key={uuidv4()} data-prefix="~">
              <code>{line}</code>
            </pre>
          ))}
        </div>
      </>
    )
  else if (image)
    return <img src={image} alt="Blog Image" className="rounded-md" />
  else if (window)
    return (
      <div className="mockup-window border bg-base-300 rounded-md">
        {window.map((line) => (
          <div
            key={uuidv4()}
            className="flex justify-center px-4 py-16 bg-base-200"
          >
            {line}
          </div>
        ))}
      </div>
    )
}

interface Props {
  slug: string
  date: string
  title: string
  excerpt: string
  tags?: string[]
  ms: number
  image: string
  window: string[]
  code: string[]
}

export const BlogCard = ({
  slug,
  date,
  title,
  excerpt,
  tags,
  ms,
  image,
  window,
  code,
}: Props) => {
  return (
    <div className="card outline outline-bgLightText outline-2 shadow-xl rounded-md transition duration-300 ease-in-out transform hover:scale-105">
      <div
        className={`m-10 mb-0 ${image || code || window ? 'block' : 'hidden'}`}
      >
        {BlogImage({ image, window, code })}
      </div>
      <div className="card-body select-none items-center text-center">
        <h2 className="card-title">{title}</h2>
        <div className="btn btn-outline btn-success rounded-md btn-xs">
          {date}
        </div>
        <p>{excerpt}</p>
        <Link key={slug} href="/blog/[slug]" as={`/blog/${slug}`}>
          <a className="inline-block w-full">
            <button className="btn btn-ghost outline-1 outline rounded-md w-full gap-2">
              {ms < 86400000 ? (
                <div className="badge badge-success rounded-md animate-bounce">
                  NEW
                </div>
              ) : (
                ''
              )}{' '}
              Read More
            </button>
          </a>
        </Link>
        <div className="card-actions justify-end">
          {tags?.map((tag) => (
            <div
              key={tag}
              className="btn btn-outline btn-success rounded-md btn-xs"
            >
              #{tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
