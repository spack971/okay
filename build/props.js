/* build/props.js
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
const path = require('path')


//: Path to the project's directory.
exports.PROJECT_DIR = path.resolve(__dirname, '..')
//: Map environment short names with their full name.
exports.ENV_NAME = {
    dev: 'development',
    development: 'development',
    prod: 'production',
    production: 'production',
}

//: Project directories.
const self = this
exports.DIR = new function() {
    const dirs = [
        ['build', 'build'],
        ['dist',  'dist'],
        ['nodes', 'node_modules'],
        ['src',   'src'],
    ]
    dirs.forEach(
        (e) => { this[e[0]] = path.join(self.PROJECT_DIR, e[1]) },
        this
    )
}
