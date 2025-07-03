import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import RecipePage from './pages/RecipePage'
import RecipesPage from './pages/RecipesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Recipe Ideas - Discover Amazing Recipes for Food Enthusiasts</title>
        <meta name="description" content="Explore thousands of AI-generated recipes, filter by ingredients, dietary preferences, cooking styles, and more. Perfect for food enthusiasts looking for inspiration." />
        <meta name="keywords" content="recipes, cooking, food, AI recipes, meal ideas, cooking inspiration, dietary recipes, vegetarian, vegan, gluten-free" />
        <meta property="og:title" content="Recipe Ideas - Discover Amazing Recipes" />
        <meta property="og:description" content="Explore thousands of AI-generated recipes for every occasion and dietary preference." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://recipe-ideas.food" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Recipe Ideas - Discover Amazing Recipes" />
        <meta name="twitter:description" content="Explore thousands of AI-generated recipes for every occasion and dietary preference." />
        <meta name="twitter:image" content="/og-image.jpg" />
        <link rel="canonical" href="https://recipe-ideas.food" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Helmet>

      <Header />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipe/:slug" element={<RecipePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App 