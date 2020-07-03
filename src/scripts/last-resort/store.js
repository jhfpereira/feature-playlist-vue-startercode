
/*
 * Store
 */

const StoreStructure = {
	state: {
		audioplayer: {
			isPlaying: false,
			selectedSong: null,
		},
		playlist: [],
	},

	mutations: {
		mutateIsPlaying(state, status) {
			state.audioplayer.isPlaying = status;
		},

		mutateSelectedSong(state, song) {
			state.audioplayer.selectedSong = song;
		},

		mutateSetPlaylist(state, playlist) {
			state.playlist = playlist;
		},
	},

	actions: {
		playSong({ commit }, song) {
			commit('mutateSelectedSong', song);
			commit('mutateIsPlaying', true);
		},

		stopSong({ commit }) {
			commit('mutateSelectedSong', null);
			commit('mutateIsPlaying', false);
		},

		prevSong({ state, commit }) {
			/* Step 4: Implement me */
		},

		nextSong({ state, commit }) {
			/* Step 4: Implement me */
		},

		async loadPlaylist({ commit }, url) {
			const result = await fetch(url);

			if (!result.ok) {
				throw new Error(`Could not access ${this.url}`);
			}

			const playlist = await result.json();

			commit('mutateSetPlaylist', playlist);
		},
	},
};

export function createStore(Vuex) {
	return new Vuex.Store(StoreStructure);
};
