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

/***/ "./src/UI/ui.js":
/*!**********************!*\
  !*** ./src/UI/ui.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   domManipulation: () => (/* binding */ domManipulation),
/* harmony export */   eventListener: () => (/* binding */ eventListener)
/* harmony export */ });
//   Functionalities
//   
//     add project to dom
//     add todo to dom
//
//     remove project from dom
//     remove todo from dom
//     
//     change interface based on navigation
//     change highlighting of navigation items
//
//

const domManipulation = (() => {



    const addProject = (name) => {

        const projectDOM = document.getElementById('projects');

        let html = (`<section>
                        <span class="material-symbols-outlined">Toc</span>
                        <div class="project">${name}</div>
                    </section>`)

        projectDOM.insertAdjacentHTML("beforeend", html)
    }

    const openProjectForm = () => {

        const projectDOM = document.getElementById('projects');

        let html = (`<section id="project-form-section">
                        <span class="material-symbols-outlined">toc</span>
                        <form id="new-project-form">
                            <input class="project-form-input" type="text">
                        </form>
                     </section>`)

        projectDOM.insertAdjacentHTML("beforeend", html)
    }

    const removeProject = (element) => {
        element.remove()
    }

    return {
        addProject,
        removeProject,
        openProjectForm
    }
})();






/*
export const formLogic = (() => {

    

    return {
        closeForm
    }

})();
*/






const eventListener = (() => {

    let status = true;

    const addProjectListener = () => {

        const toggleStatus = () => status ? false : true;
        let addProjectElement = document.getElementById("add-project")
        
        addProjectElement.addEventListener("click", () => { 

            if (status) { 
                domManipulation.openProjectForm();
                handleFormSubmit();
                status = false;
            } else return
        })
    }

    const handleFormSubmit = () => {

        let formSection = document.getElementById("project-form-section")
        let form = document.getElementById("new-project-form");
        let input = document.querySelector(".project-form-input")

        form.addEventListener("submit", (e) => {
            
            e.preventDefault();
            formSection.remove()

            // make "+ Add Project" button available again
            status = true;

            // add project only if name is not empty
            if (!input.value) return 
            else domManipulation.addProject(input.value);
        })
    }



    return {
        addProjectListener
    }
})();


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
/* harmony import */ var _UI_ui_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UI/ui.js */ "./src/UI/ui.js");





_UI_ui_js__WEBPACK_IMPORTED_MODULE_3__.eventListener.addProjectListener()




//domManipulation.removeProject(document.getElementById('projects'))

/*
const newProject = Project("School", "this project is for organizing my school work");

const firstToDo = ToDo("Do something", "Get on my Level", "18.10.2000", false)
const secondToDo = ToDo("Do something else", "Set on my Level", "13.10.2000", false)
newProject.addToDo(firstToDo)
newProject.addToDo(secondToDo)

let validObject = newProject.createProjectObject();

storage.saveObjectToStorage(newProject.getName(), validObject)

console.log(storage.getObjectFromStorage("School"))
*/
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTzs7OztBQUlQOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwrQ0FBK0MsS0FBSztBQUNwRDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztBQU9EO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUM7QUFDRDs7Ozs7OztBQU9POztBQUVQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUN4SE07O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNmRDs7QUFFTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O1VDckNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOd0M7QUFDUztBQUNIO0FBQ3lCOztBQUV2RSxvREFBYTs7Ozs7QUFLYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9Qcm9qZWN0cy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvVUkvdWkuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL3N0b3JhZ2Uvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvdG9kb3MvdG9kb3MuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEZhY3RvcnkgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgUHJvamVjdFxuXG5leHBvcnQgY29uc3QgUHJvamVjdCA9IChuYW1lLCBkZXNjcmlwdGlvbikgPT4ge1xuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG4gICAgY29uc3Qgc2V0TmFtZSA9IChuZXdOYW1lKSA9PiBuYW1lID0gbmV3TmFtZTtcblxuICAgIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKCkgPT4gZGVzY3JpcHRpb247XG4gICAgY29uc3Qgc2V0RGVzY3JpcHRpb24gPSAobmV3RGVzY3JpcHRpb24pID0+IGRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG5cbiAgICBsZXQgX2Fzc29jaWF0ZWRUb0RvcyA9IFtdO1xuXG4gICAgY29uc3QgZ2V0VG9EbyA9IChpbmRleCkgPT4gX2Fzc29jaWF0ZWRUb0Rvc1tpbmRleF07XG4gICAgY29uc3QgZ2V0QWxsVG9Eb3MgPSAoKSA9PiBfYXNzb2NpYXRlZFRvRG9zO1xuXG4gICAgY29uc3QgYWRkVG9EbyA9IChvYmplY3QpID0+IF9hc3NvY2lhdGVkVG9Eb3MucHVzaChvYmplY3QpXG4gICAgY29uc3QgcmVtb3ZlVG9EbyA9IChpbmRleCkgPT4gX2Fzc29jaWF0ZWRUb0Rvcy5zcGxpY2UoaW5kZXgsIDEpXG5cbiAgICBjb25zdCBfY3JlYXRlVG9Eb3NPYmplY3QgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IFRvRG9zT2JqZWN0ID0ge31cblxuICAgICAgICBfYXNzb2NpYXRlZFRvRG9zLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgICAgIFRvRG9zT2JqZWN0W2UuZ2V0TmFtZSgpXSA9IGUuY3JlYXRlVG9Eb09iamVjdCgpXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIFRvRG9zT2JqZWN0XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlUHJvamVjdE9iamVjdCA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBwcm9qZWN0T2JqZWN0ID0geyBcbiAgICAgICAgICAgIFwibmFtZVwiIDogZ2V0TmFtZSgpLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogZ2V0RGVzY3JpcHRpb24oKSxcbiAgICAgICAgICAgIFwiYXNzb2NpYXRlZFRvRG9zXCIgOiBfY3JlYXRlVG9Eb3NPYmplY3QoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb2plY3RPYmplY3RcbiAgICB9XG5cblxuICAgIHJldHVybiB7Z2V0TmFtZSxcbiAgICAgICAgICAgIHNldE5hbWUsXG4gICAgICAgICAgICBzZXREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGdldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0VG9EbyxcbiAgICAgICAgICAgIGFkZFRvRG8sXG4gICAgICAgICAgICByZW1vdmVUb0RvLFxuICAgICAgICAgICAgZ2V0QWxsVG9Eb3MsXG4gICAgICAgICAgICBjcmVhdGVQcm9qZWN0T2JqZWN0LFxuICAgICAgICB9XG59XG5cbiIsIi8vICAgRnVuY3Rpb25hbGl0aWVzXG4vLyAgIFxuLy8gICAgIGFkZCBwcm9qZWN0IHRvIGRvbVxuLy8gICAgIGFkZCB0b2RvIHRvIGRvbVxuLy9cbi8vICAgICByZW1vdmUgcHJvamVjdCBmcm9tIGRvbVxuLy8gICAgIHJlbW92ZSB0b2RvIGZyb20gZG9tXG4vLyAgICAgXG4vLyAgICAgY2hhbmdlIGludGVyZmFjZSBiYXNlZCBvbiBuYXZpZ2F0aW9uXG4vLyAgICAgY2hhbmdlIGhpZ2hsaWdodGluZyBvZiBuYXZpZ2F0aW9uIGl0ZW1zXG4vL1xuLy9cblxuZXhwb3J0IGNvbnN0IGRvbU1hbmlwdWxhdGlvbiA9ICgoKSA9PiB7XG5cblxuXG4gICAgY29uc3QgYWRkUHJvamVjdCA9IChuYW1lKSA9PiB7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdERPTSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cycpO1xuXG4gICAgICAgIGxldCBodG1sID0gKGA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPlRvYzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9qZWN0XCI+JHtuYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+YClcblxuICAgICAgICBwcm9qZWN0RE9NLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBodG1sKVxuICAgIH1cblxuICAgIGNvbnN0IG9wZW5Qcm9qZWN0Rm9ybSA9ICgpID0+IHtcblxuICAgICAgICBjb25zdCBwcm9qZWN0RE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzJyk7XG5cbiAgICAgICAgbGV0IGh0bWwgPSAoYDxzZWN0aW9uIGlkPVwicHJvamVjdC1mb3JtLXNlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPnRvYzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIGlkPVwibmV3LXByb2plY3QtZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInByb2plY3QtZm9ybS1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+YClcblxuICAgICAgICBwcm9qZWN0RE9NLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBodG1sKVxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZVByb2plY3QgPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LnJlbW92ZSgpXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkUHJvamVjdCxcbiAgICAgICAgcmVtb3ZlUHJvamVjdCxcbiAgICAgICAgb3BlblByb2plY3RGb3JtXG4gICAgfVxufSkoKTtcblxuXG5cblxuXG5cbi8qXG5leHBvcnQgY29uc3QgZm9ybUxvZ2ljID0gKCgpID0+IHtcblxuICAgIFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2xvc2VGb3JtXG4gICAgfVxuXG59KSgpO1xuKi9cblxuXG5cblxuXG5cbmV4cG9ydCBjb25zdCBldmVudExpc3RlbmVyID0gKCgpID0+IHtcblxuICAgIGxldCBzdGF0dXMgPSB0cnVlO1xuXG4gICAgY29uc3QgYWRkUHJvamVjdExpc3RlbmVyID0gKCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRvZ2dsZVN0YXR1cyA9ICgpID0+IHN0YXR1cyA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgbGV0IGFkZFByb2plY3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtcHJvamVjdFwiKVxuICAgICAgICBcbiAgICAgICAgYWRkUHJvamVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgXG5cbiAgICAgICAgICAgIGlmIChzdGF0dXMpIHsgXG4gICAgICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLm9wZW5Qcm9qZWN0Rm9ybSgpO1xuICAgICAgICAgICAgICAgIGhhbmRsZUZvcm1TdWJtaXQoKTtcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm5cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVGb3JtU3VibWl0ID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBmb3JtU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtLXNlY3Rpb25cIilcbiAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1wcm9qZWN0LWZvcm1cIik7XG4gICAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1mb3JtLWlucHV0XCIpXG5cbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGZvcm1TZWN0aW9uLnJlbW92ZSgpXG5cbiAgICAgICAgICAgIC8vIG1ha2UgXCIrIEFkZCBQcm9qZWN0XCIgYnV0dG9uIGF2YWlsYWJsZSBhZ2FpblxuICAgICAgICAgICAgc3RhdHVzID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gYWRkIHByb2plY3Qgb25seSBpZiBuYW1lIGlzIG5vdCBlbXB0eVxuICAgICAgICAgICAgaWYgKCFpbnB1dC52YWx1ZSkgcmV0dXJuIFxuICAgICAgICAgICAgZWxzZSBkb21NYW5pcHVsYXRpb24uYWRkUHJvamVjdChpbnB1dC52YWx1ZSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZFByb2plY3RMaXN0ZW5lclxuICAgIH1cbn0pKCk7XG4iLCJleHBvcnQgY29uc3Qgc3RvcmFnZSA9ICgoKSA9PiB7XG5cbiAgICBjb25zdCBzYXZlT2JqZWN0VG9TdG9yYWdlID0gKGtleSwgb2JqZWN0KSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KG9iamVjdCkpXG4gICAgfVxuXG4gICAgY29uc3QgZ2V0T2JqZWN0RnJvbVN0b3JhZ2UgPSAoa2V5KSA9PiB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2F2ZU9iamVjdFRvU3RvcmFnZSxcbiAgICAgICAgZ2V0T2JqZWN0RnJvbVN0b3JhZ2VcbiAgICB9XG4gICAgXG59KSgpOyIsIi8vIEZhY3RvcnkgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgVG9Eb1xuXG5leHBvcnQgY29uc3QgVG9EbyA9IChuYW1lLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgc3RhdHVzKSA9PiB7XG5cbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgICBjb25zdCBzZXROYW1lID0gKG5ld05hbWUpID0+IG5hbWUgPSBuZXdOYW1lO1xuXG4gICAgY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAoKSA9PiBkZXNjcmlwdGlvbjtcbiAgICBjb25zdCBzZXREZXNjcmlwdGlvbiA9IChuZXdEZXNjcmlwdGlvbikgPT4gZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcblxuICAgIGNvbnN0IGdldER1ZURhdGUgPSAoKSA9PiBkdWVEYXRlO1xuICAgIGNvbnN0IHNldER1ZURhdGUgPSAobmV3RHVlRGF0ZSkgPT4gZHVlRGF0ZSA9IG5ld0R1ZURhdGU7IFxuXG4gICAgY29uc3QgZ2V0U3RhdHVzID0gKCkgPT4gc3RhdHVzXG4gICAgY29uc3QgdG9nZ2xlU3RhdHVzID0gKCkgPT4gc3RhdHVzID0gc3RhdHVzID8gZmFsc2UgOiB0cnVlO1xuXG4gICAgY29uc3QgY3JlYXRlVG9Eb09iamVjdCA9ICgpID0+IHtcblxuICAgICAgICBsZXQgdG9Eb09iamVjdCA9IHtcbiAgICAgICAgICAgIFwibmFtZVwiIDogZ2V0TmFtZSgpLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogZ2V0RGVzY3JpcHRpb24oKSxcbiAgICAgICAgICAgIFwiZHVlRGF0ZVwiIDogZ2V0RHVlRGF0ZSgpLFxuICAgICAgICAgICAgXCJzdGF0dXNcIiA6IGdldFN0YXR1cygpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9Eb09iamVjdFxuICAgIH1cblxuICAgIHJldHVybiB7Z2V0TmFtZSxcbiAgICAgICAgICAgIHNldE5hbWUsIFxuICAgICAgICAgICAgc2V0RGVzY3JpcHRpb24sXG4gICAgICAgICAgICBnZXREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGdldER1ZURhdGUsXG4gICAgICAgICAgICBzZXREdWVEYXRlLFxuICAgICAgICAgICAgZ2V0U3RhdHVzLFxuICAgICAgICAgICAgdG9nZ2xlU3RhdHVzLFxuICAgICAgICAgICAgY3JlYXRlVG9Eb09iamVjdH1cbn1cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBUb0RvIH0gZnJvbSAnLi90b2Rvcy90b2Rvcy5qcyc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9Qcm9qZWN0cy9wcm9qZWN0cy5qcyc7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2UuanMnXG5pbXBvcnQgeyBkb21NYW5pcHVsYXRpb24sIGV2ZW50TGlzdGVuZXIsIGZvcm1Mb2dpYyB9IGZyb20gJy4vVUkvdWkuanMnO1xuXG5ldmVudExpc3RlbmVyLmFkZFByb2plY3RMaXN0ZW5lcigpXG5cblxuXG5cbi8vZG9tTWFuaXB1bGF0aW9uLnJlbW92ZVByb2plY3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzJykpXG5cbi8qXG5jb25zdCBuZXdQcm9qZWN0ID0gUHJvamVjdChcIlNjaG9vbFwiLCBcInRoaXMgcHJvamVjdCBpcyBmb3Igb3JnYW5pemluZyBteSBzY2hvb2wgd29ya1wiKTtcblxuY29uc3QgZmlyc3RUb0RvID0gVG9EbyhcIkRvIHNvbWV0aGluZ1wiLCBcIkdldCBvbiBteSBMZXZlbFwiLCBcIjE4LjEwLjIwMDBcIiwgZmFsc2UpXG5jb25zdCBzZWNvbmRUb0RvID0gVG9EbyhcIkRvIHNvbWV0aGluZyBlbHNlXCIsIFwiU2V0IG9uIG15IExldmVsXCIsIFwiMTMuMTAuMjAwMFwiLCBmYWxzZSlcbm5ld1Byb2plY3QuYWRkVG9EbyhmaXJzdFRvRG8pXG5uZXdQcm9qZWN0LmFkZFRvRG8oc2Vjb25kVG9EbylcblxubGV0IHZhbGlkT2JqZWN0ID0gbmV3UHJvamVjdC5jcmVhdGVQcm9qZWN0T2JqZWN0KCk7XG5cbnN0b3JhZ2Uuc2F2ZU9iamVjdFRvU3RvcmFnZShuZXdQcm9qZWN0LmdldE5hbWUoKSwgdmFsaWRPYmplY3QpXG5cbmNvbnNvbGUubG9nKHN0b3JhZ2UuZ2V0T2JqZWN0RnJvbVN0b3JhZ2UoXCJTY2hvb2xcIikpXG4qLyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==