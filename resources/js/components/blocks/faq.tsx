import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const FAQS = [
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept credit/debit cards, PayPal, and bank transfers.',
    },
    {
        question: 'How long does shipping take?',
        answer: 'Shipping times vary by location, but most orders arrive within 5-10 days.',
    },
    {
        question: 'Are your perfumes original?',
        answer: 'Yes, all our perfumes are exclusively crafted with high-quality ingredients.',
    },
    {
        question: 'Do you offer returns or refunds?',
        answer: 'We accept returns within 14 days if the product is damaged or not as described.',
    },
    {
        question: 'Can I request a custom fragrance?',
        answer: 'Yes, we offer custom fragrance blending for a personalized scent experience.',
    },
];

export const FAQ = () => {
    const [openItem, setOpenItem] = useState<string | undefined>(FAQS[0]?.question || '');
    return (
        <Accordion type="single" collapsible value={openItem} onValueChange={(value) => setOpenItem(value || '')} className="w-full">
            {FAQS.map((faq, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.2 }}
                    viewport={{ once: true }}
                >
                    <FaqAccordionCard openItem={openItem} question={faq.question} index={i} answer={faq.answer} />
                </motion.div>
            ))}
        </Accordion>
    );
};

interface AccordionCardProps {
    openItem: string | undefined;
    question: string;
    index: number;
    answer: string;
}

export const FaqAccordionCard = ({ openItem, question, answer, index }: AccordionCardProps) => {
    return (
        <AccordionItem value={question}>
            <AccordionTrigger className={cn('group cursor-pointer border-none py-4 hover:text-neutral-300 hover:no-underline')}>
                <div className="flex gap-4">
                    <span className="text-base">{question}</span>
                </div>

                <div className="relative flex items-center justify-center p-2 px-4">
                    <Minus className="absolute h-5 w-5 opacity-0 transition-all duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:opacity-100" />
                    <Plus className="absolute h-5 w-5 opacity-100 transition-all duration-300 group-data-[state=open]:opacity-0" />
                </div>
            </AccordionTrigger>
            <AccordionContent className="py-4 text-sm text-neutral-300">{answer}</AccordionContent>
        </AccordionItem>
    );
};
