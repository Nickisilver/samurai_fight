
// посилання на канвас 
const canvas = document.querySelector("canvas");
// посилання на те, що наш канвас буде передавати в 2д
const c = canvas.getContext("2d");

// розміри канваса 
canvas.width = 1024;
canvas.height = 576;
// задаємо колір канвасу
c.fillRect(0, 0, canvas.width, canvas.height)
// створили клас який додає наших гарвців
class Sprite {
  constructor(position){
    this.position = position; 
  }

  draw(){
    c.fillStyle = 'red'
    c.fillRect(this.position.x,this.position.y, 50, 150)
  }
}

// створюрюємо нашого гравця
const player = new Sprite({
  x: 0,
  y: 0,
})
// намалювали гравця
player.draw()

// Створюємо противника 
const enemy = new Sprite({
  x: 400,
  y: 100,
})
// намалювали противника
enemy.draw()

// window.requestAnimationFrame указывает браузеру на то, что вы хотите произвести анимацию, и просит его запланировать перерисовку на следующем кадре анимации.
function animate(){
  // window.requestAnimationFrame указывает браузеру на то, что вы хотите произвести анимацию, и просит его запланировать перерисовку на следующем кадре анимации.
  window.requestAnimationFrame(animate)
}
//  умовно кажучи ми зробили цикл анімації котрий каже еашому браузеру перемальовувати 
animate()