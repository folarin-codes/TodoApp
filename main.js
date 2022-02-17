/*
---------DARK MODE
------- ADD TODO
-------STORE TODO IN LOCAL STORAGE
-------RENDER TODO TO THE DOM FROM LOCAL STORAGE
------COMPLETED TODO
----DELETE TODO
-----ACTIVE TODO
-----ALL TODO
------CLEAR COMPLETED TODO


*/

elements = {
      img: document.querySelector('.img'),
      header: document.querySelector('header'),
      input: document.querySelector('.input'),
      todoContainer: document.querySelector('.todo-container'),
      todoItems: document.querySelectorAll("li"),
      body: document.querySelector("body"),
      footer: document.querySelector('.footer-div')
}

let todoArr = [];
let parsedTodoArr = [];


let state = {}

//DARK MODE IMPLEMENTATION
elements.img.addEventListener('click', function () {
     
      
      [elements.todoContainer, elements.input,elements.footer].forEach(el => {
            
            el.classList.toggle('dark-mode')
      }
      )

          Array.from(elements.todoItems).forEach((el) => {
          el.classList.toggle('dark-mode')
    })
      if (elements.img.getAttribute('src') === "images/icon-moon.svg") {
            elements.img.setAttribute('src', "images/icon-sun.svg")
            elements.header.style.backgroundImage = "url('./images/bg-desktop-dark.jpg')";
           elements.body.style.backgroundColor = 'rgb(25 25 34 / 93%)'
      }

      else {
            elements.img.setAttribute('src', "images/icon-moon.svg");
            
            elements.header.style.backgroundImage = "url('./images/bg-desktop-light.jpg')";
            
           elements.body.style.backgroundColor = 'hsl(0, 0%, 98%)'
            
            
      }
})

//TODO IMPLEMENTATION

class Todo {
      constructor(value) {
            this.value = value;
      }

      storeTodo = (todo) => {
            todoArr.push(todo)
      
      }
      
      addTodoToLocalStorage() {
            localStorage.setItem("myTodos" , JSON.stringify(todoArr))
      }

      parseTodo() {

            parsedTodoArr = JSON.parse(localStorage.getItem("myTodos"))
            
      }

      renderTodoToDom(value) {

            let todoItem =  ` 

             <li><input type="radio" name="" id=""> <span class="check-box"></span>${value}<img src="images/icon-cross.svg" alt="" srcset="" class="remove"></li>
            
            
            `
            elements.todoContainer.insertAdjacentHTML("beforeend", todoItem);

      }

      renderOnRefresh() {

            parsedTodoArr.forEach((e) => {

            state.todo.renderTodoToDom(e.value)
            
      })
      }

}

parsedTodoArr = JSON.parse(localStorage.getItem("myTodos"))

renderOnRefresh = function () {

      parsedTodoArr.forEach((e) => {

            
            let todoItem =  ` 

             <li><input type="radio" name="" id=""> <span class="check-box"></span>${e.value}<img src="images/icon-cross.svg" alt="" srcset="" class="remove"> </li>
            
            
            `
            elements.todoContainer.insertAdjacentHTML("beforeend", todoItem);
            
      })

            if (todoArr ) {
      todoArr = parsedTodoArr
}

}

elements.todoContainer.addEventListener("click", (e) => {
      var event = e.target.closest(".remove").parentNode
      // console.log( event.textContent)

      let arrIndex, ids;
      
    

      arrIndex = todoArr.findIndex((e) => {
                     
            return JSON.stringify(e.value).includes(JSON.stringify(event.innerText.replace(' \n', '')))
            
      })


      todoArr.splice(arrIndex, 1)

      event.parentNode.removeChild(event)
      
     

})

init = () => {
      
      // state.todo = new Todo(elements.input.value)

      document.addEventListener("keypress", event => {
    
      
            state.todo = new Todo(elements.input.value)
            if (event.keyCode == 13 || event.which == 13) {

                  if (elements.input.value != '') {

                        state.todo.storeTodo(state.todo)
                        state.todo.addTodoToLocalStorage()
                        state.todo.parseTodo()
                        state.todo.renderTodoToDom(elements.input.value)
                        localStorage.setItem("myTodos" ,  JSON.stringify(todoArr))
                                    
                  }
         
                  elements.input.value = ''
                            
            }
      
      })

      if (todoArr != []) {
        renderOnRefresh()
            
      }

   
}

 init()