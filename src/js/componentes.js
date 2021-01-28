import { Todo } from "../classes";
import { todoList } from "../index";

// Referencias en el HTML 
const divTodoList    = document.querySelector( '.todo-list' );
const txtInput       = document.querySelector( '.new-todo' );
const btnBorrar      = document.querySelector( '.clear-completed' );
const ulFiltros      = document.querySelector( '.filters' );
const anchorFiltros  = document.querySelectorAll( '.filtro' );
const spanPendientes = document.querySelector( '.todo-count' );

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
    </li>`;
    // <input class="edit" value="Create a TodoMVC template">

    const div = document.createElement( 'div' );
    div.innerHTML = htmlTodo;
    divTodoList.append( div.firstElementChild );
    actualizarPendientesHtml();

    return div.firstElementChild;
}

const actualizarPendientesHtml = () => {
    
    spanPendientes.firstChild.innerHTML = todoList.contarPendientes();
    
};

// Eventos
txtInput.addEventListener('keyup', ( event ) => {
    
    if ( event.keyCode === 13 && txtInput.value.length > 0 ) {
        // console.log(txtInput.value);
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHtml( nuevoTodo );
        actualizarPendientesHtml();
        txtInput.value = '';
    }

});

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento   = event.target.parentElement.parentElement; // li
    const todoId         = todoElemento.getAttribute('data-id'); // id (string)

    if ( nombreElemento.includes( 'input' ) ) { // click en checkbox (input)
        todoList.marcarCompletado( todoId );
        actualizarPendientesHtml();
        todoElemento.classList.toggle('completed');
    } else if( nombreElemento.includes( 'button' ) ) { // click en X (button)
        todoList.eliminarTodo( todoId );
        actualizarPendientesHtml();
        divTodoList.removeChild( todoElemento );
    }

});

btnBorrar.addEventListener('click', () => {
    
    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length-1; i>=0; i-- ) {
        
        const elemento = divTodoList.children[i];
        if( elemento.classList.contains('completed') ) {
            divTodoList.removeChild( elemento );
        }

    }

});

ulFiltros.addEventListener('click', ( event ) => {

    const filtro = event.target.text;
    if( !filtro ) { return; }
    
    anchorFiltros.forEach( elem => elem.classList.remove( 'selected' ) );
    event.target.classList.add( 'selected' );


    for( const elemento of divTodoList.children ) {

        elemento.classList.remove( 'hidden' ); 
        const completado = elemento.classList.contains( 'completed' );

        switch( filtro ) {

            case 'Pendientes':
                if ( completado ) {
                    elemento.classList.add( 'hidden' );
                }
            break;

            case 'Completados':
                if ( !completado ) {
                    elemento.classList.add( 'hidden' );
                }
            break;

        }
    }

});

// TODO: HACER TAREA TOGGLE ALL (FLECHA EN HTML) 


