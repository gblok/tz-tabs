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

const DT = 'dummyTable'


// Lazy load Components
export const LazyComponent = path =>  import('../components/pages/' + path)
