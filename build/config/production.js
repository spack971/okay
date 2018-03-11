/* build/config/production.js
 * ==========================
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
const merge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const props = require('../props')
const commonConfig = require('./common')


module.exports = merge(commonConfig, new function () {
    this.mode = 'production'

    this.output = {
        filename: path.posix.join('static', 'js', '[chunkhash]-[id].js'),
        chunkFilename: path.posix.join('static', 'js', '[chunkhash]-[id].js'),
    }

    this.optimization = {
        splitChunks: {
            chunks: 'all',
        },
    }

    this.devtool = 'nosources-source-map'

    this.plugins = [
        new ExtractTextPlugin({
            filename: path.posix.join('static', 'styles', '[contenthash]-[id].css'),
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(props.PROJECT_DIR, 'templates', 'index.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
            },
            chunksSortMode: 'dependency',
        }),
    ]
})
