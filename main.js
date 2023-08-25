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

    //this function replaces the respective parts in the todo container with html to create a form without deleting the nodes
    const openEditToDoForm = (respectiveToDoElement, toDoObject) => {

        let html = `<div class="todo-container" id="edit-todo-form-container">
                        <form id="edit-todo-form">
                            <input type="text" class="todo-name" value="${toDoObject.getName()}">
                            <div class="associated-project"></div>
                            <div class="todo-icons">
                                <input type="date" class="todo-date" value="${toDoObject.getDueDate()}">
                                <span class="material-symbols-outlined todo">check_box_outline_blank</span>
                                <span class="material-symbols-outlined todo">edit</span>
                                <span class="material-symbols-outlined todo">delete</span>
                            </div>
                            <input type="submit">
                        </form>
                    </div>`


        respectiveToDoElement.insertAdjacentHTML("afterend", html)

        respectiveToDoElement.remove()

        //remove name and date elements


        
    }

    const closeEditToDoForm = (toDoObject) => {

        let formContainer = document.getElementById("edit-todo-form-container")
        let checkIcon = toDoObject.getStatus() ? "check_box" : "check_box_outline_blank"

        let html = `<div class="todo-container">
                        <div class="todo-name">${toDoObject.getName()}</div>
                        <div class="associated-project"></div>
                        <div class="todo-icons">
                            <div class="todo-date">${toDoObject.getDueDate()}</div>
                            <span class="material-symbols-outlined todo check">${checkIcon}</span>
                            <span class="material-symbols-outlined todo edit">edit</span>
                            <span class="material-symbols-outlined todo delete">delete</span>
                        </div>
                    </div>`

        // insert todo card
        formContainer.insertAdjacentHTML("afterend", html)
    
        // add event listener

        let todoContainer = document.querySelector("#edit-todo-form-container+.todo-container")
        eventListener.toDoListener(todoContainer, toDoObject)

        // close form
        formContainer.remove()


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

        

        for (let key in toDoArray) {
            renderOneToDo(toDoArray[key])
        }
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
        removeToDos,
        openEditToDoForm,
        closeEditToDoForm
    }
})();














const eventListener = (() => {

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
            let project = _projects_project_storage_js__WEBPACK_IMPORTED_MODULE_4__.projectObjectStorage.getCurrentProject()
            project.addToDo(newToDo, newToDo.getName())

            // Make any button available again
            setStatus(true)
            domManipulation.renderOneToDo(newToDo)

        })
    }

    const toDoListener = (element, todo) => {

        let checkIcon = element.querySelector(".todo.check");
        let editIcon = element.querySelector(".todo.edit");
        let deleteIcon = element.querySelector(".todo.delete");
        let toDoNameElement = element.querySelector(".todo-name")
        let toDoDateElement = element.querySelector(".todo-date")

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

        editIcon.addEventListener("click", () => {

            if (_status) {
                setStatus(false);
                domManipulation.openEditToDoForm(element, todo);
                _handleEditToDoFormSubmit(todo)
            } else return
        })

        deleteIcon.addEventListener("click", () => {

            // remove todo from user interface
            deleteIcon.parentElement.parentElement.remove()

            let project = _projects_project_storage_js__WEBPACK_IMPORTED_MODULE_4__.projectObjectStorage.getCurrentProject()

            project.removeToDo(todo.getName())

            console.table(project.getAllToDos())
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
            newProject.setProjectDomElement(domProject)
            
            domProject.addEventListener("click", () => {
                domManipulation.populateMainLayout(newProject.getName(), newProject.getDescription())
                _projects_project_storage_js__WEBPACK_IMPORTED_MODULE_4__.projectObjectStorage.setCurrentProject(newProject)
                domManipulation.removeToDos()
                domManipulation.renderToDos(newProject)
            })
            
            //poulate main section with corresponding project information
            domManipulation.populateMainLayout(newProject.getName(), newProject.getDescription())


            // add event listeners to icons to delete and change a project
            let projectEditIcon = document.querySelector(".material-symbols-outlined.project-edit")
            let projectDeleteIcon = document.querySelector(".material-symbols-outlined.project-delete")


            projectEditIcon.addEventListener("click", () => {

                if (_status) { 
                    domManipulation.openEditProjectForm(_projects_project_storage_js__WEBPACK_IMPORTED_MODULE_4__.projectObjectStorage.getCurrentProject())
                    setStatus(false)
                    handleProjectEditFormSubmit(_projects_project_storage_js__WEBPACK_IMPORTED_MODULE_4__.projectObjectStorage.getCurrentProject())
                } else return
            })

            projectDeleteIcon.addEventListener("click", () => {
                if (_status) {
                    // remove project object from storage
                    _projects_project_storage_js__WEBPACK_IMPORTED_MODULE_4__.projectObjectStorage.removeProjectObject(_projects_project_storage_js__WEBPACK_IMPORTED_MODULE_4__.projectObjectStorage.getCurrentProject().getName())
                    
                    //domManipulation.removeProject(domProject)
                    _projects_project_storage_js__WEBPACK_IMPORTED_MODULE_4__.projectObjectStorage.getCurrentProject().getProjectDomElement().remove()
                    
                    // JUMP TO ALL PAGE


                } else return
            })

        })
    }

    const handleProjectEditFormSubmit = (projectObject) => {

        let form = document.getElementById("edit-project-form")
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

            domManipulation.addMainLayout()
            domManipulation.populateMainLayout(titleInput.value, subTitleInput.value)
        })

    }

    const _handleEditToDoFormSubmit = (toDoObject) => {
        
        let form = document.getElementById("edit-todo-form")
        let nameInput = form.querySelector("input.todo-name")
        let dateInput = form.querySelector("input.todo-date")

        form.addEventListener("submit", (e) => {
            
            e.preventDefault()

            // make any edit button available again
            setStatus(true)

            // change form details
            toDoObject.setName(nameInput.value)
            toDoObject.setDueDate(dateInput.value)

            // close form
            domManipulation.closeEditToDoForm(toDoObject)
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
        return _projectObjectStorage[title]
    }

    const addProjectObject = (key, value) => {
        _projectObjectStorage[key] = value
    }

    const getCurrentProject = () => {
        return _currentProject
    }

    const setCurrentProject = (object) => {
        _currentProject = object
    }

    const removeProjectObject = (key) => {
        delete _projectObjectStorage[key]
    }

    return {
        getProjectObject,
        addProjectObject,
        getCurrentProject,
        setCurrentProject,
        removeProjectObject
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

    let _associatedToDos = {};

    const getToDo = (index) => _associatedToDos[index];
    const getAllToDos = () => _associatedToDos;

    let _projectDomElement;

    const setProjectDomElement = (newDomElement) => _projectDomElement = newDomElement;
    const getProjectDomElement = () =>{ return _projectDomElement }

    const addToDo = (object, toDoName) => _associatedToDos[toDoName] = object
    const removeToDo = (todoName) => delete _associatedToDos[todoName];

    const _createToDosObject = () => {

        let ToDosObject = {}

        for (let todo in _associatedToDos) {

        }
        // IMPLEMENT ABOVE LOOP IF NEEDED
        // BELOW LOOP DOES NOT WORK

        //_associatedToDos.forEach((e) => {
        //    ToDosObject[e.getName()] = e.createToDoObject()
        //})

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
            setProjectDomElement,
            getProjectDomElement
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1h3QztBQUNTO0FBQ0g7QUFDUjtBQUMrQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTzs7OztBQUlQOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwrQ0FBK0MsS0FBSztBQUNwRDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrRUFBa0Usd0JBQXdCO0FBQzFGLDRFQUE0RSwrQkFBK0I7QUFDM0c7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwRUFBMEUscUJBQXFCO0FBQy9GO0FBQ0E7QUFDQSw4RUFBOEUsd0JBQXdCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaURBQWlELHFCQUFxQjtBQUN0RTtBQUNBO0FBQ0EscURBQXFELHdCQUF3QjtBQUM3RSxpRkFBaUYsVUFBVTtBQUMzRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlEQUFpRCxTQUFTO0FBQzFEO0FBQ0E7QUFDQSxxREFBcUQsU0FBUztBQUM5RCxpRkFBaUYsVUFBVTtBQUMzRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUFlTTs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLFNBQVM7O0FBRVQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQixxREFBSTtBQUM5QjtBQUNBO0FBQ0EsMEJBQTBCLDhFQUFvQjtBQUM5Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsU0FBUzs7QUFFVDs7QUFFQTtBQUNBOztBQUVBLDBCQUEwQiw4RUFBb0I7O0FBRTlDOztBQUVBO0FBQ0EsU0FBUztBQUNUOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCLDhEQUFPLGNBQWMsZ0RBQU87QUFDekQsWUFBWSw4RUFBb0I7O0FBRWhDLFlBQVksOEVBQW9CO0FBQ2hDLFlBQVksd0RBQU87O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw4RUFBb0I7QUFDcEM7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQSx3REFBd0QsOEVBQW9CO0FBQzVFO0FBQ0EsZ0RBQWdELDhFQUFvQjtBQUNwRSxrQkFBa0I7QUFDbEIsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsOEVBQW9CLHFCQUFxQiw4RUFBb0I7QUFDakY7QUFDQTtBQUNBLG9CQUFvQiw4RUFBb0I7QUFDeEM7QUFDQTs7O0FBR0Esa0JBQWtCO0FBQ2xCLGFBQWE7O0FBRWIsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDNWZNOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDaENEOztBQUVPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esd0NBQXdDOztBQUV4QztBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ2ZEOztBQUVPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7VUN4Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ053QztBQUNTO0FBQ0g7QUFDeUI7O0FBRXZFLG9EQUFhO0FBQ2Isb0RBQWE7Ozs7O0FBS2I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvVUkvc2FtcGxlcy5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvVUkvdWkuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL3Byb2plY3RzL3Byb2plY3Rfc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvcHJvamVjdHMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL3N0b3JhZ2Uvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvdG9kb3MvdG9kb3MuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBzYW1wbGVzID0gKCgpID0+IHtcblxuICAgIGxldCBfcHJvamVjdERlc2NyaXB0aW9uU2FtcGxlID0gXCJDbGljayB0aGUgYnV0dG9uIG9uIHRoZSByaWdodCB0byBjaGFuZ2UgdGhlIGRlc2NyaXB0aW9uIVwiXG5cbiAgICBjb25zdCBnZXRQcm9qZWN0RGVzY3JpcHRpb25TYW1wbGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBfcHJvamVjdERlc2NyaXB0aW9uU2FtcGxlXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0UHJvamVjdERlc2NyaXB0aW9uU2FtcGxlXG4gICAgfVxufSkoKTsiLCJpbXBvcnQgeyBUb0RvIH0gZnJvbSAnLi4vdG9kb3MvdG9kb3MuanMnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uL3Byb2plY3RzL3Byb2plY3RzLmpzJztcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICcuLi9zdG9yYWdlL3N0b3JhZ2UuanMnXG5pbXBvcnQgeyBzYW1wbGVzIH0gZnJvbSAnLi9zYW1wbGVzLmpzJztcbmltcG9ydCB7IHByb2plY3RPYmplY3RTdG9yYWdlIH0gZnJvbSAnLi4vcHJvamVjdHMvcHJvamVjdF9zdG9yYWdlLmpzJztcbi8vICAgRnVuY3Rpb25hbGl0aWVzXG4vLyAgIFxuLy8gICAgIGFkZCBwcm9qZWN0IHRvIGRvbVxuLy8gICAgIGFkZCB0b2RvIHRvIGRvbVxuLy9cbi8vICAgICByZW1vdmUgcHJvamVjdCBmcm9tIGRvbVxuLy8gICAgIHJlbW92ZSB0b2RvIGZyb20gZG9tXG4vLyAgICAgXG4vLyAgICAgY2hhbmdlIGludGVyZmFjZSBiYXNlZCBvbiBuYXZpZ2F0aW9uXG4vLyAgICAgY2hhbmdlIGhpZ2hsaWdodGluZyBvZiBuYXZpZ2F0aW9uIGl0ZW1zXG4vL1xuLy9cbi8vICAgICAgVG9EbzogXG4vLyAgICAgICAgICAgICAgLSB3cml0ZSBmdW5jdGlvbnMgcmVuZGVyIExheW91dCAmIHJlbmRlciBUb0Rvc1xuLy8gICAgICAgICAgICAgIC0gcHJvamVjdCBhcnJheS9vYmplY3QgaW4gc2VwZXJhdGUgbG9naWNcbi8vXG5cbmV4cG9ydCBjb25zdCBkb21NYW5pcHVsYXRpb24gPSAoKCkgPT4ge1xuXG5cblxuICAgIGNvbnN0IGFkZFByb2plY3QgPSAobmFtZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKTtcblxuICAgICAgICBsZXQgaHRtbCA9IChgPHNlY3Rpb24gY2xhc3M9XCJwcm9qZWN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRcIj5Ub2M8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvamVjdFwiPiR7bmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPmApXG5cbiAgICAgICAgcHJvamVjdERPTS5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgaHRtbClcbiAgICB9XG5cbiAgICBjb25zdCBvcGVuQWRkUHJvamVjdEZvcm0gPSAoKSA9PiB7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdERPTSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cycpO1xuXG4gICAgICAgIGxldCBodG1sID0gKGA8c2VjdGlvbiBpZD1cInByb2plY3QtZm9ybS1zZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRcIj50b2M8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBpZD1cIm5ldy1wcm9qZWN0LWZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJwcm9qZWN0LWZvcm0taW5wdXRcIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPmApXG5cbiAgICAgICAgcHJvamVjdERPTS5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgaHRtbClcbiAgICB9XG5cbiAgICBjb25zdCBjbG9zZUFkZFByb2plY3RGb3JtID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBhZGRQcm9qZWN0Rm9ybURvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzZWN0aW9uI3Byb2plY3QtZm9ybS1zZWN0aW9uXCIpXG4gICAgICAgIGFkZFByb2plY3RGb3JtRG9tLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgY29uc3Qgb3BlbkVkaXRQcm9qZWN0Rm9ybSA9IChwcm9qZWN0T2JqZWN0KSA9PiB7XG5cbiAgICAgICAgY29uc3QgdGl0bGVEZXNjcmlwdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLnRpdGxlLWRlc2NyaXB0aW9uXCIpXG4gICAgICAgIGNvbnN0IHByb2plY3RUaXRsZURvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGluZy5tYWluXCIpXG4gICAgICAgIGNvbnN0IHByb2plY3REZXNjcmlwdGlvbkRvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3ViLWhlYWRpbmcubWFpblwiKTtcbiAgICAgICAgXG4gICAgICAgIHByb2plY3RUaXRsZURvbS5yZW1vdmUoKVxuICAgICAgICBwcm9qZWN0RGVzY3JpcHRpb25Eb20ucmVtb3ZlKClcblxuICAgICAgICBsZXQgaHRtbCA9IChgPGZvcm0gaWQ9XCJlZGl0LXByb2plY3QtZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaGVhZGluZyBtYWluIGZvcm1cIiB2YWx1ZT1cIiR7cHJvamVjdE9iamVjdC5nZXROYW1lKCl9XCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInN1Yi1oZWFkaW5nIG1haW4gZm9ybVwiIHBsYWNlaG9sZGVyPVwiJHtwcm9qZWN0T2JqZWN0LmdldERlc2NyaXB0aW9uKCl9XCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCI+XG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5gKVxuXG4gICAgICAgIHRpdGxlRGVzY3JpcHRpb25Db250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlYmVnaW5cIiwgaHRtbClcbiAgICB9XG5cbiAgICBjb25zdCBvcGVuQWRkVG9Eb0Zvcm0gPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IG1haW5BbmtlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzZWN0aW9uLnRvZG8tbWFpblwiKTtcblxuICAgICAgICBsZXQgaHRtbCA9IGA8ZGl2IGNsYXNzPVwidG9kby1jb250YWluZXJcIiBpZD1cImFkZC10b2RvLWZvcm0tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBpZD1cImFkZC10b2RvLWZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInRvZG8tbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhc3NvY2lhdGVkLXByb2plY3RcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1pY29uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBjbGFzcz1cInRvZG8tZGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdG9kb1wiPmNoZWNrX2JveF9vdXRsaW5lX2JsYW5rPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdG9kb1wiPmVkaXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0b2RvXCI+ZGVsZXRlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgXG4gICAgICAgIG1haW5Bbmtlci5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgaHRtbClcbiAgICB9XG5cbiAgICBjb25zdCBjbG9zZUFkZFRvRG9Gb3JtID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBhZGRUb2RvRm9ybURvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRvZG8tZm9ybS1jb250YWluZXJcIilcbiAgICAgICAgYWRkVG9kb0Zvcm1Eb20ucmVtb3ZlKClcbiAgICB9XG5cbiAgICAvL3RoaXMgZnVuY3Rpb24gcmVwbGFjZXMgdGhlIHJlc3BlY3RpdmUgcGFydHMgaW4gdGhlIHRvZG8gY29udGFpbmVyIHdpdGggaHRtbCB0byBjcmVhdGUgYSBmb3JtIHdpdGhvdXQgZGVsZXRpbmcgdGhlIG5vZGVzXG4gICAgY29uc3Qgb3BlbkVkaXRUb0RvRm9ybSA9IChyZXNwZWN0aXZlVG9Eb0VsZW1lbnQsIHRvRG9PYmplY3QpID0+IHtcblxuICAgICAgICBsZXQgaHRtbCA9IGA8ZGl2IGNsYXNzPVwidG9kby1jb250YWluZXJcIiBpZD1cImVkaXQtdG9kby1mb3JtLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gaWQ9XCJlZGl0LXRvZG8tZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidG9kby1uYW1lXCIgdmFsdWU9XCIke3RvRG9PYmplY3QuZ2V0TmFtZSgpfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhc3NvY2lhdGVkLXByb2plY3RcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1pY29uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBjbGFzcz1cInRvZG8tZGF0ZVwiIHZhbHVlPVwiJHt0b0RvT2JqZWN0LmdldER1ZURhdGUoKX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG9cIj5jaGVja19ib3hfb3V0bGluZV9ibGFuazwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG9cIj5lZGl0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdG9kb1wiPmRlbGV0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gXG5cblxuICAgICAgICByZXNwZWN0aXZlVG9Eb0VsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJlbmRcIiwgaHRtbClcblxuICAgICAgICByZXNwZWN0aXZlVG9Eb0VsZW1lbnQucmVtb3ZlKClcblxuICAgICAgICAvL3JlbW92ZSBuYW1lIGFuZCBkYXRlIGVsZW1lbnRzXG5cblxuICAgICAgICBcbiAgICB9XG5cbiAgICBjb25zdCBjbG9zZUVkaXRUb0RvRm9ybSA9ICh0b0RvT2JqZWN0KSA9PiB7XG5cbiAgICAgICAgbGV0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtdG9kby1mb3JtLWNvbnRhaW5lclwiKVxuICAgICAgICBsZXQgY2hlY2tJY29uID0gdG9Eb09iamVjdC5nZXRTdGF0dXMoKSA/IFwiY2hlY2tfYm94XCIgOiBcImNoZWNrX2JveF9vdXRsaW5lX2JsYW5rXCJcblxuICAgICAgICBsZXQgaHRtbCA9IGA8ZGl2IGNsYXNzPVwidG9kby1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLW5hbWVcIj4ke3RvRG9PYmplY3QuZ2V0TmFtZSgpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFzc29jaWF0ZWQtcHJvamVjdFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8taWNvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1kYXRlXCI+JHt0b0RvT2JqZWN0LmdldER1ZURhdGUoKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdG9kbyBjaGVja1wiPiR7Y2hlY2tJY29ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdG9kbyBlZGl0XCI+ZWRpdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdG9kbyBkZWxldGVcIj5kZWxldGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+YFxuXG4gICAgICAgIC8vIGluc2VydCB0b2RvIGNhcmRcbiAgICAgICAgZm9ybUNvbnRhaW5lci5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmVuZFwiLCBodG1sKVxuICAgIFxuICAgICAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJcblxuICAgICAgICBsZXQgdG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC10b2RvLWZvcm0tY29udGFpbmVyKy50b2RvLWNvbnRhaW5lclwiKVxuICAgICAgICBldmVudExpc3RlbmVyLnRvRG9MaXN0ZW5lcih0b2RvQ29udGFpbmVyLCB0b0RvT2JqZWN0KVxuXG4gICAgICAgIC8vIGNsb3NlIGZvcm1cbiAgICAgICAgZm9ybUNvbnRhaW5lci5yZW1vdmUoKVxuXG5cbiAgICB9XG5cbiAgICBjb25zdCBjbG9zZUVkaXRQcm9qZWN0Rm9ybSA9ICgpID0+IHtcblxuICAgICAgICBsZXQgZWRpdFByb2plY3RGb3JtRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImZvcm0jZWRpdC1wcm9qZWN0LWZvcm1cIilcbiAgICAgICAgZWRpdFByb2plY3RGb3JtRG9tLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlUHJvamVjdCA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKClcbiAgICB9XG4gICAgXG4gICAgXG4gICAgY29uc3QgcG9wdWxhdGVNYWluTGF5b3V0ID0gKHRpdGxlLCBzdWJUaXRsZSkgPT4ge1xuXG4gICAgICAgIGxldCBkb21UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGluZy5tYWluXCIpO1xuICAgICAgICBsZXQgZG9tU3ViVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Yi1oZWFkaW5nLm1haW5cIik7XG5cbiAgICAgICAgXG4gICAgICAgIGRvbVRpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7XG4gICAgICAgIGRvbVN1YlRpdGxlLnRleHRDb250ZW50ID0gc3ViVGl0bGU7XG4gICAgfVxuXG4gICAgY29uc3QgYWRkTWFpbkxheW91dCA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBtYWluQW5rZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZGl2LmNvbnRhaW5lci1tYWluXCIpXG4gICAgICAgIGxldCBodG1sID0gYDxkaXYgY2xhc3M9XCJjb250YWluZXIgdGl0bGUtZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkaW5nIG1haW5cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWItaGVhZGluZyBtYWluXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PmBcblxuICAgICAgICBtYWluQW5rZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCBodG1sKVxuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlclRvRG9zID0gKHByb2plY3QpID0+IHtcblxuICAgICAgICBsZXQgdG9Eb0FycmF5ID0gcHJvamVjdC5nZXRBbGxUb0RvcygpO1xuXG4gICAgICAgIFxuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0b0RvQXJyYXkpIHtcbiAgICAgICAgICAgIHJlbmRlck9uZVRvRG8odG9Eb0FycmF5W2tleV0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJPbmVUb0RvID0gKHRvRG8pID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBtYWluQW5rZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbi50b2RvLW1haW5cIilcblxuICAgICAgICBsZXQgdG9Eb05hbWUgPSB0b0RvLmdldE5hbWUoKTtcbiAgICAgICAgbGV0IHRvRG9EYXRlID0gdG9Eby5nZXREdWVEYXRlKCk7XG4gICAgICAgIGxldCB0b0RvQ2hlY2sgPSB0b0RvLmdldFN0YXR1cygpO1xuICAgICAgICBsZXQgY2hlY2tJY29uID0gdG9Eb0NoZWNrID8gXCJjaGVja19ib3hcIiA6IFwiY2hlY2tfYm94X291dGxpbmVfYmxhbmtcIlxuXG4gICAgICAgIGxldCBodG1sID0gYDxkaXYgY2xhc3M9XCJ0b2RvLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tbmFtZVwiPiR7dG9Eb05hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXNzb2NpYXRlZC1wcm9qZWN0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1pY29uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWRhdGVcIj4ke3RvRG9EYXRlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0b2RvIGNoZWNrXCI+JHtjaGVja0ljb259PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0b2RvIGVkaXRcIj5lZGl0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0b2RvIGRlbGV0ZVwiPmRlbGV0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gXG5cbiAgICAgICAgbWFpbkFua2VyLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBodG1sKVxuXG4gICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIGxldCBsYXRlc3RUb0RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWNvbnRhaW5lcjpsYXN0LWNoaWxkXCIpXG4gICAgICAgIGV2ZW50TGlzdGVuZXIudG9Eb0xpc3RlbmVyKGxhdGVzdFRvRG8sIHRvRG8pXG5cbiAgICB9XG5cbiAgICBjb25zdCByZW1vdmVUb0RvcyA9ICgpID0+IHtcblxuICAgICAgICBsZXQgdG9Eb3NEb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRvZG8tY29udGFpbmVyXCIpXG5cbiAgICAgICAgdG9Eb3NEb20uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKVxuICAgICAgICB9KVxuICAgIH1cblxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRQcm9qZWN0LFxuICAgICAgICByZW1vdmVQcm9qZWN0LFxuICAgICAgICBvcGVuQWRkUHJvamVjdEZvcm0sXG4gICAgICAgIGNsb3NlQWRkUHJvamVjdEZvcm0sXG4gICAgICAgIHBvcHVsYXRlTWFpbkxheW91dCxcbiAgICAgICAgYWRkTWFpbkxheW91dCxcbiAgICAgICAgb3BlbkVkaXRQcm9qZWN0Rm9ybSxcbiAgICAgICAgb3BlbkFkZFRvRG9Gb3JtLFxuICAgICAgICBjbG9zZUFkZFRvRG9Gb3JtLFxuICAgICAgICBjbG9zZUVkaXRQcm9qZWN0Rm9ybSxcbiAgICAgICAgcmVuZGVyVG9Eb3MsXG4gICAgICAgIHJlbmRlck9uZVRvRG8sXG4gICAgICAgIHJlbW92ZVRvRG9zLFxuICAgICAgICBvcGVuRWRpdFRvRG9Gb3JtLFxuICAgICAgICBjbG9zZUVkaXRUb0RvRm9ybVxuICAgIH1cbn0pKCk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuZXhwb3J0IGNvbnN0IGV2ZW50TGlzdGVuZXIgPSAoKCkgPT4ge1xuXG4gICAgbGV0IF9zdGF0dXMgPSB0cnVlO1xuXG4gICAgY29uc3Qgc2V0U3RhdHVzID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIF9zdGF0dXMgPSB2YWx1ZVxuICAgIH1cblxuICAgIGNvbnN0IGJ1dHRvbkFkZFByb2plY3RMaXN0ZW5lciA9ICgpID0+IHtcblxuICAgICAgICBsZXQgYWRkUHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0XCIpXG4gICAgICAgIFxuICAgICAgICBhZGRQcm9qZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyBcblxuICAgICAgICAgICAgLy8gb3BlbiBmb3JtIHZpYSBkb20gbW9kdWxlIGFuZCBzZXQgdXAgZXZlbnQgbGlzdGVuZXIgZm9yIHN1Ym1pdHRpbmcgdGhlIGZvcm1cbiAgICAgICAgICAgIGlmIChfc3RhdHVzKSB7IFxuICAgICAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5vcGVuQWRkUHJvamVjdEZvcm0oKTtcbiAgICAgICAgICAgICAgICBoYW5kbGVQcm9qZWN0Rm9ybVN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgIHNldFN0YXR1cyhmYWxzZSlcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm5cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBidXR0b25BZGRUb0RvTGlzdGVuZXIgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGFkZFRvRG9FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdG8tZG9cIilcbiAgICAgICAgXG4gICAgICAgIGFkZFRvRG9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IFxuXG4gICAgICAgICAgICAvLyBvcGVuIGZvcm0gdmlhIGRvbSBtb2R1bGUgYW5kIHNldCB1cCBldmVudCBsaXN0ZW5lciBmb3Igc3VibWl0dGluZyB0aGUgZm9ybVxuICAgICAgICAgICAgaWYgKF9zdGF0dXMpIHsgXG4gICAgICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLm9wZW5BZGRUb0RvRm9ybSgpO1xuICAgICAgICAgICAgICAgIGhhbmRsZVRvRG9Gb3JtU3VibWl0KCk7XG4gICAgICAgICAgICAgICAgc2V0U3RhdHVzKGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm5cbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZVRvRG9Gb3JtU3VibWl0ID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdG9kby1mb3JtLWNvbnRhaW5lclwiKTtcbiAgICAgICAgbGV0IHRvZG9OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0LnRvZG8tbmFtZVwiKTtcbiAgICAgICAgbGV0IHRvZG9EYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0LnRvZG8tZGF0ZVwiKTtcblxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5jbG9zZUFkZFRvRG9Gb3JtKCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBUb0RvIG9iamVjdFxuICAgICAgICAgICAgbGV0IG5ld1RvRG8gPSBUb0RvKHRvZG9OYW1lLnZhbHVlLCBcIlwiLCB0b2RvRGF0ZS52YWx1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBhZGQgdG9kbyB0byBhc3Nvc2lhdGVkIHByb2plY3RcbiAgICAgICAgICAgIGxldCBwcm9qZWN0ID0gcHJvamVjdE9iamVjdFN0b3JhZ2UuZ2V0Q3VycmVudFByb2plY3QoKVxuICAgICAgICAgICAgcHJvamVjdC5hZGRUb0RvKG5ld1RvRG8sIG5ld1RvRG8uZ2V0TmFtZSgpKVxuXG4gICAgICAgICAgICAvLyBNYWtlIGFueSBidXR0b24gYXZhaWxhYmxlIGFnYWluXG4gICAgICAgICAgICBzZXRTdGF0dXModHJ1ZSlcbiAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5yZW5kZXJPbmVUb0RvKG5ld1RvRG8pXG5cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCB0b0RvTGlzdGVuZXIgPSAoZWxlbWVudCwgdG9kbykgPT4ge1xuXG4gICAgICAgIGxldCBjaGVja0ljb24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby5jaGVja1wiKTtcbiAgICAgICAgbGV0IGVkaXRJY29uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8uZWRpdFwiKTtcbiAgICAgICAgbGV0IGRlbGV0ZUljb24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby5kZWxldGVcIik7XG4gICAgICAgIGxldCB0b0RvTmFtZUVsZW1lbnQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1uYW1lXCIpXG4gICAgICAgIGxldCB0b0RvRGF0ZUVsZW1lbnQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1kYXRlXCIpXG5cbiAgICAgICAgY2hlY2tJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRvZG8udG9nZ2xlU3RhdHVzKClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRvZG8uZ2V0U3RhdHVzKCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBjaGVja0ljb24udGV4dENvbnRlbnQgPSBcImNoZWNrX2JveFwiXG4gICAgICAgICAgICAgICAgdG9Eb05hbWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzdHJpa2V0aHJvdWdoXCIpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNoZWNrSWNvbi50ZXh0Q29udGVudCA9IFwiY2hlY2tfYm94X291dGxpbmVfYmxhbmtcIlxuICAgICAgICAgICAgICAgIHRvRG9OYW1lRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic3RyaWtldGhyb3VnaFwiKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgZWRpdEljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblxuICAgICAgICAgICAgaWYgKF9zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBzZXRTdGF0dXMoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5vcGVuRWRpdFRvRG9Gb3JtKGVsZW1lbnQsIHRvZG8pO1xuICAgICAgICAgICAgICAgIF9oYW5kbGVFZGl0VG9Eb0Zvcm1TdWJtaXQodG9kbylcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm5cbiAgICAgICAgfSlcblxuICAgICAgICBkZWxldGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSB0b2RvIGZyb20gdXNlciBpbnRlcmZhY2VcbiAgICAgICAgICAgIGRlbGV0ZUljb24ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpXG5cbiAgICAgICAgICAgIGxldCBwcm9qZWN0ID0gcHJvamVjdE9iamVjdFN0b3JhZ2UuZ2V0Q3VycmVudFByb2plY3QoKVxuXG4gICAgICAgICAgICBwcm9qZWN0LnJlbW92ZVRvRG8odG9kby5nZXROYW1lKCkpXG5cbiAgICAgICAgICAgIGNvbnNvbGUudGFibGUocHJvamVjdC5nZXRBbGxUb0RvcygpKVxuICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgY29uc3QgaGFuZGxlUHJvamVjdEZvcm1TdWJtaXQgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1wcm9qZWN0LWZvcm1cIik7XG4gICAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1mb3JtLWlucHV0XCIpO1xuXG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBkb21NYW5pcHVsYXRpb24uY2xvc2VBZGRQcm9qZWN0Rm9ybSgpXG5cbiAgICAgICAgICAgIC8vIG1ha2UgYW55IGVkaXQgYnV0dG9uIGF2YWlsYWJsZSBhZ2FpblxuICAgICAgICAgICAgc2V0U3RhdHVzKHRydWUpXG5cbiAgICAgICAgICAgIC8vIGFkZCBwcm9qZWN0IG9ubHkgaWYgbmFtZSBpcyBub3QgZW1wdHlcbiAgICAgICAgICAgIGlmICghaW5wdXQudmFsdWUpIHJldHVybiBcbiAgICAgICAgICAgIGVsc2UgZG9tTWFuaXB1bGF0aW9uLmFkZFByb2plY3QoaW5wdXQudmFsdWUpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgUHJvamVjdCBcIkZhY3RvcnlcIiB3aXRoIGlucHV0IHZhbHVlIGFuZCBzYW1wbGUgZGVzY3JpcHRpb24gYW5kIHNhdmUgY3JlYXRlZCBPYmplY3QgaW4gbG9jYWxzdG9yYWdlIGFuZCBfcHJvamVjdHMgYXJyYXlcbiAgICAgICAgICAgIGxldCBuZXdQcm9qZWN0ID0gUHJvamVjdChpbnB1dC52YWx1ZSwgc2FtcGxlcy5nZXRQcm9qZWN0RGVzY3JpcHRpb25TYW1wbGUoKSlcbiAgICAgICAgICAgIHByb2plY3RPYmplY3RTdG9yYWdlLmFkZFByb2plY3RPYmplY3QobmV3UHJvamVjdC5nZXROYW1lKCksIG5ld1Byb2plY3QpO1xuXG4gICAgICAgICAgICBwcm9qZWN0T2JqZWN0U3RvcmFnZS5zZXRDdXJyZW50UHJvamVjdChuZXdQcm9qZWN0KVxuICAgICAgICAgICAgc3RvcmFnZS5zYXZlT2JqZWN0VG9TdG9yYWdlKGlucHV0LnZhbHVlLCBuZXdQcm9qZWN0LmNyZWF0ZVByb2plY3RPYmplY3QoKSlcblxuICAgICAgICAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGNvcnJlc3BvbmRpbmcgbmF2aWdhdGlvbiBpdGVtXG4gICAgICAgICAgICBsZXQgZG9tUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNlY3Rpb24ucHJvamVjdDpsYXN0LWNoaWxkYClcbiAgICAgICAgICAgIG5ld1Byb2plY3Quc2V0UHJvamVjdERvbUVsZW1lbnQoZG9tUHJvamVjdClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZG9tUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5wb3B1bGF0ZU1haW5MYXlvdXQobmV3UHJvamVjdC5nZXROYW1lKCksIG5ld1Byb2plY3QuZ2V0RGVzY3JpcHRpb24oKSlcbiAgICAgICAgICAgICAgICBwcm9qZWN0T2JqZWN0U3RvcmFnZS5zZXRDdXJyZW50UHJvamVjdChuZXdQcm9qZWN0KVxuICAgICAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5yZW1vdmVUb0RvcygpXG4gICAgICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLnJlbmRlclRvRG9zKG5ld1Byb2plY3QpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL3BvdWxhdGUgbWFpbiBzZWN0aW9uIHdpdGggY29ycmVzcG9uZGluZyBwcm9qZWN0IGluZm9ybWF0aW9uXG4gICAgICAgICAgICBkb21NYW5pcHVsYXRpb24ucG9wdWxhdGVNYWluTGF5b3V0KG5ld1Byb2plY3QuZ2V0TmFtZSgpLCBuZXdQcm9qZWN0LmdldERlc2NyaXB0aW9uKCkpXG5cblxuICAgICAgICAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVycyB0byBpY29ucyB0byBkZWxldGUgYW5kIGNoYW5nZSBhIHByb2plY3RcbiAgICAgICAgICAgIGxldCBwcm9qZWN0RWRpdEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQucHJvamVjdC1lZGl0XCIpXG4gICAgICAgICAgICBsZXQgcHJvamVjdERlbGV0ZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQucHJvamVjdC1kZWxldGVcIilcblxuXG4gICAgICAgICAgICBwcm9qZWN0RWRpdEljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChfc3RhdHVzKSB7IFxuICAgICAgICAgICAgICAgICAgICBkb21NYW5pcHVsYXRpb24ub3BlbkVkaXRQcm9qZWN0Rm9ybShwcm9qZWN0T2JqZWN0U3RvcmFnZS5nZXRDdXJyZW50UHJvamVjdCgpKVxuICAgICAgICAgICAgICAgICAgICBzZXRTdGF0dXMoZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVByb2plY3RFZGl0Rm9ybVN1Ym1pdChwcm9qZWN0T2JqZWN0U3RvcmFnZS5nZXRDdXJyZW50UHJvamVjdCgpKVxuICAgICAgICAgICAgICAgIH0gZWxzZSByZXR1cm5cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHByb2plY3REZWxldGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKF9zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHByb2plY3Qgb2JqZWN0IGZyb20gc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0T2JqZWN0U3RvcmFnZS5yZW1vdmVQcm9qZWN0T2JqZWN0KHByb2plY3RPYmplY3RTdG9yYWdlLmdldEN1cnJlbnRQcm9qZWN0KCkuZ2V0TmFtZSgpKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy9kb21NYW5pcHVsYXRpb24ucmVtb3ZlUHJvamVjdChkb21Qcm9qZWN0KVxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0T2JqZWN0U3RvcmFnZS5nZXRDdXJyZW50UHJvamVjdCgpLmdldFByb2plY3REb21FbGVtZW50KCkucmVtb3ZlKClcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIEpVTVAgVE8gQUxMIFBBR0VcblxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldHVyblxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZVByb2plY3RFZGl0Rm9ybVN1Ym1pdCA9IChwcm9qZWN0T2JqZWN0KSA9PiB7XG5cbiAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtcHJvamVjdC1mb3JtXCIpXG4gICAgICAgIGxldCB0aXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkaW5nLm1haW4uZm9ybVwiKVxuICAgICAgICBsZXQgc3ViVGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3ViLWhlYWRpbmcubWFpbi5mb3JtXCIpXG5cbiAgICAgICAgLy8gY2hhbmdlIHByb2plY3QgaW5mb3JtYXRpb24gYmFzZWQgb24gZm9ybSBpbnB1dFxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcblxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgICAgIC8vIG1ha2UgYW55IGVkaXQgYnV0dG9uIGF2YWlsYWJsZSBhZ2FpblxuICAgICAgICAgICAgc2V0U3RhdHVzKHRydWUpXG5cbiAgICAgICAgICAgIC8vY2xvc2UgZm9ybVxuICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLmNsb3NlRWRpdFByb2plY3RGb3JtKClcblxuICAgICAgICAgICAgcHJvamVjdE9iamVjdC5zZXROYW1lKHRpdGxlSW5wdXQudmFsdWUpXG4gICAgICAgICAgICBwcm9qZWN0T2JqZWN0LnNldERlc2NyaXB0aW9uKHN1YlRpdGxlSW5wdXQudmFsdWUpXG5cbiAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5hZGRNYWluTGF5b3V0KClcbiAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5wb3B1bGF0ZU1haW5MYXlvdXQodGl0bGVJbnB1dC52YWx1ZSwgc3ViVGl0bGVJbnB1dC52YWx1ZSlcbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIGNvbnN0IF9oYW5kbGVFZGl0VG9Eb0Zvcm1TdWJtaXQgPSAodG9Eb09iamVjdCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtdG9kby1mb3JtXCIpXG4gICAgICAgIGxldCBuYW1lSW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dC50b2RvLW5hbWVcIilcbiAgICAgICAgbGV0IGRhdGVJbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcihcImlucHV0LnRvZG8tZGF0ZVwiKVxuXG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICAgICAgLy8gbWFrZSBhbnkgZWRpdCBidXR0b24gYXZhaWxhYmxlIGFnYWluXG4gICAgICAgICAgICBzZXRTdGF0dXModHJ1ZSlcblxuICAgICAgICAgICAgLy8gY2hhbmdlIGZvcm0gZGV0YWlsc1xuICAgICAgICAgICAgdG9Eb09iamVjdC5zZXROYW1lKG5hbWVJbnB1dC52YWx1ZSlcbiAgICAgICAgICAgIHRvRG9PYmplY3Quc2V0RHVlRGF0ZShkYXRlSW5wdXQudmFsdWUpXG5cbiAgICAgICAgICAgIC8vIGNsb3NlIGZvcm1cbiAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5jbG9zZUVkaXRUb0RvRm9ybSh0b0RvT2JqZWN0KVxuICAgICAgICB9KVxuICAgIH1cblxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBidXR0b25BZGRQcm9qZWN0TGlzdGVuZXIsXG4gICAgICAgIGJ1dHRvbkFkZFRvRG9MaXN0ZW5lcixcbiAgICAgICAgdG9Eb0xpc3RlbmVyXG4gICAgfVxufSkoKTtcbiIsImV4cG9ydCBjb25zdCBwcm9qZWN0T2JqZWN0U3RvcmFnZSA9ICgoKSA9PiB7XG5cbiAgICBsZXQgX3Byb2plY3RPYmplY3RTdG9yYWdlID0ge307XG4gICAgbGV0IF9jdXJyZW50UHJvamVjdDtcblxuICAgIGNvbnN0IGdldFByb2plY3RPYmplY3QgPSAodGl0bGUpID0+IHtcbiAgICAgICAgcmV0dXJuIF9wcm9qZWN0T2JqZWN0U3RvcmFnZVt0aXRsZV1cbiAgICB9XG5cbiAgICBjb25zdCBhZGRQcm9qZWN0T2JqZWN0ID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgX3Byb2plY3RPYmplY3RTdG9yYWdlW2tleV0gPSB2YWx1ZVxuICAgIH1cblxuICAgIGNvbnN0IGdldEN1cnJlbnRQcm9qZWN0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gX2N1cnJlbnRQcm9qZWN0XG4gICAgfVxuXG4gICAgY29uc3Qgc2V0Q3VycmVudFByb2plY3QgPSAob2JqZWN0KSA9PiB7XG4gICAgICAgIF9jdXJyZW50UHJvamVjdCA9IG9iamVjdFxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZVByb2plY3RPYmplY3QgPSAoa2V5KSA9PiB7XG4gICAgICAgIGRlbGV0ZSBfcHJvamVjdE9iamVjdFN0b3JhZ2Vba2V5XVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldFByb2plY3RPYmplY3QsXG4gICAgICAgIGFkZFByb2plY3RPYmplY3QsXG4gICAgICAgIGdldEN1cnJlbnRQcm9qZWN0LFxuICAgICAgICBzZXRDdXJyZW50UHJvamVjdCxcbiAgICAgICAgcmVtb3ZlUHJvamVjdE9iamVjdFxuICAgIH1cbn0pKCk7IiwiLy8gRmFjdG9yeSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBQcm9qZWN0XG5cbmV4cG9ydCBjb25zdCBQcm9qZWN0ID0gKG5hbWUsIGRlc2NyaXB0aW9uKSA9PiB7XG5cbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgICBjb25zdCBzZXROYW1lID0gKG5ld05hbWUpID0+IG5hbWUgPSBuZXdOYW1lO1xuXG4gICAgY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAoKSA9PiBkZXNjcmlwdGlvbjtcbiAgICBjb25zdCBzZXREZXNjcmlwdGlvbiA9IChuZXdEZXNjcmlwdGlvbikgPT4gZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcblxuICAgIGxldCBfYXNzb2NpYXRlZFRvRG9zID0ge307XG5cbiAgICBjb25zdCBnZXRUb0RvID0gKGluZGV4KSA9PiBfYXNzb2NpYXRlZFRvRG9zW2luZGV4XTtcbiAgICBjb25zdCBnZXRBbGxUb0RvcyA9ICgpID0+IF9hc3NvY2lhdGVkVG9Eb3M7XG5cbiAgICBsZXQgX3Byb2plY3REb21FbGVtZW50O1xuXG4gICAgY29uc3Qgc2V0UHJvamVjdERvbUVsZW1lbnQgPSAobmV3RG9tRWxlbWVudCkgPT4gX3Byb2plY3REb21FbGVtZW50ID0gbmV3RG9tRWxlbWVudDtcbiAgICBjb25zdCBnZXRQcm9qZWN0RG9tRWxlbWVudCA9ICgpID0+eyByZXR1cm4gX3Byb2plY3REb21FbGVtZW50IH1cblxuICAgIGNvbnN0IGFkZFRvRG8gPSAob2JqZWN0LCB0b0RvTmFtZSkgPT4gX2Fzc29jaWF0ZWRUb0Rvc1t0b0RvTmFtZV0gPSBvYmplY3RcbiAgICBjb25zdCByZW1vdmVUb0RvID0gKHRvZG9OYW1lKSA9PiBkZWxldGUgX2Fzc29jaWF0ZWRUb0Rvc1t0b2RvTmFtZV07XG5cbiAgICBjb25zdCBfY3JlYXRlVG9Eb3NPYmplY3QgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IFRvRG9zT2JqZWN0ID0ge31cblxuICAgICAgICBmb3IgKGxldCB0b2RvIGluIF9hc3NvY2lhdGVkVG9Eb3MpIHtcblxuICAgICAgICB9XG4gICAgICAgIC8vIElNUExFTUVOVCBBQk9WRSBMT09QIElGIE5FRURFRFxuICAgICAgICAvLyBCRUxPVyBMT09QIERPRVMgTk9UIFdPUktcblxuICAgICAgICAvL19hc3NvY2lhdGVkVG9Eb3MuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAvLyAgICBUb0Rvc09iamVjdFtlLmdldE5hbWUoKV0gPSBlLmNyZWF0ZVRvRG9PYmplY3QoKVxuICAgICAgICAvL30pXG5cbiAgICAgICAgcmV0dXJuIFRvRG9zT2JqZWN0XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlUHJvamVjdE9iamVjdCA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBwcm9qZWN0T2JqZWN0ID0geyBcbiAgICAgICAgICAgIFwibmFtZVwiIDogZ2V0TmFtZSgpLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogZ2V0RGVzY3JpcHRpb24oKSxcbiAgICAgICAgICAgIFwiYXNzb2NpYXRlZFRvRG9zXCIgOiBfY3JlYXRlVG9Eb3NPYmplY3QoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb2plY3RPYmplY3RcbiAgICB9XG5cblxuICAgIHJldHVybiB7Z2V0TmFtZSxcbiAgICAgICAgICAgIHNldE5hbWUsXG4gICAgICAgICAgICBzZXREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGdldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0VG9EbyxcbiAgICAgICAgICAgIGFkZFRvRG8sXG4gICAgICAgICAgICByZW1vdmVUb0RvLFxuICAgICAgICAgICAgZ2V0QWxsVG9Eb3MsXG4gICAgICAgICAgICBjcmVhdGVQcm9qZWN0T2JqZWN0LFxuICAgICAgICAgICAgc2V0UHJvamVjdERvbUVsZW1lbnQsXG4gICAgICAgICAgICBnZXRQcm9qZWN0RG9tRWxlbWVudFxuICAgICAgICB9XG59XG5cblxuXG4iLCJleHBvcnQgY29uc3Qgc3RvcmFnZSA9ICgoKSA9PiB7XG5cbiAgICBjb25zdCBzYXZlT2JqZWN0VG9TdG9yYWdlID0gKGtleSwgb2JqZWN0KSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KG9iamVjdCkpXG4gICAgfVxuXG4gICAgY29uc3QgZ2V0T2JqZWN0RnJvbVN0b3JhZ2UgPSAoa2V5KSA9PiB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2F2ZU9iamVjdFRvU3RvcmFnZSxcbiAgICAgICAgZ2V0T2JqZWN0RnJvbVN0b3JhZ2VcbiAgICB9XG4gICAgXG59KSgpOyIsIi8vIEZhY3RvcnkgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgVG9Eb1xuXG5leHBvcnQgY29uc3QgVG9EbyA9IChuYW1lLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgc3RhdHVzKSA9PiB7XG5cbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgICBjb25zdCBzZXROYW1lID0gKG5ld05hbWUpID0+IG5hbWUgPSBuZXdOYW1lO1xuXG4gICAgY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAoKSA9PiBkZXNjcmlwdGlvbjtcbiAgICBjb25zdCBzZXREZXNjcmlwdGlvbiA9IChuZXdEZXNjcmlwdGlvbikgPT4gZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcblxuICAgIGNvbnN0IGdldER1ZURhdGUgPSAoKSA9PiBkdWVEYXRlO1xuICAgIGNvbnN0IHNldER1ZURhdGUgPSAobmV3RHVlRGF0ZSkgPT4gZHVlRGF0ZSA9IG5ld0R1ZURhdGU7IFxuXG4gICAgY29uc3QgZ2V0U3RhdHVzID0gKCkgPT4gc3RhdHVzXG4gICAgY29uc3QgdG9nZ2xlU3RhdHVzID0gKCkgPT4ge1xuICAgICAgICBzdGF0dXMgPSBzdGF0dXMgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIHJldHVybiBzdGF0dXNcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVUb0RvT2JqZWN0ID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCB0b0RvT2JqZWN0ID0ge1xuICAgICAgICAgICAgXCJuYW1lXCIgOiBnZXROYW1lKCksXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBnZXREZXNjcmlwdGlvbigpLFxuICAgICAgICAgICAgXCJkdWVEYXRlXCIgOiBnZXREdWVEYXRlKCksXG4gICAgICAgICAgICBcInN0YXR1c1wiIDogZ2V0U3RhdHVzKClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b0RvT2JqZWN0XG4gICAgfVxuXG4gICAgcmV0dXJuIHtnZXROYW1lLFxuICAgICAgICAgICAgc2V0TmFtZSwgXG4gICAgICAgICAgICBzZXREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGdldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0RHVlRGF0ZSxcbiAgICAgICAgICAgIHNldER1ZURhdGUsXG4gICAgICAgICAgICBnZXRTdGF0dXMsXG4gICAgICAgICAgICB0b2dnbGVTdGF0dXMsXG4gICAgICAgICAgICBjcmVhdGVUb0RvT2JqZWN0fVxufVxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFRvRG8gfSBmcm9tICcuL3RvZG9zL3RvZG9zLmpzJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3RzL3Byb2plY3RzLmpzJztcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZS5qcydcbmltcG9ydCB7IGRvbU1hbmlwdWxhdGlvbiwgZXZlbnRMaXN0ZW5lciwgZm9ybUxvZ2ljIH0gZnJvbSAnLi9VSS91aS5qcyc7XG5cbmV2ZW50TGlzdGVuZXIuYnV0dG9uQWRkUHJvamVjdExpc3RlbmVyKClcbmV2ZW50TGlzdGVuZXIuYnV0dG9uQWRkVG9Eb0xpc3RlbmVyKClcblxuXG5cblxuLy9kb21NYW5pcHVsYXRpb24ucmVtb3ZlUHJvamVjdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKSlcblxuLypcbmNvbnN0IG5ld1Byb2plY3QgPSBQcm9qZWN0KFwiU2Nob29sXCIsIFwidGhpcyBwcm9qZWN0IGlzIGZvciBvcmdhbml6aW5nIG15IHNjaG9vbCB3b3JrXCIpO1xuXG5jb25zdCBmaXJzdFRvRG8gPSBUb0RvKFwiRG8gc29tZXRoaW5nXCIsIFwiR2V0IG9uIG15IExldmVsXCIsIFwiMTguMTAuMjAwMFwiLCBmYWxzZSlcbmNvbnN0IHNlY29uZFRvRG8gPSBUb0RvKFwiRG8gc29tZXRoaW5nIGVsc2VcIiwgXCJTZXQgb24gbXkgTGV2ZWxcIiwgXCIxMy4xMC4yMDAwXCIsIGZhbHNlKVxubmV3UHJvamVjdC5hZGRUb0RvKGZpcnN0VG9Ebylcbm5ld1Byb2plY3QuYWRkVG9EbyhzZWNvbmRUb0RvKVxuXG5sZXQgdmFsaWRPYmplY3QgPSBuZXdQcm9qZWN0LmNyZWF0ZVByb2plY3RPYmplY3QoKTtcblxuc3RvcmFnZS5zYXZlT2JqZWN0VG9TdG9yYWdlKG5ld1Byb2plY3QuZ2V0TmFtZSgpLCB2YWxpZE9iamVjdClcblxuY29uc29sZS5sb2coc3RvcmFnZS5nZXRPYmplY3RGcm9tU3RvcmFnZShcIlNjaG9vbFwiKSlcbiovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9