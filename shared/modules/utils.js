export const delay = ms => new Promise(r => setTimeout(r, ms))
export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
export const LazyComponent = path => import(/* webpackChunkName: 'dyn-' */ '../components/' + path)