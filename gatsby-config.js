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
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        // Defaults used for gatsbyImageData and StaticImage
        defaults: {},
        // Set to false to allow builds to continue on image errors
        failOnError: true,
        // deprecated options and their defaults:
        base64Width: 20,
        forceBase64Format: ``, // valid formats: png,jpg,webp
        useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
        stripMetadata: true,
        defaultQuality: 50,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          },
        ],
      },
    },
  ],
};
