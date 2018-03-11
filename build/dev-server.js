/* build/dev-server.js
 * ===================
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
const portfinder = require('portfinder')

const pkg = require('../package.json')
const props = require('./props')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


process.env.NODE_ENV = process.env.NODE_ENV || props.ENV_NAME.dev
process.env.PORT = process.env.PORT || 8800


const createNotifierCallback = () => {
    const notifier = require('node-notifier')


    return (severity, errors) => {
        if (severity !== 'error')
            return

        const filename = errors[0].file && errors[0].file.split('!').pop()
        notifier.notify({
            title: pkg.name,
            message: severity + ': ' + errors[0].name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png'),
        })
    }
}


const config = require('./config/' + process.env.NODE_ENV)
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.devServer.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            process.env.PORT = port
            config.devServer.port = port
            config.devServer.host = process.env.HOST || config.devServer.host

            config.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [
                        `Application is running at: http://${config.devServer.host}:${port}`
                    ],
                },
                onErrors: createNotifierCallback(),
            }))

            resolve(config)
        }
    })
})
