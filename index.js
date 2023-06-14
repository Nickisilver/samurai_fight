// посилання на канвас
const canvas = document.querySelector("canvas");
// посилання на те, що наш канвас буде передавати в 2д
const c = canvas.getContext("2d");

// розміри канваса
canvas.width = 1024;
canvas.height = 576;
// задаємо колір канвасу
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './oak_woods_v1.0/background/fightf.png',
  scale: 0.75,
  
})

const shop = new Sprite({
  position: {
    x: 50,
    y:284,
  },
  imageSrc: './oak_woods_v1.0/decorations/shop_anim.png',
  scale: 2.30,
  framesMax: 6
})
// створили клас який додає наших гарвців

// намалював Player
const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: './oak_woods_v1.0/Sprites/Idle.png',
  framesMax: 8,
  scale: 2,
  offset: {
    x:100,
    y:95,
  }
});

// намалював Enemy
const enemy = new Fighter({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "blue",
  offset: {
    x: -50,
    y: 0,
  },
});

console.log(player);

const key = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

// let lastKey;

function rectangularCollision({ rectangle1, rectangle2 }){
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
    rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}



decreaseTimer()

// фукция котороа постійно перемальвоє анімацію в циклі (безкінечна до поки ми не припинимо)
function animate() {
  // window.requestAnimationFrame указывает браузеру на то, что вы хотите произвести анимацию, и просит его запланировать перерисовку на следующем кадре анимации. В качестве параметра метод получает функцию, которая будет вызвана перед перерисовкой.
  window.requestAnimationFrame(animate);
  // console.log('go')

  c.fillStyle = "black";
  //
  c.fillRect(0, 0, canvas.width, canvas.height);
  //
  background.update()
  shop.update()
  player.update();
  // enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // player movement
  if (key.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
  } else if (key.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
  }

  // enemy movement
  if (key.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
  } else if (key.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
  }

  // detect for collision
  if (
   rectangularCollision({
    rectangle1: player,
    rectangle2: enemy,
   }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= 20
   document.querySelector('#enemyHealth').style.width = enemy.health + '%'
  //  console.log('player attack successful')
  }

  if (
    rectangularCollision({
     rectangle1: enemy,
     rectangle2: player,
    }) &&
     enemy.isAttacking
   ) {
     enemy.isAttacking = false;
     player.health -= 20
     document.querySelector('#playerHealth').style.width = player.health + '%'
   }

  //  end of game based on health
  if(enemy.health <= 0 || player.health <= 0){
    determineWinner({player, enemy, timerId})
  }
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      key.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      key.a.pressed = true;
      player.lastKey = "a";
      break;
    case "w":
      player.velocity.y = -20;
      break;
    case " ":
      player.attack();
      break;

    case "ArrowRight":
      key.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      key.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      enemy.velocity.y = -20;
      break;
      case "ArrowDown":
        enemy.attack() 
        break;
  }
  console.log(event.key);
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      key.d.pressed = false;
      break;
    case "a":
      key.a.pressed = false;
      break;
    // case 'w':
    //   key.w.pressed = false
    //   break;
  }

  // enemy keys
  switch (event.key) {
    case "ArrowRight":
      key.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      key.ArrowLeft.pressed = false;
      break;
    // case 'ArrowLeft':
    //   key.w.pressed = false
    //   break;
  }
  console.log(event.key);
});
