import {h, pages, store} from '../../modules'
import {ROUTE} from '../../actions'
import {InitAppData} from '../../../.etc/config'

const {title, charCode} = InitAppData

export default () => {

    let current = store.get('current') || {id: null},
        {id} = current

    return h('header',
        [
            h('logo', {onClick: () => ROUTE('')}, [
                h('span', String.fromCharCode(charCode)),
                h('abbr', title)
            ]),
            h('nav', pages
                .chain()
                .simplesort('order')
                .map(page => h('a', {
                    className: id === page.id ? 'active' : '',
                    onClick: id === page.id ? false : () => ROUTE(page.id)
                }, page.title))
                .data()
            )
        ])


}