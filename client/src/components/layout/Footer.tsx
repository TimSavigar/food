import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Mail, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    recipes: [
      { name: 'All Recipes', path: '/recipes' },
      { name: 'Featured', path: '/recipes?featured=true' },
      { name: 'Seasonal', path: '/recipes?seasonal=true' },
      { name: 'Quick & Easy', path: '/recipes?prepTime=0-30' },
    ],
    categories: [
      { name: 'Vegetarian', path: '/recipes?dietary=vegetarian' },
      { name: 'Vegan', path: '/recipes?dietary=vegan' },
      { name: 'Gluten-Free', path: '/recipes?dietary=gluten-free' },
      { name: 'Keto', path: '/recipes?dietary=keto' },
    ],
    about: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/recipeideas' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/recipeideas' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/recipeideas' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@recipe-ideas.food' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-serif font-bold text-white">
                Recipe Ideas
              </span>
            </Link>
            <p className="text-gray-300 mb-4">
              Discover amazing AI-generated recipes for every occasion. From quick weeknight meals to elaborate dinner parties.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Recipes Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recipes</h3>
            <ul className="space-y-2">
              {footerLinks.recipes.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="footer-link text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="footer-link text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="footer-link text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
            <p className="text-gray-300 text-sm mb-4">
              Get the latest recipes and cooking tips delivered to your inbox.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>&copy; {currentYear} Recipe Ideas. All rights reserved.</span>
              <Heart className="w-4 h-4 text-red-500" />
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
              <Link to="/terms" className="footer-link">Terms of Service</Link>
              <Link to="/sitemap.xml" className="footer-link">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Recipe Ideas",
            "url": "https://recipe-ideas.food",
            "logo": "https://recipe-ideas.food/logo.png",
            "description": "Discover amazing AI-generated recipes for every occasion and dietary preference.",
            "sameAs": [
              "https://facebook.com/recipeideas",
              "https://twitter.com/recipeideas",
              "https://instagram.com/recipeideas"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "hello@recipe-ideas.food"
            }
          })
        }}
      />
    </footer>
  )
}

export default Footer 