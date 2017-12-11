import {h} from '../../modules'
import {ROUTE} from '../../actions'
import {InitAppData} from '../../../.etc/config'

const {title, charCode} = InitAppData

export default () => h('header',
    [
        h('logo', {onClick: () => ROUTE('/')}, [
            h('span', String.fromCharCode(charCode)),
            h('abbr', title)
        ])
    ])