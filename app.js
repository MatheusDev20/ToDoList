const form = document.querySelector('#itemForm');
const itemInput = document.querySelector('#itemInput');
const itemList = document.querySelector('.item-list');
const feedback = document.querySelector('.feedback');
const clear = document.querySelector('#clear-list');
 const teste = document.getElementById('test')

let todoItems = [];

// Objetivo dessa func, "riscar" o item da lista quando é clicado no ícone de check.
const handleItem = function(itemName) {
    const items = itemList.querySelectorAll('.item');
    items.forEach(function(item){
        if(item.querySelector('.item-name').textContent === itemName) {
            item.querySelector('.complete-item').addEventListener('click', () => {
                item.querySelector('.item-name').classList.toggle('completed')
                this.classList.toggle('visibility')
            })
        }
        // Editar o ítem
        item.querySelector('.edit-item').addEventListener('click', ()=> {
            itemInput.value = itemName
            itemList.removeChild(item) // Essa função removeChild exclui o primeiro elemento filho
                                        // e consequentemente todos os seus filhos de onde ela foi chamada
                                        // no caso item.List
                todoItems = todoItems.filter((item)=> {
                    return item !== itemName
                })
        })
        // Delete o ítem
        item.querySelector('.delete-item').addEventListener('click', ()=> {
         
            itemList.removeChild(item)
            
            todoItems = todoItems.filter((item)=> {
                return item !== itemName // a condição deste filtro é retornar valores diferentes daquele 
                                        // excluido, ou seja ele retorna um array novo SEM  o "item"
            })
        })
    })
} // Fim da função handleItem, responsável por lidar com todas as interações do Item no front.

const removerItem = function(item){ // essa é responsável por remover do ARRAY 
console.log(item)
const removeIndex = (todoItems.indexOf(item)); // Índice a ser removido.
todoItems.splice(removeIndex,1)
}

const getList = function(todoItems){
    itemList.innerHTML = '';
        todoItems.forEach(function(item){
            itemList.insertAdjacentHTML('beforeend', `<div class="item my-3"><h5 class="item-name text-capitalize">${item}</h5><div class="item-icons"><a href="#" class="complete-item mx-2 item-icon"><i class="fa fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon"><i class="fa fa-edit"></i></a><a href="#" class="delete-item item-icon"><i class="fa fa-times-circle"></i></a></div></div>` );
            handleItem(item);
        })
}
const getLocalStorage = function(){

    const todoStorage = localStorage.getItem('todoItems');
    if (todoStorage === 'undefined' || todoStorage === null){
        todoItems = [];
    } else {
        todoItems = JSON.parse(todoStorage);
        getList(todoItems);
    }
}

const setLocalStorage = function(todoItems){
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

// o CODIGO COMEÇA AQUI.
getLocalStorage();

//add an item to the List, including to local storage
form.addEventListener('submit', function(e){ 
    e.preventDefault();
    const itemName = itemInput.value;
    
    if (itemName.length === 0){
        feedback.innerHTML = 'Please Enter Valid Value';
        feedback.classList.add('showItem', 'alert-danger');
        setTimeout(
            function(){
                feedback.classList.remove('showItem');
                }, 3000);
    } else {
        todoItems.push(itemName);
        setLocalStorage(todoItems);
        getList(todoItems);
        //add event listeners to icons;
        //handleItem(itemName);
    }
    
    itemInput.value = '';

    });

    //clear all items from the list
clear.addEventListener('click', function(){
    todoItems = [];
    localStorage.clear();
    getList(todoItems);
})


