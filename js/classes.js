class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image()
    this.image.src = imageSrc
  }
  // метод класу який по кординатам може намалювати гравців
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }

  // функція яка приймає метод draw() та перемальовує анімацію
  update() {
    this.draw();
  }
}

class Fighter {
  constructor({ position, velocity, color = "red", offset }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100;
  }
  // метод класу який по кординатам може намалювати гравців
  draw() {
    // стиль для гравців
    c.fillStyle = this.color;
    // позіцонування гравців відповідно методу
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //  attack box
    if (this.isAttacking) {
      // малюю промокутник для атаки для гравців
      c.fillStyle = "green";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  // функція яка приймає метод draw() та перемальовує анімацію
  update() {
    this.draw();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height ) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
