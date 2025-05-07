import { QUICK_INFO } from '@/lib/constants';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { Clock, Ticket, MapPin } from 'lucide-react';

export default function QuickInfo() {
  // Map of icon components
  const iconMap = {
    clock: <Clock className="text-forest-green text-3xl" />,
    ticket: <Ticket className="text-forest-green text-3xl" />,
    mapPin: <MapPin className="text-forest-green text-3xl" />,
  };

  // Function to get icon component by name
  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || null;
  };

  return (
    <section className="bg-off-white py-8 -mt-6 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {QUICK_INFO.map((item, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex items-center"
              variants={fadeIn('up', index * 0.1)}
            >
              <span className="mr-4">
                {getIcon(item.icon)}
              </span>
              <div>
                <h3 className="font-heading font-semibold text-lg">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
