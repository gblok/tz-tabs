import {h} from '../../modules'

export const dummyList = ({length = 10}) => h('ul', {className: 'list'}, Array.from({length}, (_, i) => h('li', `List item ${i}`)))