import { BlogItemPage } from '@/routes/BlogItemPage';
import { promises as fs } from 'fs';
import path from 'path';
import { withSSRTanStackQuery } from '@/withSSRTanStackQuery';
import { timeout } from '@/lib/timeout';

export default function Page() {
  return (
    <BlogItemPage />
  )
}
export const getServerSideProps = withSSRTanStackQuery<any, { slug: string }>(async ({ params }) => {
  // Imitate slow api
  await timeout();
  const { slug } = params ?? {};
  try {
    const file = await fs.readFile(path.resolve(`public/mocks/${slug}.json`), 'utf-8')
    return {
      props: JSON.parse(file),
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
})