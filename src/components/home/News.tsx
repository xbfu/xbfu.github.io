'use client';

import { motion } from 'framer-motion';
import { useMessages } from '@/lib/i18n/useMessages';

export interface NewsItem {
    date: string;
    content: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
}

export default function News({ items, title }: NewsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.news;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{resolvedTitle}</h2>
            <div
                className="max-h-64 overflow-y-auto overscroll-contain rounded-md border border-neutral-300/80 bg-white/60 px-4 dark:border-outline/80 dark:bg-surface"
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--color-neutral-400) transparent' }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-[4rem_minmax(0,1fr)] gap-x-4 border-b border-neutral-200/80 py-3 last:border-b-0 dark:border-outline/70"
                    >
                        <span className="pt-0.5 font-mono text-[11px] text-neutral-500 dark:text-muted">{item.date}</span>
                        <p className="border-l border-primary/25 dark:border-outline pl-4 text-sm leading-relaxed text-neutral-700 dark:text-secondary">
                            {item.content}
                        </p>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
