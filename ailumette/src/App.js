import './App.css';
import React, { useEffect, useState } from "react";


let count,countgame
let line0 ='*********'
let line1 =`*   |   *`
let line2 =`*  |||  *`
let line3 =`* ||||| *`
let line4 =`*|||||||*`
let line5 ='*********'

let currentmatch = [line0,line1,line2,line3,line4,line5]

countgame = 16 
let count1 = 1
let count2 = 3
let count3 = 5
let count4 = 7
let currentcounter = [count1,count2,count3,count4]


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stateLine : '',
      stateMatch : '',
      currentmatch:currentmatch,
      countgame : 16,
      currentcounter:currentcounter
    }
  }

handleSubmit = async e => {
    e.preventDefault();
    this.userLine = parseInt(this.state.stateLine)
    this.userMatch = parseInt(this.state.stateMatch)
    this.player(this.userLine,this.userMatch)

}



    

render(){
  return <div id="Main">
  <div id="Arena">
  </div>
  <div>
    {this.state.currentmatch.map((line) => (
    <p>
      {line.replace(/ /g, "\u00a0")}
    </p>))}
  </div>
      <form onSubmit={this.handleSubmit}>
          Line : <input onChange={e => this.setState({stateLine:e.target.value})}></input>
          <br/>
          Match : <input onChange={e => this.setState({stateMatch:e.target.value})}></input>
          <br/>
          <p>{`Player removed ${this.state.stateLine} match(es) from line ${this.state.stateMatch}`}</p>
          <div>
           
          <button type="submit"> Confirmer </button>  
          </div>
      </form>
     
</div>
}

replaceAt (index, replacement, sentence) {
  return sentence.substr(0, index) + replacement + sentence.substr(index + replacement.length);
}



concatline(tab){
  let string = ""
  for(let i = 0; i < tab.length; i++){
      string = string + tab[i]
      if(i != tab.length - 1){
          string = string + "\n"
      }
  }
  return string
}

player(answer_line,answer_matches){
    
  console.log(`Player removed ${answer_matches} match(es) from line ${answer_line}`)


  if(currentcounter[answer_line-1]>=answer_matches){
       count = currentcounter[answer_line-1]
      count = count - answer_matches
       countgame = countgame - answer_matches
      
      for(let i = 0; i < answer_matches; i++){
          let linefinal = currentmatch[answer_line]
          linefinal = this.replaceAt(linefinal.lastIndexOf('|'),' ',linefinal)
          currentcounter[answer_line-1]--
          currentmatch[answer_line]=linefinal
      }
      console.log(this.concatline(currentmatch))
      if(countgame==1){
          console.log("I lost.. snif.. but I’ll get you next time!!")
      }else{
       this.IA() 
      }
     
   }else if(answer_line>4 || answer_line==0) {
      console.log("\n--------------------------------\nError: this line is out of range\n--------------------------------")
      this.player()
   }else if(answer_line<0){
       console.log("\n-----------------------------------------------\nError: invalid input (positive number expected)\n-----------------------------------------------")        
       this.player()
   }else if(answer_matches<0){
       console.log("\n-----------------------------------------------\nError: invalid input (positive number expected)\n-----------------------------------------------")
       this.player()
   }else if(answer_matches>3){
       console.log("\n--------------------------------------\nError: not enough matches on this line\n--------------------------------------")
       this.player()
   }else if(isNaN(answer_matches) || isNaN(answer_line)){
       console.log("\n-----------------------------------------------\nError: invalid input (positive number expected)\n-----------------------------------------------")
       //player()
   }else{    
      this.player()
  }
}

IA(){ 

let random_number_matches = Math.floor(Math.random() * 3)+1
let random_number_line = Math.floor(Math.random() * 4)+1


let currentTest=currentcounter[random_number_line-1]
let currentTestMatch=random_number_matches
if(currentTest>=currentTestMatch){
console.log("\n\n\nAI's turn...")
count = currentcounter[random_number_line-1]
count = count - random_number_matches
countgame = countgame-random_number_matches
console.log(`AI removed ${random_number_matches} match(es) from line ${random_number_line}`)
for(let i = 0; i < random_number_matches; i++){
  let linefinal = currentmatch[random_number_line]
  linefinal = this.replaceAt(linefinal.lastIndexOf('|'),' ',linefinal)
  currentcounter[random_number_line-1]--
  currentmatch[random_number_line]=linefinal
}
console.log(this.concatline(currentmatch))
if(countgame==1){
  console.log("You lost, too bad")
}else{
  this.player()
}  
}else{
this.IA()      
}



}

tour (){
this.player()
}



}


export default App;