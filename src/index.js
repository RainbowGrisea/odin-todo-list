/*  To-do list project

click on add project/group ( project list on sidebar? )
click on add new item - title and description
Projects has a description and to-do items / checklist
edit list item ( priority / order / color / check mark / )
render function - DOM manipulation

*/

const projectList = [];
let currentProject = {};
let currentTask = {};

function Project( name, description ) {
  this.name = name || 'default';
  this.description = description;
  this.tasks = [];
  pushProject( this );
}

function Task( text, priority, checked, dueDate ) {
  this.text = text;
  this.priority = priority || 'normal';
  this.checked = checked || false ;
  this.dueDate = dueDate;
  pushTask( this );
}

function pushProject( project ) {
  projectList.push( project );
}

function pushTask( task ) {
  currentProject.tasks.push( task );
}

function deleteProject( number ) {
  projectList.splice( number, 1 );
  render();
}

function deleteTask( number ) {
  currentProject.tasks.splice( number, 1 );
  render();
};

function moveUp( number ) {
  if ( number === 0 ) return;
  const tempObj = Object.assign( projectList[ number - 1 ] );
  projectList[ number - 1 ] = { ... projectList[ number ] };
  projectList[ number ] = { ... tempObj };
}

function moveDown( number ) {
  if ( number === currentProject.tasks.length - 1 ) return;
  const tempObj = Object.assign( projectList[ number + 1 ] );
  projectList[ number + 1 ] = { ... projectList[ number ] };
  projectList[ number ] = { ... tempObj };
}

function switchProject ( projectNumber ) {
  currentProject = projectList[ projectNumber ];
}

// Update display
function render( ) {
  
  const projectListDiv = document.querySelector( '.projectList' );
  const projectTitle = document.querySelector( '.projectTitle' );
  const projectDescription = document.querySelector( '.projectDescription' );
  const taskList = document.querySelector( '.projectTasks' );
  
  projectListDiv.innerHTML = '';
  projectTitle.innerHTML = currentProject.name;
  projectDescription.innerHTML = currentProject.description;
  taskList.innerHTML = '';

  // Render project list on nav bar
  for ( let proj = 0; proj < projectList.length; proj++ ) {
    const projectDiv = document.createElement( 'div' );
    const projectButton = document.createElement( 'button' );
    const deleteProjectButton = document.createElement( 'button' );

    projectDiv.classList.add( 'projectDiv' );
    deleteProjectButton.type = 'button';
    deleteProjectButton.innerHTML = '&times;';
    deleteProjectButton.classList.add( 'deleteButton' );
    projectButton.classList.add( 'projectNameButton' );
    projectButton.innerHTML = projectList[ proj ].name;
    projectButton.addEventListener( 'click', () => {
      currentProject = projectList[ proj ];
      render();
    } )
    projectDiv.appendChild( projectButton );
    projectDiv.appendChild( deleteProjectButton );
    projectListDiv.appendChild( projectDiv )

    deleteProjectButton.addEventListener( 'click', () => {
      deleteProject( proj );
    })
  };

  // Render selected project and its tasks
  for ( let taskNumber = 0; taskNumber < currentProject.tasks.length; taskNumber++ ) {
    const taskDiv = document.createElement( 'div' );
    const checkbox = document.createElement( 'input' );
    const taskLabel = document.createElement( 'label' );
    const editButton = document.createElement( 'button' );
    const deleteButton = document.createElement( 'button' );

    editButton.innerHTML = 'edit';
    editButton.type = 'button';
    editButton.classList.add( 'editButton' );
    taskDiv.id = 'task' + taskNumber;
    checkbox.type = 'checkbox';
    checkbox.id = 'item' + taskNumber;
    checkbox.checked = currentProject.tasks[ taskNumber ].checked;
    taskLabel.innerHTML = currentProject.tasks[ taskNumber ].text;
    taskLabel.htmlFor = 'item' + taskNumber;
    deleteButton.type = 'button';
    deleteButton.innerHTML = '&times;';
    deleteButton.classList.add( 'deleteButton' );

    switch ( currentProject.tasks[ taskNumber ].priority ) {
      case 'low': {
        taskDiv.classList.add( "lowPriority" );
      }        
        break;

      case 'medium': {
        taskDiv.classList.add( "mediumPriority" );
      }        
        break;
    
      case 'high': {
        taskDiv.classList.add( "highPriority" );
      }        
        break;
    
      default: {
        taskDiv.classList.add( "lowPriority" );
      }     
        break;
    }
    
    taskDiv.appendChild( checkbox );
    taskDiv.appendChild( taskLabel );
    taskDiv.appendChild( editButton );
    taskDiv.appendChild( deleteButton );
    taskList.appendChild( taskDiv );

    deleteButton.addEventListener( 'click', () => {
      deleteTask( taskNumber );
    } )

    editButton.addEventListener( 'click', () => {
      showEditTaskModal( taskNumber );
    })
    
    checkbox.addEventListener( 'click', function changeCheckedStatus() {
      currentProject.tasks[ taskNumber ].checked = this.checked;
    });
  }
}

const createProjectButton = document.querySelector( '.newProjectButton' );
createProjectButton.addEventListener( 'click', () => {
  showModal();
});

const closeButtons = document.querySelectorAll( '.closeButton' );
for ( let i = 0; i < closeButtons.length; i++ ){
  closeButtons[ i ].addEventListener( 'click', () => {
    closeModal( closeButtons[ i ] );
  })
}

function showModal( ) {
  const modal = document.querySelector( '#projectModal' );
  modal.style.display = 'flex';
}

function closeModal( button ) {
  let parent;
  function findModal( button ) {
    parent = button.parentElement;
    const classes = Array.from( parent.classList ); 
    if ( classes.includes( 'modal' ) ) {
      parent.style.display = 'none';
    } else { findModal( parent ) }
  }
  findModal( button );
  clearModal( parent )  
}

function clearModal( modal ) {
  const inputs = document.querySelectorAll( 'input' );
  for ( let i = 0; i < inputs.length; i++ ){
    inputs[ i ].value = '';
  } 
}

const addNewProjectButton = document.querySelector( '.modalCreateProjectButton');
addNewProjectButton.addEventListener( 'click', () => {
  const modalElement = addNewProjectButton.parentElement;
  const name = modalElement.querySelector( '#projectName' ).value;
  const description = modalElement.querySelector( '#projectDescription' ).value;
  addNewProject( name, description );
})

function addNewProject ( name, description ){
  const newProj = new Project( name, description );
  clearModal();
  render();
  closeModal( addNewProjectButton );
}

function showTaskModal( ) {
  const taskModal = document.querySelector( '#taskModal' );
  taskModal.style.display = 'flex';
}

function showEditTaskModal( taskNumber ) {
  currentTask = currentProject.tasks[ taskNumber ];
  currentTask.taskNumber = taskNumber;
  const editTaskModal = document.querySelector( '#editTaskModal' );
  editTaskModal.style.display = 'flex';
  editTaskModal.querySelector( '#taskDescription' ).value = currentTask.text;
  editTaskModal.querySelector( '#taskPriority' ).value = currentTask.priority;
  editTaskModal.querySelector( '#dueDate' ).value = currentTask.dueDate;
}

const addTaskButton = document.querySelector( '.addTaskButton');
addTaskButton.addEventListener( 'click', () => {
  showTaskModal();
})

const addNewTaskButton = document.querySelector( '.taskCreateButton');
addNewTaskButton.addEventListener( 'click', () => {
  const modalElement = addNewTaskButton.parentElement;
  const description = modalElement.querySelector( '#taskDescription' ).value;
  const priority = modalElement.querySelector( '#taskPriority' ).value;
  addNewTask( description, priority );
})

function addNewTask  ( description, priority ){
  const newTask = new Task( description, priority );
  clearModal();
  render();
  closeModal( addNewTaskButton );
}

const taskEditSaveButton = document.querySelector( '.taskEditSave');
taskEditSaveButton.addEventListener( 'click', () => {
  taskEditSave( currentTask.taskNumber );
})

function taskEditSave ( taskNumber ) {
  currentTask.text = editTaskModal.querySelector( '#taskDescription' ).value;
  currentTask.priority = editTaskModal.querySelector( '#taskPriority' ).value;
  currentTask.dueDate = editTaskModal.querySelector( '#dueDate' ).value;
  render();
  closeModal( taskEditSaveButton );
  delete currentTask.taskNumber;
  currentTask = {};
}

// Dummy projects and tasks
const defaultProject = new Project( 'Default project', 'This is a default project with many interesting tasks. Feel free to edit, or create a new project.', '1 week' );
currentProject = defaultProject;
new Task( 'first task', 'high' ), new Task( 'second', 'medium' ), new Task( 'notthethrid', 'low' ), new Task( 'last', 'medium' );
const defaultProject2 = new Project( 'Second project', 'Here we go again. You can switch between projects.', 'Now' );
currentProject = defaultProject2;
new Task( 'wow', 'low' ), new Task( 'second', 'medium' ), new Task( 'again', 'low' ), new Task( 'fourth', 'medium' );

currentProject = defaultProject;
render();
