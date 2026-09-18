import { Metadata } from 'next';
import { PAGE_METADATA } from '../src/lib/metadata';
import Home from '../src/pages/Home';

export const metadata: Metadata = {
  title: PAGE_METADATA.home.title,
  description: PAGE_METADATA.home.description,
  alternates: {
    canonical: PAGE_METADATA.home.canonical
  }
};

export default function Page() {
  return <Home />;
}
