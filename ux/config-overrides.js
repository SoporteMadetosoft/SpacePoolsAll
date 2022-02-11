const SassRuleRewire = require('react-app-rewire-sass-rule')
const path = require('path')
const rewireAliases = require('react-app-rewire-aliases')

module.exports = function override(config, env) {
  require('react-app-rewire-postcss')(config, {
    plugins: loader => [require('postcss-rtl')()]
  })


  config = rewireAliases.aliasesOptions({
    '@src': path.resolve(__dirname, 'src'),
    '@fixed': path.resolve(__dirname, 'src/fixed'),
    '@redux': path.resolve(__dirname, 'src/redux'),
    '@router': path.resolve(__dirname, 'src/router'),
    '@views': path.resolve(__dirname, 'src/views'),

    '@auth': path.resolve(__dirname, 'src/views/authentication'),

    '@core': path.resolve(__dirname, 'src/@core'),
    '@assets': path.resolve(__dirname, 'src/@core/assets'),
    '@components': path.resolve(__dirname, 'src/@core/components'),
    '@layouts': path.resolve(__dirname, 'src/@core/layouts'),
    '@styles': path.resolve(__dirname, 'src/@core/scss'),

    '@configs': path.resolve(__dirname, 'src/configs'),
    '@utils': path.resolve(__dirname, 'src/utility/Utils'),
    '@hooks': path.resolve(__dirname, 'src/utility/hooks'),
    '@helpers': path.resolve(__dirname, 'src/utility/helpers'),
    '@context': path.resolve(__dirname, 'src/utility/context'),
    '@utility': path.resolve(__dirname, 'src/utility')

  })(config, env)

  config = new SassRuleRewire()
    .withRuleOptions({
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              includePaths: ['node_modules', 'src/assets']
            }
          }
        }
      ]
    })
    .rewire(config, env)
  return config
}
