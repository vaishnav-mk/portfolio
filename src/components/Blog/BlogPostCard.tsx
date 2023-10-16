import Link from 'next/link'

interface Props {
  link: string
  date: string
  title: string
  excerpt: string
  tags?: string[]
  ms: number
  image?: string
  isNew: boolean // New flag
  window?: string[]
  code?: string[]
}

export const BlogCard = ({
  link,
  date,
  title,
  excerpt,
  tags,
  image,
  isNew,
}: Props) => {
  return (
    <Link href={link}>
      <div className="flex flex-col md:flex-row p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-xl justify-between cursor-pointer">
        <div className="flex flex-col md:w-4/5 md:pr-4">
          <div className="flex flex-row flex-wrap gap-2">
            {tags?.map((tag: string, index: number) => (
              <div
                key={index}
                className="badge text-white rounded-md p-1 h-auto gap-2"
              >
                <span className="badge bg-primary text-white rounded-full">
                  #
                </span>
                {tag}
              </div>
            ))}
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </div>
            <div className="mt-2 text-gray-600 dark:text-gray-300">
              {excerpt}
            </div>
            <div className="mt-2 text-gray-500 dark:text-gray-400 badge rounded-md p-1 h-auto gap-2">
              {isNew && <span className="badge badge-error">New!</span>}
              Published on {date}
            </div>
          </div>
        </div>
        {image && (
          <div className="w-full h-48 mt-4 md:w-48 md:mt-0 md:flex-shrink-0 md:self-start">
            <img
              src={image}
              alt="blog"
              className="w-full h-full rounded-md object-cover"
            />
          </div>
        )}
      </div>
    </Link>
  )
}
