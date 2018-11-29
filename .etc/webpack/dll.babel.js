const webpack = require('webpack')
const {ASSETS, DLL, ROOT} = require('../config/paths')

const {DllPlugin, DefinePlugin, LoaderOptionsPlugin, NoEmitOnErrorsPlugin, optimize: {ModuleConcatenationPlugin}} = webpack

exports.default = {
    node: {
        fs: 'empty',
        // console: false,
        // global: false,
        // process: false,
        // Buffer: false,
    },
    cache: true,
    context: ROOT,
    performance: false,
    mode: 'production',
    entry: {
        vendor: [
            '@babel/polyfill',
            'react',
            'react-dom',
            'react-hyperscript',
            'most',
            'page',
            'eventemitter3',
            'superagent',
            'zousan',
            'lokijs',
        ]
    },
    output: {
        filename: 'js/[name].js',
        path: ASSETS,
        library: '[name]',
        libraryTarget: 'umd'
    },
    plugins: [
        new DllPlugin({context: ROOT, path: DLL, name: '[name]'}),
        new DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
        new LoaderOptionsPlugin({minimize: true, debug: false}),
        new NoEmitOnErrorsPlugin,
        new ModuleConcatenationPlugin,
    ],
    resolve: {
        unsafeCache: true,
        extensions: ['.js', '.es6', '.jsx', '.less', '.svg'],
        modules: ['node_modules']
    },
    resolveLoader: {modules: ['node_modules']}
}
