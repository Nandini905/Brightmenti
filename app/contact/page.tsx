import { Metadata } from 'next';
import { PAGE_METADATA } from '../../src/lib/metadata';
import Contact from '../../src/pages/Contact';

export const metadata: Metadata = {
  title: PAGE_METADATA.contact.title,
  description: PAGE_METADATA.contact.description,
  alternates: {
    canonical: PAGE_METADATA.contact.canonical
  }
};

export default function Page() {
  return <Contact />;
}
