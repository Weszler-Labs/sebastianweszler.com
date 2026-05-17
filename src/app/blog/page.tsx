import BlogPage from '../[locale]/blog/page';

export default async function BlogPageWrapper() {
  return <BlogPage params={Promise.resolve({ locale: 'en' })} />;
}
