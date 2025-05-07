import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import AttractionCard from "@/components/attractions/AttractionCard";
import { ATTRACTIONS, SITE_NAME } from "@/lib/constants";

export default function Attractions() {
  return (
    <>
      <Helmet>
        <title>Attractions - {SITE_NAME}</title>
        <meta name="description" content="Explore the natural wonders and activities at Nairobi Arboretum. Experience walking trails, bird watching, butterfly gardens, picnic areas, and educational tours." />
      </Helmet>
      
      <section className="relative py-32 bg-forest-green text-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{backgroundImage: "url('https://pixabay.com/get/g56ee2e9de3d15f88b7cf71e1f70beb9b7d58162c01a16fb0838fe71c92484438d339d0121f1729f321d9cffde5799ddae9cc4ce3d7a4efc38376963e07c28d2e_1280.jpg')"}}></div>
        <div className="container relative mx-auto px-4 text-center">
          <motion.h1 
            className="font-heading text-5xl font-bold mb-6"
            variants={fadeIn('up')}
            initial="hidden"
            animate="show"
          >
            Attractions
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
            Discover the natural wonders and activities waiting for you
          </motion.p>
        </div>
      </section>
      
      <section className="py-20 bg-off-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {ATTRACTIONS.map((attraction, index) => (
              <AttractionCard
                key={index}
                title={attraction.title}
                description={attraction.description}
                image={attraction.image}
                expanded
              />
            ))}
          </motion.div>
        </div>
      </section>
      
      <section className="py-20 bg-light-sand">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="font-heading text-3xl font-bold text-forest-green mb-8 text-center"
              variants={fadeIn('up')}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              Seasonal Highlights
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                variants={fadeIn('up')}
              >
                <h3 className="font-heading text-xl font-semibold text-forest-green mb-4">Spring (March - May)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                    <span>Wildflowers in bloom throughout the arboretum</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                    <span>Bird nesting season with increased activity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                    <span>Fresh foliage on deciduous trees</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                    <span>Special tree planting events</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                variants={fadeIn('up', 0.1)}
              >
                <h3 className="font-heading text-xl font-semibold text-forest-green mb-4">Summer (June - August)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                    <span>Butterfly garden at peak activity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                    <span>Ideal time for picnics and outdoor activities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                    <span>Extended evening hours for sunset viewing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                    <span>Educational workshops and guided tours</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                variants={fadeIn('up', 0.2)}
              >
                <h3 className="font-heading text-xl font-semibold text-forest-green mb-4">Autumn (September - November)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                    <span>Migratory birds passing through the arboretum</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                    <span>Seed collection from native trees</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                    <span>Mushroom spotting opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                    <span>Conservation awareness programs</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                variants={fadeIn('up', 0.3)}
              >
                <h3 className="font-heading text-xl font-semibold text-forest-green mb-4">Winter (December - February)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                    <span>Holiday light displays along main trails</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                    <span>Winter bird watching is excellent</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                    <span>Clearer views of forest structure</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1">•</span>
                    <span>Special New Year botanical tours</span>
                  </li>
                </ul>
              </motion.div>
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
              Special Programs
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                variants={fadeIn('up')}
              >
                <div className="w-16 h-16 bg-forest-green bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-forest-green text-2xl">🔍</span>
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">Guided Nature Walks</h3>
                <p>Expert-led tours focusing on specific themes like medicinal plants, indigenous trees, or wildlife spotting.</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                variants={fadeIn('up', 0.1)}
              >
                <div className="w-16 h-16 bg-forest-green bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-forest-green text-2xl">📸</span>
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">Photography Sessions</h3>
                <p>Scheduled photography workshops and special access to scenic areas for photographers of all skill levels.</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                variants={fadeIn('up', 0.2)}
              >
                <div className="w-16 h-16 bg-forest-green bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-forest-green text-2xl">👨‍👩‍👧‍👦</span>
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">Family Activities</h3>
                <p>Weekend programs designed for families with interactive learning experiences for children of all ages.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
