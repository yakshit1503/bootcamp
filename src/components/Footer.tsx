import { Link } from 'react-router-dom';
import { Mail, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Frontend Bootcamp</h3>
          <p className="text-gray-300 mb-4">
            Job-ready React & JavaScript bootcamp for interviews.
          </p>
          <div className="flex space-x-4">
            <a href="mailto:vivekrana1947@gmail.com" className="hover:text-primary-500 transition-colors">
              <Mail size={20} />
            </a>
            <a href="#" className="hover:text-primary-500 transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="hover:text-primary-500 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Bootcamps</h4>
          <ul className="space-y-2">
            <li><Link to="/react" className="text-gray-300 hover:text-white transition-colors">React JS</Link></li>
            <li><Link to="/javascript" className="text-gray-300 hover:text-white transition-colors">JavaScript</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Docs</a></li>
            <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Support</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <p className="text-gray-300">vivekrana1947@gmail.com</p>
          <p className="text-gray-300 mt-2">Join our bootcamp today!</p>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 Frontend Bootcamp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

