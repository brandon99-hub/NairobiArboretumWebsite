import { Helmet } from "react-helmet";
import Hero from "@/components/home/Hero";
import QuickInfo from "@/components/home/QuickInfo";
import History from "@/components/about/History";
import Mission from "@/components/about/Mission";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import AttractionCard from "@/components/attractions/AttractionCard";
import { ATTRACTIONS, SITE_NAME } from "@/lib/constants";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import { TESTIMONIALS } from "@/lib/constants";
import SupportSection from "@/components/support/SupportSection";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{SITE_NAME} - A Natural Haven in the City</title>
        <meta name="description" content="Discover Nairobi Arboretum, a 30-hectare urban park established in 1907 with over 350 tree species and 100 bird species. A natural oasis in the heart of Kenya's capital city." />
      </Helmet>
      
      <Hero />
      
      <QuickInfo />
      
      <section id="about" className="py-20 bg-off-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="font-heading text-4xl font-bold text-forest-green mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              About the Arboretum
            </motion.h2>
            <motion.p 
              className="text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Discover the rich history and natural diversity of Nairobi's green oasis.
            </motion.p>
          </div>
          
          <History />
        </div>
      </section>
      
      <Mission />
      
      <section id="attractions" className="py-20 bg-off-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="font-heading text-4xl font-bold text-forest-green mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              What to Experience
            </motion.h2>
            <motion.p 
              className="text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Discover the natural wonders and activities waiting for you at Nairobi Arboretum.
            </motion.p>
          </div>
          
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
              />
            ))}
          </motion.div>
        </div>
      </section>
      
      <section className="py-16 bg-light-sand">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="font-heading text-4xl font-bold text-forest-green mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Visitor Experiences
            </motion.h2>
            <motion.p 
              className="text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              What people are saying about their visits to Nairobi Arboretum.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                text={testimonial.text}
                name={testimonial.name}
                title={testimonial.title}
                rating={testimonial.rating}
              />
            ))}
          </motion.div>
        </div>
      </section>
      
      <SupportSection />
    </>
  );
}
