let input = document.querySelector('#favchap');
let button = document.querySelector('button');
let list = document.querySelector('#list');



button.addEventListener('click', function() {
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');
    if(!input.value.trim()) {
        input.style.border = '1px solid red'
        return input.focus()
    } else {
        input.style.border = 'none'
        if(input.value) {
            li.textContent = input.value;
        }
        
        deleteBtn.textContent = '❌';
        li.append(deleteBtn);
        list.append(li);
        input.value = '';
        input.focus();
        deleteBtn.addEventListener('click', () => removeItem(li, input));
    }
})

function removeItem(li, input) {
    li.remove()
    input.focus()

}

