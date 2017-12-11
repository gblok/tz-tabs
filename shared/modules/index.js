// View
export {Component} from 'react'
export {render} from 'react-dom'
export {default as h} from 'react-hyperscript'


// Sys
export * from './utils'
export * from './db'
export * from './fetch'
export * from './hub'
export * from './store'
export * from './init'


// Lazy load Components
export const LazyComponent = new Map([
    ['dummyTable', () => import('../components/pages/dummyTable')],
    ['dummyChart', () => import('../components/pages/dummyChart')],
    ['dummyList', () => import('../components/pages/dummyList')]
])