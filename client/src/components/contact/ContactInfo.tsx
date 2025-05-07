import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { CONTACT_INFO } from '@/lib/constants';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactInfo() {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-md text-center"
        variants={fadeIn('up')}
      >
        <div className="w-16 h-16 bg-forest-green bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="text-forest-green text-2xl" />
        </div>
        <h3 className="font-heading font-semibold text-xl mb-2">Address</h3>
        <p>{CONTACT_INFO.address.line1}<br/>{CONTACT_INFO.address.line2}<br/>{CONTACT_INFO.address.line3}</p>
      </motion.div>
      
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-md text-center"
        variants={fadeIn('up', 0.1)}
      >
        <div className="w-16 h-16 bg-forest-green bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="text-forest-green text-2xl" />
        </div>
        <h3 className="font-heading font-semibold text-xl mb-2">Phone</h3>
        <p>Main Office: {CONTACT_INFO.phone.main}<br/>FONA Office: {CONTACT_INFO.phone.fona}</p>
      </motion.div>
      
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-md text-center"
        variants={fadeIn('up', 0.2)}
      >
        <div className="w-16 h-16 bg-forest-green bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="text-forest-green text-2xl" />
        </div>
        <h3 className="font-heading font-semibold text-xl mb-2">Email</h3>
        <p>{CONTACT_INFO.email.info}<br/>{CONTACT_INFO.email.support}</p>
      </motion.div>
      
      <motion.div 
        className="md:col-span-3 text-center mt-4"
        variants={fadeIn('up', 0.3)}
      >
        <h3 className="font-heading text-2xl font-semibold text-forest-green mb-6">Follow Us</h3>
        <div className="flex justify-center space-x-6">
          {CONTACT_INFO.social.map((social, index) => {
            let icon;
            switch(social.platform) {
              case 'facebook':
                icon = <i className="fab fa-facebook-f"></i>;
                break;
              case 'twitter':
                icon = <i className="fab fa-twitter"></i>;
                break;
              case 'instagram':
                icon = <i className="fab fa-instagram"></i>;
                break;
              case 'youtube':
                icon = <i className="fab fa-youtube"></i>;
                break;
              default:
                icon = null;
            }
            
            return (
              <a 
                key={index}
                href={social.url} 
                className="w-12 h-12 bg-forest-green bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors"
                aria-label={`Follow us on ${social.platform}`}
              >
                <span className="text-forest-green text-xl">{icon}</span>
              </a>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
