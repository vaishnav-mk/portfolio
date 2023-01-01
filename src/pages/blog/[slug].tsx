import { BlogLayout } from 'layouts/BlogLayout'
import { getAllPostSlugs, getPostData } from 'lib/posts'
import { MDXComponents } from 'components/Blog/MDXComponents'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import readingTime from 'reading-time'
//@ts-ignore
import rehypePrism from '@mapbox/rehype-prism'
import matter from 'gray-matter'
import Image from 'next/image'
import profile from '/public/profile.gif'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'

import remarkSlug from 'remark-slug'

export default function Posts({
  source,
  blogData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BlogLayout title={blogData.title} description={blogData.excerpt}>
      <div className="flex flex-col items-center justify-center px-4 mx-auto mt-8 mb-16 space-y-4 md:px-0">
        <div className="divider">
          <h1 className="text-4xl font-bold">{blogData.title}</h1>
        </div>
        <p className="text-lg text-gray-500">{blogData.excerpt}</p>
        <div className="divider">
          <div className="flex items-center justify-center space-x-2">
            <div className="btn btn-outline btn-success rounded-md btn-xs">
              - {blogData.author}
            </div>
            <div className="btn btn-outline btn-success rounded-md btn-xs">
              {blogData.date}
            </div>
            <div className="btn btn-outline btn-success rounded-md btn-xs">
              {blogData.readingTime.text}
            </div>
          </div>
        </div>
        <div className="prose prose-lg dark:prose-dark">
          <MDXRemote {...source} components={MDXComponents} />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-end space-x-2">
        {blogData.tags?.map((tag: string) => (
          <div
            key={tag}
            className="btn btn-outline btn-success rounded-md btn-xs"
          >
            #{tag}
          </div>
        ))}
      </div>
    </BlogLayout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs()
  return {
    paths,
    fallback: false,
  }
}

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params
  const postContent = await getPostData(params.slug)
  const { data, content } = matter(postContent)
  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      remarkPlugins: [remarkSlug],
      rehypePlugins: [rehypePrism],
      development: false,
    },
  })
  return {
    props: {
      source: mdxSource,
      blogData: { readingTime: readingTime(content), ...data },
    },
  }
}
