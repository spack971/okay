/* build/config/common.js
 * ======================
 *
 * Copying
 * -------
 *
 * Copyright (c) 2018 Okay authors.
 *
 * This file is part of the *Okay* software project.
 *
 * Okay is a free software project. You can redistribute it and/or modify it
 * under the terms of the MIT License.
 *
 * This software project is distributed *as is*, WITHOUT WARRANTY OF ANY KIND;
 * including but not limited to the WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE and NONINFRINGEMENT.
 *
 * You should have received a copy of the MIT License along with Okay. If not,
 * see <http://opensource.org/licenses/MIT>.
 */
'use strict'
const path = require('path')
const webpack = require('webpack')

const props = require('../props')


module.exports = new function() {
    this.entry = {
        app: path.join(props.DIR.src, 'index.js'),
    }

    this.output = {
        path: props.DIR.dist,
        publicPath: '/',
    }

    this.resolve = {
        extensions: ['.js', '.json', '.vue'],
        modules: [
            props.DIR.src,
            props.DIR.nodes,
        ],
        alias: {
            '@': props.DIR.src,
            'vue$': 'vue/dist/vue.esm.js',
        }
    }

    this.module = {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    plugins: ['lodash'],
                    env: {
                        production: {
                            presets: ['minify'],
                        },
                    },
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true,
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: process.env.NODE_ENV === 'production',
                        },
                    },
                ],
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: process.env.NODE_ENV === 'production',
                        },
                    },
                    {
                        loader: 'stylus-loader',
                    },
                ],
            },
            {
                test: /\.(?:eot|otf|ttf|woff2?)(?:\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: path.posix.join('static', 'fonts', '[sha256:hash:hex:41].[ext]'),
                },
            },
            {
                test: /\.(?:gif|jpe?g|png|svg)(?:\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: path.posix.join('static', 'img', '[sha256:hash:hex:41].[ext]'),
                },
            },
            {
                test: /\.(?:aac|flac|mp3|mp4|ogg|opus|wav|webm)(?:\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: path.posix.join('static', 'media', '[sha256:hash:hex:41].[ext]'),
                },
            },
        ],
    }

    this.plugins = [
        new webpack.DefinePlugin({
            'process.env': Object.keys(process.env)
                                 .map((k) => ({k: '"' + process.env[k] + '"'}))
                                 .reduce((o, v) => Object.assign({}, o, v))
        }),
    ]
}
