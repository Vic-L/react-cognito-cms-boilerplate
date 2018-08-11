'use strict'

module.exports.render = (event, context, callback) => {
  const html = '<!DOCTYPE html><html><head>' + 
    '<meta name="google-site-verification" content="oBaDpSrHDQXhIqcAJNmmTej9rroQdapuy2dH9IDmxv8" />' + 
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<meta http-equiv="Content-Type" content="text/html;charset=utf-8">' +
    '<title>TODO Title of page</title>' +
    '<meta name="description" content="TODO Meta description of site">' +
    '<meta property="og:title" content="TODO Title of page"/>' + 
    '<meta prefix="og: http://ogp.me/ns#" property="og:image" content="TODO url to image"/>' + 
    '<meta property="og:description" content="TODO description"/>' + 
    '<meta property="og:url" content="https://' + event.headers.Host + event.path + '" />' +

    //** favicons 
    /*
    '<link rel="apple-touch-icon" sizes="57x57" href="/path/to/favicons/apple-icon-57x57.png">' +
    '<link rel="apple-touch-icon" sizes="60x60" href="/path/to/favicons/apple-icon-60x60.png">' +
    '<link rel="apple-touch-icon" sizes="72x72" href="/path/to/favicons/apple-icon-72x72.png">' +
    '<link rel="apple-touch-icon" sizes="76x76" href="/path/to/favicons/apple-icon-76x76.png">' +
    '<link rel="apple-touch-icon" sizes="114x114" href="/path/to/favicons/apple-icon-114x114.png">' +
    '<link rel="apple-touch-icon" sizes="120x120" href="/path/to/favicons/apple-icon-120x120.png">' +
    '<link rel="apple-touch-icon" sizes="144x144" href="/path/to/favicons/apple-icon-144x144.png">' +
    '<link rel="apple-touch-icon" sizes="152x152" href="/path/to/favicons/apple-icon-152x152.png">' +
    '<link rel="apple-touch-icon" sizes="180x180" href="/path/to/favicons/apple-icon-180x180.png">' +
    '<link rel="icon" type="image/png" sizes="192x192"  href="/path/to/favicons/android-icon-192x192.png">' +
    '<link rel="icon" type="image/png" sizes="32x32" href="/path/to/favicons/favicon-32x32.png">' +
    '<link rel="icon" type="image/png" sizes="96x96" href="/path/to/favicons/favicon-96x96.png">' +
    '<link rel="icon" type="image/png" sizes="16x16" href="/path/to/favicons/favicon-16x16.png">' +
    '<link rel="manifest" href="/path/to/favicons/manifest.json">' +
    '<meta name="msapplication-TileColor" content="#ffffff">' +
    '<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">' +
    '<meta name="theme-color" content="#ffffff">' +
    */

    '</head>' + 
    '<body>' +
    '<div id="app"></div>' +
    `<script type="text/javascript" src="https://${process.env.assetDomainName}/assets/bundle-${process.env.bundleHash}" async></script>` +
    '</body></html>'

  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: html,
  }

  callback(null, response)
}
