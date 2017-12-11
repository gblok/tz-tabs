import {Common, Loaders, Plugins} from './common'

export default env => ({
    ...Common(env),
    performance: {
        hints: false
    },
    entry: {
        client: './client',
        themes: './client/less/themes/default',
        //svg: './client/sprite'
    },
    module: {
        rules: Loaders(env)
    },
    plugins: Plugins(env)
})
