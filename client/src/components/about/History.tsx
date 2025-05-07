import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { ABOUT_FACTS } from '@/lib/constants';
import { Network, Bird, Leaf, Calendar } from 'lucide-react';

export default function History() {
  // Map of icon components
  const iconMap = {
    tree: <Network className="text-forest-green text-xl mr-2" />,
    bird: <Bird className="text-forest-green text-xl mr-2" />,
    leaf: <Leaf className="text-forest-green text-xl mr-2" />,
    calendar: <Calendar className="text-forest-green text-xl mr-2" />,
  };

  // Function to get icon component by name
  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        variants={fadeIn('right')}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h3 className="font-accent text-3xl font-semibold text-earth-brown mb-6">A Century of Natural Heritage</h3>
        <p className="mb-4">The Nairobi Arboretum was established in 1907 to try out introduced forestry trees for Kenya. Today, it is a 30-hectare urban park in the heart of Nairobi, dedicated to preserving indigenous and exotic tree species and providing a green space for the city's residents.</p>
        <p className="mb-4">With over 350 tree species, it serves as an important biodiversity conservation site and educational resource. The arboretum is home to over 100 bird species and a variety of small mammals, making it a vital ecological sanctuary.</p>
        <p className="mb-6">The Friends of Nairobi Arboretum (FONA) was established in 1993 to collaborate with the Kenya Forest Service in the management and conservation of this precious natural resource.</p>
        
        <div className="flex flex-wrap gap-4">
          {ABOUT_FACTS.map((fact, index) => (
            <div key={index} className="flex items-center">
              {getIcon(fact.icon)}
              <span>{fact.text}</span>
            </div>
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-2 gap-4"
        variants={fadeIn('left')}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {/* A serene forest path with sunlight filtering through the trees */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img src="https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Forest path with sunlight" className="w-full h-full object-cover" />
        </div>
        
        {/* A scenic view of the arboretum's landscape with diverse trees */}
        <div className="rounded-lg overflow-hidden shadow-lg row-span-2">
          <img src="https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Scenic arboretum landscape" className="w-full h-full object-cover" />
        </div>
        
        {/* A close-up of native flora showing biodiversity */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img src="https://pixabay.com/get/gda4e4df5cb63cbcdc327aa2b4c53c5c67b9fc84cceb66f87aed65f0c4813d60f6c7a4bf964df9c7c26aa284ade6c8390bb596c83cb0c7bc1f35b60f1277ef0c7_1280.jpg" alt="Native flora close-up" className="w-full h-full object-cover" />
        </div>
      </motion.div>
    </div>
  );
}
