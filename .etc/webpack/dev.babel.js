import {Common, Loaders, Plugins} from './common'
import {InitAppData, PORT, STATIC, VIEWS} from '../config'

export default env => ({
    ...Common(env),
    stats: false,
    entry: {
        client: [
            './client',
            './client/less/themes/default'
        ],
        //svg: ['./client/sprite']
    },
    module: {rules: Loaders(env)},
    plugins: Plugins(env),
    devServer: {
        port: PORT,
        noInfo: true,
        open: true,
        hot: true,
        compress: true,
        contentBase: STATIC,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 500,
            poll: 500
        },
        before(app) {
            app
                .set('view engine', 'pug')
                .set('views', VIEWS)
                .get('/', (req, res) => res.render('base', {app: InitAppData}))

        }
    }
})


