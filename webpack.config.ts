import path from 'node:path'
import process from 'node:process'

import dotenv from 'dotenv'
import { DefinePlugin, type Configuration, type LoaderContext } from 'webpack'
import HtmlPlugin from 'html-webpack-plugin'
import CssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

const srcDir = path.resolve(__dirname, 'src')
const distDir = path.resolve(__dirname, 'dist')

const allowedEnvVars = ['NODE_ENV']

const filterStringifyEnv = (env: { [key: string]: string }) =>
  Object.fromEntries(
    Object.entries(env)
      .filter(([key]) => allowedEnvVars.includes(key))
      .map(([key, value]) => [key, JSON.stringify(value)]),
  )

function createGetLocalIdent(minimize: boolean) {
  if (minimize) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const map = new Map<string, string>()
    let current = 0

    return (context: LoaderContext<unknown>, _: string, className: string) => {
      // e.g. components/Header/Header.module.scss:title
      const classPath = `${path.relative(
        context.rootContext,
        context.resourcePath,
      )}:${className}`

      if (map.has(classPath)) {
        return map.get(classPath)!
      }

      let word = ''
      let num = current

      do {
        word += alphabet[num % alphabet.length]
        num = Math.floor(num / alphabet.length)
      } while (num > 0)

      current += 1
      map.set(classPath, word)

      return word
    }
  }

  return (context: LoaderContext<unknown>, _: string, className: string) => {
    const name = context.resourcePath.endsWith('index.module.scss')
      ? path.basename(path.dirname(context.resourcePath))
      : path.basename(context.resourcePath).replace('.module.scss', '')

    // e.g. Header_title
    return `${name}_${className}`
  }
}

const configure = (cliEnv: { [key: string]: string } = {}) => {
  const dotEnv = {}
  dotenv.config({ processEnv: dotEnv })

  const env: { [key: string]: string } = {
    ...process.env,
    ...dotEnv,
    ...cliEnv,
  }

  const isDev = env.NODE_ENV !== 'production'

  const configuration: Configuration & { devServer: object } = {
    target: 'browserslist',
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'source-map' : false,

    devServer: {
      hot: true,
    },

    context: srcDir,
    entry: './index.tsx',

    resolve: {
      alias: {
        '@': srcDir,
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },

    output: {
      publicPath: '/',
      filename: '[contenthash].js',
      path: distDir,
      clean: true,
    },

    plugins: [
      new HtmlPlugin({
        template: './index.html',
        templateParameters: { env },
      }),
      new CssExtractPlugin({
        filename: '[contenthash].css',
      }),
      new DefinePlugin({ 'process.env': filterStringifyEnv(env) }),
      isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),

    optimization: {
      minimizer: ['...', new CssMinimizerPlugin()],
    },

    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: [
            isDev ? 'style-loader' : CssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  auto: /\.module\.scss$/i,
                  getLocalIdent: createGetLocalIdent(!isDev),
                },
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(ts|tsx)$/i,
          loader: 'babel-loader',
          options: {
            plugins: isDev ? ['react-refresh/babel'] : undefined,
          },
        },
        {
          test: /\.(png|jpg|jpeg|webp|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },
  }

  return configuration
}

export default configure
