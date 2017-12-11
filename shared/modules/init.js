import {router} from '../modules/router'
import {fetch, pages, upsert, delay} from '../modules'

const mapPages = res => res.forEach(page => upsert(pages, page))

export const init = async () => {

    await
        fetch({uri: '/api/pages.json'})
            .then(mapPages)
            .catch(console.error)

    await delay(500)

    return router.start()
}
