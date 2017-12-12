export const isObject = val => {
    const type = typeof val
    return val != null && (type == 'object' || type == 'function')
}

export const delay = ms => new Promise(r => setTimeout(r, ms))
export const filterEsModule = j => Reflect.ownKeys(j).filter(k => k != '__esModule')
export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
export const pipe = (...fns) => compose.apply(compose, fns.reverse())
export const guid = () => [2, 1, 1, 1, 3].map(n => Array.from(Array(n), () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)).join('')).join('-')

export const LazyComponent = path =>  import('../components/pages/' + path)