import { compose, lifecycle, withState, withHandlers, withProps } from 'recompose';
import { loadFile, getCoverDeg, submitEmail } from './utils';
import { Example4Container } from './Component';


export const Example4 = compose(
  withState('volumeLevel', 'setVolumeLevel', 100),
  withState('progress', 'setProgress', 0),
  withState('playState', 'setPlayState', 'play'),
  withState('loading', 'setLoading', false),
  withState('player', 'setPlayer', null),
  withState('initialLoadDone', 'setInitialLoadDone', false),
  withState('audionState', 'setAudionState', {
    startedAt: null,
    pausedAt: null,
    isPause: true,
    duration: 0,
  }),
  withState('coverDeg', 'setCoverDeg', 0),
  withState('toDeg', 'setToDeg', 1),
  withProps(({ audionState, setAudionState }) => ({
    changeAudionState: newState => setAudionState({ ...audionState, ...newState }),
  })),
  withHandlers({

    onPageLoad: (props) => async () =>{
      const { player, audionState } = props;
      try {

        //audio stuff
        if(!player) {
          props.setLoading(true);
          const frequencyC = document.querySelector('.frequency-bars');
          const sinewaveC = document.querySelector('.sinewave');
          const newPlayer = await loadFile('/api/v1/track', {
            frequencyC,
            sinewaveC
          }, {
            fillStyle: 'rgb(0, 0, 0)', // background
            strokeStyle: 'rgb(180,120,40)', // line color
            lineWidth: 1,
            fftSize: 2048 // delization of bars from 1024 to 32768
          });

          props.setPlayer(newPlayer);

          props.changeAudionState({
            startedAt: Date.now() - audionState.pausedAt,
            isPause: true,
            duration: newPlayer.duration,
          });
          newPlayer.stop();
          
          setTimeout(function () {
              props.setLoading(false);
              props.setInitialLoadDone(true);
          }, 1000);
          

        }
        return props.setPlayState('play');
      } catch (e) {
        props.setLoading(false);
        console.log(e);
      }
    },

    onSubmitEmail: (props) => async () => {
      submitEmail();
    },

    onPlayBtnClick: (props) => async () => {
      if(document.getElementById('cover')){
        var img = document.getElementById('cover'); 
        img.onclick=null;
      }
      
      if(!props.loading){
        props.setPlayState('stop');
        const { player, audionState } = props;
        try {
          props.changeAudionState({
            startedAt: Date.now() - audionState.pausedAt,
            isPause: false,
          });

          player.play(audionState.pausedAt / 1000);

          return props.setPlayState('stop');
        } catch (e) {
          props.setLoading(false);
          console.log(e);
        }
      }
    },
    onStopBtnClick: props => () => {

      props.setCoverDeg(getCoverDeg());
      props.setToDeg(props.toDeg * -1)

      const { player, audionState  } = props;
      props.changeAudionState({
        pausedAt:  Date.now() - audionState.startedAt,
        isPause: true,
      });
      player && player.stop();
      props.setPlayState('play');
    },
    onVolumeChange: props => ({ max }) => {
      const value = max / 100;
      const level = value > 0.5 ? value * 4 : value * -4;
      props.player.setVolume(level || -1);

      props.setVolumeLevel(max || 0)
    },
    onProgressClick: props => (e) => {
      const { player, audionState } = props;

      const rate = (e.clientX * 100) / e.target.offsetWidth;
      const playbackTime = (audionState.duration * rate) / 100;

      player && player.stop();
      player && player.play(playbackTime);

      props.setProgress(parseInt(rate, 10));
      props.changeAudionState({
        startedAt: Date.now() - playbackTime * 1000,
      });
    }
  }),
  lifecycle({
    componentDidMount() {
      setInterval(() => {
        if(!this.props.player){
          this.props.onPageLoad();
        }
        const { startedAt, isPause, duration } = this.props.audionState;
        if(startedAt && !isPause) {
          const playbackTime = (Date.now() - startedAt) / 1000;
          const rate = parseInt((playbackTime * 100) / duration, 10);
          rate <= 100 && this.props.setProgress(rate);
        }
      },1000)
    }
  })
)(Example4Container);
