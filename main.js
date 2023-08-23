/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Projects/projects.js":
/*!**********************************!*\
  !*** ./src/Projects/projects.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Project: () => (/* binding */ Project)
/* harmony export */ });
// Factory function for creating a Project

const Project = (name, description) => {

    const getName = () => name;
    const setName = (newName) => name = newName;

    const getDescription = () => description;
    const setDescription = (newDescription) => description = newDescription;

    let _associatedToDos = [];

    const getToDo = (index) => _associatedToDos[index];
    const getAllToDos = () => _associatedToDos;

    const addToDo = (object) => _associatedToDos.push(object)
    const removeToDo = (index) => _associatedToDos.splice(index, 1)

    const _createToDosObject = () => {

        let ToDosObject = {}

        _associatedToDos.forEach((e) => {
            ToDosObject[e.getName()] = e.createToDoObject()
        })

        return ToDosObject
    }

    const createProjectObject = () => {
        
        let projectObject = { 
            "name" : getName(),
            "description" : getDescription(),
            "associatedToDos" : _createToDosObject()
        }

        return projectObject
    }


    return {getName,
            setName,
            setDescription,
            getDescription,
            getToDo,
            addToDo,
            removeToDo,
            getAllToDos,
            createProjectObject,
        }
}



/***/ }),

/***/ "./src/storage/storage.js":
/*!********************************!*\
  !*** ./src/storage/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   storage: () => (/* binding */ storage)
/* harmony export */ });
const storage = (() => {

    const saveObjectToStorage = (key, object) => {
        window.localStorage.setItem(key, JSON.stringify(object))
    }

    const getObjectFromStorage = (key) => {
        return JSON.parse(localStorage.getItem(key))
    }

    return {
        saveObjectToStorage,
        getObjectFromStorage
    }
    
})();

/***/ }),

/***/ "./src/todos/todos.js":
/*!****************************!*\
  !*** ./src/todos/todos.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToDo: () => (/* binding */ ToDo)
/* harmony export */ });
// Factory function for creating a ToDo

const ToDo = (name, description, dueDate, status) => {

    const getName = () => name;
    const setName = (newName) => name = newName;

    const getDescription = () => description;
    const setDescription = (newDescription) => description = newDescription;

    const getDueDate = () => dueDate;
    const setDueDate = (newDueDate) => dueDate = newDueDate; 

    const getStatus = () => status
    const toggleStatus = () => status = status ? false : true;

    const createToDoObject = () => {

        let toDoObject = {
            "name" : getName(),
            "description" : getDescription(),
            "dueDate" : getDueDate(),
            "status" : getStatus()
        }

        return toDoObject
    }

    return {getName,
            setName, 
            setDescription,
            getDescription,
            getDueDate,
            setDueDate,
            getStatus,
            toggleStatus,
            createToDoObject}
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _todos_todos_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todos/todos.js */ "./src/todos/todos.js");
/* harmony import */ var _Projects_projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Projects/projects.js */ "./src/Projects/projects.js");
/* harmony import */ var _storage_storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage/storage.js */ "./src/storage/storage.js");






const newProject = (0,_Projects_projects_js__WEBPACK_IMPORTED_MODULE_1__.Project)("School", "this project is for organizing my school work");

const firstToDo = (0,_todos_todos_js__WEBPACK_IMPORTED_MODULE_0__.ToDo)("Do something", "Get on my Level", "18.10.2000", false)
const secondToDo = (0,_todos_todos_js__WEBPACK_IMPORTED_MODULE_0__.ToDo)("Do something else", "Set on my Level", "13.10.2000", false)
newProject.addToDo(firstToDo)
newProject.addToDo(secondToDo)

let validObject = newProject.createProjectObject();

_storage_storage_js__WEBPACK_IMPORTED_MODULE_2__.storage.saveObjectToStorage(newProject.getName(), validObject)

console.log(_storage_storage_js__WEBPACK_IMPORTED_MODULE_2__.storage.getObjectFromStorage("School"))
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRE87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNmRDs7QUFFTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O1VDckNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ053QztBQUNTO0FBQ0g7Ozs7QUFJOUMsbUJBQW1CLDhEQUFPOztBQUUxQixrQkFBa0IscURBQUk7QUFDdEIsbUJBQW1CLHFEQUFJO0FBQ3ZCO0FBQ0E7O0FBRUE7O0FBRUEsd0RBQU87O0FBRVAsWUFBWSx3REFBTyxnQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9Qcm9qZWN0cy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvc3RvcmFnZS9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy90b2Rvcy90b2Rvcy5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRmFjdG9yeSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBQcm9qZWN0XG5cbmV4cG9ydCBjb25zdCBQcm9qZWN0ID0gKG5hbWUsIGRlc2NyaXB0aW9uKSA9PiB7XG5cbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgICBjb25zdCBzZXROYW1lID0gKG5ld05hbWUpID0+IG5hbWUgPSBuZXdOYW1lO1xuXG4gICAgY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAoKSA9PiBkZXNjcmlwdGlvbjtcbiAgICBjb25zdCBzZXREZXNjcmlwdGlvbiA9IChuZXdEZXNjcmlwdGlvbikgPT4gZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcblxuICAgIGxldCBfYXNzb2NpYXRlZFRvRG9zID0gW107XG5cbiAgICBjb25zdCBnZXRUb0RvID0gKGluZGV4KSA9PiBfYXNzb2NpYXRlZFRvRG9zW2luZGV4XTtcbiAgICBjb25zdCBnZXRBbGxUb0RvcyA9ICgpID0+IF9hc3NvY2lhdGVkVG9Eb3M7XG5cbiAgICBjb25zdCBhZGRUb0RvID0gKG9iamVjdCkgPT4gX2Fzc29jaWF0ZWRUb0Rvcy5wdXNoKG9iamVjdClcbiAgICBjb25zdCByZW1vdmVUb0RvID0gKGluZGV4KSA9PiBfYXNzb2NpYXRlZFRvRG9zLnNwbGljZShpbmRleCwgMSlcblxuICAgIGNvbnN0IF9jcmVhdGVUb0Rvc09iamVjdCA9ICgpID0+IHtcblxuICAgICAgICBsZXQgVG9Eb3NPYmplY3QgPSB7fVxuXG4gICAgICAgIF9hc3NvY2lhdGVkVG9Eb3MuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgVG9Eb3NPYmplY3RbZS5nZXROYW1lKCldID0gZS5jcmVhdGVUb0RvT2JqZWN0KClcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gVG9Eb3NPYmplY3RcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0T2JqZWN0ID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IHByb2plY3RPYmplY3QgPSB7IFxuICAgICAgICAgICAgXCJuYW1lXCIgOiBnZXROYW1lKCksXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBnZXREZXNjcmlwdGlvbigpLFxuICAgICAgICAgICAgXCJhc3NvY2lhdGVkVG9Eb3NcIiA6IF9jcmVhdGVUb0Rvc09iamVjdCgpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvamVjdE9iamVjdFxuICAgIH1cblxuXG4gICAgcmV0dXJuIHtnZXROYW1lLFxuICAgICAgICAgICAgc2V0TmFtZSxcbiAgICAgICAgICAgIHNldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0RGVzY3JpcHRpb24sXG4gICAgICAgICAgICBnZXRUb0RvLFxuICAgICAgICAgICAgYWRkVG9EbyxcbiAgICAgICAgICAgIHJlbW92ZVRvRG8sXG4gICAgICAgICAgICBnZXRBbGxUb0RvcyxcbiAgICAgICAgICAgIGNyZWF0ZVByb2plY3RPYmplY3QsXG4gICAgICAgIH1cbn1cblxuIiwiZXhwb3J0IGNvbnN0IHN0b3JhZ2UgPSAoKCkgPT4ge1xuXG4gICAgY29uc3Qgc2F2ZU9iamVjdFRvU3RvcmFnZSA9IChrZXksIG9iamVjdCkgPT4ge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShvYmplY3QpKVxuICAgIH1cblxuICAgIGNvbnN0IGdldE9iamVjdEZyb21TdG9yYWdlID0gKGtleSkgPT4ge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHNhdmVPYmplY3RUb1N0b3JhZ2UsXG4gICAgICAgIGdldE9iamVjdEZyb21TdG9yYWdlXG4gICAgfVxuICAgIFxufSkoKTsiLCIvLyBGYWN0b3J5IGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIFRvRG9cblxuZXhwb3J0IGNvbnN0IFRvRG8gPSAobmFtZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHN0YXR1cykgPT4ge1xuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG4gICAgY29uc3Qgc2V0TmFtZSA9IChuZXdOYW1lKSA9PiBuYW1lID0gbmV3TmFtZTtcblxuICAgIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKCkgPT4gZGVzY3JpcHRpb247XG4gICAgY29uc3Qgc2V0RGVzY3JpcHRpb24gPSAobmV3RGVzY3JpcHRpb24pID0+IGRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG5cbiAgICBjb25zdCBnZXREdWVEYXRlID0gKCkgPT4gZHVlRGF0ZTtcbiAgICBjb25zdCBzZXREdWVEYXRlID0gKG5ld0R1ZURhdGUpID0+IGR1ZURhdGUgPSBuZXdEdWVEYXRlOyBcblxuICAgIGNvbnN0IGdldFN0YXR1cyA9ICgpID0+IHN0YXR1c1xuICAgIGNvbnN0IHRvZ2dsZVN0YXR1cyA9ICgpID0+IHN0YXR1cyA9IHN0YXR1cyA/IGZhbHNlIDogdHJ1ZTtcblxuICAgIGNvbnN0IGNyZWF0ZVRvRG9PYmplY3QgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHRvRG9PYmplY3QgPSB7XG4gICAgICAgICAgICBcIm5hbWVcIiA6IGdldE5hbWUoKSxcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IGdldERlc2NyaXB0aW9uKCksXG4gICAgICAgICAgICBcImR1ZURhdGVcIiA6IGdldER1ZURhdGUoKSxcbiAgICAgICAgICAgIFwic3RhdHVzXCIgOiBnZXRTdGF0dXMoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvRG9PYmplY3RcbiAgICB9XG5cbiAgICByZXR1cm4ge2dldE5hbWUsXG4gICAgICAgICAgICBzZXROYW1lLCBcbiAgICAgICAgICAgIHNldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0RGVzY3JpcHRpb24sXG4gICAgICAgICAgICBnZXREdWVEYXRlLFxuICAgICAgICAgICAgc2V0RHVlRGF0ZSxcbiAgICAgICAgICAgIGdldFN0YXR1cyxcbiAgICAgICAgICAgIHRvZ2dsZVN0YXR1cyxcbiAgICAgICAgICAgIGNyZWF0ZVRvRG9PYmplY3R9XG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVG9EbyB9IGZyb20gJy4vdG9kb3MvdG9kb3MuanMnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vUHJvamVjdHMvcHJvamVjdHMuanMnO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLmpzJ1xuXG5cblxuY29uc3QgbmV3UHJvamVjdCA9IFByb2plY3QoXCJTY2hvb2xcIiwgXCJ0aGlzIHByb2plY3QgaXMgZm9yIG9yZ2FuaXppbmcgbXkgc2Nob29sIHdvcmtcIik7XG5cbmNvbnN0IGZpcnN0VG9EbyA9IFRvRG8oXCJEbyBzb21ldGhpbmdcIiwgXCJHZXQgb24gbXkgTGV2ZWxcIiwgXCIxOC4xMC4yMDAwXCIsIGZhbHNlKVxuY29uc3Qgc2Vjb25kVG9EbyA9IFRvRG8oXCJEbyBzb21ldGhpbmcgZWxzZVwiLCBcIlNldCBvbiBteSBMZXZlbFwiLCBcIjEzLjEwLjIwMDBcIiwgZmFsc2UpXG5uZXdQcm9qZWN0LmFkZFRvRG8oZmlyc3RUb0RvKVxubmV3UHJvamVjdC5hZGRUb0RvKHNlY29uZFRvRG8pXG5cbmxldCB2YWxpZE9iamVjdCA9IG5ld1Byb2plY3QuY3JlYXRlUHJvamVjdE9iamVjdCgpO1xuXG5zdG9yYWdlLnNhdmVPYmplY3RUb1N0b3JhZ2UobmV3UHJvamVjdC5nZXROYW1lKCksIHZhbGlkT2JqZWN0KVxuXG5jb25zb2xlLmxvZyhzdG9yYWdlLmdldE9iamVjdEZyb21TdG9yYWdlKFwiU2Nob29sXCIpKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==