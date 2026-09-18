import { Metadata } from 'next';
import { PAGE_METADATA } from '../../src/lib/metadata';
import Services from '../../src/pages/Services';

export const metadata: Metadata = {
  title: PAGE_METADATA.services.title,
  description: PAGE_METADATA.services.description,
  alternates: {
    canonical: PAGE_METADATA.services.canonical
  }
};

export default function Page() {
  return <Services />;
}
