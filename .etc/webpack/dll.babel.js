import {
    DefinePlugin,
    DllPlugin,
    LoaderOptionsPlugin,
    MinifyPlugin,
    ModuleConcatenationPlugin,
    NoEmitOnErrorsPlugin,
    UglifyJSPlugin
} from './common'

import {DLL, STATIC} from '../config'

export default {
    context: process.cwd(),
    cache: true,
    performance: {hints: false},
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    entry: {
        vendor: [
            'react',
            'react-dom',
            'react-hyperscript',
            'most',
            'page',
            'eventemitter3',
            'superagent',
            'zousan',
        ],
    },
    output: {
        filename: 'assets/js/[name].js',
        path: STATIC,
        library: '[name]',
        libraryTarget: 'umd'
    },
    resolve: {
        unsafeCache: true,
        extensions: ['.js'],
        modules: ['node_modules']
    },
    resolveLoader: {
        modules: ['node_modules']
    },
    plugins: [
        new DllPlugin({
            context: process.cwd(),
            path: DLL,
            name: '[name]'
        }),
        new DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
        new LoaderOptionsPlugin({
            debug: false,
            minimize: true,
            sourceMap: false,
        }),
        new NoEmitOnErrorsPlugin,
        new ModuleConcatenationPlugin,
        new MinifyPlugin({removeConsole: true, removeDebugger: true}, {comments: true}),
        new UglifyJSPlugin(
            {
                cache: './tmp/ugly',
                test: /\.js($|\?)/i,
                parallel: true
            }
        ),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'server',
        //     analyzerHost: '127.0.0.1',
        //     analyzerPort: 8888,
        //     reportFilename: 'report.html',
        //     defaultSizes: 'parsed',
        //     openAnalyzer: true,
        //     generateStatsFile: false,
        //     statsFilename: 'stats.json',
        //     statsOptions: null,
        //     logLevel: 'info'
        // })
    ]
}

