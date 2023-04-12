/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("/*  To-do list project\n\nclick on add project/group ( project list on sidebar? )\nclick on add new item - title and description\nProjects has a description and to-do items / checklist\nedit list item ( priority / order / color / check mark / )\nrender function - DOM manipulation\n\n*/\n\nconst projectList = [];\n\nfunction Project( name, description ) {\n  this.name = name;\n  this.description = description;\n  projectList.push(this);\n}\n\nconst proj = new Project( 'lelci', 'Hosszu leiras' );\nconsole.log( proj );\n\n\n//# sourceURL=webpack://odin-todo-list/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;