import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

export default function Mission() {
  return (
    <section className="py-16 bg-forest-green text-white clip-path-slant">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          variants={fadeIn('up')}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="font-accent text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl mb-8">"To conserve and enhance Nairobi Arboretum as a recreational and educational facility, with special emphasis on the conservation of trees and shrubs indigenous to Kenya."</p>
          <div className="w-24 h-1 bg-leaf-green mx-auto"></div>
        </motion.div>
      </div>
      <style jsx>{`
        .clip-path-slant {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
      `}</style>
    </section>
  );
}
