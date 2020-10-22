
let addInput = document.querySelector('.addInput'),
    buttonTask = document.querySelector('.addTask'),
    todo = document.querySelector('.todo'),
    todoDone = document.querySelector('.todoDone'),
    todoDelet = document.querySelector('.todoDelet');

let arrTask = [];


if(localStorage.getItem('todo')) {
    arrTask = JSON.parse(localStorage.getItem('todo'));
    displayTask();
}

buttonTask.addEventListener('click', () => {
    if(addInput.value.length>0) {
        let newTask = {
            id: Date.now().toString(),
            todo: addInput.value,
            checked: true,
            status: 'current'
        };
    
        arrTask.push(newTask);
        displayTask()
        localStorage.setItem('todo',JSON.stringify(arrTask));
        addInput.value ='';
    }

});

function displayTask() {
    let displayTask = '';
    let currentArray = arrTask.filter(item => item.status === 'current');
    currentArray.forEach( (item, i) => {
     displayTask += `
        <li>
           <label id=${item.id} class='labelFor'>${item.todo}</label>
           <button class='redart delet'> удалить </button>
           <button class='redart done'> выполнено </button>
           <button class='redart edit'> редактировать </button>
        </li>
        `;
        todo.innerHTML = displayTask;
    });
    ready()
}

function ready() {
    //EDIT
    const editButtons = document.querySelectorAll('.edit')
    for (i = 0; i < editButtons.length; i++) {

        editButtons[i].addEventListener('click', function(){

            const parent = this.parentNode
            const note = parent.querySelector('.labelFor')
            const id = note.getAttribute('id')
            
            if (this.innerText == 'редактировать') {
                 this.innerText = 'сохранить';
                note.contentEditable = true;
                note.focus();
            }
            else if (this.innerText == 'сохранить') {
                this.innerText = 'редактировать';
                const newText = note.innerText
                arrTask = arrTask.map(obj => {
                    if (obj.id === id) {
                        const newObject = {...obj, todo: newText}
                        return newObject;
                    }
                    return obj;
                });
                note.contentEditable = false;
                localStorage.setItem('todo',JSON.stringify(arrTask));
            }
        })
    }
    // READY
    let done = document.querySelectorAll(".done")
    for (i = 0; i < done.length; i++) {
      done[i].addEventListener('click', function() {
        const parent = this.parentNode
        const text = parent.querySelector('.labelFor').innerHTML
        arrTask = arrTask.map(obj => {
            if (obj.todo === text) {
                const newObject = {...obj, status: 'ready'}
                return newObject;
            }
            return obj;
        });
        localStorage.setItem('todo',JSON.stringify(arrTask));
        parent.remove()
        displayReadyTasks()
      });
    }
    //DELETED
    let delet = document.querySelectorAll(".delet")
    for (i = 0; i < delet.length; i++) {
        delet[i].addEventListener('click', function() {
            const parent = this.parentNode
            const text = parent.querySelector('.labelFor').innerHTML
            arrTask = arrTask.map(obj => {
                if (obj.todo === text) {
                    const newObject = {...obj, status: 'deleted'}
                    return newObject;
                }
                return obj;
            });
            localStorage.setItem('todo',JSON.stringify(arrTask));
            parent.remove()
            displayDeletedTasks()
 
    });
    }
    //RESTORE
    let restore = document.querySelectorAll(".restore")
    for(i = 0; i < restore.length; i++) {
        restore[i].addEventListener('click', function() {
            const parent = this.parentNode
            const text = parent.querySelector('.labelFor').innerHTML
            arrTask = arrTask.map(obj => {
                if (obj.todo === text) {
                    const newObject = {...obj, status: 'current'}
                    return newObject;
                }
                return obj;
            });
            parent.remove()
            displayTask()
            localStorage.setItem('todo',JSON.stringify(arrTask));
        })
    }
}

function displayReadyTasks() {
    let tasks = '';
    let newArr = arrTask.filter(item => item.status === 'ready')
    newArr.forEach( (item, i) => {
            tasks += `
                <li>
                <label id=${item.id} class='labelFor'>${item.todo}</label>
                <button class='redart delet'> удалить </button>
                <button class='redart edit'> редактировать </button>
                </li>
                `;
            todoDone.innerHTML = tasks;
        });
    ready()    
}

function displayDeletedTasks() {
    let tasks='';
    arrTask
        .filter(item => item.status === 'deleted')
        .forEach( (item, i) => {
            tasks += `
                <li>
                <label id=${item.id} class='labelFor'>${item.todo}</label>
                <button class='redart restore'> восстановить </button>
                </li>
                `;
            todoDelet.innerHTML = tasks;
        });
    ready()
}

window.onload = function() {
    displayTask()
    displayReadyTasks()
    displayDeletedTasks()
};
