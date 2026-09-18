import { Metadata } from 'next';
import { PAGE_METADATA } from '../../src/lib/metadata';
import About from '../../src/pages/About';

export const metadata: Metadata = {
  title: PAGE_METADATA.about.title,
  description: PAGE_METADATA.about.description,
  alternates: {
    canonical: PAGE_METADATA.about.canonical
  }
};

export default function Page() {
  return <About />;
}
