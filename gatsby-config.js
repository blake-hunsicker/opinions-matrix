module.exports = {
  siteMetadata: {
    title: `Opinions Matrix`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `./src/pages/`,
      },
      __key: `pages`,
    },
    {
      resolve: `gatsby-plugin-firebase`,
      options: {
        credentials: {
          apiKey: `AIzaSyBsF8PqS8CiuZjXM2RuQylt1OlmjuB7J0c`,
          authDomain: `opinions-matrix.firebaseapp.com`,
          projectId: `opinions-matrix`,
          storageBucket: `opinions-matrix.appspot.com`,
          messagingSenderId: `124389092606`,
          appId: `1:124389092606:web:01035616e060b5500c09af`,
          measurementId: `G-HCVNDZLQYJ`
        }
      }
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: `keyFJiFrIZGSPxG3c`, // may instead specify via env, see below
        concurrency: 5, // default, see using markdown and attachments for more information
        tables: [
          {
            baseId: `appontMRsyjoxJ5Ww`,
            tableName: `quizzes`,
            tableView: `table`,
            separateNodeType: false, // boolean, default is false, see the documentation on naming conflicts for more information
            separateMapType: false, // boolean, default is false, see the documentation on using markdown and attachments for more information
          }
        ]
      }
    },
  ],
};
