import React from 'react'

interface SEOOptimizerProps {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'recipe'
  recipe?: {
    name: string
    description: string
    image: string
    prepTime: number
    cookTime: number
    totalTime: number
    servings: number
    cuisine: string
    ingredients: Array<{ amount: string; unit: string; name: string }>
    instructions: string[]
    nutrition: {
      calories: number
      protein: number
      carbs: number
      fat: number
      fiber: number
    }
    rating: number
    reviewCount: number
    dietary: string[]
    tags: string[]
  }
  breadcrumbs?: Array<{ name: string; url: string }>
}

const SEOOptimizer: React.FC<SEOOptimizerProps> = ({
  title,
  description,
  keywords = [],
  image = '/og-image.jpg',
  url,
  type = 'website',
  recipe,
  breadcrumbs
}) => {
  const baseUrl = 'https://recipe-ideas.food'
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`

  // Generate structured data based on type
  const generateStructuredData = () => {
    if (type === 'recipe' && recipe) {
      return {
        "@context": "https://schema.org",
        "@type": "Recipe",
        "name": recipe.name,
        "description": recipe.description,
        "image": recipe.image,
        "author": {
          "@type": "Organization",
          "name": "Recipe Ideas"
        },
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "prepTime": `PT${recipe.prepTime}M`,
        "cookTime": `PT${recipe.cookTime}M`,
        "totalTime": `PT${recipe.totalTime}M`,
        "recipeYield": `${recipe.servings} servings`,
        "recipeCategory": recipe.cuisine,
        "recipeCuisine": recipe.cuisine,
        "keywords": recipe.tags.join(', '),
        "recipeIngredient": recipe.ingredients.map(ing => `${ing.amount} ${ing.unit} ${ing.name}`),
        "recipeInstructions": recipe.instructions.map((instruction, index) => ({
          "@type": "HowToStep",
          "position": index + 1,
          "text": instruction
        })),
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": `${recipe.nutrition.calories} calories`,
          "proteinContent": `${recipe.nutrition.protein}g`,
          "carbohydrateContent": `${recipe.nutrition.carbs}g`,
          "fatContent": `${recipe.nutrition.fat}g`,
          "fiberContent": `${recipe.nutrition.fiber}g`
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": recipe.rating,
          "reviewCount": recipe.reviewCount
        },
        "suitableForDiet": recipe.dietary,
        "recipeDifficulty": "medium"
      }
    }

    if (type === 'website') {
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Recipe Ideas",
        "url": baseUrl,
        "description": "Discover amazing AI-generated recipes for every occasion and dietary preference.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/recipes?search={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    }

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "image": fullImage,
      "author": {
        "@type": "Organization",
        "name": "Recipe Ideas"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Recipe Ideas",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`
        }
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString()
    }
  }

  // Generate breadcrumb structured data
  const generateBreadcrumbData = () => {
    if (!breadcrumbs) return null

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    }
  }

  const structuredData = generateStructuredData()
  const breadcrumbData = generateBreadcrumbData()

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Recipe Ideas" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@recipeideas" />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Recipe Ideas" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* Language and Region */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Performance and Security */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="theme-color" content="#f59e0b" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Breadcrumb Structured Data */}
      {breadcrumbData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData)
          }}
        />
      )}
      
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Recipe Ideas",
            "url": baseUrl,
            "logo": `${baseUrl}/logo.png`,
            "description": "Discover amazing AI-generated recipes for every occasion and dietary preference.",
            "sameAs": [
              "https://facebook.com/recipeideas",
              "https://twitter.com/recipeideas",
              "https://instagram.com/recipeideas",
              "https://youtube.com/recipeideas"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "hello@recipe-ideas.food"
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            }
          })
        }}
      />
    </>
  )
}

export default SEOOptimizer 