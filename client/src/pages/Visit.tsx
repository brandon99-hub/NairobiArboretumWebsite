import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import VisitInfo from "@/components/visit/VisitInfo";
import { SITE_NAME } from "@/lib/constants";

export default function Visit() {
  return (
    <>
      <Helmet>
        <title>Plan Your Visit - {SITE_NAME}</title>
        <meta name="description" content="Plan your visit to Nairobi Arboretum. Find information on opening hours, admission fees, location, directions and visitor guidelines." />
      </Helmet>
      
      <section className="relative py-32 bg-forest-green text-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{backgroundImage: "url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')"}}></div>
        <div className="container relative mx-auto px-4 text-center">
          <motion.h1 
            className="font-heading text-5xl font-bold mb-6"
            variants={fadeIn('up')}
            initial="hidden"
            animate="show"
          >
            Plan Your Visit
          </motion.h1>
          <motion.div 
            className="w-24 h-1 bg-white mx-auto mb-6"
            variants={fadeIn('up', 0.3)}
            initial="hidden"
            animate="show"
          ></motion.div>
          <motion.p 
            className="max-w-3xl mx-auto text-xl"
            variants={fadeIn('up', 0.5)}
            initial="hidden"
            animate="show"
          >
            Everything you need to know for a wonderful experience
          </motion.p>
        </div>
      </section>
      
      <VisitInfo />
      
      <section className="py-16 bg-light-sand">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="font-heading text-3xl font-bold text-forest-green mb-8 text-center"
              variants={fadeIn('up')}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              Frequently Asked Questions
            </motion.h2>
            
            <motion.div 
              className="space-y-6"
              variants={fadeIn('up', 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-heading text-xl font-semibold text-forest-green mb-2">Can I bring my pet to the arboretum?</h3>
                <p>Dogs are allowed but must be kept on leashes at all times. Owners are responsible for cleaning up after their pets.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-heading text-xl font-semibold text-forest-green mb-2">Are there restaurants or cafes inside?</h3>
                <p>There are no permanent restaurants inside the arboretum, but there are picnic areas where you can enjoy food brought from outside. Occasionally, there may be food vendors near the main entrance.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-heading text-xl font-semibold text-forest-green mb-2">Is the arboretum accessible for people with mobility challenges?</h3>
                <p>The main paths are relatively flat and accessible, but some trails may be challenging for wheelchairs or those with mobility issues. The central area and several viewpoints are accessible to all visitors.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-heading text-xl font-semibold text-forest-green mb-2">Can I hold my wedding or event at the arboretum?</h3>
                <p>Yes, the arboretum can be booked for special events including weddings, corporate functions, and photoshoots. Special permits are required and should be arranged in advance through the administration office.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-heading text-xl font-semibold text-forest-green mb-2">What is the best time to visit for birdwatching?</h3>
                <p>Early morning (6:00 AM - 9:00 AM) is ideal for birdwatching. The months of October to April are particularly good as migratory birds visit during this period.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-off-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="font-heading text-3xl font-bold text-forest-green mb-8"
              variants={fadeIn('up')}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              What to Bring
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
              variants={fadeIn('up', 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-forest-green bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-forest-green text-2xl">🧴</span>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Sun Protection</h3>
                <p className="text-center">Sunscreen, hat, and sunglasses for sunny days</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-forest-green bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-forest-green text-2xl">👟</span>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Comfortable Shoes</h3>
                <p className="text-center">Walking shoes or lightweight hiking boots</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-forest-green bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-forest-green text-2xl">💧</span>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Water Bottle</h3>
                <p className="text-center">Stay hydrated during your visit</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-forest-green bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-forest-green text-2xl">🔍</span>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Binoculars</h3>
                <p className="text-center">For bird and wildlife watching</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-forest-green bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-forest-green text-2xl">📱</span>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Camera</h3>
                <p className="text-center">Capture the natural beauty</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-forest-green bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-forest-green text-2xl">🧺</span>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Picnic Supplies</h3>
                <p className="text-center">Food, blanket, and waste bags</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
