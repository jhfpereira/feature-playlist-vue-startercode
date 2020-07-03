
/*
 * components/Playlist
 */

const template = `
	<ul class="playlist">
		<li v-for="song in songs" class="playlist__item">
			<div class="playlist__miniplayer">
				<i
					v-if="song === selectedSong"
					class="icon icon--l is-visible"
					v-on:click="stopSong"
				>stop</i>
				<i
					v-else
					class="icon icon--l is-visible"
					v-on:click="playSong(song)"
				>play_circle_filled</i>
			</div>
			{{ song.artist }} - {{ song.title }}
		</li>
	</ul>
`;

export default {
	name: 'Playlist',

	computed: {
		songs() {
			return this.$store.state.playlist;
		},

		selectedSong() {
			return this.$store.state.audioplayer.selectedSong;
		},
	},

	template,

	methods: {
		playSong(song) {
			this.$store.dispatch('playSong', song);
		},
		
		stopSong() {
			this.$store.dispatch('stopSong');
		},
	},
};
