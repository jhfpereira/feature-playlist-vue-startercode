
import Vue from 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.esm.browser.js';
import Vuex from 'https://cdnjs.cloudflare.com/ajax/libs/vuex/3.5.1/vuex.esm.browser.js';

import { createStore } from './store/index.js';

import Playlist from './components/Playlist.js';
import Audioplayer from './components/Audioplayer.js';


Vue.use(Vuex);


/* einen frischen Store erzeugen, um ihn
	in mehrere Vue-Instanzen parallel zu injizieren */
const store = createStore(Vuex);


/* Playlist */
new Vue({
	store: store, /* inject */
	components: {
		Playlist,
	},
}).$mount(document.querySelector('.playlist'));


/* Audioplayer */
new Vue({
	store: store, /* inject */
	components: {
		Audioplayer,
	},
}).$mount(document.querySelector('.audioplayer-wrap'));


store.dispatch('loadPlaylist', './json/songs.json');
