var gameOfLife = {
  width: prompt("elige un width"), // dimensiones alto y ancho del tablero
  height: prompt("elige un height"),
  stepInterval: null,

  createAndShowBoard: function () {
    // crea el elemento <table>
    var goltable = document.createElement("tbody");

    // Construye la Tabla HTML
    var tablehtml = "";
    for (var h = 0; h < this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w = 0; w < this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;

    // agrega la tabla a #board
    var board = document.getElementById("board");
    board.appendChild(goltable);
    // una vez que los elementos html son añadidos a la pagina le añadimos los eventos
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {

    for (var x = 0; x < this.height; x++) {
      for (var y = 0; y < this.width; y++) {
        let cell = document.getElementById(x + "-" + y);
        iteratorFunc(cell, x, y);
      }
    }
  },

  setupBoardEvents: function () {

    var onCellClick = function (e) {

      if (this.dataset.status == "dead") {
        this.className = "alive";
        this.dataset.status = "alive";
      } else {
        this.className = "dead";
        this.dataset.status = "dead";
      }
    };

    let clickeable = function (celda) {
      celda.addEventListener("click", onCellClick);
    };
    this.forEachCell(clickeable);

    //boton de limpiar
    let clearBtn = document.getElementById("clear_btn");
    clearBtn.addEventListener("click", this.limpiar.bind(this));
    //boton de random
    let randomBtn = document.getElementById("random_btn");
    randomBtn.addEventListener("click", this.random.bind(this));
    //boton de step
    let stepBtn = document.getElementById("step_btn");
    stepBtn.addEventListener("click", this.step.bind(this));
    //boton de autoplay
    let autoPlay = document.getElementById("auto_btn");
    autoPlay.addEventListener('click', this.enableAutoPlay.bind(this))

  },
  limpiar: function () {

    this.forEachCell((celda) => {
      if (celda.dataset.status == "alive") {
        //console.log(this)
        celda.className = "dead";
        celda.dataset.status = "dead";
      }
    });

  },
  random: function () {
    this.forEachCell(celda => {
      if (Math.random() > 0.5) {
        celda.className = "alive";
        celda.dataset.status = "alive";
      }
      else {
        celda.className = "dead";
        celda.dataset.status = "dead";
      }
    })
  },
  vecinos: function (cell) {
    let x = Number(cell.id.split("-")[0]);
    let y = Number(cell.id.split("-")[1]);

    let vecinosArray = [];

    let vecinoArriba = document.getElementById(`${x}-${y - 1}`);
    let vecinoAbajo = document.getElementById(`${x}-${y + 1}`);
    let vecinoDer = document.getElementById(`${x + 1}-${y}`);
    let vecinoIzq = document.getElementById(`${x - 1}-${y}`);
    let vecinoDiagIzqArr = document.getElementById(`${x - 1}-${y - 1}`);
    let vecinoDiagDerArr = document.getElementById(`${x + 1}-${y - 1}`);
    let vecinoDiagDerAbj = document.getElementById(`${x + 1}-${y + 1}`);
    let vecinoDiagIzqAbj = document.getElementById(`${x - 1}-${y + 1}`);

    vecinosArray = [
      vecinoArriba,
      vecinoAbajo,
      vecinoDer,
      vecinoIzq,
      vecinoDiagIzqArr,
      vecinoDiagDerArr,
      vecinoDiagDerAbj,
      vecinoDiagIzqAbj,
    ];
    let arr = [];
    for (let i = 0; i < vecinosArray.length; i++) {

      if (vecinosArray[i] !== undefined && vecinosArray[i] !== null) {
        if (vecinosArray[i].className === "alive") {
          arr.push(vecinosArray[i]);
        }
      }
    }
    return arr;
  },

  step: function () {
    this.forEachCell(function (cell) {
      let numVecinos = gameOfLife.vecinos(cell).length;
      if (numVecinos < 2 && cell.dataset.status === "alive")
        cell.dataset.status = "dead";
      if (numVecinos >= 2 && cell.dataset.status === "alive")
        cell.dataset.status = "alive";
      if (numVecinos > 3 && cell.dataset.status === "alive")
        cell.dataset.status = "dead";
      if (numVecinos === 3 && cell.dataset.status === "dead")
        cell.dataset.status = "alive";
    });

    this.forEachCell(function (cell) {
      if (cell.dataset.status === "alive") cell.className = "alive";
      if (cell.dataset.status === "dead") cell.className = "dead";
    });

  },
  enableAutoPlay: function () {

    let btnAuto = document.getElementById("auto_btn");
    if (!this.stepInterval) {
      this.stepInterval = setInterval(this.step.bind(this), 200)
      btnAuto.className = "active"
    }
    else {
      clearInterval(this.stepInterval);
      this.stepInterval = null;
      btnAuto.className = "btn"
    }

  }
};
gameOfLife.createAndShowBoard();


