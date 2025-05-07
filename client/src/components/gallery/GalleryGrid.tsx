import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, galleryItemHover, overlayVariants } from '@/lib/animations';
import { GALLERY_IMAGES } from '@/lib/constants';
import { Maximize, X } from 'lucide-react';

export default function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const openModal = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        variants={fadeIn('up')}
        initial="hidden"
        animate="show"
      >
        {GALLERY_IMAGES.map((image, index) => (
          <motion.div 
            key={index}
            className="gallery-item relative rounded-lg overflow-hidden shadow-md group cursor-pointer"
            variants={galleryItemHover}
            whileHover="hover"
            initial="rest"
            onClick={() => openModal(index)}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-64 object-cover"
            />
            <motion.div 
              className="absolute inset-0 bg-forest-green bg-opacity-80 flex items-center justify-center"
              variants={overlayVariants}
              initial="hidden"
              whileHover="visible"
            >
              <Maximize className="text-white text-3xl" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <button 
              className="absolute top-4 right-4 text-white text-3xl focus:outline-none"
              onClick={closeModal}
            >
              <X className="h-8 w-8" />
            </button>
            
            <motion.div 
              className="relative max-w-4xl max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={GALLERY_IMAGES[selectedImage].src} 
                alt={GALLERY_IMAGES[selectedImage].alt} 
                className="max-h-[90vh] w-auto max-w-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
                <p>{GALLERY_IMAGES[selectedImage].alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
