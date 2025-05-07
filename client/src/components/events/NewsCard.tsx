import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

interface NewsCardProps {
  date: string;
  title: string;
  content: string;
}

export default function NewsCard({ date, title, content }: NewsCardProps) {
  return (
    <motion.div
      variants={fadeIn('up')}
    >
      <div className="mb-2">
        <span className="text-sm text-stone-gray">{date}</span>
      </div>
      <h4 className="font-heading font-semibold text-lg mb-2">{title}</h4>
      <p>{content}</p>
    </motion.div>
  );
}
