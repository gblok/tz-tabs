import request from 'superagent'

const headers = {'Accept': 'application/json'},
    _pending = new Set

export const fetch = async ({method = 'get', uri = null}) => {

    if(!uri)
        throw Error('fetch not uri')


    return _pending.has(uri)
        ? null
        : (
            _pending.add(uri),
                await
                    request[method](uri)
                        .set(headers)
                        .then(res => {
                            _pending.delete(uri)
                            return res.body
                        })
                        .catch(console.error)
        )


}

