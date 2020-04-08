import React from 'react';

export default class PureCanvas extends React.Component {
  shouldComponentUpdate() { return false; }
  render() {


  	window.onload = function() {
  		var height = 100;
  		var width = 100;
	    var c = document.getElementById("canvas");
	    var ctx = c.getContext("2d");
      var dpr = 2;
      // Get the size of the canvas in CSS pixels.
      var rect = c.getBoundingClientRect();
      // Give the canvas pixel dimensions of their CSS
      // size * the device pixel ratio.
      c.width = rect.width * dpr;
      c.height = rect.height * dpr;
      // Scale all drawing operations by the dpr, so you
      // don't have to worry about the difference.
      ctx.scale(dpr, dpr);
	    var img = document.getElementById("image");
	    ctx.save();
	    ctx.beginPath();
	    ctx.drawImage(img, 0, 0, 400, 400);
	    ctx.translate(width/2, height/2 );
	    ctx.rotate(.001 * Math.PI / 192);
	    // ctx.fillStyle = '#FF00FF';
	    ctx.fillRect(-width/4, -height/4, width/2, height/2);
	    ctx.restore();
	  }
    var bool = false;
    return (
    <>
      <img style={false?{animation: `spin -1s linear 3s`}:null} id="image" alt="cover" width="400" height="400" src="./girtv1.jpg"/>
      <canvas id="canvas" width="0" height="0" 
        ref={node => node ? this.props.contextRef(node.getContext('2d')) : null}
      />
    </>
    )
  }
}