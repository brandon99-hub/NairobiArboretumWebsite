import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import EventCard from "@/components/events/EventCard";
import NewsCard from "@/components/events/NewsCard";
import { LATEST_NEWS, SITE_NAME, UPCOMING_EVENTS } from "@/lib/constants";

export default function Events() {
  return (
    <>
      <Helmet>
        <title>Events & News - {SITE_NAME}</title>
        <meta name="description" content="Stay updated with the latest events and news from Nairobi Arboretum. Learn about upcoming activities, workshops, and recent developments." />
      </Helmet>
      
      <section className="relative py-32 bg-forest-green text-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{backgroundImage: "url('https://images.unsplash.com/photo-1487622750296-6360190669a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')"}}></div>
        <div className="container relative mx-auto px-4 text-center">
          <motion.h1 
            className="font-heading text-5xl font-bold mb-6"
            variants={fadeIn('up')}
            initial="hidden"
            animate="show"
          >
            Events & News
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
            Stay updated with the latest happenings and activities
          </motion.p>
        </div>
      </section>
      
      <section className="py-20 bg-off-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <motion.h2 
                className="font-heading text-3xl font-bold text-forest-green mb-8"
                variants={fadeIn('up')}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                Upcoming Events
              </motion.h2>
              
              <motion.div 
                className="space-y-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {UPCOMING_EVENTS.map((event, index) => (
                  <EventCard
                    key={index}
                    date={event.date}
                    title={event.title}
                    time={event.time}
                    description={event.description}
                  />
                ))}
              </motion.div>
            </div>
            
            <div>
              <motion.h2 
                className="font-heading text-3xl font-bold text-forest-green mb-8"
                variants={fadeIn('up')}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                Latest News
              </motion.h2>
              
              <motion.div 
                className="space-y-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {LATEST_NEWS.map((news, index) => (
                  <NewsCard
                    key={index}
                    date={news.date}
                    title={news.title}
                    content={news.content}
                  />
                ))}
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            className="text-center"
            variants={fadeIn('up')}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <button className="px-6 py-3 bg-forest-green hover:bg-opacity-90 text-white font-heading font-medium rounded-lg transition-colors">
              View All Events & News
            </button>
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
              Annual Calendar
            </motion.h2>
            
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md space-y-8"
              variants={fadeIn('up', 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div>
                <h3 className="font-heading text-xl font-semibold text-forest-green mb-4">Q1: January - March</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1 font-bold">Jan</span>
                    <span>New Year Botanical Walk & Annual Bird Count</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1 font-bold">Feb</span>
                    <span>Valentine's Day Special Tours & Photography Contest</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1 font-bold">Mar</span>
                    <span>World Wildlife Day Celebration & Spring Tree Planting</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-heading text-xl font-semibold text-forest-green mb-4">Q2: April - June</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1 font-bold">Apr</span>
                    <span>Earth Day Festival & Environmental Education Week</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1 font-bold">May</span>
                    <span>International Day for Biological Diversity & Wildflower Tours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1 font-bold">Jun</span>
                    <span>World Environment Day & Summer Solstice Night Walk</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-heading text-xl font-semibold text-forest-green mb-4">Q3: July - September</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1 font-bold">Jul</span>
                    <span>Children's Summer Nature Camp & Butterfly Garden Workshops</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1 font-bold">Aug</span>
                    <span>National Tree Planting Day & Conservation Symposium</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1 font-bold">Sep</span>
                    <span>Arboretum Anniversary Celebration & Heritage Week</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-heading text-xl font-semibold text-forest-green mb-4">Q4: October - December</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1 font-bold">Oct</span>
                    <span>World Migratory Bird Day & Fall Nature Photography Tours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1 font-bold">Nov</span>
                    <span>Annual FONA Fundraising Gala & Volunteer Appreciation Day</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-forest-green text-lg mr-3 mt-1 font-bold">Dec</span>
                    <span>Holiday Light Display & Year-End Botanical Celebration</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
