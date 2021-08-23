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
    '@cc': path.resolve(__dirname, 'src/components'),
    
    '@auth': path.resolve(__dirname, 'src/views/authentication'),

    '@addressesTypes': path.resolve(__dirname, 'src/views/setup/general/addressesTypes'),
    '@paymentMethods': path.resolve(__dirname, 'src/views/setup/general/paymentMethods'),
    '@departments': path.resolve(__dirname, 'src/views/setup/general/departments'),

    '@activities': path.resolve(__dirname, 'src/views/setup/customers/activity'),
    '@customerCategory': path.resolve(__dirname, 'src/views/setup/customers/customerCategory'),
    '@customerType': path.resolve(__dirname, 'src/views/setup/customers/customerType'),
    '@origin': path.resolve(__dirname, 'src/views/setup/customers/origin'),
    '@brand': path.resolve(__dirname, 'src/views/setup/vehicles/brand'),
    
    '@language': path.resolve(__dirname, 'src/views/global/language'),
    '@status': path.resolve(__dirname, 'src/views/global/status'),
    '@mode': path.resolve(__dirname, 'src/views/global/mode'),
    '@payDay': path.resolve(__dirname, 'src/views/global/payDay'),
    
    '@assets': path.resolve(__dirname, 'src/@core/assets'),
    '@components': path.resolve(__dirname, 'src/@core/components'),
    '@layouts': path.resolve(__dirname, 'src/@core/layouts'),
    '@store': path.resolve(__dirname, 'src/redux'),
    '@styles': path.resolve(__dirname, 'src/@core/scss'),
    '@configs': path.resolve(__dirname, 'src/configs'),
    '@utils': path.resolve(__dirname, 'src/utility/Utils'),
    '@hooks': path.resolve(__dirname, 'src/utility/hooks'),
    '@helpers': path.resolve(__dirname, 'src/utility/helpers')
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
