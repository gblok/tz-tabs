import {h} from '../../modules'
export default ({length = 10}) => h('ul', Array.from({length}, (_,i)=> h('li', `item ${i}`)))