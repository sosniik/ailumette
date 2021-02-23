
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

    let line0 ='*********'
    let line1 =`*   |   *`
    let line2 =`*  |||  *`
    let line3 =`* ||||| *`
    let line4 =`*|||||||*`
    let line5 ='*********'

let currentmatch = [line0,line1,line2,line3,line4,line5]
console.log(concatline(currentmatch))

let countgame = 16 
let count1 = 1
let count2 = 3
let count3 = 5
let count4 = 7
let currentcounter = [count1,count2,count3,count4]

function concatline(tab){
    let string = ""
    for(let i = 0; i < tab.length; i++){
        string = string + tab[i]
        if(i != tab.length - 1){
            string = string + "\n"
        }
    }
    return string
}

function player(){
    
    rl.question("\nYour turn :\n"+"Line: ",async(answer_line)=>{
        rl.question("Matches: ", (answer_matches)=>{
            console.log(`Player removed ${answer_matches} match(es) from line ${answer_line}`)
        

            if(currentcounter[answer_line-1]>=answer_matches){
                count = currentcounter[answer_line-1]
                count = count - answer_matches
                countgame = countgame - answer_matches
                
                for(i = 0; i < answer_matches; i++){
                    let linefinal = currentmatch[answer_line]
                    linefinal = linefinal.replaceAt(linefinal.lastIndexOf('|'),' ')
                    currentcounter[answer_line-1]--
                    currentmatch[answer_line]=linefinal
                }
                console.log(concatline(currentmatch))
                if(countgame==1){
                    console.log("I lost.. snif.. but I’ll get you next time!!")
                }else{
                    IA() 
                }
               
             }else if(answer_line>4 || answer_line==0) {
                console.log("\n--------------------------------\nError: this line is out of range\n--------------------------------")
                player()
             }else if(answer_line<0){
                 console.log("\n-----------------------------------------------\nError: invalid input (positive number expected)\n-----------------------------------------------")        
                 player()
             }else if(answer_matches<0){
                 console.log("\n-----------------------------------------------\nError: invalid input (positive number expected)\n-----------------------------------------------")
                 player()
             }else if(answer_matches>3){
                 console.log("\n--------------------------------------\nError: not enough matches on this line\n--------------------------------------")
                 player()
             }else if(isNaN(answer_matches) || isNaN(answer_line)){
                 console.log("\n-----------------------------------------------\nError: invalid input (positive number expected)\n-----------------------------------------------")
                 player()
             }else{    
                player()
            }
        })
    })
    
}

function IA(){ 
    
    let random_number_matches = Math.floor(Math.random() * 3)+1
    let random_number_line = Math.floor(Math.random() * 4)+1
    

    currentTest=currentcounter[random_number_line-1]
    currentTestMatch=random_number_matches
    if(currentTest>=currentTestMatch){
        console.log("\n\n\nAI's turn...")
        count = currentcounter[random_number_line-1]
        count = count - random_number_matches
        countgame = countgame-random_number_matches
        console.log(`AI removed ${random_number_matches} match(es) from line ${random_number_line}`)
        for(i = 0; i < random_number_matches; i++){
            let linefinal = currentmatch[random_number_line]
            linefinal = linefinal.replaceAt(linefinal.lastIndexOf('|'),' ')
            currentcounter[random_number_line-1]--
            currentmatch[random_number_line]=linefinal
        }
        console.log(concatline(currentmatch))
        if(countgame==1){
            console.log("You lost, too bad")
        }else{
            player()
        }  
    }else{
        IA()      
    }
    return (
        <div>ceci est un test</div>
    )
    
}




function tour (){
    player()
}
tour()


