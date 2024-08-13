import Image from "next/image";
import { promises as fs } from 'fs';
import path from 'path';
import { withSSRTanStackQuery } from '@/withSSRTanStackQuery';
import { HomePage } from '@/routes/HomePage';

export const getServerSideProps = withSSRTanStackQuery<any>(async () => {
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
