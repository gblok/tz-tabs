import {hub} from '../modules'

class Store {

    constructor() {
        this.data = {}
    }

    get(path) {

        if (!path)
            return this.data


        const split = path.split('.')
        let target = this.data

        for (let i = 0; i < split.length; i++) {

            const part = split[i]

            if (part in target) {
                target = target[part]
            } else {
                return
            }
        }

        return target
    }

    set(path, value) {

        const split = path.split('.')

        let target = this.data = {...this.data}

        for (let i = 0; i < split.length; i++) {

            const part = split[i]

            if (i === split.length - 1) {
                target[part] = value
            }
            else {
                target = target[part] = {
                    ...target[part]
                }
            }
        }

        hub.emit('PUSH', path)
    }
}


export const store = new Store