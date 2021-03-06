import Page from 'page'
import {hub, pages, store} from '../modules'

class Router {
    constructor() {

        const Handler = this.handler.bind(this)
        Page('/:page', Handler)
        Page('/', Handler)

    }

    handler(route) {

        let {params} = route,
            {page = null} = params

        let current = page
            ? pages.by('id', page) || null
            : pages.findOne({order: {'$eq': 0}})


        store.set('route', route)
        store.set('current', current)

        hub.emit('APP', {isInit: true})
    }


    page(uri) {
        Page(uri)
    }

    start() {
        Page.start(true)
    }

}

export const router = new Router
