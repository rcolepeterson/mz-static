import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SiteMetadata from '../components/site-metadata'

export default ({ pageContext: { article } }) => {
  function createMarkup() {
    return { __html: article.article_content }
  }
  // console.log('article', article);
  const baseURL = 'http://prototype.microsites.partnersite.mobi'
  return (
    <Layout>
      <SiteMetadata pathname={`articles/${article.article_clean_title}`} />
      <Link to="/articles">Back to all Articles</Link>
      <Link to={`/`}>
        <p>Home</p>
      </Link>
      <div style={{ margin: '4rem auto' }}>
        <h1>{article.article_title}</h1>
        <img alt={article.article_title} src={`${baseURL}${article.article_image_url}`} />
        <p>By {article.article_author}</p>
        <div dangerouslySetInnerHTML={createMarkup()} />
      </div>
    </Layout>
  )
}
