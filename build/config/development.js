/* build/config/development.js
 * ===========================
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

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const props = require('../props')
const commonConfig = require('./common')


module.exports = merge(commonConfig, new function () {
    this.mode = 'development'

    this.output = {
        filename: path.posix.join('static', 'js', '[name].js'),
    }

    this.devtool = 'cheap-module-eval-source-map'
    this.devServer = {
        hot: true,
        quiet: true,
        compress: false,
        contentBase: false,

        port: 8800,
        host: 'localhost',
        publicPath: commonConfig.output.publicPath,

        historyApiFallback: {
            rewrites: [
                {
                    from: '/.*/',
                    to: path.posix.join(commonConfig.output.publicPath, 'index.html'),
                },
            ],
        },

        clientLogLevel: 'warning',
    }

    this.plugins = [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: path.posix.join('static', 'styles', 'common.css'),
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(props.PROJECT_DIR, 'templates', 'index.html'),
            inject: true,
        }),
    ]
})
