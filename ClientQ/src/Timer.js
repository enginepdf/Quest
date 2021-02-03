import React from 'react';
export default class Timer extends React.Component{
   constructor(props){
    super(props);
    this.state={
        date: new Date(),
    };
   }

   tick(){
       this.setState(
           {date: new Date()});
    }

   componentDidMount(){
       console.log('Timer : componentDidMount')
       this.timeID=setInterval(
           () =>{ this.tick()}, 1000);
       
   }

   componentDidUpdate(){
       console.log('Timer : conponentDidUpdate');
   }
   
   componentWillUnmount(){
       console.log('Timer : componentWillUnmount');
   }
   
   render(){
      return <div id="timer">It is {this.state.date.toLocaleTimeString()}</div>  // local time structure
   }
}
