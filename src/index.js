/* src/index.js
 * ============
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
import Vue from 'vue'
import SuiVue from 'semantic-ui-vue'
import VeeValidate from 'vee-validate'

import i18n from '@/i18n'
import store from '@/store'
import router from '@/router'

import * as components from '@/components'
import * as scenes from '@/scenes'


// Register components with vue.js.
[components, scenes].forEach(
    obj => Object.values(obj).forEach(comp => Vue.component(comp.name, comp))
)

// Vue.js initial configuration.
Vue.config.productionTip = false
Vue.use(SuiVue)
Vue.use(VeeValidate)

export const app = new Vue({
    el: '#app-root',
    i18n,
    store,
    router,
    template: '<ok-app />',
})
