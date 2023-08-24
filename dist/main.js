/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI/samples.js":
/*!***************************!*\
  !*** ./src/UI/samples.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   samples: () => (/* binding */ samples)
/* harmony export */ });
const samples = (() => {

    let _projectDescriptionSample = "Click the button on the right to change the description!"

    const getProjectDescriptionSample = () => {
        return _projectDescriptionSample
    }

    return {
        getProjectDescriptionSample
    }
})();

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
/* harmony import */ var _todos_todos_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../todos/todos.js */ "./src/todos/todos.js");
/* harmony import */ var _projects_projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../projects/projects.js */ "./src/projects/projects.js");
/* harmony import */ var _storage_storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../storage/storage.js */ "./src/storage/storage.js");
/* harmony import */ var _samples_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./samples.js */ "./src/UI/samples.js");




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
//      ToDo: 
//              - write functions render Layout & render ToDos
//              - project array/object in seperate logic
//

const domManipulation = (() => {



    const addProject = (name, identifier) => {

        const projectDOM = document.getElementById('projects');

        let html = (`<section class="project${identifier}">
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
    
    
    const addMainLayout = (title, subTitle) => {

        let domTitle = document.querySelector(".heading.main");
        let domSubTitle = document.querySelector(".sub-heading.main");

        
        domTitle.textContent = title;
        domSubTitle.textContent = subTitle;

    }

    const renderToDos = (project) => {

    }


    return {
        addProject,
        removeProject,
        openProjectForm,
        addMainLayout
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

    let _projects = [];
    let _status = true;

    const buttonAddProjectListener = () => {

        let addProjectElement = document.getElementById("add-project")
        
        addProjectElement.addEventListener("click", () => { 

            // open form via dom module and set up event listener for submitting the form
            if (_status) { 
                domManipulation.openProjectForm();
                handleProjectFormSubmit();
                _status = false;
            } else return
        })
    }

    const handleProjectFormSubmit = () => {

        let formSection = document.getElementById("project-form-section")
        let form = document.getElementById("new-project-form");
        let input = document.querySelector(".project-form-input")

        form.addEventListener("submit", (e) => {
            
            e.preventDefault();
            formSection.remove()

            // make "+ Add Project" button available again
            _status = true;

            // add project only if name is not empty
            if (!input.value) return 
            else domManipulation.addProject(input.value, _projects.length + 1);
            console.log(_projects)
            console.log(_projects.length+1)

            // create Project "Factory" and save created Object in localstorage and _projects array
            let newProject = (0,_projects_projects_js__WEBPACK_IMPORTED_MODULE_1__.Project)(input.value, "")
            _projects.push(newProject);
            _storage_storage_js__WEBPACK_IMPORTED_MODULE_2__.storage.saveObjectToStorage(input.value, newProject.createProjectObject())

            
            // add event listener to corresponding navigation item
            let domProject = document.querySelector(`.project${_projects.length}`)

            //onclick populate main app section with project name and a sample description
            domProject.addEventListener("click", () => domManipulation.addMainLayout(newProject.getName(), _samples_js__WEBPACK_IMPORTED_MODULE_3__.samples.getProjectDescriptionSample() ))
        })
    }



    return {
        buttonAddProjectListener
    }
})();


/***/ }),

/***/ "./src/projects/projects.js":
/*!**********************************!*\
  !*** ./src/projects/projects.js ***!
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
/* harmony import */ var _projects_projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects/projects.js */ "./src/projects/projects.js");
/* harmony import */ var _storage_storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage/storage.js */ "./src/storage/storage.js");
/* harmony import */ var _UI_ui_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UI/ui.js */ "./src/UI/ui.js");





_UI_ui_js__WEBPACK_IMPORTED_MODULE_3__.eventListener.buttonAddProjectListener()




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWHdDO0FBQ1M7QUFDSDtBQUNSO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPOzs7O0FBSVA7O0FBRUE7O0FBRUEsOENBQThDLFdBQVc7QUFDekQ7QUFDQSwrQ0FBK0MsS0FBSztBQUNwRDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztBQU9EO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUM7QUFDRDs7Ozs7OztBQU9POztBQUVQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsOERBQU87QUFDcEM7QUFDQSxZQUFZLHdEQUFPOztBQUVuQjtBQUNBO0FBQ0EsK0RBQStELGlCQUFpQjs7QUFFaEY7QUFDQSwyR0FBMkcsZ0RBQU87QUFDbEgsU0FBUztBQUNUOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDaktEOztBQUVPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRE87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNmRDs7QUFFTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O1VDckNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOd0M7QUFDUztBQUNIO0FBQ3lCOztBQUV2RSxvREFBYTs7Ozs7QUFLYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9VSS9zYW1wbGVzLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9VSS91aS5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvcHJvamVjdHMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL3N0b3JhZ2Uvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvdG9kb3MvdG9kb3MuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBzYW1wbGVzID0gKCgpID0+IHtcblxuICAgIGxldCBfcHJvamVjdERlc2NyaXB0aW9uU2FtcGxlID0gXCJDbGljayB0aGUgYnV0dG9uIG9uIHRoZSByaWdodCB0byBjaGFuZ2UgdGhlIGRlc2NyaXB0aW9uIVwiXG5cbiAgICBjb25zdCBnZXRQcm9qZWN0RGVzY3JpcHRpb25TYW1wbGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBfcHJvamVjdERlc2NyaXB0aW9uU2FtcGxlXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0UHJvamVjdERlc2NyaXB0aW9uU2FtcGxlXG4gICAgfVxufSkoKTsiLCJpbXBvcnQgeyBUb0RvIH0gZnJvbSAnLi4vdG9kb3MvdG9kb3MuanMnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uL3Byb2plY3RzL3Byb2plY3RzLmpzJztcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICcuLi9zdG9yYWdlL3N0b3JhZ2UuanMnXG5pbXBvcnQgeyBzYW1wbGVzIH0gZnJvbSAnLi9zYW1wbGVzLmpzJztcbi8vICAgRnVuY3Rpb25hbGl0aWVzXG4vLyAgIFxuLy8gICAgIGFkZCBwcm9qZWN0IHRvIGRvbVxuLy8gICAgIGFkZCB0b2RvIHRvIGRvbVxuLy9cbi8vICAgICByZW1vdmUgcHJvamVjdCBmcm9tIGRvbVxuLy8gICAgIHJlbW92ZSB0b2RvIGZyb20gZG9tXG4vLyAgICAgXG4vLyAgICAgY2hhbmdlIGludGVyZmFjZSBiYXNlZCBvbiBuYXZpZ2F0aW9uXG4vLyAgICAgY2hhbmdlIGhpZ2hsaWdodGluZyBvZiBuYXZpZ2F0aW9uIGl0ZW1zXG4vL1xuLy9cbi8vICAgICAgVG9EbzogXG4vLyAgICAgICAgICAgICAgLSB3cml0ZSBmdW5jdGlvbnMgcmVuZGVyIExheW91dCAmIHJlbmRlciBUb0Rvc1xuLy8gICAgICAgICAgICAgIC0gcHJvamVjdCBhcnJheS9vYmplY3QgaW4gc2VwZXJhdGUgbG9naWNcbi8vXG5cbmV4cG9ydCBjb25zdCBkb21NYW5pcHVsYXRpb24gPSAoKCkgPT4ge1xuXG5cblxuICAgIGNvbnN0IGFkZFByb2plY3QgPSAobmFtZSwgaWRlbnRpZmllcikgPT4ge1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKTtcblxuICAgICAgICBsZXQgaHRtbCA9IChgPHNlY3Rpb24gY2xhc3M9XCJwcm9qZWN0JHtpZGVudGlmaWVyfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+VG9jPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2plY3RcIj4ke25hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5gKVxuXG4gICAgICAgIHByb2plY3RET00uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3Qgb3BlblByb2plY3RGb3JtID0gKCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKTtcblxuICAgICAgICBsZXQgaHRtbCA9IChgPHNlY3Rpb24gaWQ9XCJwcm9qZWN0LWZvcm0tc2VjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+dG9jPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gaWQ9XCJuZXctcHJvamVjdC1mb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwicHJvamVjdC1mb3JtLWlucHV0XCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5gKVxuXG4gICAgICAgIHByb2plY3RET00uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlUHJvamVjdCA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKClcbiAgICB9XG4gICAgXG4gICAgXG4gICAgY29uc3QgYWRkTWFpbkxheW91dCA9ICh0aXRsZSwgc3ViVGl0bGUpID0+IHtcblxuICAgICAgICBsZXQgZG9tVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRpbmcubWFpblwiKTtcbiAgICAgICAgbGV0IGRvbVN1YlRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWItaGVhZGluZy5tYWluXCIpO1xuXG4gICAgICAgIFxuICAgICAgICBkb21UaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgICBkb21TdWJUaXRsZS50ZXh0Q29udGVudCA9IHN1YlRpdGxlO1xuXG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyVG9Eb3MgPSAocHJvamVjdCkgPT4ge1xuXG4gICAgfVxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRQcm9qZWN0LFxuICAgICAgICByZW1vdmVQcm9qZWN0LFxuICAgICAgICBvcGVuUHJvamVjdEZvcm0sXG4gICAgICAgIGFkZE1haW5MYXlvdXRcbiAgICB9XG59KSgpO1xuXG5cblxuXG5cblxuLypcbmV4cG9ydCBjb25zdCBmb3JtTG9naWMgPSAoKCkgPT4ge1xuXG4gICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjbG9zZUZvcm1cbiAgICB9XG5cbn0pKCk7XG4qL1xuXG5cblxuXG5cblxuZXhwb3J0IGNvbnN0IGV2ZW50TGlzdGVuZXIgPSAoKCkgPT4ge1xuXG4gICAgbGV0IF9wcm9qZWN0cyA9IFtdO1xuICAgIGxldCBfc3RhdHVzID0gdHJ1ZTtcblxuICAgIGNvbnN0IGJ1dHRvbkFkZFByb2plY3RMaXN0ZW5lciA9ICgpID0+IHtcblxuICAgICAgICBsZXQgYWRkUHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0XCIpXG4gICAgICAgIFxuICAgICAgICBhZGRQcm9qZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyBcblxuICAgICAgICAgICAgLy8gb3BlbiBmb3JtIHZpYSBkb20gbW9kdWxlIGFuZCBzZXQgdXAgZXZlbnQgbGlzdGVuZXIgZm9yIHN1Ym1pdHRpbmcgdGhlIGZvcm1cbiAgICAgICAgICAgIGlmIChfc3RhdHVzKSB7IFxuICAgICAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5vcGVuUHJvamVjdEZvcm0oKTtcbiAgICAgICAgICAgICAgICBoYW5kbGVQcm9qZWN0Rm9ybVN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgIF9zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm5cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVQcm9qZWN0Rm9ybVN1Ym1pdCA9ICgpID0+IHtcblxuICAgICAgICBsZXQgZm9ybVNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZm9ybS1zZWN0aW9uXCIpXG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcHJvamVjdC1mb3JtXCIpO1xuICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtZm9ybS1pbnB1dFwiKVxuXG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBmb3JtU2VjdGlvbi5yZW1vdmUoKVxuXG4gICAgICAgICAgICAvLyBtYWtlIFwiKyBBZGQgUHJvamVjdFwiIGJ1dHRvbiBhdmFpbGFibGUgYWdhaW5cbiAgICAgICAgICAgIF9zdGF0dXMgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBhZGQgcHJvamVjdCBvbmx5IGlmIG5hbWUgaXMgbm90IGVtcHR5XG4gICAgICAgICAgICBpZiAoIWlucHV0LnZhbHVlKSByZXR1cm4gXG4gICAgICAgICAgICBlbHNlIGRvbU1hbmlwdWxhdGlvbi5hZGRQcm9qZWN0KGlucHV0LnZhbHVlLCBfcHJvamVjdHMubGVuZ3RoICsgMSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfcHJvamVjdHMpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfcHJvamVjdHMubGVuZ3RoKzEpXG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBQcm9qZWN0IFwiRmFjdG9yeVwiIGFuZCBzYXZlIGNyZWF0ZWQgT2JqZWN0IGluIGxvY2Fsc3RvcmFnZSBhbmQgX3Byb2plY3RzIGFycmF5XG4gICAgICAgICAgICBsZXQgbmV3UHJvamVjdCA9IFByb2plY3QoaW5wdXQudmFsdWUsIFwiXCIpXG4gICAgICAgICAgICBfcHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2F2ZU9iamVjdFRvU3RvcmFnZShpbnB1dC52YWx1ZSwgbmV3UHJvamVjdC5jcmVhdGVQcm9qZWN0T2JqZWN0KCkpXG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGNvcnJlc3BvbmRpbmcgbmF2aWdhdGlvbiBpdGVtXG4gICAgICAgICAgICBsZXQgZG9tUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wcm9qZWN0JHtfcHJvamVjdHMubGVuZ3RofWApXG5cbiAgICAgICAgICAgIC8vb25jbGljayBwb3B1bGF0ZSBtYWluIGFwcCBzZWN0aW9uIHdpdGggcHJvamVjdCBuYW1lIGFuZCBhIHNhbXBsZSBkZXNjcmlwdGlvblxuICAgICAgICAgICAgZG9tUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZG9tTWFuaXB1bGF0aW9uLmFkZE1haW5MYXlvdXQobmV3UHJvamVjdC5nZXROYW1lKCksIHNhbXBsZXMuZ2V0UHJvamVjdERlc2NyaXB0aW9uU2FtcGxlKCkgKSlcbiAgICAgICAgfSlcbiAgICB9XG5cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYnV0dG9uQWRkUHJvamVjdExpc3RlbmVyXG4gICAgfVxufSkoKTtcbiIsIi8vIEZhY3RvcnkgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgUHJvamVjdFxuXG5leHBvcnQgY29uc3QgUHJvamVjdCA9IChuYW1lLCBkZXNjcmlwdGlvbikgPT4ge1xuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG4gICAgY29uc3Qgc2V0TmFtZSA9IChuZXdOYW1lKSA9PiBuYW1lID0gbmV3TmFtZTtcblxuICAgIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKCkgPT4gZGVzY3JpcHRpb247XG4gICAgY29uc3Qgc2V0RGVzY3JpcHRpb24gPSAobmV3RGVzY3JpcHRpb24pID0+IGRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG5cbiAgICBsZXQgX2Fzc29jaWF0ZWRUb0RvcyA9IFtdO1xuXG4gICAgY29uc3QgZ2V0VG9EbyA9IChpbmRleCkgPT4gX2Fzc29jaWF0ZWRUb0Rvc1tpbmRleF07XG4gICAgY29uc3QgZ2V0QWxsVG9Eb3MgPSAoKSA9PiBfYXNzb2NpYXRlZFRvRG9zO1xuXG4gICAgY29uc3QgYWRkVG9EbyA9IChvYmplY3QpID0+IF9hc3NvY2lhdGVkVG9Eb3MucHVzaChvYmplY3QpXG4gICAgY29uc3QgcmVtb3ZlVG9EbyA9IChpbmRleCkgPT4gX2Fzc29jaWF0ZWRUb0Rvcy5zcGxpY2UoaW5kZXgsIDEpXG5cbiAgICBjb25zdCBfY3JlYXRlVG9Eb3NPYmplY3QgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IFRvRG9zT2JqZWN0ID0ge31cblxuICAgICAgICBfYXNzb2NpYXRlZFRvRG9zLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgICAgIFRvRG9zT2JqZWN0W2UuZ2V0TmFtZSgpXSA9IGUuY3JlYXRlVG9Eb09iamVjdCgpXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIFRvRG9zT2JqZWN0XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlUHJvamVjdE9iamVjdCA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBwcm9qZWN0T2JqZWN0ID0geyBcbiAgICAgICAgICAgIFwibmFtZVwiIDogZ2V0TmFtZSgpLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogZ2V0RGVzY3JpcHRpb24oKSxcbiAgICAgICAgICAgIFwiYXNzb2NpYXRlZFRvRG9zXCIgOiBfY3JlYXRlVG9Eb3NPYmplY3QoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb2plY3RPYmplY3RcbiAgICB9XG5cblxuICAgIHJldHVybiB7Z2V0TmFtZSxcbiAgICAgICAgICAgIHNldE5hbWUsXG4gICAgICAgICAgICBzZXREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGdldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0VG9EbyxcbiAgICAgICAgICAgIGFkZFRvRG8sXG4gICAgICAgICAgICByZW1vdmVUb0RvLFxuICAgICAgICAgICAgZ2V0QWxsVG9Eb3MsXG4gICAgICAgICAgICBjcmVhdGVQcm9qZWN0T2JqZWN0LFxuICAgICAgICB9XG59XG5cbiIsImV4cG9ydCBjb25zdCBzdG9yYWdlID0gKCgpID0+IHtcblxuICAgIGNvbnN0IHNhdmVPYmplY3RUb1N0b3JhZ2UgPSAoa2V5LCBvYmplY3QpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkob2JqZWN0KSlcbiAgICB9XG5cbiAgICBjb25zdCBnZXRPYmplY3RGcm9tU3RvcmFnZSA9IChrZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSlcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzYXZlT2JqZWN0VG9TdG9yYWdlLFxuICAgICAgICBnZXRPYmplY3RGcm9tU3RvcmFnZVxuICAgIH1cbiAgICBcbn0pKCk7IiwiLy8gRmFjdG9yeSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBUb0RvXG5cbmV4cG9ydCBjb25zdCBUb0RvID0gKG5hbWUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBzdGF0dXMpID0+IHtcblxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBuYW1lO1xuICAgIGNvbnN0IHNldE5hbWUgPSAobmV3TmFtZSkgPT4gbmFtZSA9IG5ld05hbWU7XG5cbiAgICBjb25zdCBnZXREZXNjcmlwdGlvbiA9ICgpID0+IGRlc2NyaXB0aW9uO1xuICAgIGNvbnN0IHNldERlc2NyaXB0aW9uID0gKG5ld0Rlc2NyaXB0aW9uKSA9PiBkZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuXG4gICAgY29uc3QgZ2V0RHVlRGF0ZSA9ICgpID0+IGR1ZURhdGU7XG4gICAgY29uc3Qgc2V0RHVlRGF0ZSA9IChuZXdEdWVEYXRlKSA9PiBkdWVEYXRlID0gbmV3RHVlRGF0ZTsgXG5cbiAgICBjb25zdCBnZXRTdGF0dXMgPSAoKSA9PiBzdGF0dXNcbiAgICBjb25zdCB0b2dnbGVTdGF0dXMgPSAoKSA9PiBzdGF0dXMgPSBzdGF0dXMgPyBmYWxzZSA6IHRydWU7XG5cbiAgICBjb25zdCBjcmVhdGVUb0RvT2JqZWN0ID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCB0b0RvT2JqZWN0ID0ge1xuICAgICAgICAgICAgXCJuYW1lXCIgOiBnZXROYW1lKCksXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBnZXREZXNjcmlwdGlvbigpLFxuICAgICAgICAgICAgXCJkdWVEYXRlXCIgOiBnZXREdWVEYXRlKCksXG4gICAgICAgICAgICBcInN0YXR1c1wiIDogZ2V0U3RhdHVzKClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b0RvT2JqZWN0XG4gICAgfVxuXG4gICAgcmV0dXJuIHtnZXROYW1lLFxuICAgICAgICAgICAgc2V0TmFtZSwgXG4gICAgICAgICAgICBzZXREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGdldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0RHVlRGF0ZSxcbiAgICAgICAgICAgIHNldER1ZURhdGUsXG4gICAgICAgICAgICBnZXRTdGF0dXMsXG4gICAgICAgICAgICB0b2dnbGVTdGF0dXMsXG4gICAgICAgICAgICBjcmVhdGVUb0RvT2JqZWN0fVxufVxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFRvRG8gfSBmcm9tICcuL3RvZG9zL3RvZG9zLmpzJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3RzL3Byb2plY3RzLmpzJztcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZS5qcydcbmltcG9ydCB7IGRvbU1hbmlwdWxhdGlvbiwgZXZlbnRMaXN0ZW5lciwgZm9ybUxvZ2ljIH0gZnJvbSAnLi9VSS91aS5qcyc7XG5cbmV2ZW50TGlzdGVuZXIuYnV0dG9uQWRkUHJvamVjdExpc3RlbmVyKClcblxuXG5cblxuLy9kb21NYW5pcHVsYXRpb24ucmVtb3ZlUHJvamVjdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKSlcblxuLypcbmNvbnN0IG5ld1Byb2plY3QgPSBQcm9qZWN0KFwiU2Nob29sXCIsIFwidGhpcyBwcm9qZWN0IGlzIGZvciBvcmdhbml6aW5nIG15IHNjaG9vbCB3b3JrXCIpO1xuXG5jb25zdCBmaXJzdFRvRG8gPSBUb0RvKFwiRG8gc29tZXRoaW5nXCIsIFwiR2V0IG9uIG15IExldmVsXCIsIFwiMTguMTAuMjAwMFwiLCBmYWxzZSlcbmNvbnN0IHNlY29uZFRvRG8gPSBUb0RvKFwiRG8gc29tZXRoaW5nIGVsc2VcIiwgXCJTZXQgb24gbXkgTGV2ZWxcIiwgXCIxMy4xMC4yMDAwXCIsIGZhbHNlKVxubmV3UHJvamVjdC5hZGRUb0RvKGZpcnN0VG9Ebylcbm5ld1Byb2plY3QuYWRkVG9EbyhzZWNvbmRUb0RvKVxuXG5sZXQgdmFsaWRPYmplY3QgPSBuZXdQcm9qZWN0LmNyZWF0ZVByb2plY3RPYmplY3QoKTtcblxuc3RvcmFnZS5zYXZlT2JqZWN0VG9TdG9yYWdlKG5ld1Byb2plY3QuZ2V0TmFtZSgpLCB2YWxpZE9iamVjdClcblxuY29uc29sZS5sb2coc3RvcmFnZS5nZXRPYmplY3RGcm9tU3RvcmFnZShcIlNjaG9vbFwiKSlcbiovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9