import { Helmet } from 'react-helmet-async'

const RecipesPage = () => {
  return (
    <>
      <Helmet>
        <title>All Recipes - Recipe Ideas</title>
        <meta name="description" content="Browse our complete collection of AI-generated recipes. Filter by cuisine, dietary preferences, cooking time, and more." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Recipes</h1>
        <p className="text-gray-600 mb-8">Recipe listing page coming soon...</p>
      </div>
    </>
  )
}

export default RecipesPage 