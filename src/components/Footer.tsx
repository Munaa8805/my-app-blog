export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 px-6 text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} My App. All rights reserved.
    </footer>
  );
}
