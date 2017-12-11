import path from 'path'

export const ROOT = path.resolve(process.cwd())

export const STATIC = path.join(ROOT, 'static')
export const SHARED = path.join(ROOT, 'shared')
export const SERVER = path.join(ROOT, 'server')
export const EXCLUDE = path.join(ROOT, 'node_modules')

export const ASSETS = path.join(STATIC, 'assets')
export const SVG = path.join(STATIC, 'svg')
export const VIEWS = path.join(SERVER, 'views')

export const DLL = path.join(ASSETS, 'dll', '[name].json')
export const VENDOR = path.join(ASSETS, 'dll', 'vendor.json')






