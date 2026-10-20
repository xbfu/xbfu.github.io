import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTomlContent } from '@/lib/content';

interface Presenter {
  name: string;
  institution: string;
  image: string;
  url: string;
}

interface Organizer {
  name: string;
  role: string;
  institution: string;
  url: string;
}

interface Tutorial {
  title: string;
  event: string;
  time: string;
  location: string;
  logo: string;
  survey_url: string;
  slides_url: string;
  abstract: string;
  topics: string[];
  presenters: Presenter[];
  organizers: Organizer[];
}

function getTutorial(): Tutorial {
  const tutorial = getTomlContent<Tutorial>('tutorials/kdd25-graph-prompting.toml');
  if (!tutorial) notFound();
  return tutorial;
}

export function generateMetadata(): Metadata {
  const tutorial = getTutorial();
  return { title: `${tutorial.event}: ${tutorial.title}` };
}

const resourceClassName = 'inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-surface-raised text-neutral-700 dark:text-secondary hover:bg-accent hover:text-white dark:hover:text-background transition-colors';
const headingClassName = 'text-2xl font-serif font-bold text-primary mb-5';

export default function GraphPromptingTutorial() {
  const tutorial = getTutorial();

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <header>
        <Link href="/tutorials/" className="text-sm text-accent hover:underline underline-offset-4">
          ← Tutorials
        </Link>
        <p className="mt-8 mb-3 text-sm font-semibold text-accent">{tutorial.event}</p>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary leading-tight text-balance">
          {tutorial.title}
        </h1>
      </header>

      <section aria-label="Event details" className="rounded-xl border border-neutral-200 dark:border-outline bg-white dark:bg-surface p-5 sm:p-7">
        <Image
          src={tutorial.logo}
          alt="KDD 2025"
          width={2048}
          height={461}
          className="w-64 sm:w-80 max-w-full h-auto bg-white rounded-lg p-3 mb-6"
        />
        <dl className="space-y-3 text-neutral-600 dark:text-secondary">
          <div className="sm:flex sm:gap-4">
            <dt className="sm:w-20 shrink-0 font-semibold text-primary">Time</dt>
            <dd>{tutorial.time}</dd>
          </div>
          <div className="sm:flex sm:gap-4">
            <dt className="sm:w-20 shrink-0 font-semibold text-primary">Location</dt>
            <dd>{tutorial.location}</dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-2 mt-6">
          <a href={tutorial.survey_url} target="_blank" rel="noopener noreferrer" className={resourceClassName}>
            Survey paper
          </a>
          <a href={tutorial.slides_url} target="_blank" rel="noopener noreferrer" className={resourceClassName}>
            Slides
          </a>
        </div>
      </section>

      <section aria-labelledby="abstract">
        <h2 id="abstract" className={headingClassName}>Abstract</h2>
        <p className="text-neutral-700 dark:text-secondary leading-relaxed">{tutorial.abstract.trim()}</p>
        <ul className="list-disc pl-5 mt-5 space-y-3 text-neutral-700 dark:text-secondary">
          {tutorial.topics.map((topic) => <li key={topic}>{topic}</li>)}
        </ul>
      </section>

      <section aria-labelledby="presenters">
        <h2 id="presenters" className={headingClassName}>Presenters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {tutorial.presenters.map((presenter) => (
            <div key={presenter.name} className="rounded-xl border border-neutral-200 dark:border-outline bg-white dark:bg-surface p-6 text-center">
              <Image
                src={presenter.image}
                alt={presenter.name}
                width={249}
                height={289}
                className="w-28 h-32 object-cover rounded-lg mx-auto mb-4"
              />
              <a href={presenter.url} className="font-semibold text-accent hover:underline underline-offset-4">
                {presenter.name}
              </a>
              <p className="mt-1 text-sm text-neutral-600 dark:text-muted">{presenter.institution}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="organizers">
        <h2 id="organizers" className={headingClassName}>Organizers</h2>
        <ul className="divide-y divide-neutral-200 dark:divide-outline">
          {tutorial.organizers.map((organizer) => (
            <li key={organizer.name} className="py-3 text-sm leading-relaxed text-neutral-600 dark:text-secondary">
              <a href={organizer.url} className="font-semibold text-accent hover:underline underline-offset-4">
                {organizer.name}
              </a>
              {`, ${organizer.role}, ${organizer.institution}`}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
