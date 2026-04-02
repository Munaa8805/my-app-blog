import Seo from '../components/Seo';

export default function About() {
  return (
    <div className="space-y-6">
      <Seo
        title="About us"
        description="Learn about our approach: simple, modular design and a consistent experience across the app."
      />
      <h2 className="text-4xl font-bold tracking-tight">About Us</h2>
      <p className="text-lg text-gray-600 max-w-2xl leading-relaxed text-justify">
        We believe in simplicity and clarity. Our architecture is designed to be modular and easy to maintain, 
        ensuring a consistent experience across all pages of the application.
      </p>
      <div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden">
        <img 
          src="https://picsum.photos/seed/minimal/1200/800" 
          alt="Minimalist workspace" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
