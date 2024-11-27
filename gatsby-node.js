/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Create a page for /using-dsg (your existing page)
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  });

  // Fetch all markdown posts and create pages for them
  const result = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `);

  // Check if there are no markdown files
  if (result.errors) {
    console.log(result.errors);
    throw new Error("There was an error fetching markdown files");
  }

  // Define the blog post template path
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);

  // Create a page for each markdown file
  result.data.allMarkdownRemark.nodes.forEach(node => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: node.fields.slug,
      },
    });
  });
};

// Add slugs to markdown files
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    // Create a slug from the markdown file path
    const slug = `/blog${node.fileAbsolutePath.split("/src/posts/")[1].replace(".md", "")}`;
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};
