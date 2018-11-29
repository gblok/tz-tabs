import {resolve} from 'path'

export const
    ROOT = process.cwd(),
    CLIENT = resolve(ROOT, 'client'),
    EXCLUDE = resolve(ROOT, 'node_modules'),
    STATIC = resolve(ROOT, 'static'),
    ASSETS = resolve(STATIC, 'assets'),
    VIEWS = resolve(ROOT, '.etc', 'views'),
    DLL = resolve(ASSETS, 'dll', '[name].json'),
    VENDOR = resolve(ASSETS, 'dll', 'vendor.json')





