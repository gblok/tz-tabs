import {h} from '../../modules'
import {ROUTE} from '../../actions'

export default props => h('header',
    [
        h('logo', {onClick: () => ROUTE('/')}, [
            h('span', String.fromCharCode(9763)),
            h('abbr', `React Tz App`)
        ])
    ])