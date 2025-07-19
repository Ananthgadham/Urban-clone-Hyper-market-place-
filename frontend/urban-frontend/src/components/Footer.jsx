function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Top Cities */}
        <div>
          <h3 className="text-white font-semibold mb-4">Top Cities</h3>
          <ul className="space-y-2 text-sm">
            <li>Delhi NCR</li>
            <li>Mumbai</li>
            <li>Bangalore</li>
            <li>Hyderabad</li>
            <li>Chennai</li>
            <li>Pune</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-4">Services Offered</h3>
          <ul className="space-y-2 text-sm">
            <li>Salon for Women</li>
            <li>Salon for Men</li>
            <li>Home Cleaning</li>
            <li>Electricians</li>
            <li>Plumbers</li>
            <li>AC Repair</li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>UC for Business</li>
          </ul>
        </div>

        {/* Social & App */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect with Us</h3>
          <div className="flex gap-4 mb-4">
            <a href="#" className="hover:text-white">📘 Facebook</a>
            <a href="#" className="hover:text-white">📸 Instagram</a>
            <a href="#" className="hover:text-white">🐦 Twitter</a>
          </div>
          <h3 className="text-white font-semibold mb-2">Download App</h3>
          <div className="flex flex-col gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="w-32"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="w-32"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Urban Company Clone. Built for demo purposes.
      </div>
    </footer>
  );
}

export default Footer;
