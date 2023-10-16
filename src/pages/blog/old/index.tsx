import Footer from 'components/Footer'
import { SubLayout } from 'layouts/SubLayout'
import { v4 as uuidv4 } from 'uuid'
import { getSortedPosts } from 'lib/posts'
import { BlogCard } from 'components/Blog/oldBlogPostCard'
import { InferGetStaticPropsType } from 'next'

const Blog = ({
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <SubLayout
      title="Blog"
      description="A collection of blog posts I've written. Sorted chronologically."
      iconTitle={['fas', 'feather']}
    >
      <div className="mt-8 grid gap-4">
        {allPostsData
          .sort((a, b) => {
            if (a.date > b.date) return -1
            if (a.date < b.date) return 1
            return 0
          })
          .map(
            ({ slug, date, title, excerpt, tags, ms, image, window, code }) => {
              return (
                <BlogCard
                  key={uuidv4()}
                  slug={slug}
                  date={date}
                  title={title}
                  excerpt={excerpt}
                  tags={tags}
                  ms={ms}
                  image={image}
                  window={window}
                  code={code}
                />
              )
            },
          )}
      </div>
      <Footer />
    </SubLayout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPosts()
  return {
    props: {
      allPostsData,
    },
  }
}

export default Blog
