'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';
import FormattedBibTeXText from '@/components/publications/FormattedBibTeXText';
import { formatPublicationVenue } from '@/lib/utils';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    enableOnePageMode?: boolean;
}

export default function SelectedPublications({ publications, title, enableOnePageMode = false }: SelectedPublicationsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.selectedPublications;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-serif font-bold text-primary">{resolvedTitle}</h2>
                <Link
                    href={enableOnePageMode ? "/#publications" : "/publications"}
                    prefetch={true}
                    className="text-accent hover:text-accent-dark text-sm font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                >
                    {messages.home.viewAll} →
                </Link>
            </div>
            <div className="space-y-4">
                {publications.map((pub, index) => (
                    <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="bg-neutral-50 dark:bg-surface p-4 rounded-lg shadow-sm border border-neutral-200 dark:border-outline hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    >
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="min-w-0 flex-1 font-semibold text-primary leading-tight">
                                <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />
                            </h3>
                            <span className="shrink-0 whitespace-nowrap text-sm text-neutral-500 font-medium bg-neutral-100 dark:bg-surface-raised px-2 py-1 rounded">
                                {pub.year}
                            </span>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-muted mb-1">
                            {pub.authors.map((author, idx) => (
                                <span key={idx}>
                                    <span className={author.isHighlighted ? 'font-semibold' : author.isCoAuthor ? 'underline underline-offset-4 decoration-neutral-400' : ''}>
                                        {author.name}
                                    </span>
                                    {author.isCorresponding && (
                                        <sup className="ml-0 text-neutral-600 dark:text-muted">†</sup>
                                    )}
                                    {idx < pub.authors.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                        <p className="text-sm font-semibold text-accent mb-2">
                            {formatPublicationVenue(pub.journal || pub.conference || pub.venue || '')}
                        </p>
                        {pub.description && (
                            <p className="text-sm text-neutral-500 dark:text-muted line-clamp-2">
                                {pub.description}
                            </p>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
