import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PORTFOLIO_PROJECTS } from '../../../src/content/portfolio';
import { getProjectSchema } from '../../../src/lib/schema';
import CaseStudyLayout from '../../../src/components/CaseStudyLayout';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Case Study Not Found | Brightmenti' };

  return {
    title: `${project.title} | Case Study | Brightmenti`,
    description: project.shortDescription,
    alternates: {
      canonical: `https://brightmenti.com/portfolio/${project.slug}`
    }
  };
}

export default function Page({ params }: Props) {
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const schema = getProjectSchema({
    title: project.title,
    description: project.shortDescription,
    slug: project.slug,
    industry: project.industry
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CaseStudyLayout project={project} />
    </>
  );
}
