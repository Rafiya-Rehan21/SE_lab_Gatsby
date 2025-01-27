/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://Rafiya-Rehan21.github.io/SE_lab_Gatsby`, // Update this with your GitHub username
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },

    // New plugins for markdown files
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts", // This is the name of the source
        path: `${__dirname}/src/posts/`, // Path where markdown files are located
      },
    },
    "gatsby-transformer-remark", // To transform markdown files into HTML
    
    // Add this plugin for SEO
    `gatsby-plugin-react-helmet`,  // For managing SEO metadata
  ],
  pathPrefix: "/SE_lab_Gatsby", // Add pathPrefix for GitHub Pages deployment
}
