import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { INTEREST_OPTIONS } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

type ContactFormData = {
  name: string;
  email: string;
  interest: string;
  message: string;
};

export default function ContactForm() {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      interest: INTEREST_OPTIONS[0],
      message: ''
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: 'Message sent successfully!',
          description: 'Thank you for contacting us. We will get back to you soon.',
        });
        reset();
      } else {
        toast({
          title: 'Error sending message',
          description: data.message || 'Please try again later',
          variant: 'destructive',
        });
      }
    },
    onError: () => {
      toast({
        title: 'Error sending message',
        description: 'There was a problem sending your message. Please try again later.',
        variant: 'destructive',
      });
    }
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      variants={fadeIn('up')}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-forest-green`}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-forest-green`}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="contact-interest" className="block text-sm font-medium mb-2">
          I'm interested in:
        </label>
        <select
          id="contact-interest"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-forest-green"
          {...register('interest')}
        >
          {INTEREST_OPTIONS.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={6}
          className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-forest-green`}
          {...register('message', { required: 'Message is required' })}
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>
      
      <div>
        <button
          type="submit"
          className="w-full py-3 bg-forest-green hover:bg-opacity-90 text-white font-heading font-medium rounded-lg transition-colors"
          disabled={contactMutation.isPending}
        >
          {contactMutation.isPending ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </motion.form>
  );
}
