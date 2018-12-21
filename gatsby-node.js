const fetch = require('cross-fetch');
var path = require('path');
const getCMSData = () => {
  const URL =
    'http://prototype.microsites.partnersite.mobi/bofaml/mz/1542233103/bankofamericamerrilllynch/cms.json'
  return fetch(URL)
    .then(resp => resp.json())
    .catch(function (error) {
      console.log('error')
    })
}

const getTwitterData = () => {
  const URL =
    'http://prototype.microsites.partnersite.mobi/bofaml/mz/1542233103/bankofamericamerrilllynch/twitter.json'
  return fetch(URL)
    .then(resp => resp.json())
    .catch(function (error) {
      console.log('error')
    })
}

exports.createPages = ({ actions: { createPage } }) => {
  return Promise.all([getCMSData(), getTwitterData()]).then(requestData => {
    const data = [...requestData[0], ...requestData[1]]

    createPage({
      path: `/articles/`,
      component: path.resolve('./src/templates/all-articles.js'),

      context: { allArticles: data },
    })

    // Create a page for each Article.
    data.forEach(article => {
      createPage({
        path: `/articles/${article.article_clean_title}/`,
        component: path.resolve('./src/templates/article.js'),
        context: { article },
      })
    })
  })

  /*
  getCMSData().then(data => {
    // console.log('createpage', data)
    // Create a page that lists all the Articles.
    createPage({
      path: `/articles/`,
      component: require.resolve('./src/templates/all-articles.js'),
      context: { allArticles: data },
    })

    // Create a page for each Article.
    data.forEach(article => {
      createPage({
        path: `/articles/${article.article_clean_title}/`,
        component: require.resolve('./src/templates/article.js'),
        context: { article },
      })
    })
  })
  */
}
