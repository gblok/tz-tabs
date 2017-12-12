import {Common, Loaders, Plugins} from './common'

export default env => ({
    ...Common(env),
    performance: {
        hints: false
    },
    entry: {
        client: ['./client', './client/sprite'],
        themes: './client/less/themes/default'
    },
    module: {
        rules: Loaders(env)
    },
    plugins: Plugins(env)
})
