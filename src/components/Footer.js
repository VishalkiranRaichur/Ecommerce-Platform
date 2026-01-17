import Link from 'next/link'
import WhatsAppButton from './WhatsAppButton'
import InstagramButton from './InstagramButton'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-display font-bold text-primary-700 mb-4">
              Sujatha Boutique
            </h3>
            <p className="text-gray-600 text-sm">
              Elegant women's fashion with timeless designs and premium quality.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Connect With Us</h4>
            <div className="flex flex-col space-y-3">
              <WhatsAppButton phoneNumber="+917795855292" message="Hello! I'm interested in your products." className="w-fit" />
              <InstagramButton username="sujatha.m798" className="w-fit" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Sujatha Boutique. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
