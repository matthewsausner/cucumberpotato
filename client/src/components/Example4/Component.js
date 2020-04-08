import React from 'react';
import 'react-input-range/lib/css/index.css'
import './styles.css';
import { getCoverDeg } from './utils';



export const Example4Container = ({ audionState, coverDeg, coverDirection, playState, progress, volumeLevel, loading, onPlayBtnClick, onVolumeChange, onStopBtnClick, onProgressClick }) =>
  <div className='display'>
    <img 
      style={
        playState!=='play' && (Date.now() - audionState.startedAt) / 1000 < audionState.duration
        ?{
          animation: `spin 12s linear infinite`,
          '--deg': `${coverDeg}deg`,
          '--coverDirection': `${-(360+Math.abs(coverDeg)) }deg`
        }
        :{
          transform:`rotate(${(Date.now() - audionState.startedAt) / 1000 < audionState.duration ? coverDeg : getCoverDeg()}deg)`,
          
        }
      }
      id='cover' 
      className={`cover`}
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

      <div className='player mt-4'>
        <div className='player-controls mt-2'>
          <div>{loading && <i className='fas fa-spinner fa-spin'></i>}</div>
        </div>
      </div>
    </div>
  </div>;
