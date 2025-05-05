import { Film, Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted-900 text-muted-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <Film className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold text-white">CineTicket</span>
            </Link>
            <p className="text-sm text-muted-400 mb-4">
              Book movie tickets with ease. Experience the magic of cinema with the best seats and the latest movies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/movies" className="text-muted-400 hover:text-primary-400 text-sm">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/theaters" className="text-muted-400 hover:text-primary-400 text-sm">
                  Theaters
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-muted-400 hover:text-primary-400 text-sm">
                  Offers & Promotions
                </Link>
              </li>
              <li>
                <Link to="/gift-cards" className="text-muted-400 hover:text-primary-400 text-sm">
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-muted-400 hover:text-primary-400 text-sm">
                  Membership
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-white font-medium mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-muted-400 hover:text-primary-400 text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-400 hover:text-primary-400 text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-400 hover:text-primary-400 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-400 hover:text-primary-400 text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-muted-400 hover:text-primary-400 text-sm">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-muted-400 mr-2 mt-0.5" />
                <span className="text-muted-400 text-sm">
                  1234 Cinema Street, Movie District, CA 90001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-muted-400 mr-2" />
                <span className="text-muted-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-muted-400 mr-2" />
                <span className="text-muted-400 text-sm">support@cineticket.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-400 text-sm">
            &copy; {currentYear} CineTicket. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <img src="https://via.placeholder.com/200x30?text=Payment+Methods" alt="Payment Methods" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
}