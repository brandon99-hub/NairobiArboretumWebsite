import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

interface EventCardProps {
  date: {
    month: string;
    day: string;
  };
  title: string;
  time: string;
  description: string;
}

export default function EventCard({ date, title, time, description }: EventCardProps) {
  return (
    <motion.div 
      className="flex"
      variants={fadeIn('up')}
    >
      <div className="min-w-[80px] mr-4 text-center">
        <div className="bg-forest-green text-white rounded-t-lg p-1">
          <span className="text-sm font-medium">{date.month}</span>
        </div>
        <div className="bg-gray-100 rounded-b-lg p-2">
          <span className="text-2xl font-bold">{date.day}</span>
        </div>
      </div>
      <div>
        <h4 className="font-heading font-semibold text-lg">{title}</h4>
        <p className="text-sm mb-2">{time}</p>
        <p>{description}</p>
      </div>
    </motion.div>
  );
}
