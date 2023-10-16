import { SubLayout } from 'layouts/SubLayout';
import { BlogCard } from 'components/Blog/BlogPostCard';
import useSWR from 'swr';

interface BlogPost {
  link: string;
  date: Date;
  title: string;
  excerpt: string;
  tags: string[];
  ms: number;
  image: string;
  isNew: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Blog: React.FC = () => {
  const { data, error } = useSWR('/api/medium/posts', fetcher);

  if (error) {
    return <div>Error loading blog posts</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const currentDate = new Date();
  const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  const posts: BlogPost[] = data.rss.channel.item.map((blog) => {
    const postDate = new Date(blog['pubDate']);
    const isPostNew = postDate >= oneWeekAgo;

    const excerpt = blog['content:encoded']
      .match(/<p>(.*?)<\/p>/)[1]
      .replace(/(<([^>]+)>)/gi, '')
      .slice(0, 200) + '...';

    return {
      link: blog['guid'],
      date: postDate,
      title: blog['title'],
      excerpt,
      tags: blog['category'],
      ms: 0,
      image: blog['content:encoded'].match(/src="([^"]*)"/)[1],
      isNew: isPostNew,
    };
  });

  posts.sort((a, b) => b.date.getTime() - a.date.getTime()); 

  return (
    <SubLayout
      title="Blog"
      description="A collection of blog posts I've written. Sorted chronologically."
      iconTitle={['fas', 'feather']}
    >
      <div className="mt-8 grid grid-flow-row gap-4">
        {posts.map((post, index) => (
          <BlogCard
            key={index}
            link={post.link}
            date={post.date.toUTCString()}
            title={post.title}
            excerpt={post.excerpt}
            tags={post.tags}
            ms={3}
            image={post.image}
            isNew={post.isNew} 
          />
        ))}
      </div>
    </SubLayout>
  );
};

export default Blog;
