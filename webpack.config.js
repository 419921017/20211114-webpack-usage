const path = require('path');
const webpack = require('webpack');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

/**
 * @type webpack.Configuration | webpack.WebpackOptionsNormalized
 */
const config = {
  entry: resolve('src/index.js'),
  devtool:
    process.env.NODE_ENV == 'development'
      ? 'eval-source-map'
      : 'hidden-source-map',
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
  devServer: {
    static: resolve('public'),
    port: 8080,
    open: true,
    compress: true,
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      '@src': resolve('src'),
    },
  },
  externals: {
    // jquery: '$',
    // lodash: '_'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  //默认false,也就是不开启
  //   watch: true,
  //只有开启监听模式时，watchOptions才有意义
  //   watchOptions: {
  //默认为空，不监听的文件或者文件夹，支持正则匹配
  // ignored: /node_modules/,
  //监听到变化发生后会等300ms再去执行，默认300ms
  // aggregateTimeout: 300,
  //判断文件是否发生变化是通过不停的询问文件系统指定议是有变化实现的，默认每秒问1000次
  // poll: 1000,
  //   },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: { fix: true },
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        use: ['babel-loader'],
      },
      { test: /.txt$/, use: ['raw-loader'] },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      //   {
      //     test: /\.module\.css$/,
      //     use: [
      //       MiniCssExtractPlugin.loader,
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           modules: {
      //             mode: 'local',
      //             localIdentName: '[path][name]__[local]--[hash:base64:5]',
      //           },
      //           url: true,
      //           import: true,
      //         },
      //       },
      //     ],
      //   },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|bmp|gif|svg)$/,
        // asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
        // asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
        // asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
        generator: {
          filename: 'images/[hash][ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: [resolve('dist')] }),
    new HTMLWebpackPlugin({
      template: resolve('public/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    // @ts-ignore
    new OptimizeCssAssetsWebpackPlugin(),
    // webpack.DefinePlugin 的原理是替换字符串
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    // @ts-ignore
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('static'), //静态资源目录源地址
          to: resolve('dist/static'), //目标地址，相对于output的path目录
        },
      ],
    }),
    // @ts-ignore
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new webpack.SourceMapDevToolPlugin({
      append: '\n//#sourceMappingURL=http://127.0.0.1:8081/[url]',
      filename: '[file].map',
    }),
    // @ts-ignore
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: './dist/*.map',
              destination: resolve('maps'),
            },
          ],
          delete: ['./dist/*.map'],
        },
      },
    }),
    // @ts-ignore
    new BundleAnalyzerPlugin(),
  ],
};

module.exports = config;
