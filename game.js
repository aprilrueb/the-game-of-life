/*var mainElement = document.getElementById('main');
if (mainElement) {
  var game = Life(mainElement);

  // Connect #step_btn to the step function
  document.getElementById('step_btn')
    .addEventListener('click', game.step);

  document.getElementById('play_btn')
  .addEventListener('click', game.togglePlaying);

  document.getElementById('reset_btn')
  .addEventListener('click', game.random);

  document.getElementById('clear_btn')
  .addEventListener('click', game.clear);
}

function Life(container, width = 12, height = 12) {
  // Create boards for the present and future.
  // Game boards are somewhat expensive to create, so we're going
  // to be reusing them. Each time we step the game, `future`
  // becomes `present` and vice versa.
  var present = new Board(width, height);
  var future = new Board(width, height);
  // Create a <table> to hold our cells.
  var table = createTable();

  // Put the table in our container
  container.appendChild(table);

  // Add a mouse down listener to our table
  table.addEventListener('mousedown', toggleCellFromEvent);

  function createTable() {
    // create <table> element
    var table = document.createElement('table');       // <table
    table.classList.add('board');                       //   class='board'>
    for (var r = 0; r < height; r++) {
      var tr = document.createElement('tr');           //   <tr>
      for (var c = 0; c < width; c++) {                //     For instance, at r=2, c=3:
        var td = document.createElement('td');         //     <td
        td.id = `${r}-${c}`;                            //       id="2-3">
        // We'll put the coordinate on the cell
        // Element itself, letting us fetch it
        // in a click listener later.
        td.coord = [r, c];
        tr.appendChild(td);                            //     </td>
      }
      table.appendChild(tr);                           //   </tr>
    }                                                  //  </table>
    return table;
  }

  function toggleCellFromEvent(event) {
    // FIXME: This currently always toggles cell (0, 0).
    // How do we get the coordinate of the cell that was clicked on?
    // HINT: https://developer.mozilla.org/en-US/docs/Web/API/Event/target
    var cell = event.target;
     // ⬅️ Fix me
    present.toggle(cell.coord);
    paint();
  }

  function paint() {
    var cells = document.getElementsByTagName("td");
    for(var i=0; i<cells.length; i++){
      if(present.cells[i]){
        cells[i].classList.add("alive");
      }
      else cells[i].classList.remove("alive");
    }

    // TODO:
    //   1. For each <td> in the table:
    //     a. If its cell is alive, give the <td> the `alive` CSS class.
    //     b. Otherwise, remove the `alive` class.
    //
    // To find all the <td>s in the table, you might query the DOM for them, or you
    // could choose to collect them when we create them in createTable.
    //
    // HINT:
    //   https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
    //   https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
  }

  function step() {
    // Hello, destructuring assignment:
    //   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    [present, future] = tick(present, future);  // tick is from board.js
    // ⬆️ Why is there a semicolon at the beginning of this line?
    //
    // It's not necessary, but we have it there to avoid a confusing problem.
    // Let's say you put a console.log at the start of this function, but
    // forget the semicolon at the end of the line:
    //
    //     console.log('entered step')
    //     [present, future] = tick(present, future);
    //
    // This is the one case in which automatic semicolon insertion can really bite
    // you. Since the line begins with a `[` token, JS will assume that it *continues*
    // the previous expression. That is, it will condense your code to this:
    //
    //     console.log('entered step')[present, future] = tick(present, future);
    //
    // Which will throw the confusing error:
    //
    //     TypeError: Cannot read property '#<Board>' of undefined
    //
    // Since it's trying to look up `present` inside the return value of `console.log`,
    // which is undefined.
    //
    // In general, you should either be fastidious about ending lines with semicolons,
    // or you should be sure to *begin* with a semicolon any line that could continue
    // an expression—that's any line that starts with a (, [, or ` character.

    // Paint the new present
    paint();
  }
  var animation = null;

  function play() {
    // TODO:
    // Start playing by running the `step` function
    // automatically repeatedly every fixed time interval
    // HINT:
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
    animation = setInterval(step, 100);
  }

  function stop() {
    // TODO: Stop autoplay.
    // HINT:
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval
    clearInterval(animation);
    animation = null;
  }

  function togglePlaying() {
    // TODO: If we're playing, stop. Otherwise, start playing.

    if(animation) stop();

    else play();
  }

  function clear() {
    // TODO: Clear the board
    for(var i = 0; i<present.cells.length;i++){
      present.cells[i]=0;
    }

    paint();
  }

  function random() {
    // TODO: Randomize the board

    for(var i = 0; i<present.cells.length;i++){
      present.cells[i]=Math.round(Math.random())
    }

    paint();
  }

  return {play, step, stop, togglePlaying, random, clear};
}*/

var mainElement = document.getElementById('main')
if (mainElement) {
  var game = Life(mainElement)

  document.getElementById('step_btn')
    .addEventListener('click', () => game.step())

  document.getElementById('play_btn')
    .addEventListener('click', game.togglePlaying)

  document.getElementById('clear_btn')
    .addEventListener('click', game.clear)

  document.getElementById('reset_btn')
    .addEventListener('click', game.random)
}

function Life(container, width=12, height=12) {
  var present = new Board(width, height);
  var future = new Board(width, height);

  const cells = []
  var table = createTable();

  container.appendChild(table);

  table.addEventListener('mousedown', toggleCellFromEvent)

  function createTable() {
    var table = document.createElement('table');
    table.classList.add('board')
    for (var r = 0; r < height; r++) {
      var tr = document.createElement('tr');
      for (var c = 0; c < width; c++) {
        var td = document.createElement('td');
        td.id = `${r}-${c}`
        td.coord = [r, c];
        tr.appendChild(td);
        cells.push(td)
      }
      table.appendChild(tr);
    }
    return table
  }

  function toggleCellFromEvent(event) {
    present.toggle(event.target.coord)
    paint()
  }

  function paint() {
    let i = cells.length; while (--i >= 0) {
      const td = cells[i]
      if (present.get(td.coord))
        td.classList.add('alive')
      else
        td.classList.remove('alive')
    }
  }

  function step(rules) {
    ;[present, future] = tick(present, future, rules);
    paint();
  }

  let interval = null
  function play() {
    interval = setInterval(step, 100)
  }

  function stop() {
    clearInterval(interval)
    interval = null
  }

  function togglePlaying() {
    interval ? stop() : play()
  }

  function clear() {
    step(() => 0)
  }

  function random() {
    step(() => Math.round(Math.random()))
  }

  return {play, step, stop, togglePlaying, random, clear}
};
