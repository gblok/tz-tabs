import webpack from 'webpack'

import LessCleanCSS from 'less-plugin-clean-css'
import LessPluginAutoPrefix from 'less-plugin-autoprefix'
import LessPluginGroupMediaQueries from 'less-plugin-group-css-media-queries'

import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'

import MinifyPlugin from 'babel-minify-webpack-plugin'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'

import {EXCLUDE, STATIC, VENDOR} from '../config'

const {ProvidePlugin, HotModuleReplacementPlugin, DefinePlugin, DllReferencePlugin, LoaderOptionsPlugin, NoEmitOnErrorsPlugin, optimize: {ModuleConcatenationPlugin}, DllPlugin} = webpack


const Common = env => ({
    context: process.cwd(),
    cache: true,
    output: {
        path: STATIC,
        filename: 'assets/js/[name].js',
        sourceMapFilename: '[file].map',
        libraryTarget: 'umd'
    },
    resolve: {
        unsafeCache: true,
        extensions: ['.js', '.es6', '.pug', '.less', '.css', '.svg'],
        modules: ['node_modules']
    },
    resolveLoader: {
        modules: ['node_modules']
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
})

const Loaders = env => {
    let lessLoaders = [
        {loader: 'style-loader'},
        {loader: 'css-loader', options: {importLoaders: true}},
        {loader: 'less-loader', options: {paths: STATIC}}
    ]

    if (env === 'production') {
        lessLoaders = [
            {loader: 'file-loader', options: {name: '/assets/css/[name].css'}},
            {loader: 'csso-loader', options: {debug: 2, comments: false}},
            {
                loader: 'less-loader', options: {
                    paths: STATIC,
                    //modifyVars,
                    strictMath: true,
                    noIeCompat: true,
                    plugins: [
                        LessPluginGroupMediaQueries,
                        new LessCleanCSS({advanced: true, aggressiveMerging: true}),
                        new LessPluginAutoPrefix({browsers: ['last 2 versions']})
                    ]
                }
            }
        ]
    }

    return [
        {
            test: /\.pug$/,
            exclude: EXCLUDE,
            use: [
                {loader: 'file-loader', options: {name: '[name].html'}},
                {loader: 'pug-loader'}
            ]
        },
        {
            test: /\.js$/,
            exclude: EXCLUDE,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            targets: {
                                browsers: ['last 2 versions']
                            },
                            modules: false,
                            loose: true
                        }]
                    ],
                    cacheDirectory: 'tmp',
                    plugins: [
                        'syntax-dynamic-import',
                        'transform-class-properties',
                        'transform-object-rest-spread'
                    ]
                }
            }
        },
        {
            test: /\.svg$/,
            exclude: EXCLUDE,
            use: [
                {loader: 'svg-sprite-loader'}
            ]
        },
        {
            test: /\.less$/,
            exclude: EXCLUDE,
            use: lessLoaders
        }
    ]
}

const Plugins = env => {

    const plugins = [
        new DllReferencePlugin({
            context: process.cwd(),
            manifest: require(VENDOR)
        }),
        new LoaderOptionsPlugin({
            debug: false,
            minimize: true,
            sourceMap: false,
        }),
        new DefinePlugin({
            IS_CLIENT: true,
            IS_SERVER: false,
            IS_DEV: env === 'development',
            IS_PROD: env === 'production',
            'process.env': {'NODE_ENV': JSON.stringify(env)}
        }),
        new ProvidePlugin({Promise: 'zousan'}),
        new NoEmitOnErrorsPlugin,
        new ModuleConcatenationPlugin
    ]


    if (env === 'development')
        plugins.push(new HotModuleReplacementPlugin)

    if (env === 'production') {
        plugins.push(new MinifyPlugin({removeConsole: true, removeDebugger: true}, {comments: false}))
        plugins.push(new UglifyJSPlugin({
            uglifyOptions: {
                parallel: true,
                cache: './tmp/ugly',
                test: /\.js($|\?)/i
            }
        }))

        /*  plugins.push(new BundleAnalyzerPlugin({
               analyzerMode: 'server',
               analyzerHost: '127.0.0.1',
               analyzerPort: 8888,
               reportFilename: 'report.html',
               defaultSizes: 'parsed',
               openAnalyzer: true,
               generateStatsFile: false,
               statsFilename: 'stats.json',
               statsOptions: null,
               logLevel: 'info'
           }))*/

    }

    return plugins
}


export {
    Common,
    Loaders,
    Plugins,
    HotModuleReplacementPlugin,
    DefinePlugin,
    DllReferencePlugin,
    LoaderOptionsPlugin,
    NoEmitOnErrorsPlugin,
    ModuleConcatenationPlugin,
    MinifyPlugin,
    DllPlugin,
    BundleAnalyzerPlugin,
    LessCleanCSS,
    LessPluginAutoPrefix,
    LessPluginGroupMediaQueries,
    UglifyJSPlugin
}
