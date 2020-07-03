
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
		},

		stopSong({ commit }) {
			commit('mutateSelectedSong', null);
			commit('mutateIsPlaying', false);
		},

		setIsPlaying({ commit, state }, isPlaying) {
			commit('mutateIsPlaying', isPlaying);
		},

		prevSong({ state, commit }) {
			const selectedSong = state.audioplayer.selectedSong;

			if (!selectedSong) {
				return;
			}

			const playlist = state.playlist;

			const idx = playlist.indexOf(selectedSong);

			const newIdx = (idx - 1) < 0 ? playlist.length - 1 : (idx - 1);

			commit('mutateSelectedSong', playlist[newIdx]);
			commit('mutateIsPlaying', false);
		},

		nextSong({ state, commit }) {
			const selectedSong = state.audioplayer.selectedSong;

			if (!selectedSong) {
				return;
			}

			const playlist = state.playlist;

			const idx = playlist.indexOf(selectedSong);

			const newIdx = (idx + 1) % playlist.length;

			commit('mutateSelectedSong', playlist[newIdx]);
			commit('mutateIsPlaying', false);
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
