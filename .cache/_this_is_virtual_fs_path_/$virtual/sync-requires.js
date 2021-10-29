
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/Users/alexey/Sites/jamstack-intro/.cache/dev-404-page.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/alexey/Sites/jamstack-intro/src/pages/index.js"))
}

