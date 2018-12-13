/**
 * 모듈 import
 */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssnano = require('cssnano');
const cssDeclarationSorter = require('css-declaration-sorter');
const autoprefixer = require('autoprefixer');

/**
 * 프로젝트 각종 폴더 경로 설정
 */
const PROJECT_FOLDER = '';
const BUNDLE_SCRIPT_FOLDER = 'js-dev';
const ASSETS_FOLDER = 'src';

/**
 * 기본 프로젝트 url 설정
 */
const projectBasePath = path.resolve(__dirname, PROJECT_FOLDER);
const assetsBasePath = path.resolve(projectBasePath, ASSETS_FOLDER);

module.exports = (env, options) => {
  const config = {
    mode: 'none',
    entry: {
      sample: path.resolve(assetsBasePath, 'scss', 'sample.scss')
    },
    output: {
      path: projectBasePath,
      filename: `./${ASSETS_FOLDER}/${BUNDLE_SCRIPT_FOLDER}/[name].js`,
      publicPath: '/'
    },
    optimization: {
      minimizer: [
        
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: './css/[name].css', 
        chunkFilename: './css/[id].css'
      })
    ],
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            { 
              loader: MiniCssExtractPlugin.loader, 
              options: { 
                publicPath: '../'
              } 
            },
            { 
              loader: 'css-loader', 
              options: { 
                sourceMap: true
              } 
            },
            { 
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: () => [ 
                  cssnano({
                    preset: ['default', {
                      discardComments: false,
                      normalizeWhitespace: false
                    }]
                  }),
                  cssDeclarationSorter({
                    order: 'smacss'
                  }),
                  autoprefixer()
                ]
              }
            },
            { 
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[ext]?[hash:7]',
                useRelativePath: true,
                outputPath: '',
                limit: 10000
              }
            }
          ]
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[ext]?[hash:7]',
                useRelativePath: true,
                outputPath: '',
                limit: 10000
              }
            }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[ext]?[hash:7]',
                useRelativePath: true,
                outputPath: '',
                limit: 10000
              }
            }
          ]
        }
      ]
    }
  }
  return config;
}
