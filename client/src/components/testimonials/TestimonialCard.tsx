import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { Star, StarHalf, User } from 'lucide-react';

interface TestimonialCardProps {
  text: string;
  name: string;
  title: string;
  rating: number;
}

export default function TestimonialCard({ text, name, title, rating }: TestimonialCardProps) {
  // Create an array for rendering stars
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="text-yellow-400 fill-yellow-400" />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="text-yellow-400 fill-yellow-400" />);
    }
    
    return stars;
  };

  return (
    <motion.div 
      className="bg-white p-8 rounded-lg shadow-md"
      variants={fadeIn('up')}
    >
      <div className="text-yellow-400 flex mb-4">
        {renderStars()}
      </div>
      <p className="mb-6 italic">"{text}"</p>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full mr-4 flex items-center justify-center text-gray-500">
          <User className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-heading font-semibold">{name}</h4>
          <p className="text-sm text-stone-gray">{title}</p>
        </div>
      </div>
    </motion.div>
  );
}
