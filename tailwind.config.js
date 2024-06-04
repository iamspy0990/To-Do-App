document.addEventListener("DOMContentLoaded", () => {
  // all targets
  let del = document.querySelector('.del');
  let task__form = document.querySelector('.task__form')
  let task__list = document.querySelector('.task__list')
  let txt = document.querySelector('textarea')
  let btn = document.querySelector('.btn')
  let task = document.querySelectorAll('.task__list li')
  let popup = document.querySelector('.pop_up');
  let close = document.querySelectorAll('.close');
  let singleDelButtons;


  // all event Listeners
  task__form.addEventListener('submit', (event) => {
    event.preventDefault();
    formSubmit(event);
  })
  window.addEventListener("load", ()=>{
    loadTasks();  
  })

  

  close.forEach((item) => {
    item.addEventListener("click", (e) => {
      console.log(document.querySelector('.model_wrapper'));
      document.querySelector('.model_wrapper').classList.remove('show');
    })
  });

  txt.addEventListener("keydown", (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior of newline insertion
      task__form.dispatchEvent(new Event('submit')); // Trigger form submission
    }
  });

  del.addEventListener('click' , ()=>{
    let status = confirm('Are you sure you wanna delete all tasks?');
    if (status){
      localStorage.removeItem('tasks');
      window.location.reload();
    }  
  })


  // Load all task from storage 
  function loadTasks(){
    let allTasks = getDataFromLocalStorage();
    allTasks.forEach((item)=>{
      let li = document.createElement(`li`);
      let button = document.createElement(`button`);
      button.innerText = "X"
      let textNode = document.createTextNode(item);
      li.append(textNode, button);
      task__list.append(li);
    })
    singleDelButtons =  document.querySelectorAll('li button');
    singleDelButtons.forEach((item)=>{
      item.addEventListener('click', (e)=>{
        // console.log(e.target.parentElement.remove());
        let txt = (e.target.parentElement.childNodes[0].nodeValue);
        allTasks.forEach((item, index)=>{
          if(item == txt){
            allTasks.splice(index, 1);
            setDataInLocalStorage(allTasks)
            window.location.reload();
          }
        })
      })
    })
  }

  // get task from storage
  function getDataFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    if (tasks == null) {
      localStorage.setItem('tasks', '[]');
      tasks = localStorage.getItem('tasks')
    }
    tasks = JSON.parse(tasks);
    return tasks;
  }
  // save task to storage
  function setDataInLocalStorage(data) {
    if(typeof data == "string"){
      let tasks = getDataFromLocalStorage();
      tasks.push(data);
      let jsondata = JSON.stringify(tasks);
    localStorage.setItem('tasks', jsondata);
    }else{
      let jsondata = JSON.stringify(data);
      localStorage.setItem('tasks', jsondata);
    }
  }
  // delete all task from storage
  function deteleAllTasksFromLocalStorage() {
    localStorage.removeItem('tasks');
  }

  // function to submit the task
  function formSubmit(e) {
    e.preventDefault();
    let text = e.target[0].value;
    if (text == '') {
      popup.firstElementChild.innerText = 'Error';
      popup.children[1].innerText = 'Can not have Undefined Tasks'
      document.querySelector('.model_wrapper').classList.add('show');
    } else {
      setDataInLocalStorage(text);
      task__list.innerHTML = '';
      loadTasks();
      e.target[0].value = '';
      e.target[0].focus();
    }
  }


})




// local storage
// localStorage
// to store the data, we have to pass a key with it;s value
// key  value;
// .setItem(key, value)
// localStorage.setItem('name', 'Hammad');
// localStorage.getItem('name');
// localStorage.removeItem('name');
// localStorage.clear();
// JSON == Javascript Object Notation
// [
//   {'name':'hamamd'},
//   {'name':'imran'}
// ]


// JSON.parse();
// JSON.stringify();






