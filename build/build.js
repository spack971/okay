/* build/build.js
 * ==============
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
 * This software project is distributed *as is*, WITHOUT WARRANTY OF ANY
 * KIND; including but not limited to the WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE and NONINFRINGEMENT.
 *
 * You should have received a copy of the MIT License along with Okay. If not,
 * see <http://opensource.org/licenses/MIT>.
 */
'use strict'
const rm = require('rimraf')
const ora = require('ora')
const path = require('path')
const webpack = require('webpack')

const pkg = require('../package.json')
const props = require('./props')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


const DEFAULT_ENV = props.ENV_NAME.dev
process.env.NODE_ENV = process.argv.length === 3
    ? props.ENV_NAME[process.argv[2]]
    : DEFAULT_ENV

const spinner = ora(`Building: ${pkg.name} (${process.env.NODE_ENV})`)
spinner.start()

const config = require('./config/' + process.env.NODE_ENV)
rm(path.join(config.output.path, 'static'), err => {
    if (err)
        throw err

    config.plugins.push(new FriendlyErrorsPlugin())
    webpack(config, (err, stats) => {
        spinner.stop()
        if (err)
            throw err

        if (!stats.hasErrors())
        {
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false,
            }) + '\n')
        }
    })
})
