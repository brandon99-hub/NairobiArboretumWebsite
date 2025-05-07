import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/lib/animations";
import History from "@/components/about/History";
import Mission from "@/components/about/Mission";
import { SITE_NAME } from "@/lib/constants";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About - {SITE_NAME}</title>
        <meta name="description" content="Learn about Nairobi Arboretum's rich history and conservation mission. Established in 1907, the arboretum is home to over 350 tree species and 100 bird species." />
      </Helmet>
      
      <section className="relative py-32 bg-forest-green text-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{backgroundImage: "url('https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')"}}></div>
        <div className="container relative mx-auto px-4 text-center">
          <motion.h1 
            className="font-heading text-5xl font-bold mb-6"
            variants={textVariant()}
            initial="hidden"
            animate="show"
          >
            About Us
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
            Discover the rich history and natural diversity of Nairobi's green oasis
          </motion.p>
        </div>
      </section>
      
      <section className="py-20 bg-off-white">
        <div className="container mx-auto px-4">
          <History />
        </div>
      </section>
      
      <Mission />
      
      <section className="py-20 bg-off-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="font-heading text-3xl font-bold text-forest-green mb-8"
              variants={fadeIn('up')}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              Our Vision
            </motion.h2>
            
            <motion.div 
              className="prose prose-lg max-w-none"
              variants={fadeIn('up', 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <p>The Nairobi Arboretum envisions being a premier urban green space that demonstrates sustainable forest management while providing quality recreational and educational experiences to the public.</p>
              
              <p>We strive to maintain a vibrant ecosystem that showcases Kenya's botanical diversity and serves as an inspiration for conservation efforts throughout East Africa.</p>
              
              <h3 className="text-forest-green mt-10 mb-4">Conservation Goals</h3>
              
              <ul>
                <li>Preserve and expand collections of indigenous tree species</li>
                <li>Maintain a viable habitat for urban wildlife</li>
                <li>Document and protect the arboretum's biodiversity</li>
                <li>Promote environmental education and awareness</li>
                <li>Support research on native plant species</li>
              </ul>
              
              <h3 className="text-forest-green mt-10 mb-4">History Timeline</h3>
              
              <div className="not-prose space-y-8 mt-8">
                <div className="flex">
                  <div className="flex-shrink-0 w-24 font-bold text-forest-green">1907</div>
                  <div>Established to try out introduced forestry trees for Kenya</div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-24 font-bold text-forest-green">1932</div>
                  <div>Designated as a national reserve</div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-24 font-bold text-forest-green">1993</div>
                  <div>Formation of Friends of Nairobi Arboretum (FONA)</div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-24 font-bold text-forest-green">2005</div>
                  <div>Major renovation of trails and facilities</div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-24 font-bold text-forest-green">2010</div>
                  <div>Introduction of educational programs and guided tours</div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-24 font-bold text-forest-green">2020</div>
                  <div>Expanded conservation efforts and biodiversity monitoring</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
