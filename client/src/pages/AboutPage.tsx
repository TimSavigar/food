import { Helmet } from 'react-helmet-async'

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Recipe Ideas</title>
        <meta name="description" content="Learn about Recipe Ideas, our mission to provide AI-generated recipes for food enthusiasts, and our commitment to culinary innovation." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About Us</h1>
        <p className="text-gray-600 mb-8">About page coming soon...</p>
      </div>
    </>
  )
}

export default AboutPage 