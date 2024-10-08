import { promises as fs } from 'fs';
import path from 'path';
import { withSSRTanStackQuery } from '@/withSSRTanStackQuery';
import { HomePage } from '@/routes/HomePage';
import { timeout } from '@/lib/timeout';

export const getServerSideProps = withSSRTanStackQuery<any>(async () => {
  // Imitate slow api
  await timeout();
  const file = await fs.readFile(path.resolve(`public/mocks/articles.json`), 'utf-8')
  return {
    props: JSON.parse(file)
  };
})

export default function Home() {
  return (
    <HomePage />
  );
}
