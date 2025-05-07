import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import { SITE_NAME } from "@/lib/constants";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us - {SITE_NAME}</title>
        <meta name="description" content="Contact Nairobi Arboretum. Get in touch with us for inquiries, feedback, or information about visiting, events, or supporting the arboretum." />
      </Helmet>
      
      <section className="relative py-32 bg-forest-green text-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{backgroundImage: "url('https://pixabay.com/get/gfb02b050ce55afaa676cf9287c13513ed3bc87d07759c898f0e7d0b91ca0a36db1ef7f0663bdad1b03b519dfe468a6fd9f4c557dd06e23c8fd691295755361fa_1280.jpg')"}}></div>
        <div className="container relative mx-auto px-4 text-center">
          <motion.h1 
            className="font-heading text-5xl font-bold mb-6"
            variants={fadeIn('up')}
            initial="hidden"
            animate="show"
          >
            Contact Us
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
            Have questions or need more information? Get in touch with us.
          </motion.p>
        </div>
      </section>
      
      <section className="py-20 bg-off-white">
        <div className="container mx-auto px-4">
          <ContactInfo />
          
          <div className="max-w-4xl mx-auto mt-16">
            <motion.h2 
              className="font-heading text-3xl font-bold text-forest-green mb-8 text-center"
              variants={fadeIn('up')}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              Send Us a Message
            </motion.h2>
            
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md"
              variants={fadeIn('up', 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-light-sand">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="font-heading text-3xl font-bold text-forest-green mb-8"
              variants={fadeIn('up')}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              Visit Us
            </motion.h2>
            
            <motion.div 
              className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-md mb-8"
              variants={fadeIn('up', 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl text-gray-400 block mb-2">📍</span>
                  <p className="text-gray-500">Interactive Map</p>
                  <p className="text-sm text-gray-400 mt-2">Nairobi Arboretum, State House Road, Nairobi, Kenya</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              variants={fadeIn('up', 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <p className="text-lg mb-6">
                We're located on State House Road, approximately 3 kilometers from Nairobi's city center.
              </p>
              <a 
                href="https://maps.app.goo.gl/123" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-forest-green hover:bg-opacity-90 text-white font-heading font-medium rounded-lg transition-colors inline-flex items-center"
              >
                <span>Get Directions</span>
                <span className="ml-2">→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
