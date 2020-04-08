import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import './styles.css';
import { Animation } from '../animation/animation.js';


export const Example4Container = ({ coverDeg, coverDirection, playState, progress, volumeLevel, loading, onPlayBtnClick, onVolumeChange, onStopBtnClick, onProgressClick }) =>
  <div className="display">
    <div className="deg">{coverDeg}  {coverDirection} {playState}</div>
    <img 
      style={
        playState!=='play'
        ?{
          animation: `spin 12s linear infinite`,
          '--deg': `${coverDeg}deg`,
          '--coverDirection': `${-(360+Math.abs(coverDeg)) }deg`
        }
        :{
          transform:`rotate(${coverDeg}deg)`,
          
        }
      }
      id="cover" 
      className={`cover`}
      alt="cover" 
      width="400" 
      height="400" 
      src="./girtv1.jpg"
      onClick={playState === 'play' ? onPlayBtnClick : onStopBtnClick}
    />
    <div className="player" vertical-align="middle">
      <div className="bars-wrapper">
        <canvas className="frequency-bars"></canvas>
        <canvas className="sinewave"></canvas>
      </div>

      <div className="player mt-4">
        <div className="player-controls mt-2">
          <div>{loading && <i className="fas fa-spinner fa-spin"></i>}</div>
        </div>
      </div>
    </div>
  </div>;
