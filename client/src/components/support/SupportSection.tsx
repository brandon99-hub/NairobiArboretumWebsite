import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { SUPPORT_OPTIONS, INTEREST_OPTIONS } from '@/lib/constants';
import { Leaf, HandHeart, Users, Sprout } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

type SupportFormData = {
  name: string;
  email: string;
  interest: string;
  message: string;
};

export default function SupportSection() {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SupportFormData>({
    defaultValues: {
      name: '',
      email: '',
      interest: INTEREST_OPTIONS[0],
      message: ''
    }
  });

  // Map of icon components
  const iconMap = {
    leaf: <Leaf className="text-leaf-green text-lg mr-3 mt-1" />,
    handHoldingHeart: <HandHeart className="text-leaf-green text-lg mr-3 mt-1" />,
    users: <Users className="text-leaf-green text-lg mr-3 mt-1" />,
    seedling: <Sprout className="text-leaf-green text-lg mr-3 mt-1" />,
  };

  // Function to get icon component by name
  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || null;
  };

  const submitMutation = useMutation({
    mutationFn: async (data: SupportFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: 'Thank you for your interest!',
          description: 'We have received your message and will get back to you soon.',
        });
        reset();
      } else {
        toast({
          title: 'Error submitting form',
          description: data.message || 'Please try again later',
          variant: 'destructive',
        });
      }
    },
    onError: () => {
      toast({
        title: 'Error submitting form',
        description: 'There was a problem submitting your message. Please try again later.',
        variant: 'destructive',
      });
    }
  });

  const onSubmit = (data: SupportFormData) => {
    submitMutation.mutate(data);
  };

  return (
    <section className="py-16 bg-forest-green text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeIn('right')}>
            <h2 className="font-heading text-3xl font-bold mb-6">Support the Arboretum</h2>
            <p className="mb-6">Help us preserve and enhance this vital green space for future generations. Your support enables us to maintain the arboretum, conduct research, and provide educational programs.</p>
            <div className="space-y-4">
              {SUPPORT_OPTIONS.map((option, index) => (
                <div key={index} className="flex items-start">
                  {getIcon(option.icon)}
                  <div>
                    <h4 className="font-heading font-semibold">{option.title}</h4>
                    <p className="text-sm">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={fadeIn('left')}>
            <div className="bg-white p-8 rounded-lg text-stone-gray">
              <h3 className="font-heading text-2xl font-semibold text-forest-green mb-6">Get Involved Today</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-forest-green`}
                    {...register('name', { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-forest-green`}
                    {...register('email', { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="interest" className="block text-sm font-semibold mb-2">I'm interested in:</label>
                  <select 
                    id="interest" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-forest-green"
                    {...register('interest')}
                  >
                    {INTEREST_OPTIONS.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-forest-green`}
                    {...register('message', { required: "Message is required" })}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-3 bg-forest-green hover:bg-opacity-90 text-white font-heading font-medium rounded-lg transition-colors"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
