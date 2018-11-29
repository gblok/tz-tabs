import {Common, Plugins, Rules} from './common'

const
    client = () => {
        const opts = Object.create(null)
        return {
            entry: {app: ['./client', './client/less/app']},
            ...Common(opts),
            plugins: Plugins(opts),
            module: {rules: Rules(opts)}
        }
    }


export default () => [client()]
