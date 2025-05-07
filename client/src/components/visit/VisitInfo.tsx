import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { CheckCircle, MapPin } from 'lucide-react';
import { VISIT_HOURS, VISIT_FEES, VISITOR_GUIDELINES, LOCATION_INFO } from '@/lib/constants';

export default function VisitInfo() {
  return (
    <section className="py-20 bg-off-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="font-heading text-4xl font-bold text-forest-green mb-4"
            variants={fadeIn('up')}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Plan Your Visit
          </motion.h2>
          <motion.p 
            className="text-lg max-w-3xl mx-auto"
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Everything you need to know for a wonderful experience at Nairobi Arboretum.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div>
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md mb-8"
              variants={fadeIn('up')}
            >
              <h3 className="font-heading text-2xl font-semibold text-forest-green mb-6">Opening Hours & Fees</h3>
              
              <div className="mb-6">
                <h4 className="font-heading font-semibold text-lg mb-2">Hours of Operation</h4>
                <p className="mb-1"><strong>Weekdays & Weekends:</strong> {VISIT_HOURS.weekdays}</p>
                <p><strong>Public Holidays:</strong> {VISIT_HOURS.holidays}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-heading font-semibold text-lg mb-2">Admission Fees</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="font-semibold">Kenyan Citizens/Residents:</p>
                    <p>Adults: {VISIT_FEES.citizens.adults}</p>
                    <p>Children: {VISIT_FEES.citizens.children}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Non-Residents:</p>
                    <p>Adults: {VISIT_FEES.nonResidents.adults}</p>
                    <p>Children: {VISIT_FEES.nonResidents.children}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-heading font-semibold text-lg mb-2">Special Permits</h4>
                <p>Special permits are required for commercial photography, filming, and organized events. Please contact the management for details.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md"
              variants={fadeIn('up', 0.1)}
            >
              <h3 className="font-heading text-2xl font-semibold text-forest-green mb-6">Visitor Guidelines</h3>
              
              <div className="space-y-4">
                {VISITOR_GUIDELINES.map((guideline, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="text-forest-green mr-3 mt-1 h-5 w-5" />
                    <p>{guideline}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div>
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md mb-8"
              variants={fadeIn('up', 0.2)}
            >
              <h3 className="font-heading text-2xl font-semibold text-forest-green mb-6">Getting Here</h3>
              
              <div className="mb-6">
                <h4 className="font-heading font-semibold text-lg mb-2">Location</h4>
                <p>{LOCATION_INFO.address}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-heading font-semibold text-lg mb-2">By Public Transport</h4>
                <p>{LOCATION_INFO.publicTransport}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-heading font-semibold text-lg mb-2">By Car</h4>
                <p>{LOCATION_INFO.car}</p>
              </div>
              
              <div>
                <h4 className="font-heading font-semibold text-lg mb-2">Walking Distance From:</h4>
                {LOCATION_INFO.walkingDistances.map((distance, index) => (
                  <p key={index}>• {distance}</p>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg overflow-hidden shadow-md h-80"
              variants={fadeIn('up', 0.3)}
            >
              {/* Interactive Map (placeholder) */}
              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Interactive Map</p>
                  <p className="text-sm text-gray-400 mt-2">{LOCATION_INFO.address}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
