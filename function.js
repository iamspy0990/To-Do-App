let task__form = document.querySelector('.task__form')
let task__list = document.querySelector('.task__list')



task__form.addEventListener('submit', (e) => {
  e.preventDefault();
  let task = document.querySelectorAll('.task__list li')

  if (task.length <= 10) {
    if (e.target[0].value == '') {
      alert('Cannot Have Undefined Tasks')
    }else{
      let li = document.createElement(`li`);
      let text = document.createTextNode(e.target[0].value);
      li.append(text);
      task__list.append(li)
      e.target[0].value = '';
    }
  }else {
    alert('you have reached the limit of tasks');
  }
})