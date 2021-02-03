// Reference : https://ko.reactjs.org/docs/state-and-lifecycle.html

import React, {Component} from 'react';
import Timer from  './Timer';
import './App.css';

export default class App extends Component{ // with create react app, babel, you can use state without constructor(alternative class syntax) 

 constructor(props){
     super(props);
     this.state={
       res:'',
       timer:true
     };
     this.onoffTimer=this.onoffTimer.bind(this);
     this.check=this.check.bind(this);
     this.check1=this.check1.bind(this);
     // this.props=props
 }

 onoffTimer(){
   this.setState((state) => ({timer : !state.timer})
   )
 }

 check(){
  fetch(':3000')
      .then(res => res.json())
      .then((data) => {
        this.setState({ res: data });
      });
 }

 check1(){
  fetch(':3000')
      .then(res => res.json())
      .then((data) => {
        this.setState({ res: data });
      });
 }

 componentDidMount(){
   console.log("App : componentDidMount");
 }

 componentDidUpdate(){
   console.log("App : componentDidUpdate");
 }

 render(){
   let {res, timer} = this.state;
   let {onoffTimer, check, check1}=this;
   return(
     <div>
       <h1>Response : {res}</h1>
       <div>
          <button className='button1' onClick={check}>Check</button>
          <button className='button1' onClick={check1}>Check1</button>
       </div>
       <button id='button2' onClick={onoffTimer}>ON/OFF</button>
       {timer ? <Timer /> : <></>}
    </div>
   )
 }

}