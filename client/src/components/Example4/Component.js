import React from 'react';
import 'react-input-range/lib/css/index.css'
import './styles.css';
import { getCoverDeg } from './utils';

/*

      (audionState.startedAt <= 0) || (Date.now() - audionState.startedAt) / 1000 < audionState.duration 
      ? 'display' 
      : 'dead'

      style={
        (playState!=='play') && (Date.now() - audionState.startedAt) / 1000 < audionState.duration
        ?{
          animation: `spin 12s linear infinite`,
          '--deg': `${coverDeg}deg`,
          '--toDeg': `${-(360+Math.abs(coverDeg)) }deg`,
        }
        :{
          transform:`rotate(${(Date.now() - audionState.startedAt) / 1000 < audionState.duration ? coverDeg : getCoverDeg()}deg)`,
        }
      }
*/

export const Example4Container = ({ initialLoadDone, audionState, coverDeg, toDeg, playState, progress, volumeLevel, loading, onPlayBtnClick, onVolumeChange, onStopBtnClick, onProgressClick }) =>
<>
 
  <div id='loadWheel' className={initialLoadDone?'dead':'loadWheel'}>
    <i className={loading?'fas fa-spinner fa-spin fa-5x':''}></i>
  </div>
   <div className="message-top">
    <div >"I named the site after all the stuff that's been up my butt" - Saus</div>
  </div>
  <div className={`message-middle ${loading||((Date.now() - audionState.startedAt) / 1000 > audionState.duration && (playState!=='stop'))?'':'dead'}`} id='construction'>
    <div >{(Date.now() - audionState.startedAt) / 1000 < audionState.duration?"It's kind of loud rn, volume controls otw. Also just click once to play or pause. It's a little janky.":`${initialLoadDone?'You have to refresh to listen again lol mb':''}`}</div>
  </div>
  <div className={`display ${loading?'loading':''}`}>
    <img 
      
      id='cover' 
      disabled={loading}
      className={`cover`}
      alt={'cover'}
      width='400' 
      height='400' 
      src='./girtv1.jpg'
      onClick={playState==='play' ? onPlayBtnClick : onStopBtnClick}
    />
    <div className='player'>
      <div className='bars-wrapper'>
        <canvas className='frequency-bars'></canvas>
        <canvas className='sinewave'></canvas>
      </div>
    </div>
  </div>
  <div className="message-bottom" vertical-align="center">
    <div>moss don't</div>
  </div>
  <div className="message-bottomer" vertical-align="center">
    <div >updated sometimes!</div>
  </div>
</>;
