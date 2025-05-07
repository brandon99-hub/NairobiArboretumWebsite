import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

export default function Hero() {
  return (
    <section className="relative h-screen">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://pixabay.com/get/gfb02b050ce55afaa676cf9287c13513ed3bc87d07759c898f0e7d0b91ca0a36db1ef7f0663bdad1b03b519dfe468a6fd9f4c557dd06e23c8fd691295755361fa_1280.jpg')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      <div className="relative container mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <motion.h1 
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            variants={fadeIn('up')}
            initial="hidden"
            animate="show"
          >
            Welcome to Nairobi Arboretum
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 font-light"
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            animate="show"
          >
            A natural oasis in the heart of Kenya's capital
          </motion.p>
          
          <motion.div 
            className="space-x-4"
            variants={fadeIn('up', 0.4)}
            initial="hidden"
            animate="show"
          >
            <Link href="/visit">
              <a className="inline-block px-6 py-3 bg-forest-green hover:bg-opacity-90 text-white font-heading font-medium rounded-lg transition-colors">
                Plan Your Visit
              </a>
            </Link>
            <Link href="/about">
              <a className="inline-block px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-heading font-medium rounded-lg transition-colors">
                Learn More
              </a>
            </Link>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="fill-off-white">
          <path d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
}
