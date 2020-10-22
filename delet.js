let todoClear = document.querySelector('.delete');

todoClear.addEventListener('click', () => {
    localStorage.removeItem('todo')   
});
