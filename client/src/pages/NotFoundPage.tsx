import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Recipe Ideas</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to our homepage to discover amazing recipes." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary">
          Return to Homepage
        </Link>
      </div>
    </>
  )
}

export default NotFoundPage 