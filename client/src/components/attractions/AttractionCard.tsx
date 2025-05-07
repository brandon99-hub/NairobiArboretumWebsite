import { motion } from 'framer-motion';
import { fadeIn, cardHover } from '@/lib/animations';
import { ArrowRight } from 'lucide-react';

interface AttractionCardProps {
  title: string;
  description: string;
  image: string;
  expanded?: boolean;
}

export default function AttractionCard({ title, description, image, expanded = false }: AttractionCardProps) {
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-lg"
      variants={fadeIn('up')}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <motion.div
        variants={cardHover}
      >
        <img 
          src={image} 
          alt={title} 
          className="w-full h-56 object-cover"
        />
        <div className="p-6">
          <h3 className="font-heading text-xl font-semibold text-forest-green mb-3">{title}</h3>
          <p className="mb-4">{description}</p>
          
          {expanded && (
            <div className="mt-4 space-y-3">
              <h4 className="font-heading font-semibold text-forest-green">Features:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                  <span>Expertly maintained facilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                  <span>Educational signage and information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                  <span>Accessible for all visitors</span>
                </li>
              </ul>
            </div>
          )}
          
          <div className="flex items-center text-leaf-green font-medium mt-4">
            <span>Explore more</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
