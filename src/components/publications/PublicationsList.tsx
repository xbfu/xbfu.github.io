'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    BookOpenIcon,
    ClipboardDocumentIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';
import { Publication } from '@/types/publication';
import { PublicationPageConfig } from '@/types/page';
import { cn, formatPublicationVenue } from '@/lib/utils';
import { useMessages } from '@/lib/i18n/useMessages';
import FormattedBibTeXText from './FormattedBibTeXText';

interface PublicationsListProps {
    config: PublicationPageConfig;
    publications: Publication[];
    embedded?: boolean;
}

export default function PublicationsList({ config, publications, embedded = false }: PublicationsListProps) {
    const messages = useMessages();
    const [expandedBibtexId, setExpandedBibtexId] = useState<string | null>(null);
    const [expandedAbstractId, setExpandedAbstractId] = useState<string | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="mb-8">
                <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-4`}>{config.title}</h1>
                {config.description && (
                    <p className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-muted max-w-2xl`}>
                        {config.description}
                    </p>
                )}
            </div>

            {/* Publications Grid */}
            <div className="space-y-6">
                {publications.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500">
                        {messages.publications.noResults}
                    </div>
                ) : (
                    publications.map((pub, index) => (
                        <motion.div
                            key={pub.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * index }}
                            className="bg-white dark:bg-surface p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-outline hover:shadow-md transition-all duration-200"
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                {pub.preview && (
                                    <div className="w-full md:w-48 flex-shrink-0">
                                        <div className="aspect-video md:aspect-[4/3] relative rounded-lg overflow-hidden bg-neutral-100 dark:bg-surface-raised">
                                            <Image
                                                src={`/papers/${pub.preview}`}
                                                alt={pub.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <h3 className={`${embedded ? "text-lg" : "text-xl"} min-w-0 flex-1 font-semibold text-primary leading-tight`}>
                                            <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />
                                        </h3>
                                        <span className="shrink-0 whitespace-nowrap text-sm text-neutral-500 font-medium bg-neutral-100 dark:bg-surface-raised px-2 py-1 rounded">
                                            {pub.year}
                                        </span>
                                    </div>
                                    <p className={`${embedded ? "text-sm" : "text-base"} text-neutral-600 dark:text-muted mb-2`}>
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
                                    <p className={`${embedded ? "text-sm" : "text-base"} font-semibold text-accent mb-3`}>
                                        {formatPublicationVenue(pub.journal || pub.conference || pub.venue || '')}
                                    </p>

                                    {pub.description && (
                                        <p className="text-sm text-neutral-600 dark:text-muted mb-4 line-clamp-3">
                                            {pub.description}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {[
                                            { label: messages.publications.paper, href: pub.url },
                                            { label: 'arXiv', href: pub.arxivId ? `https://arxiv.org/abs/${pub.arxivId}` : undefined },
                                            { label: 'DOI', href: pub.doi ? `https://doi.org/${pub.doi}` : undefined },
                                            { label: messages.publications.code, href: pub.code },
                                            { label: messages.publications.shortVersion, href: pub.shortVersionUrl },
                                        ].filter((link) => link.href).map((link) => (
                                            <a
                                                key={link.label}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-surface-raised text-neutral-700 dark:text-secondary hover:bg-accent hover:text-white dark:hover:text-background transition-colors"
                                            >
                                                {link.label}
                                            </a>
                                        ))}
                                        {pub.abstract && (
                                            <button
                                                onClick={() => setExpandedAbstractId(expandedAbstractId === pub.id ? null : pub.id)}
                                                className={cn(
                                                    "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium transition-colors",
                                                    expandedAbstractId === pub.id
                                                        ? "bg-accent text-white dark:text-background"
                                                        : "bg-neutral-100 dark:bg-surface-raised text-neutral-700 dark:text-secondary hover:bg-accent hover:text-white dark:hover:text-background"
                                                )}
                                            >
                                                <DocumentTextIcon className="h-3 w-3 mr-1.5" />
                                                {messages.publications.abstract}
                                            </button>
                                        )}
                                        {pub.bibtex && (
                                            <button
                                                onClick={() => setExpandedBibtexId(expandedBibtexId === pub.id ? null : pub.id)}
                                                className={cn(
                                                    "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium transition-colors",
                                                    expandedBibtexId === pub.id
                                                        ? "bg-accent text-white dark:text-background"
                                                        : "bg-neutral-100 dark:bg-surface-raised text-neutral-700 dark:text-secondary hover:bg-accent hover:text-white dark:hover:text-background"
                                                )}
                                            >
                                                <BookOpenIcon className="h-3 w-3 mr-1.5" />
                                                {messages.publications.bibtex}
                                            </button>
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        {expandedAbstractId === pub.id && pub.abstract ? (
                                            <motion.div
                                                key="abstract"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden mt-4"
                                            >
                                                <div className="bg-neutral-50 dark:bg-surface-raised rounded-lg p-4 border border-neutral-200 dark:border-outline">
                                                    <p className="text-sm text-neutral-600 dark:text-muted leading-relaxed">
                                                        {pub.abstract}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ) : null}
                                        {expandedBibtexId === pub.id && pub.bibtex ? (
                                            <motion.div
                                                key="bibtex"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden mt-4"
                                            >
                                                <div className="relative bg-neutral-50 dark:bg-surface-raised rounded-lg p-4 border border-neutral-200 dark:border-outline">
                                                    <pre className="text-xs text-neutral-600 dark:text-muted overflow-x-auto whitespace-pre-wrap font-mono">
                                                        {pub.bibtex}
                                                    </pre>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(pub.bibtex || '');
                                                            // Optional: Show copied feedback
                                                        }}
                                                        className="absolute top-2 right-2 p-1.5 rounded-md bg-white dark:bg-surface-hover text-neutral-500 hover:text-accent shadow-sm border border-neutral-200 dark:border-outline transition-colors"
                                                        title={messages.common.copyToClipboard}
                                                    >
                                                        <ClipboardDocumentIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ) : null}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </motion.div>
    );
}
