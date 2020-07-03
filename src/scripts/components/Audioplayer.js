
/*
 * component/Audioplayer
 */

const template = `
  <div v-if="selectedSong" class="audioplayer">
    <div class="audioplayer__toolbar">
      <button v-on:click="prevSong" class="audioplayer__button-previous-song">
        <span class="icon icon--xl">skip_previous</span>
      </button>

      <button v-on:click="togglePlaySong" class="audioplayer__button-play-pause">
        <span v-if="!isPlaying" class="icon icon--xl">play_circle_filled</span>
        <span v-else class="icon icon--xl">pause_circle_filled</span>
      </button>

      <button v-on:click="stopSong" class="audioplayer__button-stop">
        <span class="icon icon--xl">stop</span>
      </button>
      <button v-on:click="nextSong" class="audioplayer__button-next-song">
        <span class="icon icon--xl">skip_next</span>
      </button>

    </div>
    <div class="audioplayer__infobox">
      <div class="audioplayer__textinfos">
      <h2 class="audioplayer__title">{{ selectedSong.title }}</h2>
      <h3 class="audioplayer__artist">{{ selectedSong.artist }}</h3>
      </div>
      <div class="audioplayer__duration">
      <p class="audioplayer__time-played">{{ currentTimestamp }}</p>
      <div v-on:click="handleDurationIndicatorClick" class="audioplayer__duration-indicator-wrap">
        <div :style="'width: ' + (normalizedDuration * 100) + '%'" class="audioplayer__duration-indicator"></div>
      </div>
      <p class="audioplayer__duration-number">{{ durationTimestamp }}</p>
      </div>
    </div>
  </div>
`;

export default {
  name: 'Audioplayer',

  data() {
    return {
      sound: null,
      seekPos: 0,
      duration: 0,
      interval: null,

      vorname: 'Peter',
      nachname: 'Parker',
    };
  },

  computed: {
    vollername() {
      return `${this.vorname} ${this.nachname}`;
    },

    isPlaying() {
      return this.$store.state.audioplayer.isPlaying;
    },

    selectedSong() {
      return this.$store.state.audioplayer.selectedSong;
    },

    normalizedDuration() {
      if (this.duration > 0) {
        return this.seekPos / this.duration;
      }
      return 0;
    },

    currentTimestamp() {
      return this.getTimestampForSeconds(this.seekPos);
    },

    durationTimestamp() {
      return this.getTimestampForSeconds(this.duration);
    },
  },

  template,

  methods: {
    prevSong() {
      this.$store.dispatch('prevSong');
    },

    nextSong() {
      this.$store.dispatch('nextSong');
    },

    playSound(song) {
      this.sound = new Howl({
          src: song.src,
          // html5: true,
      });

      this.sound.on('end', () => {
        this.nextSong();
      });

      this.sound.on('load', () => {
        this.interval = setInterval(() => {
          this.seekPos = Math.floor(this.sound.seek());
        }, 500);

        this.duration = this.sound.duration();

        this.$store.dispatch('setIsPlaying', true);

        this.sound.play();
      });
    },

    togglePlaySong() {
      if (!this.sound) {
        throw new Error('Can\'t toggle if no sound exists');
      }

      if (this.isPlaying) {
        this.sound.pause();
      } else {
        this.sound.play();
      }

      this.$store.dispatch('setIsPlaying', !this.isPlaying);
    },

    stopSound() {
      if (this.sound) {
        this.sound.stop();
        this.sound.unload();
      }

      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }

      this.sound = null;
      this.seekPos = 0;
      this.duration = 0;
    },

    stopSong() {
      this.$store.dispatch('stopSong');
    },

    getTimestampForSeconds(timeInSeconds) {
      const minutes = Math.floor(timeInSeconds / 60).toString();
      const seconds = Math.floor(timeInSeconds % 60).toString();

      return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    },

    handleDurationIndicatorClick($event) {
      if (this.sound) {
        const offsetX = $event.offsetX;
        const targetWidth = $event.target.offsetWidth;

        const pos = offsetX / (targetWidth || 1);
        this.sound.seek(pos * this.sound.duration());
      }
    },
  },

  watch: {
    selectedSong(newSong, oldSong) {
      this.stopSound();

      if (newSong) {
        this.playSound(newSong);
      }
    },
  },
}
