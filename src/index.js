/*  To-do list project

click on add project/group ( project list on sidebar? )
click on add new item - title and description
Projects has a description and to-do items / checklist
edit list item ( priority / order / color / check mark / )
render function - DOM manipulation

*/

const projectList = [];
let currentProject = { tasks:[],};

function Project( name, description ) {
  this.name = name;
  this.description = description;
  this.tasks = [];
  pushProject( this );
}

function Task( text, priority ) {
  this.text = text;
  this.priority = priority || 'normal';
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
}

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

function render( project ) {
  console.table( projectList );
  const title = document.createElement( 'div' );
  title.classList.add( 'projectTitle' );
  title.innerHTML = project.name;
  
}


// Dummy projects and tasks
new Project( 'proj1', 'blablabla' );
new Project( 'proj2', 'blablabla222' )
new Project( 'proj3', 'blablabla22312312' )
new Project( 'proj4', 'blablabla543' )

const task1 = new Task( 'leller', 'high' );
const task2 = new Task( 'second', 'medium' );
const task3 = new Task( 'notthethrid', 'low' );
const task4 = new Task( 'lelci', 'medium' );

currentProject = projectList[0];