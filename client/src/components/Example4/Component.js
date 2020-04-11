import React from 'react';
import 'react-input-range/lib/css/index.css'
import './styles.css';
import { getCoverDeg } from './utils';

/*

      (audionState.startedAt <= 0) || (Date.now() - audionState.startedAt) / 1000 < audionState.duration 
      ? 'display' 
      : 'dead'

      <div className='loadWheel'>
        <div>{<i horizontal-align='center' className='fas fa-spinner fa-spin fa-5x'></i>}</div>
      </div>
       <div className="message">
        <div >" I named it after all the stuff I've had up my butt" - Matthew Sausner</div>
      </div>

      style={
        playState!=='play' && (Date.now() - audionState.startedAt) / 1000 < audionState.duration
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

export const Example4Container = ({ audionState, coverDeg, toDeg, playState, progress, volumeLevel, loading, onPlayBtnClick, onVolumeChange, onStopBtnClick, onProgressClick }) =>
<>
 
  <div id='loadWheel' className='loadWheel'>
    <i className={loading?'fas fa-spinner fa-spin fa-5x':''}></i>
  </div>
  <div id='playBtn' className='loadWheel'>
    <i 
      className={
        playState ==='play'
        &&!loading 
        ||!((Date.now() - audionState.startedAt) / 1000>0)?'fas fa-play fa-5x':''}
      onClick={onPlayBtnClick}
    ></i>
  </div>
   <div className="message-top">
    <div >"I named the site after all the stuff that's been up my butt" - Saus</div>
  </div>
  <div className="message-middle dead" id = 'construction'>
    <div >{playState === 'stop' ? "" : "Site still under construction, you have to refresh to listen again lol"}</div>
  </div>
  <div className={`display`}>
    <img 
      id='cover' 
      className={`cover${loading || playState === 'play' ?' loading':''}`}
      alt={'cover'}
      width='400' 
      height='400' 
      src='./girtv1.jpg'
      onClick={playState === 'play' ? '' : onStopBtnClick}
    />
    <div className='player'>
      <div className='bars-wrapper'>
        <canvas className='frequency-bars'></canvas>
        <canvas className='sinewave'></canvas>
      </div>
    </div>
  </div>
  <div className="message-bottom" vertical-align="center">
    <div >moss don't</div>
  </div>
</>;
