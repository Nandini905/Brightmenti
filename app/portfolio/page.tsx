import { Metadata } from 'next';
import { PAGE_METADATA } from '../../src/lib/metadata';
import Portfolio from '../../src/pages/Portfolio';

export const metadata: Metadata = {
  title: PAGE_METADATA.portfolio.title,
  description: PAGE_METADATA.portfolio.description,
  alternates: {
    canonical: PAGE_METADATA.portfolio.canonical
  }
};

export default function Page() {
  return <Portfolio />;
}
