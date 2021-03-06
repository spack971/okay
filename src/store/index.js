/* src/store/index.js
 * ==================
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
import Vuex from 'vuex'

import state from '@/store/state'
import actions from '@/store/actions'
import mutations from '@/store/mutations'
import * as getters from '@/store/getters'


Vue.use(Vuex);
export default new Vuex.Store({
    mutations,
    actions,
    state,
})
