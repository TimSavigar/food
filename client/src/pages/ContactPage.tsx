import { Helmet } from 'react-helmet-async'

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Recipe Ideas</title>
        <meta name="description" content="Get in touch with the Recipe Ideas team. We'd love to hear from you about recipes, suggestions, or any questions you might have." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <p className="text-gray-600 mb-8">Contact page coming soon...</p>
      </div>
    </>
  )
}

export default ContactPage 