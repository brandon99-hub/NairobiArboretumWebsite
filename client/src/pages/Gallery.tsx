import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { SITE_NAME } from "@/lib/constants";

export default function Gallery() {
  return (
    <>
      <Helmet>
        <title>Gallery - {SITE_NAME}</title>
        <meta name="description" content="Explore the beauty of Nairobi Arboretum through our collection of images. View our stunning landscape, flora and fauna photography." />
      </Helmet>
      
      <section className="relative py-32 bg-forest-green text-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{backgroundImage: "url('https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')"}}></div>
        <div className="container relative mx-auto px-4 text-center">
          <motion.h1 
            className="font-heading text-5xl font-bold mb-6"
            variants={fadeIn('up')}
            initial="hidden"
            animate="show"
          >
            Photo Gallery
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
            Explore the beauty of Nairobi Arboretum through our collection of images
          </motion.p>
        </div>
      </section>
      
      <section className="py-20 bg-light-sand">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <GalleryGrid />
          </motion.div>
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
              Featured Collections
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-white rounded-lg overflow-hidden shadow-lg"
                variants={fadeIn('up')}
              >
                <img 
                  src="https://images.unsplash.com/photo-1535083783855-76ae62b2914e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Seasonal Wildlife" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-forest-green mb-2">Seasonal Wildlife</h3>
                  <p className="mb-4">Discover the diverse wildlife that changes with each season in the arboretum.</p>
                  <button className="text-forest-green font-medium inline-flex items-center">
                    <span>View Collection</span>
                    <span className="ml-2">→</span>
                  </button>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg overflow-hidden shadow-lg"
                variants={fadeIn('up', 0.1)}
              >
                <img 
                  src="https://pixabay.com/get/gda4e4df5cb63cbcdc327aa2b4c53c5c67b9fc84cceb66f87aed65f0c4813d60f6c7a4bf964df9c7c26aa284ade6c8390bb596c83cb0c7bc1f35b60f1277ef0c7_1280.jpg" 
                  alt="Rare Plant Species" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-forest-green mb-2">Rare Plant Species</h3>
                  <p className="mb-4">A visual guide to the rare and endangered plant species preserved in our arboretum.</p>
                  <button className="text-forest-green font-medium inline-flex items-center">
                    <span>View Collection</span>
                    <span className="ml-2">→</span>
                  </button>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg overflow-hidden shadow-lg"
                variants={fadeIn('up', 0.2)}
              >
                <img 
                  src="https://pixabay.com/get/g56ee2e9de3d15f88b7cf71e1f70beb9b7d58162c01a16fb0838fe71c92484438d339d0121f1729f321d9cffde5799ddae9cc4ce3d7a4efc38376963e07c28d2e_1280.jpg" 
                  alt="Scenic Viewpoints" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-forest-green mb-2">Scenic Viewpoints</h3>
                  <p className="mb-4">Beautiful landscapes and perfect spots for photography throughout the arboretum.</p>
                  <button className="text-forest-green font-medium inline-flex items-center">
                    <span>View Collection</span>
                    <span className="ml-2">→</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.p 
              className="mt-12 text-lg"
              variants={fadeIn('up', 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              Would you like to contribute your photos to our gallery? <br />
              <a href="/contact" className="text-forest-green font-medium underline">Contact us</a> to learn about submission guidelines.
            </motion.p>
          </div>
        </div>
      </section>
    </>
  );
}
