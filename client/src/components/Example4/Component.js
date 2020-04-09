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
*/

export const Example4Container = ({ audionState, coverDeg, coverDirection, playState, progress, volumeLevel, loading, onPlayBtnClick, onVolumeChange, onStopBtnClick, onProgressClick }) =>
<>
 
  <div id='loadWheel' className='loadWheel'>
    <i className={loading?'fas fa-spinner fa-spin fa-5x':''}></i>
  </div>
   <div className="message-top">
    <div >"I named the site after all the stuff that's been up my butt" - Saus</div>
  </div>
  <div className={`display ${loading?'loading':''}`}>
    <img 
      style={
        playState!=='play' && (Date.now() - audionState.startedAt) / 1000 < audionState.duration
        ?{
          animation: `spin 12s linear infinite`,
          '--deg': `${coverDeg}deg`,
          '--coverDirection': `${-(360+Math.abs(coverDeg)) }deg`,
        }
        :{
          transform:`rotate(${(Date.now() - audionState.startedAt) / 1000 < audionState.duration ? coverDeg : getCoverDeg()}deg)`,
        }
      }
      id='cover' 
      className={`cover${loading?' loading':''}`}
      alt={'cover'}
      width='400' 
      height='400' 
      src='./girtv1.jpg'
      onClick={playState === 'play' ? onPlayBtnClick : onStopBtnClick}
    />
    <div className='player'>
      <div className='bars-wrapper'>
        <canvas className='frequency-bars'></canvas>
        <canvas className='sinewave'></canvas>
      </div>
    </div>
  </div>
  <div className="message-bottom">
    <div >OhLawdyDearyMe</div>
  </div>
</>;
