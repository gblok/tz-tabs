import {h} from '../../modules'
export default props => h('loader', [h('svg', {className: 'icon'}, [h('use', {xlinkHref: '#spinner'})])])
