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
                    
                    console.table(_projects_project_storage_js__WEBPACK_IMPORTED_MODULE_4__.projectObjectStorage.getCurrentProject())

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1h3QztBQUNTO0FBQ0g7QUFDUjtBQUMrQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTzs7OztBQUlQOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwrQ0FBK0MsS0FBSztBQUNwRDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrRUFBa0Usd0JBQXdCO0FBQzFGLDRFQUE0RSwrQkFBK0I7QUFDM0c7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwRUFBMEUscUJBQXFCO0FBQy9GO0FBQ0E7QUFDQSw4RUFBOEUsd0JBQXdCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaURBQWlELHFCQUFxQjtBQUN0RTtBQUNBO0FBQ0EscURBQXFELHdCQUF3QjtBQUM3RSxpRkFBaUYsVUFBVTtBQUMzRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaURBQWlELFNBQVM7QUFDMUQ7QUFDQTtBQUNBLHFEQUFxRCxTQUFTO0FBQzlELGlGQUFpRixVQUFVO0FBQzNGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQWVNOztBQUVQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxTQUFTO0FBQ1Q7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLHFEQUFJO0FBQzlCO0FBQ0E7QUFDQSwwQkFBMEIsOEVBQW9CO0FBQzlDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUEsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxTQUFTOztBQUVUOztBQUVBO0FBQ0E7O0FBRUEsMEJBQTBCLDhFQUFvQjs7QUFFOUM7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsOERBQU8sY0FBYyxnREFBTztBQUN6RCxZQUFZLDhFQUFvQjs7QUFFaEMsWUFBWSw4RUFBb0I7QUFDaEMsWUFBWSx3REFBTzs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDhFQUFvQjtBQUNwQztBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBLHdEQUF3RCw4RUFBb0I7QUFDNUU7QUFDQSxnREFBZ0QsOEVBQW9CO0FBQ3BFLGtCQUFrQjtBQUNsQixhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw4RUFBb0IscUJBQXFCLDhFQUFvQjtBQUNqRjtBQUNBO0FBQ0Esb0JBQW9CLDhFQUFvQjtBQUN4QztBQUNBLGtDQUFrQyw4RUFBb0I7O0FBRXRELGtCQUFrQjtBQUNsQixhQUFhOztBQUViLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3pmTTs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ2hDRDs7QUFFTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHdDQUF3Qzs7QUFFeEM7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNmRDs7QUFFTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O1VDeENBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOd0M7QUFDUztBQUNIO0FBQ3lCOztBQUV2RSxvREFBYTtBQUNiLG9EQUFhOzs7OztBQUtiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL1VJL3NhbXBsZXMuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL1VJL3VpLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9wcm9qZWN0cy9wcm9qZWN0X3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL3Byb2plY3RzL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9zdG9yYWdlL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL3RvZG9zL3RvZG9zLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc2FtcGxlcyA9ICgoKSA9PiB7XG5cbiAgICBsZXQgX3Byb2plY3REZXNjcmlwdGlvblNhbXBsZSA9IFwiQ2xpY2sgdGhlIGJ1dHRvbiBvbiB0aGUgcmlnaHQgdG8gY2hhbmdlIHRoZSBkZXNjcmlwdGlvbiFcIlxuXG4gICAgY29uc3QgZ2V0UHJvamVjdERlc2NyaXB0aW9uU2FtcGxlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gX3Byb2plY3REZXNjcmlwdGlvblNhbXBsZVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldFByb2plY3REZXNjcmlwdGlvblNhbXBsZVxuICAgIH1cbn0pKCk7IiwiaW1wb3J0IHsgVG9EbyB9IGZyb20gJy4uL3RvZG9zL3RvZG9zLmpzJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9wcm9qZWN0cy9wcm9qZWN0cy5qcyc7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnLi4vc3RvcmFnZS9zdG9yYWdlLmpzJ1xuaW1wb3J0IHsgc2FtcGxlcyB9IGZyb20gJy4vc2FtcGxlcy5qcyc7XG5pbXBvcnQgeyBwcm9qZWN0T2JqZWN0U3RvcmFnZSB9IGZyb20gJy4uL3Byb2plY3RzL3Byb2plY3Rfc3RvcmFnZS5qcyc7XG4vLyAgIEZ1bmN0aW9uYWxpdGllc1xuLy8gICBcbi8vICAgICBhZGQgcHJvamVjdCB0byBkb21cbi8vICAgICBhZGQgdG9kbyB0byBkb21cbi8vXG4vLyAgICAgcmVtb3ZlIHByb2plY3QgZnJvbSBkb21cbi8vICAgICByZW1vdmUgdG9kbyBmcm9tIGRvbVxuLy8gICAgIFxuLy8gICAgIGNoYW5nZSBpbnRlcmZhY2UgYmFzZWQgb24gbmF2aWdhdGlvblxuLy8gICAgIGNoYW5nZSBoaWdobGlnaHRpbmcgb2YgbmF2aWdhdGlvbiBpdGVtc1xuLy9cbi8vXG4vLyAgICAgIFRvRG86IFxuLy8gICAgICAgICAgICAgIC0gd3JpdGUgZnVuY3Rpb25zIHJlbmRlciBMYXlvdXQgJiByZW5kZXIgVG9Eb3Ncbi8vICAgICAgICAgICAgICAtIHByb2plY3QgYXJyYXkvb2JqZWN0IGluIHNlcGVyYXRlIGxvZ2ljXG4vL1xuXG5leHBvcnQgY29uc3QgZG9tTWFuaXB1bGF0aW9uID0gKCgpID0+IHtcblxuXG5cbiAgICBjb25zdCBhZGRQcm9qZWN0ID0gKG5hbWUpID0+IHtcblxuICAgICAgICBjb25zdCBwcm9qZWN0RE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzJyk7XG5cbiAgICAgICAgbGV0IGh0bWwgPSAoYDxzZWN0aW9uIGNsYXNzPVwicHJvamVjdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+VG9jPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2plY3RcIj4ke25hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5gKVxuXG4gICAgICAgIHByb2plY3RET00uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3Qgb3BlbkFkZFByb2plY3RGb3JtID0gKCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKTtcblxuICAgICAgICBsZXQgaHRtbCA9IChgPHNlY3Rpb24gaWQ9XCJwcm9qZWN0LWZvcm0tc2VjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+dG9jPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gaWQ9XCJuZXctcHJvamVjdC1mb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwicHJvamVjdC1mb3JtLWlucHV0XCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5gKVxuXG4gICAgICAgIHByb2plY3RET00uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3QgY2xvc2VBZGRQcm9qZWN0Rm9ybSA9ICgpID0+IHtcblxuICAgICAgICBsZXQgYWRkUHJvamVjdEZvcm1Eb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbiNwcm9qZWN0LWZvcm0tc2VjdGlvblwiKVxuICAgICAgICBhZGRQcm9qZWN0Rm9ybURvbS5yZW1vdmUoKVxuICAgIH1cblxuICAgIGNvbnN0IG9wZW5FZGl0UHJvamVjdEZvcm0gPSAocHJvamVjdE9iamVjdCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRpdGxlRGVzY3JpcHRpb25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci50aXRsZS1kZXNjcmlwdGlvblwiKVxuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGVEb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRpbmcubWFpblwiKVxuICAgICAgICBjb25zdCBwcm9qZWN0RGVzY3JpcHRpb25Eb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Yi1oZWFkaW5nLm1haW5cIik7XG4gICAgICAgIFxuICAgICAgICBwcm9qZWN0VGl0bGVEb20ucmVtb3ZlKClcbiAgICAgICAgcHJvamVjdERlc2NyaXB0aW9uRG9tLnJlbW92ZSgpXG5cbiAgICAgICAgbGV0IGh0bWwgPSAoYDxmb3JtIGlkPVwiZWRpdC1wcm9qZWN0LWZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImhlYWRpbmcgbWFpbiBmb3JtXCIgdmFsdWU9XCIke3Byb2plY3RPYmplY3QuZ2V0TmFtZSgpfVwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJzdWItaGVhZGluZyBtYWluIGZvcm1cIiBwbGFjZWhvbGRlcj1cIiR7cHJvamVjdE9iamVjdC5nZXREZXNjcmlwdGlvbigpfVwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+YClcblxuICAgICAgICB0aXRsZURlc2NyaXB0aW9uQ29udGFpbmVyLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWJlZ2luXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3Qgb3BlbkFkZFRvRG9Gb3JtID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBtYWluQW5rZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbi50b2RvLW1haW5cIik7XG5cbiAgICAgICAgbGV0IGh0bWwgPSBgPGRpdiBjbGFzcz1cInRvZG8tY29udGFpbmVyXCIgaWQ9XCJhZGQtdG9kby1mb3JtLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gaWQ9XCJhZGQtdG9kby1mb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ0b2RvLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXNzb2NpYXRlZC1wcm9qZWN0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8taWNvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgY2xhc3M9XCJ0b2RvLWRhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG9cIj5jaGVja19ib3hfb3V0bGluZV9ibGFuazwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG9cIj5lZGl0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdG9kb1wiPmRlbGV0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gXG4gICAgICAgIFxuICAgICAgICBtYWluQW5rZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3QgY2xvc2VBZGRUb0RvRm9ybSA9ICgpID0+IHtcblxuICAgICAgICBsZXQgYWRkVG9kb0Zvcm1Eb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10b2RvLWZvcm0tY29udGFpbmVyXCIpXG4gICAgICAgIGFkZFRvZG9Gb3JtRG9tLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgLy90aGlzIGZ1bmN0aW9uIHJlcGxhY2VzIHRoZSByZXNwZWN0aXZlIHBhcnRzIGluIHRoZSB0b2RvIGNvbnRhaW5lciB3aXRoIGh0bWwgdG8gY3JlYXRlIGEgZm9ybSB3aXRob3V0IGRlbGV0aW5nIHRoZSBub2Rlc1xuICAgIGNvbnN0IG9wZW5FZGl0VG9Eb0Zvcm0gPSAocmVzcGVjdGl2ZVRvRG9FbGVtZW50LCB0b0RvT2JqZWN0KSA9PiB7XG5cbiAgICAgICAgbGV0IGh0bWwgPSBgPGRpdiBjbGFzcz1cInRvZG8tY29udGFpbmVyXCIgaWQ9XCJlZGl0LXRvZG8tZm9ybS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIGlkPVwiZWRpdC10b2RvLWZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInRvZG8tbmFtZVwiIHZhbHVlPVwiJHt0b0RvT2JqZWN0LmdldE5hbWUoKX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXNzb2NpYXRlZC1wcm9qZWN0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8taWNvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgY2xhc3M9XCJ0b2RvLWRhdGVcIiB2YWx1ZT1cIiR7dG9Eb09iamVjdC5nZXREdWVEYXRlKCl9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0b2RvXCI+Y2hlY2tfYm94X291dGxpbmVfYmxhbms8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0b2RvXCI+ZWRpdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG9cIj5kZWxldGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+YFxuXG5cbiAgICAgICAgcmVzcGVjdGl2ZVRvRG9FbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyZW5kXCIsIGh0bWwpXG5cbiAgICAgICAgcmVzcGVjdGl2ZVRvRG9FbGVtZW50LnJlbW92ZSgpXG5cbiAgICAgICAgLy9yZW1vdmUgbmFtZSBhbmQgZGF0ZSBlbGVtZW50c1xuXG5cbiAgICAgICAgXG4gICAgfVxuXG4gICAgY29uc3QgY2xvc2VFZGl0VG9Eb0Zvcm0gPSAodG9Eb09iamVjdCkgPT4ge1xuXG4gICAgICAgIGxldCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LXRvZG8tZm9ybS1jb250YWluZXJcIilcbiAgICAgICAgbGV0IGNoZWNrSWNvbiA9IHRvRG9PYmplY3QuZ2V0U3RhdHVzKCkgPyBcImNoZWNrX2JveFwiIDogXCJjaGVja19ib3hfb3V0bGluZV9ibGFua1wiXG5cbiAgICAgICAgbGV0IGh0bWwgPSBgPGRpdiBjbGFzcz1cInRvZG8tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1uYW1lXCI+JHt0b0RvT2JqZWN0LmdldE5hbWUoKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhc3NvY2lhdGVkLXByb2plY3RcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWljb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tZGF0ZVwiPiR7dG9Eb09iamVjdC5nZXREdWVEYXRlKCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG8gY2hlY2tcIj4ke2NoZWNrSWNvbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG8gZWRpdFwiPmVkaXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG8gZGVsZXRlXCI+ZGVsZXRlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PmBcblxuICAgICAgICAvLyBpbnNlcnQgdG9kbyBjYXJkXG4gICAgICAgIGZvcm1Db250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJlbmRcIiwgaHRtbClcbiAgICBcbiAgICAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyXG5cbiAgICAgICAgbGV0IHRvZG9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtdG9kby1mb3JtLWNvbnRhaW5lcisudG9kby1jb250YWluZXJcIilcbiAgICAgICAgZXZlbnRMaXN0ZW5lci50b0RvTGlzdGVuZXIodG9kb0NvbnRhaW5lciwgdG9Eb09iamVjdClcblxuICAgICAgICAvLyBjbG9zZSBmb3JtXG4gICAgICAgIGZvcm1Db250YWluZXIucmVtb3ZlKClcblxuXG4gICAgfVxuXG4gICAgY29uc3QgY2xvc2VFZGl0UHJvamVjdEZvcm0gPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGVkaXRQcm9qZWN0Rm9ybURvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtI2VkaXQtcHJvamVjdC1mb3JtXCIpXG4gICAgICAgIGVkaXRQcm9qZWN0Rm9ybURvbS5yZW1vdmUoKVxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZVByb2plY3QgPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LnJlbW92ZSgpXG4gICAgfVxuICAgIFxuICAgIFxuICAgIGNvbnN0IHBvcHVsYXRlTWFpbkxheW91dCA9ICh0aXRsZSwgc3ViVGl0bGUpID0+IHtcblxuICAgICAgICBsZXQgZG9tVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRpbmcubWFpblwiKTtcbiAgICAgICAgbGV0IGRvbVN1YlRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWItaGVhZGluZy5tYWluXCIpO1xuXG4gICAgICAgIFxuICAgICAgICBkb21UaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgICBkb21TdWJUaXRsZS50ZXh0Q29udGVudCA9IHN1YlRpdGxlO1xuICAgIH1cblxuICAgIGNvbnN0IGFkZE1haW5MYXlvdXQgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgbWFpbkFua2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRpdi5jb250YWluZXItbWFpblwiKVxuICAgICAgICBsZXQgaHRtbCA9IGA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIHRpdGxlLWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGluZyBtYWluXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3ViLWhlYWRpbmcgbWFpblwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gXG5cbiAgICAgICAgbWFpbkFua2VyLmluc2VydEFkamFjZW50SFRNTChcImFmdGVyYmVnaW5cIiwgaHRtbClcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJUb0RvcyA9IChwcm9qZWN0KSA9PiB7XG5cbiAgICAgICAgbGV0IHRvRG9BcnJheSA9IHByb2plY3QuZ2V0QWxsVG9Eb3MoKTtcblxuICAgICAgICB0b0RvQXJyYXkuZm9yRWFjaCh0b0RvID0+IHtcbiAgICAgICAgICAgIHJlbmRlck9uZVRvRG8odG9EbylcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyT25lVG9EbyA9ICh0b0RvKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgbWFpbkFua2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNlY3Rpb24udG9kby1tYWluXCIpXG5cbiAgICAgICAgbGV0IHRvRG9OYW1lID0gdG9Eby5nZXROYW1lKCk7XG4gICAgICAgIGxldCB0b0RvRGF0ZSA9IHRvRG8uZ2V0RHVlRGF0ZSgpO1xuICAgICAgICBsZXQgdG9Eb0NoZWNrID0gdG9Eby5nZXRTdGF0dXMoKTtcbiAgICAgICAgbGV0IGNoZWNrSWNvbiA9IHRvRG9DaGVjayA/IFwiY2hlY2tfYm94XCIgOiBcImNoZWNrX2JveF9vdXRsaW5lX2JsYW5rXCJcblxuICAgICAgICBsZXQgaHRtbCA9IGA8ZGl2IGNsYXNzPVwidG9kby1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLW5hbWVcIj4ke3RvRG9OYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFzc29jaWF0ZWQtcHJvamVjdFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8taWNvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1kYXRlXCI+JHt0b0RvRGF0ZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdG9kbyBjaGVja1wiPiR7Y2hlY2tJY29ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdG9kbyBlZGl0XCI+ZWRpdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdG9kbyBkZWxldGVcIj5kZWxldGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+YFxuXG4gICAgICAgIG1haW5Bbmtlci5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgaHRtbClcblxuICAgICAgICAvL2FkZCBldmVudCBsaXN0ZW5lclxuICAgICAgICBsZXQgbGF0ZXN0VG9EbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1jb250YWluZXI6bGFzdC1jaGlsZFwiKVxuICAgICAgICBldmVudExpc3RlbmVyLnRvRG9MaXN0ZW5lcihsYXRlc3RUb0RvLCB0b0RvKVxuXG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlVG9Eb3MgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHRvRG9zRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50b2RvLWNvbnRhaW5lclwiKVxuXG4gICAgICAgIHRvRG9zRG9tLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKClcbiAgICAgICAgfSlcbiAgICB9XG5cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkUHJvamVjdCxcbiAgICAgICAgcmVtb3ZlUHJvamVjdCxcbiAgICAgICAgb3BlbkFkZFByb2plY3RGb3JtLFxuICAgICAgICBjbG9zZUFkZFByb2plY3RGb3JtLFxuICAgICAgICBwb3B1bGF0ZU1haW5MYXlvdXQsXG4gICAgICAgIGFkZE1haW5MYXlvdXQsXG4gICAgICAgIG9wZW5FZGl0UHJvamVjdEZvcm0sXG4gICAgICAgIG9wZW5BZGRUb0RvRm9ybSxcbiAgICAgICAgY2xvc2VBZGRUb0RvRm9ybSxcbiAgICAgICAgY2xvc2VFZGl0UHJvamVjdEZvcm0sXG4gICAgICAgIHJlbmRlclRvRG9zLFxuICAgICAgICByZW5kZXJPbmVUb0RvLFxuICAgICAgICByZW1vdmVUb0RvcyxcbiAgICAgICAgb3BlbkVkaXRUb0RvRm9ybSxcbiAgICAgICAgY2xvc2VFZGl0VG9Eb0Zvcm1cbiAgICB9XG59KSgpO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbmV4cG9ydCBjb25zdCBldmVudExpc3RlbmVyID0gKCgpID0+IHtcblxuICAgIGxldCBfc3RhdHVzID0gdHJ1ZTtcblxuICAgIGNvbnN0IHNldFN0YXR1cyA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICBfc3RhdHVzID0gdmFsdWVcbiAgICB9XG5cbiAgICBjb25zdCBidXR0b25BZGRQcm9qZWN0TGlzdGVuZXIgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGFkZFByb2plY3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtcHJvamVjdFwiKVxuICAgICAgICBcbiAgICAgICAgYWRkUHJvamVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgXG5cbiAgICAgICAgICAgIC8vIG9wZW4gZm9ybSB2aWEgZG9tIG1vZHVsZSBhbmQgc2V0IHVwIGV2ZW50IGxpc3RlbmVyIGZvciBzdWJtaXR0aW5nIHRoZSBmb3JtXG4gICAgICAgICAgICBpZiAoX3N0YXR1cykgeyBcbiAgICAgICAgICAgICAgICBkb21NYW5pcHVsYXRpb24ub3BlbkFkZFByb2plY3RGb3JtKCk7XG4gICAgICAgICAgICAgICAgaGFuZGxlUHJvamVjdEZvcm1TdWJtaXQoKTtcbiAgICAgICAgICAgICAgICBzZXRTdGF0dXMoZmFsc2UpXG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgYnV0dG9uQWRkVG9Eb0xpc3RlbmVyID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBhZGRUb0RvRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRvLWRvXCIpXG4gICAgICAgIFxuICAgICAgICBhZGRUb0RvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyBcblxuICAgICAgICAgICAgLy8gb3BlbiBmb3JtIHZpYSBkb20gbW9kdWxlIGFuZCBzZXQgdXAgZXZlbnQgbGlzdGVuZXIgZm9yIHN1Ym1pdHRpbmcgdGhlIGZvcm1cbiAgICAgICAgICAgIGlmIChfc3RhdHVzKSB7IFxuICAgICAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5vcGVuQWRkVG9Eb0Zvcm0oKTtcbiAgICAgICAgICAgICAgICBoYW5kbGVUb0RvRm9ybVN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgIHNldFN0YXR1cyhmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVUb0RvRm9ybVN1Ym1pdCA9ICgpID0+IHtcblxuICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRvZG8tZm9ybS1jb250YWluZXJcIik7XG4gICAgICAgIGxldCB0b2RvTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dC50b2RvLW5hbWVcIik7XG4gICAgICAgIGxldCB0b2RvRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dC50b2RvLWRhdGVcIik7XG5cbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBkb21NYW5pcHVsYXRpb24uY2xvc2VBZGRUb0RvRm9ybSgpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgVG9EbyBvYmplY3RcbiAgICAgICAgICAgIGxldCBuZXdUb0RvID0gVG9Ebyh0b2RvTmFtZS52YWx1ZSwgXCJcIiwgdG9kb0RhdGUudmFsdWUsIGZhbHNlKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gYWRkIHRvZG8gdG8gYXNzb3NpYXRlZCBwcm9qZWN0XG4gICAgICAgICAgICBsZXQgcHJvamVjdCA9IHByb2plY3RPYmplY3RTdG9yYWdlLmdldEN1cnJlbnRQcm9qZWN0KClcbiAgICAgICAgICAgIHByb2plY3QuYWRkVG9EbyhuZXdUb0RvLCBuZXdUb0RvLmdldE5hbWUoKSlcblxuICAgICAgICAgICAgLy8gTWFrZSBhbnkgYnV0dG9uIGF2YWlsYWJsZSBhZ2FpblxuICAgICAgICAgICAgc2V0U3RhdHVzKHRydWUpXG4gICAgICAgICAgICBkb21NYW5pcHVsYXRpb24ucmVuZGVyT25lVG9EbyhuZXdUb0RvKVxuXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgdG9Eb0xpc3RlbmVyID0gKGVsZW1lbnQsIHRvZG8pID0+IHtcblxuICAgICAgICBsZXQgY2hlY2tJY29uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8uY2hlY2tcIik7XG4gICAgICAgIGxldCBlZGl0SWNvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLmVkaXRcIik7XG4gICAgICAgIGxldCBkZWxldGVJY29uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8uZGVsZXRlXCIpO1xuICAgICAgICBsZXQgdG9Eb05hbWVFbGVtZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbmFtZVwiKVxuICAgICAgICBsZXQgdG9Eb0RhdGVFbGVtZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tZGF0ZVwiKVxuXG4gICAgICAgIGNoZWNrSWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0b2RvLnRvZ2dsZVN0YXR1cygpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0b2RvLmdldFN0YXR1cygpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tJY29uLnRleHRDb250ZW50ID0gXCJjaGVja19ib3hcIlxuICAgICAgICAgICAgICAgIHRvRG9OYW1lRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic3RyaWtldGhyb3VnaFwiKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjaGVja0ljb24udGV4dENvbnRlbnQgPSBcImNoZWNrX2JveF9vdXRsaW5lX2JsYW5rXCJcbiAgICAgICAgICAgICAgICB0b0RvTmFtZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInN0cmlrZXRocm91Z2hcIilcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIGVkaXRJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChfc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgc2V0U3RhdHVzKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBkb21NYW5pcHVsYXRpb24ub3BlbkVkaXRUb0RvRm9ybShlbGVtZW50LCB0b2RvKTtcbiAgICAgICAgICAgICAgICBfaGFuZGxlRWRpdFRvRG9Gb3JtU3VibWl0KHRvZG8pXG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuXG4gICAgICAgIH0pXG5cbiAgICAgICAgZGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdG9kbyBmcm9tIHVzZXIgaW50ZXJmYWNlXG4gICAgICAgICAgICBkZWxldGVJY29uLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmUoKVxuXG4gICAgICAgICAgICBsZXQgcHJvamVjdCA9IHByb2plY3RPYmplY3RTdG9yYWdlLmdldEN1cnJlbnRQcm9qZWN0KClcblxuICAgICAgICAgICAgcHJvamVjdC5yZW1vdmVUb0RvKHRvZG8uZ2V0TmFtZSgpKVxuXG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKHByb2plY3QuZ2V0QWxsVG9Eb3MoKSlcbiAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIGNvbnN0IGhhbmRsZVByb2plY3RGb3JtU3VibWl0ID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcHJvamVjdC1mb3JtXCIpO1xuICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtZm9ybS1pbnB1dFwiKTtcblxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLmNsb3NlQWRkUHJvamVjdEZvcm0oKVxuXG4gICAgICAgICAgICAvLyBtYWtlIGFueSBlZGl0IGJ1dHRvbiBhdmFpbGFibGUgYWdhaW5cbiAgICAgICAgICAgIHNldFN0YXR1cyh0cnVlKVxuXG4gICAgICAgICAgICAvLyBhZGQgcHJvamVjdCBvbmx5IGlmIG5hbWUgaXMgbm90IGVtcHR5XG4gICAgICAgICAgICBpZiAoIWlucHV0LnZhbHVlKSByZXR1cm4gXG4gICAgICAgICAgICBlbHNlIGRvbU1hbmlwdWxhdGlvbi5hZGRQcm9qZWN0KGlucHV0LnZhbHVlKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIFByb2plY3QgXCJGYWN0b3J5XCIgd2l0aCBpbnB1dCB2YWx1ZSBhbmQgc2FtcGxlIGRlc2NyaXB0aW9uIGFuZCBzYXZlIGNyZWF0ZWQgT2JqZWN0IGluIGxvY2Fsc3RvcmFnZSBhbmQgX3Byb2plY3RzIGFycmF5XG4gICAgICAgICAgICBsZXQgbmV3UHJvamVjdCA9IFByb2plY3QoaW5wdXQudmFsdWUsIHNhbXBsZXMuZ2V0UHJvamVjdERlc2NyaXB0aW9uU2FtcGxlKCkpXG4gICAgICAgICAgICBwcm9qZWN0T2JqZWN0U3RvcmFnZS5hZGRQcm9qZWN0T2JqZWN0KG5ld1Byb2plY3QuZ2V0TmFtZSgpLCBuZXdQcm9qZWN0KTtcblxuICAgICAgICAgICAgcHJvamVjdE9iamVjdFN0b3JhZ2Uuc2V0Q3VycmVudFByb2plY3QobmV3UHJvamVjdClcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2F2ZU9iamVjdFRvU3RvcmFnZShpbnB1dC52YWx1ZSwgbmV3UHJvamVjdC5jcmVhdGVQcm9qZWN0T2JqZWN0KCkpXG5cbiAgICAgICAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lciB0byBjb3JyZXNwb25kaW5nIG5hdmlnYXRpb24gaXRlbVxuICAgICAgICAgICAgbGV0IGRvbVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzZWN0aW9uLnByb2plY3Q6bGFzdC1jaGlsZGApXG4gICAgICAgICAgICBuZXdQcm9qZWN0LnNldFByb2plY3REb21FbGVtZW50KGRvbVByb2plY3QpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGRvbVByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBkb21NYW5pcHVsYXRpb24ucG9wdWxhdGVNYWluTGF5b3V0KG5ld1Byb2plY3QuZ2V0TmFtZSgpLCBuZXdQcm9qZWN0LmdldERlc2NyaXB0aW9uKCkpXG4gICAgICAgICAgICAgICAgcHJvamVjdE9iamVjdFN0b3JhZ2Uuc2V0Q3VycmVudFByb2plY3QobmV3UHJvamVjdClcbiAgICAgICAgICAgICAgICBkb21NYW5pcHVsYXRpb24ucmVtb3ZlVG9Eb3MoKVxuICAgICAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5yZW5kZXJUb0RvcyhuZXdQcm9qZWN0KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9wb3VsYXRlIG1haW4gc2VjdGlvbiB3aXRoIGNvcnJlc3BvbmRpbmcgcHJvamVjdCBpbmZvcm1hdGlvblxuICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLnBvcHVsYXRlTWFpbkxheW91dChuZXdQcm9qZWN0LmdldE5hbWUoKSwgbmV3UHJvamVjdC5nZXREZXNjcmlwdGlvbigpKVxuXG5cbiAgICAgICAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnMgdG8gaWNvbnMgdG8gZGVsZXRlIGFuZCBjaGFuZ2UgYSBwcm9qZWN0XG4gICAgICAgICAgICBsZXQgcHJvamVjdEVkaXRJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkLnByb2plY3QtZWRpdFwiKVxuICAgICAgICAgICAgbGV0IHByb2plY3REZWxldGVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkLnByb2plY3QtZGVsZXRlXCIpXG5cblxuICAgICAgICAgICAgcHJvamVjdEVkaXRJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAoX3N0YXR1cykgeyBcbiAgICAgICAgICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLm9wZW5FZGl0UHJvamVjdEZvcm0ocHJvamVjdE9iamVjdFN0b3JhZ2UuZ2V0Q3VycmVudFByb2plY3QoKSlcbiAgICAgICAgICAgICAgICAgICAgc2V0U3RhdHVzKGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVQcm9qZWN0RWRpdEZvcm1TdWJtaXQocHJvamVjdE9iamVjdFN0b3JhZ2UuZ2V0Q3VycmVudFByb2plY3QoKSlcbiAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBwcm9qZWN0RGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChfc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBwcm9qZWN0IG9iamVjdCBmcm9tIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdE9iamVjdFN0b3JhZ2UucmVtb3ZlUHJvamVjdE9iamVjdChwcm9qZWN0T2JqZWN0U3RvcmFnZS5nZXRDdXJyZW50UHJvamVjdCgpLmdldE5hbWUoKSlcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vZG9tTWFuaXB1bGF0aW9uLnJlbW92ZVByb2plY3QoZG9tUHJvamVjdClcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdE9iamVjdFN0b3JhZ2UuZ2V0Q3VycmVudFByb2plY3QoKS5nZXRQcm9qZWN0RG9tRWxlbWVudCgpLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLnRhYmxlKHByb2plY3RPYmplY3RTdG9yYWdlLmdldEN1cnJlbnRQcm9qZWN0KCkpXG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlUHJvamVjdEVkaXRGb3JtU3VibWl0ID0gKHByb2plY3RPYmplY3QpID0+IHtcblxuICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC1wcm9qZWN0LWZvcm1cIilcbiAgICAgICAgbGV0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRpbmcubWFpbi5mb3JtXCIpXG4gICAgICAgIGxldCBzdWJUaXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWItaGVhZGluZy5tYWluLmZvcm1cIilcblxuICAgICAgICAvLyBjaGFuZ2UgcHJvamVjdCBpbmZvcm1hdGlvbiBiYXNlZCBvbiBmb3JtIGlucHV0XG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICAgICAgLy8gbWFrZSBhbnkgZWRpdCBidXR0b24gYXZhaWxhYmxlIGFnYWluXG4gICAgICAgICAgICBzZXRTdGF0dXModHJ1ZSlcblxuICAgICAgICAgICAgLy9jbG9zZSBmb3JtXG4gICAgICAgICAgICBkb21NYW5pcHVsYXRpb24uY2xvc2VFZGl0UHJvamVjdEZvcm0oKVxuXG4gICAgICAgICAgICBwcm9qZWN0T2JqZWN0LnNldE5hbWUodGl0bGVJbnB1dC52YWx1ZSlcbiAgICAgICAgICAgIHByb2plY3RPYmplY3Quc2V0RGVzY3JpcHRpb24oc3ViVGl0bGVJbnB1dC52YWx1ZSlcblxuICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLmFkZE1haW5MYXlvdXQoKVxuICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLnBvcHVsYXRlTWFpbkxheW91dCh0aXRsZUlucHV0LnZhbHVlLCBzdWJUaXRsZUlucHV0LnZhbHVlKVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgY29uc3QgX2hhbmRsZUVkaXRUb0RvRm9ybVN1Ym1pdCA9ICh0b0RvT2JqZWN0KSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC10b2RvLWZvcm1cIilcbiAgICAgICAgbGV0IG5hbWVJbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcihcImlucHV0LnRvZG8tbmFtZVwiKVxuICAgICAgICBsZXQgZGF0ZUlucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKFwiaW5wdXQudG9kby1kYXRlXCIpXG5cbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgICAgICAvLyBtYWtlIGFueSBlZGl0IGJ1dHRvbiBhdmFpbGFibGUgYWdhaW5cbiAgICAgICAgICAgIHNldFN0YXR1cyh0cnVlKVxuXG4gICAgICAgICAgICAvLyBjaGFuZ2UgZm9ybSBkZXRhaWxzXG4gICAgICAgICAgICB0b0RvT2JqZWN0LnNldE5hbWUobmFtZUlucHV0LnZhbHVlKVxuICAgICAgICAgICAgdG9Eb09iamVjdC5zZXREdWVEYXRlKGRhdGVJbnB1dC52YWx1ZSlcblxuICAgICAgICAgICAgLy8gY2xvc2UgZm9ybVxuICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLmNsb3NlRWRpdFRvRG9Gb3JtKHRvRG9PYmplY3QpXG4gICAgICAgIH0pXG4gICAgfVxuXG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIGJ1dHRvbkFkZFByb2plY3RMaXN0ZW5lcixcbiAgICAgICAgYnV0dG9uQWRkVG9Eb0xpc3RlbmVyLFxuICAgICAgICB0b0RvTGlzdGVuZXJcbiAgICB9XG59KSgpO1xuIiwiZXhwb3J0IGNvbnN0IHByb2plY3RPYmplY3RTdG9yYWdlID0gKCgpID0+IHtcblxuICAgIGxldCBfcHJvamVjdE9iamVjdFN0b3JhZ2UgPSB7fTtcbiAgICBsZXQgX2N1cnJlbnRQcm9qZWN0O1xuXG4gICAgY29uc3QgZ2V0UHJvamVjdE9iamVjdCA9ICh0aXRsZSkgPT4ge1xuICAgICAgICByZXR1cm4gX3Byb2plY3RPYmplY3RTdG9yYWdlW3RpdGxlXVxuICAgIH1cblxuICAgIGNvbnN0IGFkZFByb2plY3RPYmplY3QgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBfcHJvamVjdE9iamVjdFN0b3JhZ2Vba2V5XSA9IHZhbHVlXG4gICAgfVxuXG4gICAgY29uc3QgZ2V0Q3VycmVudFByb2plY3QgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBfY3VycmVudFByb2plY3RcbiAgICB9XG5cbiAgICBjb25zdCBzZXRDdXJyZW50UHJvamVjdCA9IChvYmplY3QpID0+IHtcbiAgICAgICAgX2N1cnJlbnRQcm9qZWN0ID0gb2JqZWN0XG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlUHJvamVjdE9iamVjdCA9IChrZXkpID0+IHtcbiAgICAgICAgZGVsZXRlIF9wcm9qZWN0T2JqZWN0U3RvcmFnZVtrZXldXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0UHJvamVjdE9iamVjdCxcbiAgICAgICAgYWRkUHJvamVjdE9iamVjdCxcbiAgICAgICAgZ2V0Q3VycmVudFByb2plY3QsXG4gICAgICAgIHNldEN1cnJlbnRQcm9qZWN0LFxuICAgICAgICByZW1vdmVQcm9qZWN0T2JqZWN0XG4gICAgfVxufSkoKTsiLCIvLyBGYWN0b3J5IGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIFByb2plY3RcblxuZXhwb3J0IGNvbnN0IFByb2plY3QgPSAobmFtZSwgZGVzY3JpcHRpb24pID0+IHtcblxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBuYW1lO1xuICAgIGNvbnN0IHNldE5hbWUgPSAobmV3TmFtZSkgPT4gbmFtZSA9IG5ld05hbWU7XG5cbiAgICBjb25zdCBnZXREZXNjcmlwdGlvbiA9ICgpID0+IGRlc2NyaXB0aW9uO1xuICAgIGNvbnN0IHNldERlc2NyaXB0aW9uID0gKG5ld0Rlc2NyaXB0aW9uKSA9PiBkZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuXG4gICAgbGV0IF9hc3NvY2lhdGVkVG9Eb3MgPSB7fTtcblxuICAgIGNvbnN0IGdldFRvRG8gPSAoaW5kZXgpID0+IF9hc3NvY2lhdGVkVG9Eb3NbaW5kZXhdO1xuICAgIGNvbnN0IGdldEFsbFRvRG9zID0gKCkgPT4gX2Fzc29jaWF0ZWRUb0RvcztcblxuICAgIGxldCBfcHJvamVjdERvbUVsZW1lbnQ7XG5cbiAgICBjb25zdCBzZXRQcm9qZWN0RG9tRWxlbWVudCA9IChuZXdEb21FbGVtZW50KSA9PiBfcHJvamVjdERvbUVsZW1lbnQgPSBuZXdEb21FbGVtZW50O1xuICAgIGNvbnN0IGdldFByb2plY3REb21FbGVtZW50ID0gKCkgPT57IHJldHVybiBfcHJvamVjdERvbUVsZW1lbnQgfVxuXG4gICAgY29uc3QgYWRkVG9EbyA9IChvYmplY3QsIHRvRG9OYW1lKSA9PiBfYXNzb2NpYXRlZFRvRG9zW3RvRG9OYW1lXSA9IG9iamVjdFxuICAgIGNvbnN0IHJlbW92ZVRvRG8gPSAodG9kb05hbWUpID0+IGRlbGV0ZSBfYXNzb2NpYXRlZFRvRG9zW3RvZG9OYW1lXTtcblxuICAgIGNvbnN0IF9jcmVhdGVUb0Rvc09iamVjdCA9ICgpID0+IHtcblxuICAgICAgICBsZXQgVG9Eb3NPYmplY3QgPSB7fVxuXG4gICAgICAgIGZvciAobGV0IHRvZG8gaW4gX2Fzc29jaWF0ZWRUb0Rvcykge1xuXG4gICAgICAgIH1cbiAgICAgICAgLy8gSU1QTEVNRU5UIEFCT1ZFIExPT1AgSUYgTkVFREVEXG4gICAgICAgIC8vIEJFTE9XIExPT1AgRE9FUyBOT1QgV09SS1xuXG4gICAgICAgIC8vX2Fzc29jaWF0ZWRUb0Rvcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgIC8vICAgIFRvRG9zT2JqZWN0W2UuZ2V0TmFtZSgpXSA9IGUuY3JlYXRlVG9Eb09iamVjdCgpXG4gICAgICAgIC8vfSlcblxuICAgICAgICByZXR1cm4gVG9Eb3NPYmplY3RcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0T2JqZWN0ID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IHByb2plY3RPYmplY3QgPSB7IFxuICAgICAgICAgICAgXCJuYW1lXCIgOiBnZXROYW1lKCksXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBnZXREZXNjcmlwdGlvbigpLFxuICAgICAgICAgICAgXCJhc3NvY2lhdGVkVG9Eb3NcIiA6IF9jcmVhdGVUb0Rvc09iamVjdCgpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvamVjdE9iamVjdFxuICAgIH1cblxuXG4gICAgcmV0dXJuIHtnZXROYW1lLFxuICAgICAgICAgICAgc2V0TmFtZSxcbiAgICAgICAgICAgIHNldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0RGVzY3JpcHRpb24sXG4gICAgICAgICAgICBnZXRUb0RvLFxuICAgICAgICAgICAgYWRkVG9EbyxcbiAgICAgICAgICAgIHJlbW92ZVRvRG8sXG4gICAgICAgICAgICBnZXRBbGxUb0RvcyxcbiAgICAgICAgICAgIGNyZWF0ZVByb2plY3RPYmplY3QsXG4gICAgICAgICAgICBzZXRQcm9qZWN0RG9tRWxlbWVudCxcbiAgICAgICAgICAgIGdldFByb2plY3REb21FbGVtZW50XG4gICAgICAgIH1cbn1cblxuXG5cbiIsImV4cG9ydCBjb25zdCBzdG9yYWdlID0gKCgpID0+IHtcblxuICAgIGNvbnN0IHNhdmVPYmplY3RUb1N0b3JhZ2UgPSAoa2V5LCBvYmplY3QpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkob2JqZWN0KSlcbiAgICB9XG5cbiAgICBjb25zdCBnZXRPYmplY3RGcm9tU3RvcmFnZSA9IChrZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSlcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzYXZlT2JqZWN0VG9TdG9yYWdlLFxuICAgICAgICBnZXRPYmplY3RGcm9tU3RvcmFnZVxuICAgIH1cbiAgICBcbn0pKCk7IiwiLy8gRmFjdG9yeSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBUb0RvXG5cbmV4cG9ydCBjb25zdCBUb0RvID0gKG5hbWUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBzdGF0dXMpID0+IHtcblxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBuYW1lO1xuICAgIGNvbnN0IHNldE5hbWUgPSAobmV3TmFtZSkgPT4gbmFtZSA9IG5ld05hbWU7XG5cbiAgICBjb25zdCBnZXREZXNjcmlwdGlvbiA9ICgpID0+IGRlc2NyaXB0aW9uO1xuICAgIGNvbnN0IHNldERlc2NyaXB0aW9uID0gKG5ld0Rlc2NyaXB0aW9uKSA9PiBkZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuXG4gICAgY29uc3QgZ2V0RHVlRGF0ZSA9ICgpID0+IGR1ZURhdGU7XG4gICAgY29uc3Qgc2V0RHVlRGF0ZSA9IChuZXdEdWVEYXRlKSA9PiBkdWVEYXRlID0gbmV3RHVlRGF0ZTsgXG5cbiAgICBjb25zdCBnZXRTdGF0dXMgPSAoKSA9PiBzdGF0dXNcbiAgICBjb25zdCB0b2dnbGVTdGF0dXMgPSAoKSA9PiB7XG4gICAgICAgIHN0YXR1cyA9IHN0YXR1cyA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHN0YXR1c1xuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZVRvRG9PYmplY3QgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHRvRG9PYmplY3QgPSB7XG4gICAgICAgICAgICBcIm5hbWVcIiA6IGdldE5hbWUoKSxcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IGdldERlc2NyaXB0aW9uKCksXG4gICAgICAgICAgICBcImR1ZURhdGVcIiA6IGdldER1ZURhdGUoKSxcbiAgICAgICAgICAgIFwic3RhdHVzXCIgOiBnZXRTdGF0dXMoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvRG9PYmplY3RcbiAgICB9XG5cbiAgICByZXR1cm4ge2dldE5hbWUsXG4gICAgICAgICAgICBzZXROYW1lLCBcbiAgICAgICAgICAgIHNldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0RGVzY3JpcHRpb24sXG4gICAgICAgICAgICBnZXREdWVEYXRlLFxuICAgICAgICAgICAgc2V0RHVlRGF0ZSxcbiAgICAgICAgICAgIGdldFN0YXR1cyxcbiAgICAgICAgICAgIHRvZ2dsZVN0YXR1cyxcbiAgICAgICAgICAgIGNyZWF0ZVRvRG9PYmplY3R9XG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVG9EbyB9IGZyb20gJy4vdG9kb3MvdG9kb3MuanMnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdHMvcHJvamVjdHMuanMnO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLmpzJ1xuaW1wb3J0IHsgZG9tTWFuaXB1bGF0aW9uLCBldmVudExpc3RlbmVyLCBmb3JtTG9naWMgfSBmcm9tICcuL1VJL3VpLmpzJztcblxuZXZlbnRMaXN0ZW5lci5idXR0b25BZGRQcm9qZWN0TGlzdGVuZXIoKVxuZXZlbnRMaXN0ZW5lci5idXR0b25BZGRUb0RvTGlzdGVuZXIoKVxuXG5cblxuXG4vL2RvbU1hbmlwdWxhdGlvbi5yZW1vdmVQcm9qZWN0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cycpKVxuXG4vKlxuY29uc3QgbmV3UHJvamVjdCA9IFByb2plY3QoXCJTY2hvb2xcIiwgXCJ0aGlzIHByb2plY3QgaXMgZm9yIG9yZ2FuaXppbmcgbXkgc2Nob29sIHdvcmtcIik7XG5cbmNvbnN0IGZpcnN0VG9EbyA9IFRvRG8oXCJEbyBzb21ldGhpbmdcIiwgXCJHZXQgb24gbXkgTGV2ZWxcIiwgXCIxOC4xMC4yMDAwXCIsIGZhbHNlKVxuY29uc3Qgc2Vjb25kVG9EbyA9IFRvRG8oXCJEbyBzb21ldGhpbmcgZWxzZVwiLCBcIlNldCBvbiBteSBMZXZlbFwiLCBcIjEzLjEwLjIwMDBcIiwgZmFsc2UpXG5uZXdQcm9qZWN0LmFkZFRvRG8oZmlyc3RUb0RvKVxubmV3UHJvamVjdC5hZGRUb0RvKHNlY29uZFRvRG8pXG5cbmxldCB2YWxpZE9iamVjdCA9IG5ld1Byb2plY3QuY3JlYXRlUHJvamVjdE9iamVjdCgpO1xuXG5zdG9yYWdlLnNhdmVPYmplY3RUb1N0b3JhZ2UobmV3UHJvamVjdC5nZXROYW1lKCksIHZhbGlkT2JqZWN0KVxuXG5jb25zb2xlLmxvZyhzdG9yYWdlLmdldE9iamVjdEZyb21TdG9yYWdlKFwiU2Nob29sXCIpKVxuKi8iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=