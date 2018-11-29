import webpack from 'webpack'
import {CLIENT, EXCLUDE, ROOT, STATIC, VENDOR} from '../config/paths'

import LessCleanCSS from 'less-plugin-clean-css'
import LessPluginAutoPrefix from 'less-plugin-autoprefix'
import LessPluginGroupMediaQueries from 'less-plugin-group-css-media-queries'

const {DllReferencePlugin, ProvidePlugin, DefinePlugin, LoaderOptionsPlugin, NoEmitOnErrorsPlugin, NamedModulesPlugin, optimize: {ModuleConcatenationPlugin}} = webpack


export const
    Common = ({IS_DEV = false}) => {
        return {
            node: {
                fs: 'empty',
                // Buffer: false
            },
            mode: IS_DEV ? 'development' : 'production',
            context: ROOT,
            output: {
                path: STATIC,
                filename: 'assets/js/[name].js',
                chunkFilename: 'assets/js/[name].js',
                sourceMapFilename: '[file].map',
                libraryTarget: 'umd'
            },
            devtool: false,
            cache: true,
            performance: false,
            profile: true,
            stats: false,
            //stats: 'detailed',
            resolve: {
                unsafeCache: true,
                extensions: ['.js', '.json', '.less', '*'],
                modules: ['node_modules']
            },
            resolveLoader: {modules: ['node_modules']},
            optimization: {
                occurrenceOrder: true // To keep filename consistent between different modes (for example building only)
            }
        }
    },
    Rules = ({IS_DEV = false}) => [
        {
            test: /\.js$/,
            exclude: EXCLUDE,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [['@babel/preset-env', {
                        modules: false,
                        loose: true,
                        targets: {
                            browsers: ['last 2 versions']
                        }
                    }]],
                    cacheDirectory: 'tmp',
                    plugins: [
                        '@babel/plugin-syntax-dynamic-import',
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-proposal-object-rest-spread'
                    ]
                }
            }
        },
        {
            test: /\.pug$/,
            exclude: EXCLUDE,
            use: {loader: 'pug-loader'}
        },
        {
            test: /\.less$/,
            exclude: EXCLUDE,
            use: IS_DEV
                ? [
                    {loader: 'style-loader'},
                    {loader: 'css-loader', options: {importLoaders: true}},
                    {loader: 'less-loader', options: {paths: CLIENT}}
                ]
                : [
                    {loader: 'file-loader', options: {name: '/assets/css/[name].css'}},
                    {loader: 'csso-loader', options: {debug: 2, comments: false}},
                    {
                        loader: 'less-loader', options: {
                            paths: CLIENT,
                            plugins: [
                                LessPluginGroupMediaQueries,
                                new LessCleanCSS({advanced: true, aggressiveMerging: true}),
                                new LessPluginAutoPrefix({browsers: ['last 2 versions']})
                            ]
                        }
                    }
                ]

        },
        {
            test: /\.svg$/,
            exclude: EXCLUDE,
            use: [{loader: 'svg-sprite-loader'}]
        }
    ],
    Plugins = ({IS_DEV = false}) => [
        new DllReferencePlugin({context: ROOT, manifest: require(VENDOR)}),
        new ProvidePlugin({Promise: 'zousan'}),
        new LoaderOptionsPlugin({
            minimize: true,
            debug: true,
            sourceMap: false
        }),
        new DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify(IS_DEV ? 'development' : 'production')}}),
        new NoEmitOnErrorsPlugin,
        new ModuleConcatenationPlugin,
        new NamedModulesPlugin
    ]
