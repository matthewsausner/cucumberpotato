import React from 'react';
import Canvas from './canvas';

export class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { angle: 0, play: props.play };
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }
  
  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  
  updateAnimationState() {
    let increment = this.state.play ? 1 : 0;
    this.setState(prevState => ({ angle: prevState.angle + increment }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  
  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }
  
  render() {
    return <Canvas angle={this.state.angle} />
  }
}
