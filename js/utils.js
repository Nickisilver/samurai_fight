function determineWinner({player, enemy, timerId}){
  clearTimeout(timerId)
  document.querySelector('#dispalyText').style.display = 'flex'
  if(player.health === enemy.health){
    document.querySelector('#dispalyText').innerHTML = 'Tie'
  } else if(player.health > enemy.health) {
    document.querySelector('#dispalyText').innerHTML = 'Player 1 Win'
    
  }  else if(player.health < enemy.health) {
    document.querySelector('#dispalyText').innerHTML = 'Player 2 Win'
    
  }
}

let timer = 60
let timerId
// функція тайменра 
function decreaseTimer() {
  if(timer > 0){
   timerId = setTimeout(decreaseTimer,1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }


  if(timer === 0){
   
    determineWinner({player, enemy, timerId})
   
  }

}