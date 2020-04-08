import React from 'react';
import PureCanvas from './pureCanvas';

// var COVER_PATH = '/girtv1.jpg';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.saveContext = this.saveContext.bind(this);
  }
  
  saveContext(ctx) {
    this.ctx = ctx;
  }

  componentDidUpdate() {
    const {angle} = this.props;
    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;
    //Create a new Image object.
    
    // this.ctx.save();
    // this.ctx.beginPath();
    // this.ctx.clearRect(0, 0, width, height);
    // this.ctx.translate(width/2, height/2 );
    // this.ctx.rotate(angle * Math.PI / 192);
    // this.ctx.fillStyle = '#FF00FF';
    // this.ctx.fillRect(-width/4, -height/4, width/2, height/2);
    // this.ctx.restore();
  }
  
  render() {return <PureCanvas contextRef={this.saveContext}></PureCanvas>;}
}
