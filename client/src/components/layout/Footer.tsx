import { Link } from 'wouter';
import { useState } from 'react';
import { NAV_LINKS, SITE_NAME, RESOURCES, CONTACT_INFO } from '@/lib/constants';
import { Network, Facebook, Twitter, Instagram, Youtube, ArrowUp } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const subscription = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest('POST', '/api/subscribe', { email });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Subscription successful!",
          description: data.message,
          variant: "default",
        });
        setEmail('');
      } else {
        toast({
          title: "Subscription failed",
          description: data.message,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter. Please try again later.",
        variant: "destructive",
      });
    }
  });
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    subscription.mutate(email);
  };
  
  return (
    <footer className="bg-forest-green text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-heading font-bold text-xl mb-4 flex items-center gap-2">
              <Network size={24} />
              {SITE_NAME}
            </h4>
            <p className="mb-4">A sanctuary of nature in Kenya's capital city since 1907.</p>
            <div className="flex items-center">
              <span className="mr-2"><Network size={18} /></span>
              <span>Managed by Kenya Forest Service<br/>in partnership with FONA</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-xl mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="hover:text-leaf-green transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-xl mb-4">Resources</h4>
            <ul className="space-y-2">
              {RESOURCES.map((resource, index) => (
                <li key={index}>
                  <a href={resource.path} className="hover:text-leaf-green transition-colors">
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-xl mb-4">Newsletter</h4>
            <p className="mb-4">Subscribe to receive updates on events, news, and special offers.</p>
            <form className="space-y-3" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email address" 
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 focus:outline-none focus:bg-opacity-20 placeholder-white placeholder-opacity-60"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="submit" 
                className="w-full py-2 bg-leaf-green hover:bg-opacity-90 text-white font-heading font-medium rounded-lg transition-colors"
                disabled={subscription.isPending}
              >
                {subscription.isPending ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white border-opacity-20 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Nairobi Arboretum. All rights reserved.</p>
          
          <div className="flex space-x-4">
            {CONTACT_INFO.social.map((social, index) => (
              <a 
                key={index}
                href={social.url} 
                className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors"
                aria-label={`Visit our ${social.platform} page`}
              >
                {social.platform === 'facebook' && <Facebook size={20} />}
                {social.platform === 'twitter' && <Twitter size={20} />}
                {social.platform === 'instagram' && <Instagram size={20} />}
                {social.platform === 'youtube' && <Youtube size={20} />}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-forest-green text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-40 hover:bg-opacity-90 transition-all"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
