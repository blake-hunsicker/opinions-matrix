module.exports = {
  siteMetadata: {
    title: `Opinions Matrix`,
  },
  plugins: [
    `gatsby-plugin-sass`,
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
    }
  ],
};
