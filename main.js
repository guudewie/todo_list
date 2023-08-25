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
            renderOneToDo(toDo)
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
                        <span class="material-symbols-outlined todo check">${checkIcon}</span>
                        <span class="material-symbols-outlined todo edit">edit</span>
                        <span class="material-symbols-outlined todo delete">delete</span>
                    </div>
                </div>`

        mainAnker.insertAdjacentHTML("beforeend", html)

        //add event listener
        let latestToDo = document.querySelector(".todo-container:last-child")
        eventListener.toDoListener(latestToDo, toDo)

    }

    const removeToDos = () => {

        let toDosDom = document.querySelectorAll(".todo-container")

        toDosDom.forEach((element) => {
            element.remove()
        })
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
        renderOneToDo,
        removeToDos
    }
})();














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

            // create ToDo object
            let newToDo = (0,_todos_todos_js__WEBPACK_IMPORTED_MODULE_0__.ToDo)(todoName.value, "", todoDate.value, false);
            
            // add todo to assosiated project
            _projects_project_storage_js__WEBPACK_IMPORTED_MODULE_4__.projectObjectStorage.getCurrentProject().addToDo(newToDo)

            // Make any button available again
            setStatus(true)
            domManipulation.renderOneToDo(newToDo)


            //// Add Event Listeners to Add/Check/and delete ToDos
        })
    }

    const toDoListener = (element, todo) => {

        let checkIcon = element.querySelector(".todo.check");
        let editIcon = element.querySelector(".todo.check");
        let deleteIcon = element.querySelector(".todo.check");
        let toDoNameElement = element.querySelector(".todo-name")

        checkIcon.addEventListener("click", () => {
            
            todo.toggleStatus()
            
            if (todo.getStatus() === true) {
                checkIcon.textContent = "check_box"
                toDoNameElement.classList.add("strikethrough")
            } else {
                checkIcon.textContent = "check_box_outline_blank"
                toDoNameElement.classList.remove("strikethrough")
            }

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
                domManipulation.removeToDos()
                domManipulation.renderToDos(newProject)
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
        buttonAddToDoListener,
        toDoListener
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
    const toggleStatus = () => {
        status = status ? false : true;
        return status
    }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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a0I7QUFDbEIsYUFBYTtBQUNiLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzlZTTs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7OztBQzNCRDs7QUFFTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRE87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNmRDs7QUFFTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O1VDeENBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOd0M7QUFDUztBQUNIO0FBQ3lCOztBQUV2RSxvREFBYTtBQUNiLG9EQUFhOzs7OztBQUtiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL1VJL3NhbXBsZXMuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL1VJL3VpLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9wcm9qZWN0cy9wcm9qZWN0X3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL3Byb2plY3RzL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9zdG9yYWdlL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL3RvZG9zL3RvZG9zLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc2FtcGxlcyA9ICgoKSA9PiB7XG5cbiAgICBsZXQgX3Byb2plY3REZXNjcmlwdGlvblNhbXBsZSA9IFwiQ2xpY2sgdGhlIGJ1dHRvbiBvbiB0aGUgcmlnaHQgdG8gY2hhbmdlIHRoZSBkZXNjcmlwdGlvbiFcIlxuXG4gICAgY29uc3QgZ2V0UHJvamVjdERlc2NyaXB0aW9uU2FtcGxlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gX3Byb2plY3REZXNjcmlwdGlvblNhbXBsZVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldFByb2plY3REZXNjcmlwdGlvblNhbXBsZVxuICAgIH1cbn0pKCk7IiwiaW1wb3J0IHsgVG9EbyB9IGZyb20gJy4uL3RvZG9zL3RvZG9zLmpzJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9wcm9qZWN0cy9wcm9qZWN0cy5qcyc7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnLi4vc3RvcmFnZS9zdG9yYWdlLmpzJ1xuaW1wb3J0IHsgc2FtcGxlcyB9IGZyb20gJy4vc2FtcGxlcy5qcyc7XG5pbXBvcnQgeyBwcm9qZWN0T2JqZWN0U3RvcmFnZSB9IGZyb20gJy4uL3Byb2plY3RzL3Byb2plY3Rfc3RvcmFnZS5qcyc7XG4vLyAgIEZ1bmN0aW9uYWxpdGllc1xuLy8gICBcbi8vICAgICBhZGQgcHJvamVjdCB0byBkb21cbi8vICAgICBhZGQgdG9kbyB0byBkb21cbi8vXG4vLyAgICAgcmVtb3ZlIHByb2plY3QgZnJvbSBkb21cbi8vICAgICByZW1vdmUgdG9kbyBmcm9tIGRvbVxuLy8gICAgIFxuLy8gICAgIGNoYW5nZSBpbnRlcmZhY2UgYmFzZWQgb24gbmF2aWdhdGlvblxuLy8gICAgIGNoYW5nZSBoaWdobGlnaHRpbmcgb2YgbmF2aWdhdGlvbiBpdGVtc1xuLy9cbi8vXG4vLyAgICAgIFRvRG86IFxuLy8gICAgICAgICAgICAgIC0gd3JpdGUgZnVuY3Rpb25zIHJlbmRlciBMYXlvdXQgJiByZW5kZXIgVG9Eb3Ncbi8vICAgICAgICAgICAgICAtIHByb2plY3QgYXJyYXkvb2JqZWN0IGluIHNlcGVyYXRlIGxvZ2ljXG4vL1xuXG5leHBvcnQgY29uc3QgZG9tTWFuaXB1bGF0aW9uID0gKCgpID0+IHtcblxuXG5cbiAgICBjb25zdCBhZGRQcm9qZWN0ID0gKG5hbWUpID0+IHtcblxuICAgICAgICBjb25zdCBwcm9qZWN0RE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzJyk7XG5cbiAgICAgICAgbGV0IGh0bWwgPSAoYDxzZWN0aW9uIGNsYXNzPVwicHJvamVjdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+VG9jPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2plY3RcIj4ke25hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5gKVxuXG4gICAgICAgIHByb2plY3RET00uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3Qgb3BlbkFkZFByb2plY3RGb3JtID0gKCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKTtcblxuICAgICAgICBsZXQgaHRtbCA9IChgPHNlY3Rpb24gaWQ9XCJwcm9qZWN0LWZvcm0tc2VjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+dG9jPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gaWQ9XCJuZXctcHJvamVjdC1mb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwicHJvamVjdC1mb3JtLWlucHV0XCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5gKVxuXG4gICAgICAgIHByb2plY3RET00uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3QgY2xvc2VBZGRQcm9qZWN0Rm9ybSA9ICgpID0+IHtcblxuICAgICAgICBsZXQgYWRkUHJvamVjdEZvcm1Eb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbiNwcm9qZWN0LWZvcm0tc2VjdGlvblwiKVxuICAgICAgICBhZGRQcm9qZWN0Rm9ybURvbS5yZW1vdmUoKVxuICAgIH1cblxuICAgIGNvbnN0IG9wZW5FZGl0UHJvamVjdEZvcm0gPSAocHJvamVjdE9iamVjdCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRpdGxlRGVzY3JpcHRpb25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci50aXRsZS1kZXNjcmlwdGlvblwiKVxuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGVEb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRpbmcubWFpblwiKVxuICAgICAgICBjb25zdCBwcm9qZWN0RGVzY3JpcHRpb25Eb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Yi1oZWFkaW5nLm1haW5cIik7XG4gICAgICAgIFxuICAgICAgICBwcm9qZWN0VGl0bGVEb20ucmVtb3ZlKClcbiAgICAgICAgcHJvamVjdERlc2NyaXB0aW9uRG9tLnJlbW92ZSgpXG5cbiAgICAgICAgbGV0IGh0bWwgPSAoYDxmb3JtIGlkPVwiZWRpdC1wcm9qZWN0LWZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImhlYWRpbmcgbWFpbiBmb3JtXCIgdmFsdWU9XCIke3Byb2plY3RPYmplY3QuZ2V0TmFtZSgpfVwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJzdWItaGVhZGluZyBtYWluIGZvcm1cIiBwbGFjZWhvbGRlcj1cIiR7cHJvamVjdE9iamVjdC5nZXREZXNjcmlwdGlvbigpfVwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+YClcblxuICAgICAgICB0aXRsZURlc2NyaXB0aW9uQ29udGFpbmVyLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWJlZ2luXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3Qgb3BlbkFkZFRvRG9Gb3JtID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBtYWluQW5rZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbi50b2RvLW1haW5cIik7XG5cbiAgICAgICAgbGV0IGh0bWwgPSBgPGRpdiBjbGFzcz1cInRvZG8tY29udGFpbmVyXCIgaWQ9XCJhZGQtdG9kby1mb3JtLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gaWQ9XCJhZGQtdG9kby1mb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ0b2RvLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXNzb2NpYXRlZC1wcm9qZWN0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8taWNvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgY2xhc3M9XCJ0b2RvLWRhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG9cIj5jaGVja19ib3hfb3V0bGluZV9ibGFuazwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG9cIj5lZGl0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdG9kb1wiPmRlbGV0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gXG4gICAgICAgIFxuICAgICAgICBtYWluQW5rZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3QgY2xvc2VBZGRUb0RvRm9ybSA9ICgpID0+IHtcblxuICAgICAgICBsZXQgYWRkVG9kb0Zvcm1Eb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10b2RvLWZvcm0tY29udGFpbmVyXCIpXG4gICAgICAgIGFkZFRvZG9Gb3JtRG9tLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgY29uc3QgY2xvc2VFZGl0UHJvamVjdEZvcm0gPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGVkaXRQcm9qZWN0Rm9ybURvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtI2VkaXQtcHJvamVjdC1mb3JtXCIpXG4gICAgICAgIGVkaXRQcm9qZWN0Rm9ybURvbS5yZW1vdmUoKVxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZVByb2plY3QgPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LnJlbW92ZSgpXG4gICAgfVxuICAgIFxuICAgIFxuICAgIGNvbnN0IHBvcHVsYXRlTWFpbkxheW91dCA9ICh0aXRsZSwgc3ViVGl0bGUpID0+IHtcblxuICAgICAgICBsZXQgZG9tVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRpbmcubWFpblwiKTtcbiAgICAgICAgbGV0IGRvbVN1YlRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWItaGVhZGluZy5tYWluXCIpO1xuXG4gICAgICAgIFxuICAgICAgICBkb21UaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgICBkb21TdWJUaXRsZS50ZXh0Q29udGVudCA9IHN1YlRpdGxlO1xuICAgIH1cblxuICAgIGNvbnN0IGFkZE1haW5MYXlvdXQgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgbWFpbkFua2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRpdi5jb250YWluZXItbWFpblwiKVxuICAgICAgICBsZXQgaHRtbCA9IGA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIHRpdGxlLWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGluZyBtYWluXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3ViLWhlYWRpbmcgbWFpblwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gXG5cbiAgICAgICAgbWFpbkFua2VyLmluc2VydEFkamFjZW50SFRNTChcImFmdGVyYmVnaW5cIiwgaHRtbClcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJUb0RvcyA9IChwcm9qZWN0KSA9PiB7XG5cbiAgICAgICAgbGV0IHRvRG9BcnJheSA9IHByb2plY3QuZ2V0QWxsVG9Eb3MoKTtcblxuICAgICAgICB0b0RvQXJyYXkuZm9yRWFjaCh0b0RvID0+IHtcbiAgICAgICAgICAgIHJlbmRlck9uZVRvRG8odG9EbylcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyT25lVG9EbyA9ICh0b0RvKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgbWFpbkFua2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNlY3Rpb24udG9kby1tYWluXCIpXG5cbiAgICAgICAgbGV0IHRvRG9OYW1lID0gdG9Eby5nZXROYW1lKCk7XG4gICAgICAgIGxldCB0b0RvRGF0ZSA9IHRvRG8uZ2V0RHVlRGF0ZSgpO1xuICAgICAgICBsZXQgdG9Eb0NoZWNrID0gdG9Eby5nZXRTdGF0dXMoKTtcbiAgICAgICAgbGV0IGNoZWNrSWNvbiA9IHRvRG9DaGVjayA/IFwiY2hlY2tfYm94XCIgOiBcImNoZWNrX2JveF9vdXRsaW5lX2JsYW5rXCJcblxuICAgICAgICBsZXQgaHRtbCA9IGA8ZGl2IGNsYXNzPVwidG9kby1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tbmFtZVwiPiR7dG9Eb05hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhc3NvY2lhdGVkLXByb2plY3RcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8taWNvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWRhdGVcIj4ke3RvRG9EYXRlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG8gY2hlY2tcIj4ke2NoZWNrSWNvbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdG9kbyBlZGl0XCI+ZWRpdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0b2RvIGRlbGV0ZVwiPmRlbGV0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+YFxuXG4gICAgICAgIG1haW5Bbmtlci5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgaHRtbClcblxuICAgICAgICAvL2FkZCBldmVudCBsaXN0ZW5lclxuICAgICAgICBsZXQgbGF0ZXN0VG9EbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1jb250YWluZXI6bGFzdC1jaGlsZFwiKVxuICAgICAgICBldmVudExpc3RlbmVyLnRvRG9MaXN0ZW5lcihsYXRlc3RUb0RvLCB0b0RvKVxuXG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlVG9Eb3MgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHRvRG9zRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50b2RvLWNvbnRhaW5lclwiKVxuXG4gICAgICAgIHRvRG9zRG9tLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKClcbiAgICAgICAgfSlcbiAgICB9XG5cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkUHJvamVjdCxcbiAgICAgICAgcmVtb3ZlUHJvamVjdCxcbiAgICAgICAgb3BlbkFkZFByb2plY3RGb3JtLFxuICAgICAgICBjbG9zZUFkZFByb2plY3RGb3JtLFxuICAgICAgICBwb3B1bGF0ZU1haW5MYXlvdXQsXG4gICAgICAgIGFkZE1haW5MYXlvdXQsXG4gICAgICAgIG9wZW5FZGl0UHJvamVjdEZvcm0sXG4gICAgICAgIG9wZW5BZGRUb0RvRm9ybSxcbiAgICAgICAgY2xvc2VBZGRUb0RvRm9ybSxcbiAgICAgICAgY2xvc2VFZGl0UHJvamVjdEZvcm0sXG4gICAgICAgIHJlbmRlclRvRG9zLFxuICAgICAgICByZW5kZXJPbmVUb0RvLFxuICAgICAgICByZW1vdmVUb0Rvc1xuICAgIH1cbn0pKCk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuZXhwb3J0IGNvbnN0IGV2ZW50TGlzdGVuZXIgPSAoKCkgPT4ge1xuXG4gICAgbGV0IF9wcm9qZWN0cyA9IFtdO1xuICAgIGxldCBfY3VycmVudFByb2plY3Q7XG4gICAgbGV0IF9zdGF0dXMgPSB0cnVlO1xuXG4gICAgY29uc3Qgc2V0U3RhdHVzID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIF9zdGF0dXMgPSB2YWx1ZVxuICAgIH1cblxuICAgIGNvbnN0IGJ1dHRvbkFkZFByb2plY3RMaXN0ZW5lciA9ICgpID0+IHtcblxuICAgICAgICBsZXQgYWRkUHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0XCIpXG4gICAgICAgIFxuICAgICAgICBhZGRQcm9qZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyBcblxuICAgICAgICAgICAgLy8gb3BlbiBmb3JtIHZpYSBkb20gbW9kdWxlIGFuZCBzZXQgdXAgZXZlbnQgbGlzdGVuZXIgZm9yIHN1Ym1pdHRpbmcgdGhlIGZvcm1cbiAgICAgICAgICAgIGlmIChfc3RhdHVzKSB7IFxuICAgICAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5vcGVuQWRkUHJvamVjdEZvcm0oKTtcbiAgICAgICAgICAgICAgICBoYW5kbGVQcm9qZWN0Rm9ybVN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgIHNldFN0YXR1cyhmYWxzZSlcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm5cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBidXR0b25BZGRUb0RvTGlzdGVuZXIgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGFkZFRvRG9FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdG8tZG9cIilcbiAgICAgICAgXG4gICAgICAgIGFkZFRvRG9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IFxuXG4gICAgICAgICAgICAvLyBvcGVuIGZvcm0gdmlhIGRvbSBtb2R1bGUgYW5kIHNldCB1cCBldmVudCBsaXN0ZW5lciBmb3Igc3VibWl0dGluZyB0aGUgZm9ybVxuICAgICAgICAgICAgaWYgKF9zdGF0dXMpIHsgXG4gICAgICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLm9wZW5BZGRUb0RvRm9ybSgpO1xuICAgICAgICAgICAgICAgIGhhbmRsZVRvRG9Gb3JtU3VibWl0KCk7XG4gICAgICAgICAgICAgICAgc2V0U3RhdHVzKGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm5cbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZVRvRG9Gb3JtU3VibWl0ID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdG9kby1mb3JtLWNvbnRhaW5lclwiKTtcbiAgICAgICAgbGV0IHRvZG9OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0LnRvZG8tbmFtZVwiKTtcbiAgICAgICAgbGV0IHRvZG9EYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0LnRvZG8tZGF0ZVwiKTtcblxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5jbG9zZUFkZFRvRG9Gb3JtKCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBUb0RvIG9iamVjdFxuICAgICAgICAgICAgbGV0IG5ld1RvRG8gPSBUb0RvKHRvZG9OYW1lLnZhbHVlLCBcIlwiLCB0b2RvRGF0ZS52YWx1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBhZGQgdG9kbyB0byBhc3Nvc2lhdGVkIHByb2plY3RcbiAgICAgICAgICAgIHByb2plY3RPYmplY3RTdG9yYWdlLmdldEN1cnJlbnRQcm9qZWN0KCkuYWRkVG9EbyhuZXdUb0RvKVxuXG4gICAgICAgICAgICAvLyBNYWtlIGFueSBidXR0b24gYXZhaWxhYmxlIGFnYWluXG4gICAgICAgICAgICBzZXRTdGF0dXModHJ1ZSlcbiAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5yZW5kZXJPbmVUb0RvKG5ld1RvRG8pXG5cblxuICAgICAgICAgICAgLy8vLyBBZGQgRXZlbnQgTGlzdGVuZXJzIHRvIEFkZC9DaGVjay9hbmQgZGVsZXRlIFRvRG9zXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgdG9Eb0xpc3RlbmVyID0gKGVsZW1lbnQsIHRvZG8pID0+IHtcblxuICAgICAgICBsZXQgY2hlY2tJY29uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8uY2hlY2tcIik7XG4gICAgICAgIGxldCBlZGl0SWNvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLmNoZWNrXCIpO1xuICAgICAgICBsZXQgZGVsZXRlSWNvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLmNoZWNrXCIpO1xuICAgICAgICBsZXQgdG9Eb05hbWVFbGVtZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbmFtZVwiKVxuXG4gICAgICAgIGNoZWNrSWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0b2RvLnRvZ2dsZVN0YXR1cygpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0b2RvLmdldFN0YXR1cygpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tJY29uLnRleHRDb250ZW50ID0gXCJjaGVja19ib3hcIlxuICAgICAgICAgICAgICAgIHRvRG9OYW1lRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic3RyaWtldGhyb3VnaFwiKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjaGVja0ljb24udGV4dENvbnRlbnQgPSBcImNoZWNrX2JveF9vdXRsaW5lX2JsYW5rXCJcbiAgICAgICAgICAgICAgICB0b0RvTmFtZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInN0cmlrZXRocm91Z2hcIilcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgY29uc3QgaGFuZGxlUHJvamVjdEZvcm1TdWJtaXQgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1wcm9qZWN0LWZvcm1cIik7XG4gICAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1mb3JtLWlucHV0XCIpO1xuXG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBkb21NYW5pcHVsYXRpb24uY2xvc2VBZGRQcm9qZWN0Rm9ybSgpXG5cbiAgICAgICAgICAgIC8vIG1ha2UgYW55IGVkaXQgYnV0dG9uIGF2YWlsYWJsZSBhZ2FpblxuICAgICAgICAgICAgc2V0U3RhdHVzKHRydWUpXG5cbiAgICAgICAgICAgIC8vIGFkZCBwcm9qZWN0IG9ubHkgaWYgbmFtZSBpcyBub3QgZW1wdHlcbiAgICAgICAgICAgIGlmICghaW5wdXQudmFsdWUpIHJldHVybiBcbiAgICAgICAgICAgIGVsc2UgZG9tTWFuaXB1bGF0aW9uLmFkZFByb2plY3QoaW5wdXQudmFsdWUpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgUHJvamVjdCBcIkZhY3RvcnlcIiB3aXRoIGlucHV0IHZhbHVlIGFuZCBzYW1wbGUgZGVzY3JpcHRpb24gYW5kIHNhdmUgY3JlYXRlZCBPYmplY3QgaW4gbG9jYWxzdG9yYWdlIGFuZCBfcHJvamVjdHMgYXJyYXlcbiAgICAgICAgICAgIGxldCBuZXdQcm9qZWN0ID0gUHJvamVjdChpbnB1dC52YWx1ZSwgc2FtcGxlcy5nZXRQcm9qZWN0RGVzY3JpcHRpb25TYW1wbGUoKSlcbiAgICAgICAgICAgIHByb2plY3RPYmplY3RTdG9yYWdlLmFkZFByb2plY3RPYmplY3QobmV3UHJvamVjdC5nZXROYW1lKCksIG5ld1Byb2plY3QpO1xuXG4gICAgICAgICAgICBwcm9qZWN0T2JqZWN0U3RvcmFnZS5zZXRDdXJyZW50UHJvamVjdChuZXdQcm9qZWN0KVxuXG4gICAgICAgICAgICBzdG9yYWdlLnNhdmVPYmplY3RUb1N0b3JhZ2UoaW5wdXQudmFsdWUsIG5ld1Byb2plY3QuY3JlYXRlUHJvamVjdE9iamVjdCgpKVxuXG4gICAgICAgICAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXIgdG8gY29ycmVzcG9uZGluZyBuYXZpZ2F0aW9uIGl0ZW1cbiAgICAgICAgICAgIGxldCBkb21Qcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc2VjdGlvbi5wcm9qZWN0Omxhc3QtY2hpbGRgKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBkb21Qcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLnBvcHVsYXRlTWFpbkxheW91dChuZXdQcm9qZWN0LmdldE5hbWUoKSwgbmV3UHJvamVjdC5nZXREZXNjcmlwdGlvbigpKVxuICAgICAgICAgICAgICAgIHByb2plY3RPYmplY3RTdG9yYWdlLnNldEN1cnJlbnRQcm9qZWN0KG5ld1Byb2plY3QpXG4gICAgICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLnJlbW92ZVRvRG9zKClcbiAgICAgICAgICAgICAgICBkb21NYW5pcHVsYXRpb24ucmVuZGVyVG9Eb3MobmV3UHJvamVjdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vcG91bGF0ZSBtYWluIHNlY3Rpb24gd2l0aCBjb3JyZXNwb25kaW5nIHByb2plY3QgaW5mb3JtYXRpb25cbiAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5wb3B1bGF0ZU1haW5MYXlvdXQobmV3UHJvamVjdC5nZXROYW1lKCksIG5ld1Byb2plY3QuZ2V0RGVzY3JpcHRpb24oKSlcblxuXG4gICAgICAgICAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzIHRvIGljb25zIHRvIGRlbGV0ZSBhbmQgY2hhbmdlIGEgcHJvamVjdFxuICAgICAgICAgICAgbGV0IF9wcm9qZWN0RWRpdEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQucHJvamVjdC1lZGl0XCIpXG4gICAgICAgICAgICBsZXQgX3Byb2plY3REZWxldGVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkLnByb2plY3QtZGVsZXRlXCIpXG5cblxuICAgICAgICAgICAgX3Byb2plY3RFZGl0SWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKF9zdGF0dXMpIHsgXG4gICAgICAgICAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5vcGVuRWRpdFByb2plY3RGb3JtKHByb2plY3RPYmplY3RTdG9yYWdlLmdldEN1cnJlbnRQcm9qZWN0KCkpXG4gICAgICAgICAgICAgICAgICAgIHNldFN0YXR1cyhmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlUHJvamVjdEVkaXRGb3JtU3VibWl0KHByb2plY3RPYmplY3RTdG9yYWdlLmdldEN1cnJlbnRQcm9qZWN0KCkpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldHVyblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVQcm9qZWN0RWRpdEZvcm1TdWJtaXQgPSAocHJvamVjdE9iamVjdCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdE9iamVjdClcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdE9iamVjdC5nZXROYW1lKCkpXG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LXByb2plY3QtZm9ybVwiKVxuICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Vzc1wiKVxuICAgICAgICBsZXQgdGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGluZy5tYWluLmZvcm1cIilcbiAgICAgICAgbGV0IHN1YlRpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Yi1oZWFkaW5nLm1haW4uZm9ybVwiKVxuXG5cblxuICAgICAgICAvLyBjaGFuZ2UgcHJvamVjdCBpbmZvcm1hdGlvbiBiYXNlZCBvbiBmb3JtIGlucHV0XG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICAgICAgLy8gbWFrZSBhbnkgZWRpdCBidXR0b24gYXZhaWxhYmxlIGFnYWluXG4gICAgICAgICAgICBzZXRTdGF0dXModHJ1ZSlcblxuICAgICAgICAgICAgLy9jbG9zZSBmb3JtXG4gICAgICAgICAgICBkb21NYW5pcHVsYXRpb24uY2xvc2VFZGl0UHJvamVjdEZvcm0oKVxuXG4gICAgICAgICAgICBwcm9qZWN0T2JqZWN0LnNldE5hbWUodGl0bGVJbnB1dC52YWx1ZSlcbiAgICAgICAgICAgIHByb2plY3RPYmplY3Quc2V0RGVzY3JpcHRpb24oc3ViVGl0bGVJbnB1dC52YWx1ZSlcblxuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvamVjdE9iamVjdC5nZXROYW1lKCkpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0T2JqZWN0LmdldERlc2NyaXB0aW9uKCkpXG5cbiAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5hZGRNYWluTGF5b3V0KClcbiAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5wb3B1bGF0ZU1haW5MYXlvdXQodGl0bGVJbnB1dC52YWx1ZSwgc3ViVGl0bGVJbnB1dC52YWx1ZSlcbiAgICAgICAgfSlcblxuICAgIH1cblxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBidXR0b25BZGRQcm9qZWN0TGlzdGVuZXIsXG4gICAgICAgIGJ1dHRvbkFkZFRvRG9MaXN0ZW5lcixcbiAgICAgICAgdG9Eb0xpc3RlbmVyXG4gICAgfVxufSkoKTtcbiIsImV4cG9ydCBjb25zdCBwcm9qZWN0T2JqZWN0U3RvcmFnZSA9ICgoKSA9PiB7XG5cbiAgICBsZXQgX3Byb2plY3RPYmplY3RTdG9yYWdlID0ge307XG4gICAgbGV0IF9jdXJyZW50UHJvamVjdDtcblxuICAgIGNvbnN0IGdldFByb2plY3RPYmplY3QgPSAodGl0bGUpID0+IHtcbiAgICAgICAgcmV0dXJuIF9wcm9qZWN0T2JqZWN0U3RvcmFnZS50aXRsZVxuICAgIH1cblxuICAgIGNvbnN0IGFkZFByb2plY3RPYmplY3QgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBfcHJvamVjdE9iamVjdFN0b3JhZ2Uua2V5ID0gdmFsdWVcbiAgICB9XG5cbiAgICBjb25zdCBnZXRDdXJyZW50UHJvamVjdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIF9jdXJyZW50UHJvamVjdFxuICAgIH1cblxuICAgIGNvbnN0IHNldEN1cnJlbnRQcm9qZWN0ID0gKG9iamVjdCkgPT4ge1xuICAgICAgICBfY3VycmVudFByb2plY3QgPSBvYmplY3RcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRQcm9qZWN0T2JqZWN0LFxuICAgICAgICBhZGRQcm9qZWN0T2JqZWN0LFxuICAgICAgICBnZXRDdXJyZW50UHJvamVjdCxcbiAgICAgICAgc2V0Q3VycmVudFByb2plY3RcbiAgICB9XG59KSgpOyIsIi8vIEZhY3RvcnkgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgUHJvamVjdFxuXG5leHBvcnQgY29uc3QgUHJvamVjdCA9IChuYW1lLCBkZXNjcmlwdGlvbikgPT4ge1xuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG4gICAgY29uc3Qgc2V0TmFtZSA9IChuZXdOYW1lKSA9PiBuYW1lID0gbmV3TmFtZTtcblxuICAgIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKCkgPT4gZGVzY3JpcHRpb247XG4gICAgY29uc3Qgc2V0RGVzY3JpcHRpb24gPSAobmV3RGVzY3JpcHRpb24pID0+IGRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG5cbiAgICBsZXQgX2Fzc29jaWF0ZWRUb0RvcyA9IFtdO1xuXG4gICAgY29uc3QgZ2V0VG9EbyA9IChpbmRleCkgPT4gX2Fzc29jaWF0ZWRUb0Rvc1tpbmRleF07XG4gICAgY29uc3QgZ2V0QWxsVG9Eb3MgPSAoKSA9PiBfYXNzb2NpYXRlZFRvRG9zO1xuXG4gICAgY29uc3QgYWRkVG9EbyA9IChvYmplY3QpID0+IF9hc3NvY2lhdGVkVG9Eb3MucHVzaChvYmplY3QpXG4gICAgY29uc3QgcmVtb3ZlVG9EbyA9IChpbmRleCkgPT4gX2Fzc29jaWF0ZWRUb0Rvcy5zcGxpY2UoaW5kZXgsIDEpXG5cbiAgICBjb25zdCBfY3JlYXRlVG9Eb3NPYmplY3QgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IFRvRG9zT2JqZWN0ID0ge31cblxuICAgICAgICBfYXNzb2NpYXRlZFRvRG9zLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgICAgIFRvRG9zT2JqZWN0W2UuZ2V0TmFtZSgpXSA9IGUuY3JlYXRlVG9Eb09iamVjdCgpXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIFRvRG9zT2JqZWN0XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlUHJvamVjdE9iamVjdCA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBwcm9qZWN0T2JqZWN0ID0geyBcbiAgICAgICAgICAgIFwibmFtZVwiIDogZ2V0TmFtZSgpLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogZ2V0RGVzY3JpcHRpb24oKSxcbiAgICAgICAgICAgIFwiYXNzb2NpYXRlZFRvRG9zXCIgOiBfY3JlYXRlVG9Eb3NPYmplY3QoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb2plY3RPYmplY3RcbiAgICB9XG5cblxuICAgIHJldHVybiB7Z2V0TmFtZSxcbiAgICAgICAgICAgIHNldE5hbWUsXG4gICAgICAgICAgICBzZXREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGdldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0VG9EbyxcbiAgICAgICAgICAgIGFkZFRvRG8sXG4gICAgICAgICAgICByZW1vdmVUb0RvLFxuICAgICAgICAgICAgZ2V0QWxsVG9Eb3MsXG4gICAgICAgICAgICBjcmVhdGVQcm9qZWN0T2JqZWN0LFxuICAgICAgICB9XG59XG5cblxuXG4iLCJleHBvcnQgY29uc3Qgc3RvcmFnZSA9ICgoKSA9PiB7XG5cbiAgICBjb25zdCBzYXZlT2JqZWN0VG9TdG9yYWdlID0gKGtleSwgb2JqZWN0KSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KG9iamVjdCkpXG4gICAgfVxuXG4gICAgY29uc3QgZ2V0T2JqZWN0RnJvbVN0b3JhZ2UgPSAoa2V5KSA9PiB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2F2ZU9iamVjdFRvU3RvcmFnZSxcbiAgICAgICAgZ2V0T2JqZWN0RnJvbVN0b3JhZ2VcbiAgICB9XG4gICAgXG59KSgpOyIsIi8vIEZhY3RvcnkgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgVG9Eb1xuXG5leHBvcnQgY29uc3QgVG9EbyA9IChuYW1lLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgc3RhdHVzKSA9PiB7XG5cbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgICBjb25zdCBzZXROYW1lID0gKG5ld05hbWUpID0+IG5hbWUgPSBuZXdOYW1lO1xuXG4gICAgY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAoKSA9PiBkZXNjcmlwdGlvbjtcbiAgICBjb25zdCBzZXREZXNjcmlwdGlvbiA9IChuZXdEZXNjcmlwdGlvbikgPT4gZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcblxuICAgIGNvbnN0IGdldER1ZURhdGUgPSAoKSA9PiBkdWVEYXRlO1xuICAgIGNvbnN0IHNldER1ZURhdGUgPSAobmV3RHVlRGF0ZSkgPT4gZHVlRGF0ZSA9IG5ld0R1ZURhdGU7IFxuXG4gICAgY29uc3QgZ2V0U3RhdHVzID0gKCkgPT4gc3RhdHVzXG4gICAgY29uc3QgdG9nZ2xlU3RhdHVzID0gKCkgPT4ge1xuICAgICAgICBzdGF0dXMgPSBzdGF0dXMgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIHJldHVybiBzdGF0dXNcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVUb0RvT2JqZWN0ID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCB0b0RvT2JqZWN0ID0ge1xuICAgICAgICAgICAgXCJuYW1lXCIgOiBnZXROYW1lKCksXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBnZXREZXNjcmlwdGlvbigpLFxuICAgICAgICAgICAgXCJkdWVEYXRlXCIgOiBnZXREdWVEYXRlKCksXG4gICAgICAgICAgICBcInN0YXR1c1wiIDogZ2V0U3RhdHVzKClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b0RvT2JqZWN0XG4gICAgfVxuXG4gICAgcmV0dXJuIHtnZXROYW1lLFxuICAgICAgICAgICAgc2V0TmFtZSwgXG4gICAgICAgICAgICBzZXREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGdldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0RHVlRGF0ZSxcbiAgICAgICAgICAgIHNldER1ZURhdGUsXG4gICAgICAgICAgICBnZXRTdGF0dXMsXG4gICAgICAgICAgICB0b2dnbGVTdGF0dXMsXG4gICAgICAgICAgICBjcmVhdGVUb0RvT2JqZWN0fVxufVxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFRvRG8gfSBmcm9tICcuL3RvZG9zL3RvZG9zLmpzJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3RzL3Byb2plY3RzLmpzJztcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZS5qcydcbmltcG9ydCB7IGRvbU1hbmlwdWxhdGlvbiwgZXZlbnRMaXN0ZW5lciwgZm9ybUxvZ2ljIH0gZnJvbSAnLi9VSS91aS5qcyc7XG5cbmV2ZW50TGlzdGVuZXIuYnV0dG9uQWRkUHJvamVjdExpc3RlbmVyKClcbmV2ZW50TGlzdGVuZXIuYnV0dG9uQWRkVG9Eb0xpc3RlbmVyKClcblxuXG5cblxuLy9kb21NYW5pcHVsYXRpb24ucmVtb3ZlUHJvamVjdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKSlcblxuLypcbmNvbnN0IG5ld1Byb2plY3QgPSBQcm9qZWN0KFwiU2Nob29sXCIsIFwidGhpcyBwcm9qZWN0IGlzIGZvciBvcmdhbml6aW5nIG15IHNjaG9vbCB3b3JrXCIpO1xuXG5jb25zdCBmaXJzdFRvRG8gPSBUb0RvKFwiRG8gc29tZXRoaW5nXCIsIFwiR2V0IG9uIG15IExldmVsXCIsIFwiMTguMTAuMjAwMFwiLCBmYWxzZSlcbmNvbnN0IHNlY29uZFRvRG8gPSBUb0RvKFwiRG8gc29tZXRoaW5nIGVsc2VcIiwgXCJTZXQgb24gbXkgTGV2ZWxcIiwgXCIxMy4xMC4yMDAwXCIsIGZhbHNlKVxubmV3UHJvamVjdC5hZGRUb0RvKGZpcnN0VG9Ebylcbm5ld1Byb2plY3QuYWRkVG9EbyhzZWNvbmRUb0RvKVxuXG5sZXQgdmFsaWRPYmplY3QgPSBuZXdQcm9qZWN0LmNyZWF0ZVByb2plY3RPYmplY3QoKTtcblxuc3RvcmFnZS5zYXZlT2JqZWN0VG9TdG9yYWdlKG5ld1Byb2plY3QuZ2V0TmFtZSgpLCB2YWxpZE9iamVjdClcblxuY29uc29sZS5sb2coc3RvcmFnZS5nZXRPYmplY3RGcm9tU3RvcmFnZShcIlNjaG9vbFwiKSlcbiovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9