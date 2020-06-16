const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  /* here you can define another js file */
  entry: {
    game: "./src/js/game.js",
    start: "./src/js/start.js",
    
  
  },
  output: {
    filename: "[name].[hash:8].js",
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      {
        test: [/.js$/],
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },

  devServer: {
    port: 8080,
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),

    /* here you can define another html file and its dependencies */
    new HtmlWebpackPlugin({
      template: "./src/pages/score.html",
      inject: true,
      chunks: ["game"],
      filename: "score.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/game.html",
      inject: true,
      chunks: ["game"],
      filename: "game.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/index.html",
      inject: true,
      chunks: ["start"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/ranking.html",
      inject: true,
      chunks: ["game"],
      filename: "ranking.html",
    }),
    
  ],
};
