import React, { useState } from 'react';
import Spinner from '../components/ui/Spinner';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mocking API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="py-20 text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" style={{ animationDuration: '0.5s', animationIterationCount: 1, animationFillMode: 'forwards' }} />
          {/* Simple checkmark replacement since I don't want to import another icon just for this */}
          <span className="text-green-500 text-3xl font-bold">✓</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Message Sent!</h2>
          <p className="text-gray-500">We'll get back to you as soon as possible.</p>
        </div>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-black font-bold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-bold tracking-tight">Get in Touch</h2>
      <p className="text-lg text-gray-600 max-w-2xl leading-relaxed text-justify">
        Have questions or feedback? We'd love to hear from you. Reach out through any of the channels below.
      </p>
      <form className="max-w-md space-y-4 pt-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Email</label>
          <input 
            type="email" 
            id="email" 
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors disabled:opacity-50"
            placeholder="hello@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Message</label>
          <textarea 
            id="message" 
            rows={4}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors resize-none disabled:opacity-50"
            placeholder="Your message here..."
            required
          ></textarea>
        </div>
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isSubmitting && <Spinner size="sm" className="border-t-white" />}
          <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
        </button>
      </form>
    </div>
  );
}
