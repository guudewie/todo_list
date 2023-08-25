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
/* harmony import */ var _projects_project_storage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../projects/project_storage.js */ "./src/projects/project_storage.js");





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



    const addProject = (name) => {

        const projectDOM = document.getElementById('projects');

        let html = (`<section class="project">
                        <span class="material-symbols-outlined">Toc</span>
                        <div class="project">${name}</div>
                    </section>`)

        projectDOM.insertAdjacentHTML("beforeend", html)
    }

    const openAddProjectForm = () => {

        const projectDOM = document.getElementById('projects');

        let html = (`<section id="project-form-section">
                        <span class="material-symbols-outlined">toc</span>
                        <form id="new-project-form">
                            <input class="project-form-input" type="text">
                        </form>
                     </section>`)

        projectDOM.insertAdjacentHTML("beforeend", html)
    }

    const closeAddProjectForm = () => {

        let addProjectFormDom = document.querySelector("section#project-form-section")
        addProjectFormDom.remove()
    }

    const openEditProjectForm = (projectObject) => {

        const titleDescriptionContainer = document.querySelector(".container.title-description")
        const projectTitleDom = document.querySelector(".heading.main")
        const projectDescriptionDom = document.querySelector(".sub-heading.main");
        
        projectTitleDom.remove()
        projectDescriptionDom.remove()

        let html = (`<form id="edit-project-form">
                        <input class="heading main form" value="${projectObject.getName()}" type="text">
                        <input class="sub-heading main form" placeholder="${projectObject.getDescription()}" type="text">
                        <input type="submit">
                    </form>`)

        titleDescriptionContainer.insertAdjacentHTML("beforebegin", html)
    }

    const openAddToDoForm = () => {

        let mainAnker = document.querySelector("section.todo-main");

        let html = `<div class="todo-container" id="add-todo-form-container">
                        <form id="add-todo-form">
                            <input type="text" class="todo-name">
                            <div class="associated-project"></div>
                            <div class="todo-icons">
                                <input type="date" class="todo-date">
                                <span class="material-symbols-outlined todo">check_box_outline_blank</span>
                                <span class="material-symbols-outlined todo">edit</span>
                                <span class="material-symbols-outlined todo">delete</span>
                            </div>
                            <input type="submit">
                        </form>
                    </div>`
        
        mainAnker.insertAdjacentHTML("beforeend", html)
    }

    const closeAddToDoForm = () => {

        let addTodoFormDom = document.getElementById("add-todo-form-container")
        addTodoFormDom.remove()
    }

    const closeEditProjectForm = () => {

        let editProjectFormDom = document.querySelector("form#edit-project-form")
        editProjectFormDom.remove()
    }

    const removeProject = (element) => {
        element.remove()
    }
    
    
    const populateMainLayout = (title, subTitle) => {

        let domTitle = document.querySelector(".heading.main");
        let domSubTitle = document.querySelector(".sub-heading.main");

        
        domTitle.textContent = title;
        domSubTitle.textContent = subTitle;
    }

    const addMainLayout = () => {
        
        let mainAnker = document.querySelector("div.container-main")
        let html = `<div class="container title-description">
                        <div class="heading main"></div>
                        <div class="sub-heading main"></div>
                    </div>`

        mainAnker.insertAdjacentHTML("afterbegin", html)
    }

    const renderToDos = (project) => {

        let toDoArray = project.getAllToDos();

        toDoArray.forEach(toDo => {
            
            let mainAnker = document.querySelector("section.todo-main")

            let toDoName = toDo.getName();
            let toDoDate = toDo.getDueDate();
            let toDoCheck = toDo.getStatus();
            let checkIcon = toDoCheck ? "check_box" : "check_box_outline_blank"

            let html = `<div class="todo-container">
                        <div class="todo-name">${toDoName}</div>
                        <div class="associated-project"></div>
                        <div class="todo-icons">
                            <div class="todo-date">${toDoDate}</div>
                            <span class="material-symbols-outlined todo">${checkIcon}</span>
                            <span class="material-symbols-outlined todo">edit</span>
                            <span class="material-symbols-outlined todo">delete</span>
                        </div>
                    </div>`

            mainAnker.insertAdjacentHTML("beforeend", html)
            
        });
    }

    const renderOneToDo = (toDo) => {
        
        let mainAnker = document.querySelector("section.todo-main")

        let toDoName = toDo.getName();
        let toDoDate = toDo.getDueDate();
        let toDoCheck = toDo.getStatus();
        let checkIcon = toDoCheck ? "check_box" : "check_box_outline_blank"

        let html = `<div class="todo-container">
                    <div class="todo-name">${toDoName}</div>
                    <div class="associated-project"></div>
                    <div class="todo-icons">
                        <div class="todo-date">${toDoDate}</div>
                        <span class="material-symbols-outlined todo">${checkIcon}</span>
                        <span class="material-symbols-outlined todo">edit</span>
                        <span class="material-symbols-outlined todo">delete</span>
                    </div>
                </div>`

        mainAnker.insertAdjacentHTML("beforeend", html)
    }


    return {
        addProject,
        removeProject,
        openAddProjectForm,
        closeAddProjectForm,
        populateMainLayout,
        addMainLayout,
        openEditProjectForm,
        openAddToDoForm,
        closeAddToDoForm,
        closeEditProjectForm,
        renderToDos,
        renderOneToDo
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
    let _currentProject;
    let _status = true;

    const setStatus = (value) => {
        _status = value
    }

    const buttonAddProjectListener = () => {

        let addProjectElement = document.getElementById("add-project")
        
        addProjectElement.addEventListener("click", () => { 

            // open form via dom module and set up event listener for submitting the form
            if (_status) { 
                domManipulation.openAddProjectForm();
                handleProjectFormSubmit();
                setStatus(false)
            } else return
        })
    }

    const buttonAddToDoListener = () => {

        let addToDoElement = document.getElementById("add-to-do")
        
        addToDoElement.addEventListener("click", () => { 

            // open form via dom module and set up event listener for submitting the form
            if (_status) { 
                domManipulation.openAddToDoForm();
                handleToDoFormSubmit();
                setStatus(false);
            } else return
        })

    }

    const handleToDoFormSubmit = () => {

        let form = document.getElementById("add-todo-form-container");
        let todoName = document.querySelector("input.todo-name");
        let todoDate = document.querySelector("input.todo-date");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            domManipulation.closeAddToDoForm();

            console.log(todoName.value)
            console.log(todoDate.value)

            // create ToDo object
            let newToDo = (0,_todos_todos_js__WEBPACK_IMPORTED_MODULE_0__.ToDo)(todoName.value, "", todoDate.value, false);
            
            // safe todo in assosiated project
            _projects_project_storage_js__WEBPACK_IMPORTED_MODULE_4__.projectObjectStorage.getCurrentProject().addToDo(newToDo)

            // Make any button available again
            setStatus(true)

            // RENDER TODOS
            //   - Add event listeners to buttons
            domManipulation.renderOneToDo(newToDo)

        })
    }



    const handleProjectFormSubmit = () => {

        let form = document.getElementById("new-project-form");
        let input = document.querySelector(".project-form-input");

        form.addEventListener("submit", (e) => {
            
            e.preventDefault();
            domManipulation.closeAddProjectForm()

            // make any edit button available again
            setStatus(true)

            // add project only if name is not empty
            if (!input.value) return 
            else domManipulation.addProject(input.value);

            // create Project "Factory" with input value and sample description and save created Object in localstorage and _projects array
            let newProject = (0,_projects_projects_js__WEBPACK_IMPORTED_MODULE_1__.Project)(input.value, _samples_js__WEBPACK_IMPORTED_MODULE_3__.samples.getProjectDescriptionSample())
            _projects_project_storage_js__WEBPACK_IMPORTED_MODULE_4__.projectObjectStorage.addProjectObject(newProject.getName(), newProject);

            _projects_project_storage_js__WEBPACK_IMPORTED_MODULE_4__.projectObjectStorage.setCurrentProject(newProject)

            _storage_storage_js__WEBPACK_IMPORTED_MODULE_2__.storage.saveObjectToStorage(input.value, newProject.createProjectObject())

            // add event listener to corresponding navigation item
            let domProject = document.querySelector(`section.project:last-child`)
            
            domProject.addEventListener("click", () => {
                domManipulation.populateMainLayout(newProject.getName(), newProject.getDescription())
                _projects_project_storage_js__WEBPACK_IMPORTED_MODULE_4__.projectObjectStorage.setCurrentProject(newProject)
            })
            
            //poulate main section with corresponding project information
            domManipulation.populateMainLayout(newProject.getName(), newProject.getDescription())


            // add event listeners to icons to delete and change a project
            let _projectEditIcon = document.querySelector(".material-symbols-outlined.project-edit")
            let _projectDeleteIcon = document.querySelector(".material-symbols-outlined.project-delete")


            _projectEditIcon.addEventListener("click", () => {

                if (_status) { 
                    domManipulation.openEditProjectForm(_projects_project_storage_js__WEBPACK_IMPORTED_MODULE_4__.projectObjectStorage.getCurrentProject())
                    setStatus(false)
                    handleProjectEditFormSubmit(_projects_project_storage_js__WEBPACK_IMPORTED_MODULE_4__.projectObjectStorage.getCurrentProject())
                } else return
            })
        })
    }

    const handleProjectEditFormSubmit = (projectObject) => {
        
        console.log(projectObject)
        console.log(projectObject.getName())
        let form = document.getElementById("edit-project-form")
        console.log("sucess")
        let titleInput = document.querySelector(".heading.main.form")
        let subTitleInput = document.querySelector(".sub-heading.main.form")



        // change project information based on form input
        form.addEventListener("submit", (e) => {

            e.preventDefault()

            // make any edit button available again
            setStatus(true)

            //close form
            domManipulation.closeEditProjectForm()

            projectObject.setName(titleInput.value)
            projectObject.setDescription(subTitleInput.value)

            console.log(projectObject.getName())
            console.log(projectObject.getDescription())

            domManipulation.addMainLayout()
            domManipulation.populateMainLayout(titleInput.value, subTitleInput.value)
        })

    }



    return {
        buttonAddProjectListener,
        buttonAddToDoListener
    }
})();


/***/ }),

/***/ "./src/projects/project_storage.js":
/*!*****************************************!*\
  !*** ./src/projects/project_storage.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   projectObjectStorage: () => (/* binding */ projectObjectStorage)
/* harmony export */ });
const projectObjectStorage = (() => {

    let _projectObjectStorage = {};
    let _currentProject;

    const getProjectObject = (title) => {
        return _projectObjectStorage.title
    }

    const addProjectObject = (key, value) => {
        _projectObjectStorage.key = value
    }

    const getCurrentProject = () => {
        return _currentProject
    }

    const setCurrentProject = (object) => {
        _currentProject = object
    }

    return {
        getProjectObject,
        addProjectObject,
        getCurrentProject,
        setCurrentProject
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
_UI_ui_js__WEBPACK_IMPORTED_MODULE_3__.eventListener.buttonAddToDoListener()




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1h3QztBQUNTO0FBQ0g7QUFDUjtBQUMrQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTzs7OztBQUlQOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwrQ0FBK0MsS0FBSztBQUNwRDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrRUFBa0Usd0JBQXdCO0FBQzFGLDRFQUE0RSwrQkFBK0I7QUFDM0c7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpREFBaUQsU0FBUztBQUMxRDtBQUNBO0FBQ0EscURBQXFELFNBQVM7QUFDOUQsMkVBQTJFLFVBQVU7QUFDckY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkMsU0FBUztBQUN0RDtBQUNBO0FBQ0EsaURBQWlELFNBQVM7QUFDMUQsdUVBQXVFLFVBQVU7QUFDakY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7QUFPRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDO0FBQ0Q7Ozs7Ozs7QUFPTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxTQUFTOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQixxREFBSTtBQUM5QjtBQUNBO0FBQ0EsWUFBWSw4RUFBb0I7O0FBRWhDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDs7OztBQUlBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsOERBQU8sY0FBYyxnREFBTztBQUN6RCxZQUFZLDhFQUFvQjs7QUFFaEMsWUFBWSw4RUFBb0I7O0FBRWhDLFlBQVksd0RBQU87O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsOEVBQW9CO0FBQ3BDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQSx3REFBd0QsOEVBQW9CO0FBQzVFO0FBQ0EsZ0RBQWdELDhFQUFvQjtBQUNwRSxrQkFBa0I7QUFDbEIsYUFBYTtBQUNiLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUN2WU07O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUMzQkQ7O0FBRU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkRPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDZkQ7O0FBRU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztVQ3JDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTndDO0FBQ1M7QUFDSDtBQUN5Qjs7QUFFdkUsb0RBQWE7QUFDYixvREFBYTs7Ozs7QUFLYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9VSS9zYW1wbGVzLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9VSS91aS5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvcHJvamVjdHMvcHJvamVjdF9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9wcm9qZWN0cy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvc3RvcmFnZS9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy90b2Rvcy90b2Rvcy5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHNhbXBsZXMgPSAoKCkgPT4ge1xuXG4gICAgbGV0IF9wcm9qZWN0RGVzY3JpcHRpb25TYW1wbGUgPSBcIkNsaWNrIHRoZSBidXR0b24gb24gdGhlIHJpZ2h0IHRvIGNoYW5nZSB0aGUgZGVzY3JpcHRpb24hXCJcblxuICAgIGNvbnN0IGdldFByb2plY3REZXNjcmlwdGlvblNhbXBsZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIF9wcm9qZWN0RGVzY3JpcHRpb25TYW1wbGVcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRQcm9qZWN0RGVzY3JpcHRpb25TYW1wbGVcbiAgICB9XG59KSgpOyIsImltcG9ydCB7IFRvRG8gfSBmcm9tICcuLi90b2Rvcy90b2Rvcy5qcyc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi4vcHJvamVjdHMvcHJvamVjdHMuanMnO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gJy4uL3N0b3JhZ2Uvc3RvcmFnZS5qcydcbmltcG9ydCB7IHNhbXBsZXMgfSBmcm9tICcuL3NhbXBsZXMuanMnO1xuaW1wb3J0IHsgcHJvamVjdE9iamVjdFN0b3JhZ2UgfSBmcm9tICcuLi9wcm9qZWN0cy9wcm9qZWN0X3N0b3JhZ2UuanMnO1xuLy8gICBGdW5jdGlvbmFsaXRpZXNcbi8vICAgXG4vLyAgICAgYWRkIHByb2plY3QgdG8gZG9tXG4vLyAgICAgYWRkIHRvZG8gdG8gZG9tXG4vL1xuLy8gICAgIHJlbW92ZSBwcm9qZWN0IGZyb20gZG9tXG4vLyAgICAgcmVtb3ZlIHRvZG8gZnJvbSBkb21cbi8vICAgICBcbi8vICAgICBjaGFuZ2UgaW50ZXJmYWNlIGJhc2VkIG9uIG5hdmlnYXRpb25cbi8vICAgICBjaGFuZ2UgaGlnaGxpZ2h0aW5nIG9mIG5hdmlnYXRpb24gaXRlbXNcbi8vXG4vL1xuLy8gICAgICBUb0RvOiBcbi8vICAgICAgICAgICAgICAtIHdyaXRlIGZ1bmN0aW9ucyByZW5kZXIgTGF5b3V0ICYgcmVuZGVyIFRvRG9zXG4vLyAgICAgICAgICAgICAgLSBwcm9qZWN0IGFycmF5L29iamVjdCBpbiBzZXBlcmF0ZSBsb2dpY1xuLy9cblxuZXhwb3J0IGNvbnN0IGRvbU1hbmlwdWxhdGlvbiA9ICgoKSA9PiB7XG5cblxuXG4gICAgY29uc3QgYWRkUHJvamVjdCA9IChuYW1lKSA9PiB7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdERPTSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cycpO1xuXG4gICAgICAgIGxldCBodG1sID0gKGA8c2VjdGlvbiBjbGFzcz1cInByb2plY3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPlRvYzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9qZWN0XCI+JHtuYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+YClcblxuICAgICAgICBwcm9qZWN0RE9NLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBodG1sKVxuICAgIH1cblxuICAgIGNvbnN0IG9wZW5BZGRQcm9qZWN0Rm9ybSA9ICgpID0+IHtcblxuICAgICAgICBjb25zdCBwcm9qZWN0RE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzJyk7XG5cbiAgICAgICAgbGV0IGh0bWwgPSAoYDxzZWN0aW9uIGlkPVwicHJvamVjdC1mb3JtLXNlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPnRvYzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIGlkPVwibmV3LXByb2plY3QtZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInByb2plY3QtZm9ybS1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+YClcblxuICAgICAgICBwcm9qZWN0RE9NLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBodG1sKVxuICAgIH1cblxuICAgIGNvbnN0IGNsb3NlQWRkUHJvamVjdEZvcm0gPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGFkZFByb2plY3RGb3JtRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNlY3Rpb24jcHJvamVjdC1mb3JtLXNlY3Rpb25cIilcbiAgICAgICAgYWRkUHJvamVjdEZvcm1Eb20ucmVtb3ZlKClcbiAgICB9XG5cbiAgICBjb25zdCBvcGVuRWRpdFByb2plY3RGb3JtID0gKHByb2plY3RPYmplY3QpID0+IHtcblxuICAgICAgICBjb25zdCB0aXRsZURlc2NyaXB0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXIudGl0bGUtZGVzY3JpcHRpb25cIilcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkaW5nLm1haW5cIilcbiAgICAgICAgY29uc3QgcHJvamVjdERlc2NyaXB0aW9uRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWItaGVhZGluZy5tYWluXCIpO1xuICAgICAgICBcbiAgICAgICAgcHJvamVjdFRpdGxlRG9tLnJlbW92ZSgpXG4gICAgICAgIHByb2plY3REZXNjcmlwdGlvbkRvbS5yZW1vdmUoKVxuXG4gICAgICAgIGxldCBodG1sID0gKGA8Zm9ybSBpZD1cImVkaXQtcHJvamVjdC1mb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJoZWFkaW5nIG1haW4gZm9ybVwiIHZhbHVlPVwiJHtwcm9qZWN0T2JqZWN0LmdldE5hbWUoKX1cIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwic3ViLWhlYWRpbmcgbWFpbiBmb3JtXCIgcGxhY2Vob2xkZXI9XCIke3Byb2plY3RPYmplY3QuZ2V0RGVzY3JpcHRpb24oKX1cIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPmApXG5cbiAgICAgICAgdGl0bGVEZXNjcmlwdGlvbkNvbnRhaW5lci5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmViZWdpblwiLCBodG1sKVxuICAgIH1cblxuICAgIGNvbnN0IG9wZW5BZGRUb0RvRm9ybSA9ICgpID0+IHtcblxuICAgICAgICBsZXQgbWFpbkFua2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNlY3Rpb24udG9kby1tYWluXCIpO1xuXG4gICAgICAgIGxldCBodG1sID0gYDxkaXYgY2xhc3M9XCJ0b2RvLWNvbnRhaW5lclwiIGlkPVwiYWRkLXRvZG8tZm9ybS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIGlkPVwiYWRkLXRvZG8tZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidG9kby1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFzc29jaWF0ZWQtcHJvamVjdFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWljb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGNsYXNzPVwidG9kby1kYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0b2RvXCI+Y2hlY2tfYm94X291dGxpbmVfYmxhbms8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0b2RvXCI+ZWRpdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG9cIj5kZWxldGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+YFxuICAgICAgICBcbiAgICAgICAgbWFpbkFua2VyLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBodG1sKVxuICAgIH1cblxuICAgIGNvbnN0IGNsb3NlQWRkVG9Eb0Zvcm0gPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGFkZFRvZG9Gb3JtRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdG9kby1mb3JtLWNvbnRhaW5lclwiKVxuICAgICAgICBhZGRUb2RvRm9ybURvbS5yZW1vdmUoKVxuICAgIH1cblxuICAgIGNvbnN0IGNsb3NlRWRpdFByb2plY3RGb3JtID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBlZGl0UHJvamVjdEZvcm1Eb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybSNlZGl0LXByb2plY3QtZm9ybVwiKVxuICAgICAgICBlZGl0UHJvamVjdEZvcm1Eb20ucmVtb3ZlKClcbiAgICB9XG5cbiAgICBjb25zdCByZW1vdmVQcm9qZWN0ID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKVxuICAgIH1cbiAgICBcbiAgICBcbiAgICBjb25zdCBwb3B1bGF0ZU1haW5MYXlvdXQgPSAodGl0bGUsIHN1YlRpdGxlKSA9PiB7XG5cbiAgICAgICAgbGV0IGRvbVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkaW5nLm1haW5cIik7XG4gICAgICAgIGxldCBkb21TdWJUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3ViLWhlYWRpbmcubWFpblwiKTtcblxuICAgICAgICBcbiAgICAgICAgZG9tVGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICAgICAgZG9tU3ViVGl0bGUudGV4dENvbnRlbnQgPSBzdWJUaXRsZTtcbiAgICB9XG5cbiAgICBjb25zdCBhZGRNYWluTGF5b3V0ID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IG1haW5BbmtlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkaXYuY29udGFpbmVyLW1haW5cIilcbiAgICAgICAgbGV0IGh0bWwgPSBgPGRpdiBjbGFzcz1cImNvbnRhaW5lciB0aXRsZS1kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRpbmcgbWFpblwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN1Yi1oZWFkaW5nIG1haW5cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+YFxuXG4gICAgICAgIG1haW5Bbmtlci5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyVG9Eb3MgPSAocHJvamVjdCkgPT4ge1xuXG4gICAgICAgIGxldCB0b0RvQXJyYXkgPSBwcm9qZWN0LmdldEFsbFRvRG9zKCk7XG5cbiAgICAgICAgdG9Eb0FycmF5LmZvckVhY2godG9EbyA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBtYWluQW5rZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbi50b2RvLW1haW5cIilcblxuICAgICAgICAgICAgbGV0IHRvRG9OYW1lID0gdG9Eby5nZXROYW1lKCk7XG4gICAgICAgICAgICBsZXQgdG9Eb0RhdGUgPSB0b0RvLmdldER1ZURhdGUoKTtcbiAgICAgICAgICAgIGxldCB0b0RvQ2hlY2sgPSB0b0RvLmdldFN0YXR1cygpO1xuICAgICAgICAgICAgbGV0IGNoZWNrSWNvbiA9IHRvRG9DaGVjayA/IFwiY2hlY2tfYm94XCIgOiBcImNoZWNrX2JveF9vdXRsaW5lX2JsYW5rXCJcblxuICAgICAgICAgICAgbGV0IGh0bWwgPSBgPGRpdiBjbGFzcz1cInRvZG8tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1uYW1lXCI+JHt0b0RvTmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhc3NvY2lhdGVkLXByb2plY3RcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWljb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tZGF0ZVwiPiR7dG9Eb0RhdGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG9cIj4ke2NoZWNrSWNvbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG9cIj5lZGl0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0b2RvXCI+ZGVsZXRlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PmBcblxuICAgICAgICAgICAgbWFpbkFua2VyLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBodG1sKVxuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlck9uZVRvRG8gPSAodG9EbykgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IG1haW5BbmtlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzZWN0aW9uLnRvZG8tbWFpblwiKVxuXG4gICAgICAgIGxldCB0b0RvTmFtZSA9IHRvRG8uZ2V0TmFtZSgpO1xuICAgICAgICBsZXQgdG9Eb0RhdGUgPSB0b0RvLmdldER1ZURhdGUoKTtcbiAgICAgICAgbGV0IHRvRG9DaGVjayA9IHRvRG8uZ2V0U3RhdHVzKCk7XG4gICAgICAgIGxldCBjaGVja0ljb24gPSB0b0RvQ2hlY2sgPyBcImNoZWNrX2JveFwiIDogXCJjaGVja19ib3hfb3V0bGluZV9ibGFua1wiXG5cbiAgICAgICAgbGV0IGh0bWwgPSBgPGRpdiBjbGFzcz1cInRvZG8tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLW5hbWVcIj4ke3RvRG9OYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXNzb2NpYXRlZC1wcm9qZWN0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWljb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1kYXRlXCI+JHt0b0RvRGF0ZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0b2RvXCI+JHtjaGVja0ljb259PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG9cIj5lZGl0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG9cIj5kZWxldGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PmBcblxuICAgICAgICBtYWluQW5rZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpXG4gICAgfVxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRQcm9qZWN0LFxuICAgICAgICByZW1vdmVQcm9qZWN0LFxuICAgICAgICBvcGVuQWRkUHJvamVjdEZvcm0sXG4gICAgICAgIGNsb3NlQWRkUHJvamVjdEZvcm0sXG4gICAgICAgIHBvcHVsYXRlTWFpbkxheW91dCxcbiAgICAgICAgYWRkTWFpbkxheW91dCxcbiAgICAgICAgb3BlbkVkaXRQcm9qZWN0Rm9ybSxcbiAgICAgICAgb3BlbkFkZFRvRG9Gb3JtLFxuICAgICAgICBjbG9zZUFkZFRvRG9Gb3JtLFxuICAgICAgICBjbG9zZUVkaXRQcm9qZWN0Rm9ybSxcbiAgICAgICAgcmVuZGVyVG9Eb3MsXG4gICAgICAgIHJlbmRlck9uZVRvRG9cbiAgICB9XG59KSgpO1xuXG5cblxuXG5cblxuLypcbmV4cG9ydCBjb25zdCBmb3JtTG9naWMgPSAoKCkgPT4ge1xuXG4gICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjbG9zZUZvcm1cbiAgICB9XG5cbn0pKCk7XG4qL1xuXG5cblxuXG5cblxuZXhwb3J0IGNvbnN0IGV2ZW50TGlzdGVuZXIgPSAoKCkgPT4ge1xuXG4gICAgbGV0IF9wcm9qZWN0cyA9IFtdO1xuICAgIGxldCBfY3VycmVudFByb2plY3Q7XG4gICAgbGV0IF9zdGF0dXMgPSB0cnVlO1xuXG4gICAgY29uc3Qgc2V0U3RhdHVzID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIF9zdGF0dXMgPSB2YWx1ZVxuICAgIH1cblxuICAgIGNvbnN0IGJ1dHRvbkFkZFByb2plY3RMaXN0ZW5lciA9ICgpID0+IHtcblxuICAgICAgICBsZXQgYWRkUHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0XCIpXG4gICAgICAgIFxuICAgICAgICBhZGRQcm9qZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyBcblxuICAgICAgICAgICAgLy8gb3BlbiBmb3JtIHZpYSBkb20gbW9kdWxlIGFuZCBzZXQgdXAgZXZlbnQgbGlzdGVuZXIgZm9yIHN1Ym1pdHRpbmcgdGhlIGZvcm1cbiAgICAgICAgICAgIGlmIChfc3RhdHVzKSB7IFxuICAgICAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5vcGVuQWRkUHJvamVjdEZvcm0oKTtcbiAgICAgICAgICAgICAgICBoYW5kbGVQcm9qZWN0Rm9ybVN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgIHNldFN0YXR1cyhmYWxzZSlcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm5cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBidXR0b25BZGRUb0RvTGlzdGVuZXIgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGFkZFRvRG9FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdG8tZG9cIilcbiAgICAgICAgXG4gICAgICAgIGFkZFRvRG9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IFxuXG4gICAgICAgICAgICAvLyBvcGVuIGZvcm0gdmlhIGRvbSBtb2R1bGUgYW5kIHNldCB1cCBldmVudCBsaXN0ZW5lciBmb3Igc3VibWl0dGluZyB0aGUgZm9ybVxuICAgICAgICAgICAgaWYgKF9zdGF0dXMpIHsgXG4gICAgICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLm9wZW5BZGRUb0RvRm9ybSgpO1xuICAgICAgICAgICAgICAgIGhhbmRsZVRvRG9Gb3JtU3VibWl0KCk7XG4gICAgICAgICAgICAgICAgc2V0U3RhdHVzKGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm5cbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZVRvRG9Gb3JtU3VibWl0ID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdG9kby1mb3JtLWNvbnRhaW5lclwiKTtcbiAgICAgICAgbGV0IHRvZG9OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0LnRvZG8tbmFtZVwiKTtcbiAgICAgICAgbGV0IHRvZG9EYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0LnRvZG8tZGF0ZVwiKTtcblxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5jbG9zZUFkZFRvRG9Gb3JtKCk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRvZG9OYW1lLnZhbHVlKVxuICAgICAgICAgICAgY29uc29sZS5sb2codG9kb0RhdGUudmFsdWUpXG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBUb0RvIG9iamVjdFxuICAgICAgICAgICAgbGV0IG5ld1RvRG8gPSBUb0RvKHRvZG9OYW1lLnZhbHVlLCBcIlwiLCB0b2RvRGF0ZS52YWx1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBzYWZlIHRvZG8gaW4gYXNzb3NpYXRlZCBwcm9qZWN0XG4gICAgICAgICAgICBwcm9qZWN0T2JqZWN0U3RvcmFnZS5nZXRDdXJyZW50UHJvamVjdCgpLmFkZFRvRG8obmV3VG9EbylcblxuICAgICAgICAgICAgLy8gTWFrZSBhbnkgYnV0dG9uIGF2YWlsYWJsZSBhZ2FpblxuICAgICAgICAgICAgc2V0U3RhdHVzKHRydWUpXG5cbiAgICAgICAgICAgIC8vIFJFTkRFUiBUT0RPU1xuICAgICAgICAgICAgLy8gICAtIEFkZCBldmVudCBsaXN0ZW5lcnMgdG8gYnV0dG9uc1xuICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLnJlbmRlck9uZVRvRG8obmV3VG9EbylcblxuICAgICAgICB9KVxuICAgIH1cblxuXG5cbiAgICBjb25zdCBoYW5kbGVQcm9qZWN0Rm9ybVN1Ym1pdCA9ICgpID0+IHtcblxuICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXByb2plY3QtZm9ybVwiKTtcbiAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWZvcm0taW5wdXRcIik7XG5cbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5jbG9zZUFkZFByb2plY3RGb3JtKClcblxuICAgICAgICAgICAgLy8gbWFrZSBhbnkgZWRpdCBidXR0b24gYXZhaWxhYmxlIGFnYWluXG4gICAgICAgICAgICBzZXRTdGF0dXModHJ1ZSlcblxuICAgICAgICAgICAgLy8gYWRkIHByb2plY3Qgb25seSBpZiBuYW1lIGlzIG5vdCBlbXB0eVxuICAgICAgICAgICAgaWYgKCFpbnB1dC52YWx1ZSkgcmV0dXJuIFxuICAgICAgICAgICAgZWxzZSBkb21NYW5pcHVsYXRpb24uYWRkUHJvamVjdChpbnB1dC52YWx1ZSk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBQcm9qZWN0IFwiRmFjdG9yeVwiIHdpdGggaW5wdXQgdmFsdWUgYW5kIHNhbXBsZSBkZXNjcmlwdGlvbiBhbmQgc2F2ZSBjcmVhdGVkIE9iamVjdCBpbiBsb2NhbHN0b3JhZ2UgYW5kIF9wcm9qZWN0cyBhcnJheVxuICAgICAgICAgICAgbGV0IG5ld1Byb2plY3QgPSBQcm9qZWN0KGlucHV0LnZhbHVlLCBzYW1wbGVzLmdldFByb2plY3REZXNjcmlwdGlvblNhbXBsZSgpKVxuICAgICAgICAgICAgcHJvamVjdE9iamVjdFN0b3JhZ2UuYWRkUHJvamVjdE9iamVjdChuZXdQcm9qZWN0LmdldE5hbWUoKSwgbmV3UHJvamVjdCk7XG5cbiAgICAgICAgICAgIHByb2plY3RPYmplY3RTdG9yYWdlLnNldEN1cnJlbnRQcm9qZWN0KG5ld1Byb2plY3QpXG5cbiAgICAgICAgICAgIHN0b3JhZ2Uuc2F2ZU9iamVjdFRvU3RvcmFnZShpbnB1dC52YWx1ZSwgbmV3UHJvamVjdC5jcmVhdGVQcm9qZWN0T2JqZWN0KCkpXG5cbiAgICAgICAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lciB0byBjb3JyZXNwb25kaW5nIG5hdmlnYXRpb24gaXRlbVxuICAgICAgICAgICAgbGV0IGRvbVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzZWN0aW9uLnByb2plY3Q6bGFzdC1jaGlsZGApXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGRvbVByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBkb21NYW5pcHVsYXRpb24ucG9wdWxhdGVNYWluTGF5b3V0KG5ld1Byb2plY3QuZ2V0TmFtZSgpLCBuZXdQcm9qZWN0LmdldERlc2NyaXB0aW9uKCkpXG4gICAgICAgICAgICAgICAgcHJvamVjdE9iamVjdFN0b3JhZ2Uuc2V0Q3VycmVudFByb2plY3QobmV3UHJvamVjdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vcG91bGF0ZSBtYWluIHNlY3Rpb24gd2l0aCBjb3JyZXNwb25kaW5nIHByb2plY3QgaW5mb3JtYXRpb25cbiAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5wb3B1bGF0ZU1haW5MYXlvdXQobmV3UHJvamVjdC5nZXROYW1lKCksIG5ld1Byb2plY3QuZ2V0RGVzY3JpcHRpb24oKSlcblxuXG4gICAgICAgICAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzIHRvIGljb25zIHRvIGRlbGV0ZSBhbmQgY2hhbmdlIGEgcHJvamVjdFxuICAgICAgICAgICAgbGV0IF9wcm9qZWN0RWRpdEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQucHJvamVjdC1lZGl0XCIpXG4gICAgICAgICAgICBsZXQgX3Byb2plY3REZWxldGVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkLnByb2plY3QtZGVsZXRlXCIpXG5cblxuICAgICAgICAgICAgX3Byb2plY3RFZGl0SWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKF9zdGF0dXMpIHsgXG4gICAgICAgICAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5vcGVuRWRpdFByb2plY3RGb3JtKHByb2plY3RPYmplY3RTdG9yYWdlLmdldEN1cnJlbnRQcm9qZWN0KCkpXG4gICAgICAgICAgICAgICAgICAgIHNldFN0YXR1cyhmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlUHJvamVjdEVkaXRGb3JtU3VibWl0KHByb2plY3RPYmplY3RTdG9yYWdlLmdldEN1cnJlbnRQcm9qZWN0KCkpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldHVyblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVQcm9qZWN0RWRpdEZvcm1TdWJtaXQgPSAocHJvamVjdE9iamVjdCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdE9iamVjdClcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdE9iamVjdC5nZXROYW1lKCkpXG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LXByb2plY3QtZm9ybVwiKVxuICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Vzc1wiKVxuICAgICAgICBsZXQgdGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGluZy5tYWluLmZvcm1cIilcbiAgICAgICAgbGV0IHN1YlRpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Yi1oZWFkaW5nLm1haW4uZm9ybVwiKVxuXG5cblxuICAgICAgICAvLyBjaGFuZ2UgcHJvamVjdCBpbmZvcm1hdGlvbiBiYXNlZCBvbiBmb3JtIGlucHV0XG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICAgICAgLy8gbWFrZSBhbnkgZWRpdCBidXR0b24gYXZhaWxhYmxlIGFnYWluXG4gICAgICAgICAgICBzZXRTdGF0dXModHJ1ZSlcblxuICAgICAgICAgICAgLy9jbG9zZSBmb3JtXG4gICAgICAgICAgICBkb21NYW5pcHVsYXRpb24uY2xvc2VFZGl0UHJvamVjdEZvcm0oKVxuXG4gICAgICAgICAgICBwcm9qZWN0T2JqZWN0LnNldE5hbWUodGl0bGVJbnB1dC52YWx1ZSlcbiAgICAgICAgICAgIHByb2plY3RPYmplY3Quc2V0RGVzY3JpcHRpb24oc3ViVGl0bGVJbnB1dC52YWx1ZSlcblxuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvamVjdE9iamVjdC5nZXROYW1lKCkpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0T2JqZWN0LmdldERlc2NyaXB0aW9uKCkpXG5cbiAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5hZGRNYWluTGF5b3V0KClcbiAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5wb3B1bGF0ZU1haW5MYXlvdXQodGl0bGVJbnB1dC52YWx1ZSwgc3ViVGl0bGVJbnB1dC52YWx1ZSlcbiAgICAgICAgfSlcblxuICAgIH1cblxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBidXR0b25BZGRQcm9qZWN0TGlzdGVuZXIsXG4gICAgICAgIGJ1dHRvbkFkZFRvRG9MaXN0ZW5lclxuICAgIH1cbn0pKCk7XG4iLCJleHBvcnQgY29uc3QgcHJvamVjdE9iamVjdFN0b3JhZ2UgPSAoKCkgPT4ge1xuXG4gICAgbGV0IF9wcm9qZWN0T2JqZWN0U3RvcmFnZSA9IHt9O1xuICAgIGxldCBfY3VycmVudFByb2plY3Q7XG5cbiAgICBjb25zdCBnZXRQcm9qZWN0T2JqZWN0ID0gKHRpdGxlKSA9PiB7XG4gICAgICAgIHJldHVybiBfcHJvamVjdE9iamVjdFN0b3JhZ2UudGl0bGVcbiAgICB9XG5cbiAgICBjb25zdCBhZGRQcm9qZWN0T2JqZWN0ID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgX3Byb2plY3RPYmplY3RTdG9yYWdlLmtleSA9IHZhbHVlXG4gICAgfVxuXG4gICAgY29uc3QgZ2V0Q3VycmVudFByb2plY3QgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBfY3VycmVudFByb2plY3RcbiAgICB9XG5cbiAgICBjb25zdCBzZXRDdXJyZW50UHJvamVjdCA9IChvYmplY3QpID0+IHtcbiAgICAgICAgX2N1cnJlbnRQcm9qZWN0ID0gb2JqZWN0XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0UHJvamVjdE9iamVjdCxcbiAgICAgICAgYWRkUHJvamVjdE9iamVjdCxcbiAgICAgICAgZ2V0Q3VycmVudFByb2plY3QsXG4gICAgICAgIHNldEN1cnJlbnRQcm9qZWN0XG4gICAgfVxufSkoKTsiLCIvLyBGYWN0b3J5IGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIFByb2plY3RcblxuZXhwb3J0IGNvbnN0IFByb2plY3QgPSAobmFtZSwgZGVzY3JpcHRpb24pID0+IHtcblxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBuYW1lO1xuICAgIGNvbnN0IHNldE5hbWUgPSAobmV3TmFtZSkgPT4gbmFtZSA9IG5ld05hbWU7XG5cbiAgICBjb25zdCBnZXREZXNjcmlwdGlvbiA9ICgpID0+IGRlc2NyaXB0aW9uO1xuICAgIGNvbnN0IHNldERlc2NyaXB0aW9uID0gKG5ld0Rlc2NyaXB0aW9uKSA9PiBkZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuXG4gICAgbGV0IF9hc3NvY2lhdGVkVG9Eb3MgPSBbXTtcblxuICAgIGNvbnN0IGdldFRvRG8gPSAoaW5kZXgpID0+IF9hc3NvY2lhdGVkVG9Eb3NbaW5kZXhdO1xuICAgIGNvbnN0IGdldEFsbFRvRG9zID0gKCkgPT4gX2Fzc29jaWF0ZWRUb0RvcztcblxuICAgIGNvbnN0IGFkZFRvRG8gPSAob2JqZWN0KSA9PiBfYXNzb2NpYXRlZFRvRG9zLnB1c2gob2JqZWN0KVxuICAgIGNvbnN0IHJlbW92ZVRvRG8gPSAoaW5kZXgpID0+IF9hc3NvY2lhdGVkVG9Eb3Muc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgY29uc3QgX2NyZWF0ZVRvRG9zT2JqZWN0ID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBUb0Rvc09iamVjdCA9IHt9XG5cbiAgICAgICAgX2Fzc29jaWF0ZWRUb0Rvcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgICAgICBUb0Rvc09iamVjdFtlLmdldE5hbWUoKV0gPSBlLmNyZWF0ZVRvRG9PYmplY3QoKVxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBUb0Rvc09iamVjdFxuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3RPYmplY3QgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvamVjdE9iamVjdCA9IHsgXG4gICAgICAgICAgICBcIm5hbWVcIiA6IGdldE5hbWUoKSxcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IGdldERlc2NyaXB0aW9uKCksXG4gICAgICAgICAgICBcImFzc29jaWF0ZWRUb0Rvc1wiIDogX2NyZWF0ZVRvRG9zT2JqZWN0KClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm9qZWN0T2JqZWN0XG4gICAgfVxuXG5cbiAgICByZXR1cm4ge2dldE5hbWUsXG4gICAgICAgICAgICBzZXROYW1lLFxuICAgICAgICAgICAgc2V0RGVzY3JpcHRpb24sXG4gICAgICAgICAgICBnZXREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGdldFRvRG8sXG4gICAgICAgICAgICBhZGRUb0RvLFxuICAgICAgICAgICAgcmVtb3ZlVG9EbyxcbiAgICAgICAgICAgIGdldEFsbFRvRG9zLFxuICAgICAgICAgICAgY3JlYXRlUHJvamVjdE9iamVjdCxcbiAgICAgICAgfVxufVxuXG5cblxuIiwiZXhwb3J0IGNvbnN0IHN0b3JhZ2UgPSAoKCkgPT4ge1xuXG4gICAgY29uc3Qgc2F2ZU9iamVjdFRvU3RvcmFnZSA9IChrZXksIG9iamVjdCkgPT4ge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShvYmplY3QpKVxuICAgIH1cblxuICAgIGNvbnN0IGdldE9iamVjdEZyb21TdG9yYWdlID0gKGtleSkgPT4ge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHNhdmVPYmplY3RUb1N0b3JhZ2UsXG4gICAgICAgIGdldE9iamVjdEZyb21TdG9yYWdlXG4gICAgfVxuICAgIFxufSkoKTsiLCIvLyBGYWN0b3J5IGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIFRvRG9cblxuZXhwb3J0IGNvbnN0IFRvRG8gPSAobmFtZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHN0YXR1cykgPT4ge1xuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG4gICAgY29uc3Qgc2V0TmFtZSA9IChuZXdOYW1lKSA9PiBuYW1lID0gbmV3TmFtZTtcblxuICAgIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKCkgPT4gZGVzY3JpcHRpb247XG4gICAgY29uc3Qgc2V0RGVzY3JpcHRpb24gPSAobmV3RGVzY3JpcHRpb24pID0+IGRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG5cbiAgICBjb25zdCBnZXREdWVEYXRlID0gKCkgPT4gZHVlRGF0ZTtcbiAgICBjb25zdCBzZXREdWVEYXRlID0gKG5ld0R1ZURhdGUpID0+IGR1ZURhdGUgPSBuZXdEdWVEYXRlOyBcblxuICAgIGNvbnN0IGdldFN0YXR1cyA9ICgpID0+IHN0YXR1c1xuICAgIGNvbnN0IHRvZ2dsZVN0YXR1cyA9ICgpID0+IHN0YXR1cyA9IHN0YXR1cyA/IGZhbHNlIDogdHJ1ZTtcblxuICAgIGNvbnN0IGNyZWF0ZVRvRG9PYmplY3QgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHRvRG9PYmplY3QgPSB7XG4gICAgICAgICAgICBcIm5hbWVcIiA6IGdldE5hbWUoKSxcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IGdldERlc2NyaXB0aW9uKCksXG4gICAgICAgICAgICBcImR1ZURhdGVcIiA6IGdldER1ZURhdGUoKSxcbiAgICAgICAgICAgIFwic3RhdHVzXCIgOiBnZXRTdGF0dXMoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvRG9PYmplY3RcbiAgICB9XG5cbiAgICByZXR1cm4ge2dldE5hbWUsXG4gICAgICAgICAgICBzZXROYW1lLCBcbiAgICAgICAgICAgIHNldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0RGVzY3JpcHRpb24sXG4gICAgICAgICAgICBnZXREdWVEYXRlLFxuICAgICAgICAgICAgc2V0RHVlRGF0ZSxcbiAgICAgICAgICAgIGdldFN0YXR1cyxcbiAgICAgICAgICAgIHRvZ2dsZVN0YXR1cyxcbiAgICAgICAgICAgIGNyZWF0ZVRvRG9PYmplY3R9XG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVG9EbyB9IGZyb20gJy4vdG9kb3MvdG9kb3MuanMnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdHMvcHJvamVjdHMuanMnO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLmpzJ1xuaW1wb3J0IHsgZG9tTWFuaXB1bGF0aW9uLCBldmVudExpc3RlbmVyLCBmb3JtTG9naWMgfSBmcm9tICcuL1VJL3VpLmpzJztcblxuZXZlbnRMaXN0ZW5lci5idXR0b25BZGRQcm9qZWN0TGlzdGVuZXIoKVxuZXZlbnRMaXN0ZW5lci5idXR0b25BZGRUb0RvTGlzdGVuZXIoKVxuXG5cblxuXG4vL2RvbU1hbmlwdWxhdGlvbi5yZW1vdmVQcm9qZWN0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cycpKVxuXG4vKlxuY29uc3QgbmV3UHJvamVjdCA9IFByb2plY3QoXCJTY2hvb2xcIiwgXCJ0aGlzIHByb2plY3QgaXMgZm9yIG9yZ2FuaXppbmcgbXkgc2Nob29sIHdvcmtcIik7XG5cbmNvbnN0IGZpcnN0VG9EbyA9IFRvRG8oXCJEbyBzb21ldGhpbmdcIiwgXCJHZXQgb24gbXkgTGV2ZWxcIiwgXCIxOC4xMC4yMDAwXCIsIGZhbHNlKVxuY29uc3Qgc2Vjb25kVG9EbyA9IFRvRG8oXCJEbyBzb21ldGhpbmcgZWxzZVwiLCBcIlNldCBvbiBteSBMZXZlbFwiLCBcIjEzLjEwLjIwMDBcIiwgZmFsc2UpXG5uZXdQcm9qZWN0LmFkZFRvRG8oZmlyc3RUb0RvKVxubmV3UHJvamVjdC5hZGRUb0RvKHNlY29uZFRvRG8pXG5cbmxldCB2YWxpZE9iamVjdCA9IG5ld1Byb2plY3QuY3JlYXRlUHJvamVjdE9iamVjdCgpO1xuXG5zdG9yYWdlLnNhdmVPYmplY3RUb1N0b3JhZ2UobmV3UHJvamVjdC5nZXROYW1lKCksIHZhbGlkT2JqZWN0KVxuXG5jb25zb2xlLmxvZyhzdG9yYWdlLmdldE9iamVjdEZyb21TdG9yYWdlKFwiU2Nob29sXCIpKVxuKi8iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=