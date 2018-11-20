/**
 * 모듈 import
 */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

/**
 * 개발모드, 프로덕션모드 구분
 */
const devMode = process.env.NODE_ENV !== 'production';

/**
 * 프로젝트 폴더 경로와 SCSS 폴더 경로 기입
 */
const PROJECT_FOLDER_URL = './' // 입력 필요
const SCSS_ASSETS_FOLDER_URL = 'scss' // 입력 필요

/**
 * 기본 프로젝트 url 설정
 */
const projectBaseUrl = path.resolve(__dirname, PROJECT_FOLDER_URL);
const scssBaseUrl = path.resolve(projectBaseUrl, SCSS_ASSETS_FOLDER_URL);

module.exports = {
  /**
   * 입력받을 파일 지정
   * (SA/SC/C)SS를 참조하는 js파일 나열
   */
  entry: {
    sample: path.resolve(scssBaseUrl, 'sample.js')  // key값을 파일명으로 활용, resolve 두번째 인자가 번들js 대상
  },
  output: {
    path: projectBaseUrl,
    filename: './js-dev/[name].js', 
    publicPath: '/'
  },
  optimization: {
    minimizer: [
      // new OptimizeCSSAssetsPlugin({})  // minify 결과물을 원한다면 주석 제거
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
      devMode ? 
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      } : 
      {},
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? { loader: 'style-loader', options: { sourceMap: true, convertToAbsoluteUrls: false }} : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: devMode ? true : false, sourceMap: true } },
          { loader: 'postcss-loader', options: { plugins: () => [ autoprefixer() ] } },
          'sass-loader'
        ]
      }
    ]
  }
}
