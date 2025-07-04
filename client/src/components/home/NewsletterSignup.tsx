import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, ChefHat, Gift } from 'lucide-react'

const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('Subscribing email:', email)
    setIsSubscribed(true)
    setEmail('')
  }

  return (
    <section className="py-16 bg-gradient-to-br from-orange-500 to-red-500">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Weekly Recipe Inspiration
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Join thousands of food enthusiasts and receive curated recipes, cooking tips, 
              and seasonal inspiration delivered to your inbox every week.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50 text-gray-900"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white text-orange-500 font-semibold rounded-lg hover:bg-orange-50 transition-colors duration-200"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white bg-opacity-20 rounded-lg p-6 max-w-md mx-auto"
              >
                <div className="flex items-center justify-center mb-2">
                  <ChefHat className="w-6 h-6 text-white mr-2" />
                  <span className="text-white font-semibold">Welcome to the family!</span>
                </div>
                <p className="text-orange-100 text-sm">
                  Check your email for a welcome message and your first recipe collection.
                </p>
              </motion.div>
            )}

            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-orange-100 text-sm">
              <div className="flex items-center">
                <Gift className="w-4 h-4 mr-2" />
                <span>Free weekly recipe collections</span>
              </div>
              <div className="flex items-center">
                <ChefHat className="w-4 h-4 mr-2" />
                <span>Exclusive cooking tips</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>Unsubscribe anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSignup 