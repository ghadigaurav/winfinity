
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LifeBuoy, Send, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SupportPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending the form
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Support Request Submitted",
        description: "We've received your message and will get back to you soon!",
      });
      
      // Reset form after a delay
      setTimeout(() => {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="hero-bg rounded-xl p-8 mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
          Help & Support
        </h1>
        <p className="text-white/80 mb-6 max-w-3xl">
          Need assistance? Our team is here to help you with any questions or issues you might have.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Support</h2>
            <p className="text-white/80 mb-6">
              Fill out the form below to send us a message. We'll get back to you as soon as possible.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-white mb-1">Name</label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-winfinity-blue/20 border-winfinity-blue/30 text-white"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white mb-1">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-winfinity-blue/20 border-winfinity-blue/30 text-white"
                    placeholder="Your email address"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-white mb-1">Subject</label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="bg-winfinity-blue/20 border-winfinity-blue/30 text-white"
                    placeholder="What is your issue about?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white mb-1">Message</label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-winfinity-blue/20 border-winfinity-blue/30 text-white min-h-[150px]"
                    placeholder="Describe your issue in detail..."
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-winfinity-cyan text-winfinity-darker-blue hover:bg-winfinity-cyan/90"
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : isSubmitted ? (
                    <><Check className="mr-2" size={16} /> Message Sent</>
                  ) : (
                    <><Send className="mr-2" size={16} /> Send Message</>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
        
        <div>
          <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-winfinity-cyan/20 flex items-center justify-center mb-4">
                <LifeBuoy size={32} className="text-winfinity-cyan" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">Support Resources</h3>
              
              <div className="space-y-4 w-full">
                <Button 
                  variant="outline" 
                  className="bg-winfinity-blue/20 border-winfinity-blue/30 text-white hover:bg-winfinity-blue/40 w-full"
                  onClick={() => window.open('https://winfinity.io/faq', '_blank')}
                >
                  FAQ
                </Button>
                
                <Button 
                  variant="outline" 
                  className="bg-winfinity-blue/20 border-winfinity-blue/30 text-white hover:bg-winfinity-blue/40 w-full"
                  onClick={() => window.open('https://winfinity.io/guide', '_blank')}
                >
                  User Guide
                </Button>
                
                <Button 
                  variant="outline" 
                  className="bg-winfinity-blue/20 border-winfinity-blue/30 text-white hover:bg-winfinity-blue/40 w-full"
                  onClick={() => window.open('https://winfinity.io/terms', '_blank')}
                >
                  Terms & Conditions
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-winfinity-blue/20 rounded-lg">
                <p className="text-white/80 text-sm">
                  Average response time: <span className="text-winfinity-cyan font-medium">24 hours</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
