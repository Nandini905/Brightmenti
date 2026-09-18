import { Metadata } from 'next';
import { PAGE_METADATA } from '../../src/lib/metadata';
import Booking from '../../src/pages/Booking';

export const metadata: Metadata = {
  title: PAGE_METADATA.booking.title,
  description: PAGE_METADATA.booking.description,
  alternates: {
    canonical: PAGE_METADATA.booking.canonical
  }
};

export default function Page() {
  return <Booking />;
}
