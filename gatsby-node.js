const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {

  const { createPage } = actions
  return new Promise(async resolve => {

    const result = await graphql(`
        {
        allAirtable {
          edges {
            node {
              data {
                quizName
              }
            }
          }
        }
      }
    `)
    // For each path, create page and choose a template.
    // values in context Object are available in that page's query
    result.data.allAirtable.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.data.quizName}`,
        component: path.resolve(`./src/templates/quiz.js`),
        context: {
            quizName: node.data.quizName,
        },
      })
    });
    resolve()
  })
}