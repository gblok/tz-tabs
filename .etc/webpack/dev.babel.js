import webpack from 'webpack'
import {PORT, STATIC, VIEWS, InitAppData} from '../config'
import {Common, Plugins, Rules} from './common'
const {HotModuleReplacementPlugin} = webpack

export default () => {

    const opts = {IS_DEV: true}
    const plugins = Plugins(opts)
    plugins.push(new HotModuleReplacementPlugin)
    const rules = Rules(opts)

    return {
        entry: {
            client: [
                './client',
                './client/less/app',
                './client/sprite'
            ]
        },
        ...Common(opts),
        plugins,
        module: {rules},
        devServer: {
            port: PORT,
            contentBase: STATIC,
            hot: true,
            compress: true,
            historyApiFallback: {index: '/'},
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
            },
            watchOptions: {
                aggregateTimeout: 1000,
                poll: 2000,
                ignored: /node_modules/
            },
            before(app) {
                app
                    .set('view engine', 'pug')
                    .set('views', VIEWS)
                    .get(['/', '/:page'], (req, res) => res.render('base', {app: InitAppData}))

            }
        }
    }
}
