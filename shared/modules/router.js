import Page from 'page'
import {hub, pages, store} from '../modules'

class Router {
    constructor() {

        const Handler = this.handler.bind(this)
        Page(':page?', Handler)

    }

    handler(route) {

        let {params} = route,
            {page = null} = params,
            current = page
                ? pages.by('id', page) || null
                : pages.findOne({order: {'$eq': 0}})


        store.set('route', route)
        store.set('current', current)

        hub.emit('APP', {isInit: true})
    }


    start() {
        Page.start(true)
    }

}

export const router = new Router
