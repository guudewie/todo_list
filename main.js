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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTndDO0FBQ1M7QUFDSDtBQUN5Qjs7QUFFdkUsb0RBQWE7QUFDYixvREFBYTs7Ozs7QUFLYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9VSS9zYW1wbGVzLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9VSS91aS5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvcHJvamVjdHMvcHJvamVjdF9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9wcm9qZWN0cy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvc3RvcmFnZS9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy90b2Rvcy90b2Rvcy5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHNhbXBsZXMgPSAoKCkgPT4ge1xuXG4gICAgbGV0IF9wcm9qZWN0RGVzY3JpcHRpb25TYW1wbGUgPSBcIkNsaWNrIHRoZSBidXR0b24gb24gdGhlIHJpZ2h0IHRvIGNoYW5nZSB0aGUgZGVzY3JpcHRpb24hXCJcblxuICAgIGNvbnN0IGdldFByb2plY3REZXNjcmlwdGlvblNhbXBsZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIF9wcm9qZWN0RGVzY3JpcHRpb25TYW1wbGVcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRQcm9qZWN0RGVzY3JpcHRpb25TYW1wbGVcbiAgICB9XG59KSgpOyIsImltcG9ydCB7IFRvRG8gfSBmcm9tICcuLi90b2Rvcy90b2Rvcy5qcyc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi4vcHJvamVjdHMvcHJvamVjdHMuanMnO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gJy4uL3N0b3JhZ2Uvc3RvcmFnZS5qcydcbmltcG9ydCB7IHNhbXBsZXMgfSBmcm9tICcuL3NhbXBsZXMuanMnO1xuaW1wb3J0IHsgcHJvamVjdE9iamVjdFN0b3JhZ2UgfSBmcm9tICcuLi9wcm9qZWN0cy9wcm9qZWN0X3N0b3JhZ2UuanMnO1xuLy8gICBGdW5jdGlvbmFsaXRpZXNcbi8vICAgXG4vLyAgICAgYWRkIHByb2plY3QgdG8gZG9tXG4vLyAgICAgYWRkIHRvZG8gdG8gZG9tXG4vL1xuLy8gICAgIHJlbW92ZSBwcm9qZWN0IGZyb20gZG9tXG4vLyAgICAgcmVtb3ZlIHRvZG8gZnJvbSBkb21cbi8vICAgICBcbi8vICAgICBjaGFuZ2UgaW50ZXJmYWNlIGJhc2VkIG9uIG5hdmlnYXRpb25cbi8vICAgICBjaGFuZ2UgaGlnaGxpZ2h0aW5nIG9mIG5hdmlnYXRpb24gaXRlbXNcbi8vXG4vL1xuLy8gICAgICBUb0RvOiBcbi8vICAgICAgICAgICAgICAtIHdyaXRlIGZ1bmN0aW9ucyByZW5kZXIgTGF5b3V0ICYgcmVuZGVyIFRvRG9zXG4vLyAgICAgICAgICAgICAgLSBwcm9qZWN0IGFycmF5L29iamVjdCBpbiBzZXBlcmF0ZSBsb2dpY1xuLy9cblxuZXhwb3J0IGNvbnN0IGRvbU1hbmlwdWxhdGlvbiA9ICgoKSA9PiB7XG5cblxuXG4gICAgY29uc3QgYWRkUHJvamVjdCA9IChuYW1lKSA9PiB7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdERPTSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cycpO1xuXG4gICAgICAgIGxldCBodG1sID0gKGA8c2VjdGlvbiBjbGFzcz1cInByb2plY3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPlRvYzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9qZWN0XCI+JHtuYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+YClcblxuICAgICAgICBwcm9qZWN0RE9NLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBodG1sKVxuICAgIH1cblxuICAgIGNvbnN0IG9wZW5BZGRQcm9qZWN0Rm9ybSA9ICgpID0+IHtcblxuICAgICAgICBjb25zdCBwcm9qZWN0RE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzJyk7XG5cbiAgICAgICAgbGV0IGh0bWwgPSAoYDxzZWN0aW9uIGlkPVwicHJvamVjdC1mb3JtLXNlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPnRvYzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIGlkPVwibmV3LXByb2plY3QtZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInByb2plY3QtZm9ybS1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+YClcblxuICAgICAgICBwcm9qZWN0RE9NLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBodG1sKVxuICAgIH1cblxuICAgIGNvbnN0IGNsb3NlQWRkUHJvamVjdEZvcm0gPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGFkZFByb2plY3RGb3JtRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNlY3Rpb24jcHJvamVjdC1mb3JtLXNlY3Rpb25cIilcbiAgICAgICAgYWRkUHJvamVjdEZvcm1Eb20ucmVtb3ZlKClcbiAgICB9XG5cbiAgICBjb25zdCBvcGVuRWRpdFByb2plY3RGb3JtID0gKHByb2plY3RPYmplY3QpID0+IHtcblxuICAgICAgICBjb25zdCB0aXRsZURlc2NyaXB0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXIudGl0bGUtZGVzY3JpcHRpb25cIilcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkaW5nLm1haW5cIilcbiAgICAgICAgY29uc3QgcHJvamVjdERlc2NyaXB0aW9uRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWItaGVhZGluZy5tYWluXCIpO1xuICAgICAgICBcbiAgICAgICAgcHJvamVjdFRpdGxlRG9tLnJlbW92ZSgpXG4gICAgICAgIHByb2plY3REZXNjcmlwdGlvbkRvbS5yZW1vdmUoKVxuXG4gICAgICAgIGxldCBodG1sID0gKGA8Zm9ybSBpZD1cImVkaXQtcHJvamVjdC1mb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJoZWFkaW5nIG1haW4gZm9ybVwiIHZhbHVlPVwiJHtwcm9qZWN0T2JqZWN0LmdldE5hbWUoKX1cIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwic3ViLWhlYWRpbmcgbWFpbiBmb3JtXCIgcGxhY2Vob2xkZXI9XCIke3Byb2plY3RPYmplY3QuZ2V0RGVzY3JpcHRpb24oKX1cIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPmApXG5cbiAgICAgICAgdGl0bGVEZXNjcmlwdGlvbkNvbnRhaW5lci5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmViZWdpblwiLCBodG1sKVxuICAgIH1cblxuICAgIGNvbnN0IG9wZW5BZGRUb0RvRm9ybSA9ICgpID0+IHtcblxuICAgICAgICBsZXQgbWFpbkFua2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNlY3Rpb24udG9kby1tYWluXCIpO1xuXG4gICAgICAgIGxldCBodG1sID0gYDxkaXYgY2xhc3M9XCJ0b2RvLWNvbnRhaW5lclwiIGlkPVwiYWRkLXRvZG8tZm9ybS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIGlkPVwiYWRkLXRvZG8tZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidG9kby1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFzc29jaWF0ZWQtcHJvamVjdFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWljb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGNsYXNzPVwidG9kby1kYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0b2RvXCI+Y2hlY2tfYm94X291dGxpbmVfYmxhbms8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0b2RvXCI+ZWRpdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG9cIj5kZWxldGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+YFxuICAgICAgICBcbiAgICAgICAgbWFpbkFua2VyLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBodG1sKVxuICAgIH1cblxuICAgIGNvbnN0IGNsb3NlQWRkVG9Eb0Zvcm0gPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGFkZFRvZG9Gb3JtRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdG9kby1mb3JtLWNvbnRhaW5lclwiKVxuICAgICAgICBhZGRUb2RvRm9ybURvbS5yZW1vdmUoKVxuICAgIH1cblxuICAgIGNvbnN0IGNsb3NlRWRpdFByb2plY3RGb3JtID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBlZGl0UHJvamVjdEZvcm1Eb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybSNlZGl0LXByb2plY3QtZm9ybVwiKVxuICAgICAgICBlZGl0UHJvamVjdEZvcm1Eb20ucmVtb3ZlKClcbiAgICB9XG5cbiAgICBjb25zdCByZW1vdmVQcm9qZWN0ID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKVxuICAgIH1cbiAgICBcbiAgICBcbiAgICBjb25zdCBwb3B1bGF0ZU1haW5MYXlvdXQgPSAodGl0bGUsIHN1YlRpdGxlKSA9PiB7XG5cbiAgICAgICAgbGV0IGRvbVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkaW5nLm1haW5cIik7XG4gICAgICAgIGxldCBkb21TdWJUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3ViLWhlYWRpbmcubWFpblwiKTtcblxuICAgICAgICBcbiAgICAgICAgZG9tVGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICAgICAgZG9tU3ViVGl0bGUudGV4dENvbnRlbnQgPSBzdWJUaXRsZTtcbiAgICB9XG5cbiAgICBjb25zdCBhZGRNYWluTGF5b3V0ID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IG1haW5BbmtlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkaXYuY29udGFpbmVyLW1haW5cIilcbiAgICAgICAgbGV0IGh0bWwgPSBgPGRpdiBjbGFzcz1cImNvbnRhaW5lciB0aXRsZS1kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRpbmcgbWFpblwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN1Yi1oZWFkaW5nIG1haW5cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+YFxuXG4gICAgICAgIG1haW5Bbmtlci5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyVG9Eb3MgPSAocHJvamVjdCkgPT4ge1xuXG4gICAgICAgIGxldCB0b0RvQXJyYXkgPSBwcm9qZWN0LmdldEFsbFRvRG9zKCk7XG5cbiAgICAgICAgdG9Eb0FycmF5LmZvckVhY2godG9EbyA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBtYWluQW5rZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbi50b2RvLW1haW5cIilcblxuICAgICAgICAgICAgbGV0IHRvRG9OYW1lID0gdG9Eby5nZXROYW1lKCk7XG4gICAgICAgICAgICBsZXQgdG9Eb0RhdGUgPSB0b0RvLmdldER1ZURhdGUoKTtcbiAgICAgICAgICAgIGxldCB0b0RvQ2hlY2sgPSB0b0RvLmdldFN0YXR1cygpO1xuICAgICAgICAgICAgbGV0IGNoZWNrSWNvbiA9IHRvRG9DaGVjayA/IFwiY2hlY2tfYm94XCIgOiBcImNoZWNrX2JveF9vdXRsaW5lX2JsYW5rXCJcblxuICAgICAgICAgICAgbGV0IGh0bWwgPSBgPGRpdiBjbGFzcz1cInRvZG8tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1uYW1lXCI+JHt0b0RvTmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhc3NvY2lhdGVkLXByb2plY3RcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWljb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tZGF0ZVwiPiR7dG9Eb0RhdGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG9cIj4ke2NoZWNrSWNvbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG9cIj5lZGl0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0b2RvXCI+ZGVsZXRlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PmBcblxuICAgICAgICAgICAgbWFpbkFua2VyLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBodG1sKVxuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlck9uZVRvRG8gPSAodG9EbykgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IG1haW5BbmtlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzZWN0aW9uLnRvZG8tbWFpblwiKVxuXG4gICAgICAgIGxldCB0b0RvTmFtZSA9IHRvRG8uZ2V0TmFtZSgpO1xuICAgICAgICBsZXQgdG9Eb0RhdGUgPSB0b0RvLmdldER1ZURhdGUoKTtcbiAgICAgICAgbGV0IHRvRG9DaGVjayA9IHRvRG8uZ2V0U3RhdHVzKCk7XG4gICAgICAgIGxldCBjaGVja0ljb24gPSB0b0RvQ2hlY2sgPyBcImNoZWNrX2JveFwiIDogXCJjaGVja19ib3hfb3V0bGluZV9ibGFua1wiXG5cbiAgICAgICAgbGV0IGh0bWwgPSBgPGRpdiBjbGFzcz1cInRvZG8tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLW5hbWVcIj4ke3RvRG9OYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXNzb2NpYXRlZC1wcm9qZWN0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWljb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1kYXRlXCI+JHt0b0RvRGF0ZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0b2RvXCI+JHtjaGVja0ljb259PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG9cIj5lZGl0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRvZG9cIj5kZWxldGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PmBcblxuICAgICAgICBtYWluQW5rZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlVG9Eb3MgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHRvRG9zRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50b2RvLWNvbnRhaW5lclwiKVxuXG4gICAgICAgIHRvRG9zRG9tLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKClcbiAgICAgICAgfSlcbiAgICB9XG5cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkUHJvamVjdCxcbiAgICAgICAgcmVtb3ZlUHJvamVjdCxcbiAgICAgICAgb3BlbkFkZFByb2plY3RGb3JtLFxuICAgICAgICBjbG9zZUFkZFByb2plY3RGb3JtLFxuICAgICAgICBwb3B1bGF0ZU1haW5MYXlvdXQsXG4gICAgICAgIGFkZE1haW5MYXlvdXQsXG4gICAgICAgIG9wZW5FZGl0UHJvamVjdEZvcm0sXG4gICAgICAgIG9wZW5BZGRUb0RvRm9ybSxcbiAgICAgICAgY2xvc2VBZGRUb0RvRm9ybSxcbiAgICAgICAgY2xvc2VFZGl0UHJvamVjdEZvcm0sXG4gICAgICAgIHJlbmRlclRvRG9zLFxuICAgICAgICByZW5kZXJPbmVUb0RvLFxuICAgICAgICByZW1vdmVUb0Rvc1xuICAgIH1cbn0pKCk7XG5cblxuXG5cblxuXG4vKlxuZXhwb3J0IGNvbnN0IGZvcm1Mb2dpYyA9ICgoKSA9PiB7XG5cbiAgICBcblxuICAgIHJldHVybiB7XG4gICAgICAgIGNsb3NlRm9ybVxuICAgIH1cblxufSkoKTtcbiovXG5cblxuXG5cblxuXG5leHBvcnQgY29uc3QgZXZlbnRMaXN0ZW5lciA9ICgoKSA9PiB7XG5cbiAgICBsZXQgX3Byb2plY3RzID0gW107XG4gICAgbGV0IF9jdXJyZW50UHJvamVjdDtcbiAgICBsZXQgX3N0YXR1cyA9IHRydWU7XG5cbiAgICBjb25zdCBzZXRTdGF0dXMgPSAodmFsdWUpID0+IHtcbiAgICAgICAgX3N0YXR1cyA9IHZhbHVlXG4gICAgfVxuXG4gICAgY29uc3QgYnV0dG9uQWRkUHJvamVjdExpc3RlbmVyID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBhZGRQcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXByb2plY3RcIilcbiAgICAgICAgXG4gICAgICAgIGFkZFByb2plY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IFxuXG4gICAgICAgICAgICAvLyBvcGVuIGZvcm0gdmlhIGRvbSBtb2R1bGUgYW5kIHNldCB1cCBldmVudCBsaXN0ZW5lciBmb3Igc3VibWl0dGluZyB0aGUgZm9ybVxuICAgICAgICAgICAgaWYgKF9zdGF0dXMpIHsgXG4gICAgICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLm9wZW5BZGRQcm9qZWN0Rm9ybSgpO1xuICAgICAgICAgICAgICAgIGhhbmRsZVByb2plY3RGb3JtU3VibWl0KCk7XG4gICAgICAgICAgICAgICAgc2V0U3RhdHVzKGZhbHNlKVxuICAgICAgICAgICAgfSBlbHNlIHJldHVyblxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGJ1dHRvbkFkZFRvRG9MaXN0ZW5lciA9ICgpID0+IHtcblxuICAgICAgICBsZXQgYWRkVG9Eb0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10by1kb1wiKVxuICAgICAgICBcbiAgICAgICAgYWRkVG9Eb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgXG5cbiAgICAgICAgICAgIC8vIG9wZW4gZm9ybSB2aWEgZG9tIG1vZHVsZSBhbmQgc2V0IHVwIGV2ZW50IGxpc3RlbmVyIGZvciBzdWJtaXR0aW5nIHRoZSBmb3JtXG4gICAgICAgICAgICBpZiAoX3N0YXR1cykgeyBcbiAgICAgICAgICAgICAgICBkb21NYW5pcHVsYXRpb24ub3BlbkFkZFRvRG9Gb3JtKCk7XG4gICAgICAgICAgICAgICAgaGFuZGxlVG9Eb0Zvcm1TdWJtaXQoKTtcbiAgICAgICAgICAgICAgICBzZXRTdGF0dXMoZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHJldHVyblxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlVG9Eb0Zvcm1TdWJtaXQgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10b2RvLWZvcm0tY29udGFpbmVyXCIpO1xuICAgICAgICBsZXQgdG9kb05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXQudG9kby1uYW1lXCIpO1xuICAgICAgICBsZXQgdG9kb0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXQudG9kby1kYXRlXCIpO1xuXG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLmNsb3NlQWRkVG9Eb0Zvcm0oKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2codG9kb05hbWUudmFsdWUpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0b2RvRGF0ZS52YWx1ZSlcblxuICAgICAgICAgICAgLy8gY3JlYXRlIFRvRG8gb2JqZWN0XG4gICAgICAgICAgICBsZXQgbmV3VG9EbyA9IFRvRG8odG9kb05hbWUudmFsdWUsIFwiXCIsIHRvZG9EYXRlLnZhbHVlLCBmYWxzZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHNhZmUgdG9kbyBpbiBhc3Nvc2lhdGVkIHByb2plY3RcbiAgICAgICAgICAgIHByb2plY3RPYmplY3RTdG9yYWdlLmdldEN1cnJlbnRQcm9qZWN0KCkuYWRkVG9EbyhuZXdUb0RvKVxuXG4gICAgICAgICAgICAvLyBNYWtlIGFueSBidXR0b24gYXZhaWxhYmxlIGFnYWluXG4gICAgICAgICAgICBzZXRTdGF0dXModHJ1ZSlcblxuICAgICAgICAgICAgLy8gUkVOREVSIFRPRE9TXG4gICAgICAgICAgICAvLyAgIC0gQWRkIGV2ZW50IGxpc3RlbmVycyB0byBidXR0b25zXG4gICAgICAgICAgICBkb21NYW5pcHVsYXRpb24ucmVuZGVyT25lVG9EbyhuZXdUb0RvKVxuXG4gICAgICAgIH0pXG4gICAgfVxuXG5cblxuICAgIGNvbnN0IGhhbmRsZVByb2plY3RGb3JtU3VibWl0ID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcHJvamVjdC1mb3JtXCIpO1xuICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtZm9ybS1pbnB1dFwiKTtcblxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLmNsb3NlQWRkUHJvamVjdEZvcm0oKVxuXG4gICAgICAgICAgICAvLyBtYWtlIGFueSBlZGl0IGJ1dHRvbiBhdmFpbGFibGUgYWdhaW5cbiAgICAgICAgICAgIHNldFN0YXR1cyh0cnVlKVxuXG4gICAgICAgICAgICAvLyBhZGQgcHJvamVjdCBvbmx5IGlmIG5hbWUgaXMgbm90IGVtcHR5XG4gICAgICAgICAgICBpZiAoIWlucHV0LnZhbHVlKSByZXR1cm4gXG4gICAgICAgICAgICBlbHNlIGRvbU1hbmlwdWxhdGlvbi5hZGRQcm9qZWN0KGlucHV0LnZhbHVlKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIFByb2plY3QgXCJGYWN0b3J5XCIgd2l0aCBpbnB1dCB2YWx1ZSBhbmQgc2FtcGxlIGRlc2NyaXB0aW9uIGFuZCBzYXZlIGNyZWF0ZWQgT2JqZWN0IGluIGxvY2Fsc3RvcmFnZSBhbmQgX3Byb2plY3RzIGFycmF5XG4gICAgICAgICAgICBsZXQgbmV3UHJvamVjdCA9IFByb2plY3QoaW5wdXQudmFsdWUsIHNhbXBsZXMuZ2V0UHJvamVjdERlc2NyaXB0aW9uU2FtcGxlKCkpXG4gICAgICAgICAgICBwcm9qZWN0T2JqZWN0U3RvcmFnZS5hZGRQcm9qZWN0T2JqZWN0KG5ld1Byb2plY3QuZ2V0TmFtZSgpLCBuZXdQcm9qZWN0KTtcblxuICAgICAgICAgICAgcHJvamVjdE9iamVjdFN0b3JhZ2Uuc2V0Q3VycmVudFByb2plY3QobmV3UHJvamVjdClcblxuICAgICAgICAgICAgc3RvcmFnZS5zYXZlT2JqZWN0VG9TdG9yYWdlKGlucHV0LnZhbHVlLCBuZXdQcm9qZWN0LmNyZWF0ZVByb2plY3RPYmplY3QoKSlcblxuICAgICAgICAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGNvcnJlc3BvbmRpbmcgbmF2aWdhdGlvbiBpdGVtXG4gICAgICAgICAgICBsZXQgZG9tUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNlY3Rpb24ucHJvamVjdDpsYXN0LWNoaWxkYClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZG9tUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5wb3B1bGF0ZU1haW5MYXlvdXQobmV3UHJvamVjdC5nZXROYW1lKCksIG5ld1Byb2plY3QuZ2V0RGVzY3JpcHRpb24oKSlcbiAgICAgICAgICAgICAgICBwcm9qZWN0T2JqZWN0U3RvcmFnZS5zZXRDdXJyZW50UHJvamVjdChuZXdQcm9qZWN0KVxuICAgICAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5yZW1vdmVUb0RvcygpXG4gICAgICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLnJlbmRlclRvRG9zKG5ld1Byb2plY3QpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL3BvdWxhdGUgbWFpbiBzZWN0aW9uIHdpdGggY29ycmVzcG9uZGluZyBwcm9qZWN0IGluZm9ybWF0aW9uXG4gICAgICAgICAgICBkb21NYW5pcHVsYXRpb24ucG9wdWxhdGVNYWluTGF5b3V0KG5ld1Byb2plY3QuZ2V0TmFtZSgpLCBuZXdQcm9qZWN0LmdldERlc2NyaXB0aW9uKCkpXG5cblxuICAgICAgICAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVycyB0byBpY29ucyB0byBkZWxldGUgYW5kIGNoYW5nZSBhIHByb2plY3RcbiAgICAgICAgICAgIGxldCBfcHJvamVjdEVkaXRJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkLnByb2plY3QtZWRpdFwiKVxuICAgICAgICAgICAgbGV0IF9wcm9qZWN0RGVsZXRlSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZC5wcm9qZWN0LWRlbGV0ZVwiKVxuXG5cbiAgICAgICAgICAgIF9wcm9qZWN0RWRpdEljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChfc3RhdHVzKSB7IFxuICAgICAgICAgICAgICAgICAgICBkb21NYW5pcHVsYXRpb24ub3BlbkVkaXRQcm9qZWN0Rm9ybShwcm9qZWN0T2JqZWN0U3RvcmFnZS5nZXRDdXJyZW50UHJvamVjdCgpKVxuICAgICAgICAgICAgICAgICAgICBzZXRTdGF0dXMoZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVByb2plY3RFZGl0Rm9ybVN1Ym1pdChwcm9qZWN0T2JqZWN0U3RvcmFnZS5nZXRDdXJyZW50UHJvamVjdCgpKVxuICAgICAgICAgICAgICAgIH0gZWxzZSByZXR1cm5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlUHJvamVjdEVkaXRGb3JtU3VibWl0ID0gKHByb2plY3RPYmplY3QpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RPYmplY3QpXG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RPYmplY3QuZ2V0TmFtZSgpKVxuICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC1wcm9qZWN0LWZvcm1cIilcbiAgICAgICAgY29uc29sZS5sb2coXCJzdWNlc3NcIilcbiAgICAgICAgbGV0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRpbmcubWFpbi5mb3JtXCIpXG4gICAgICAgIGxldCBzdWJUaXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWItaGVhZGluZy5tYWluLmZvcm1cIilcblxuXG5cbiAgICAgICAgLy8gY2hhbmdlIHByb2plY3QgaW5mb3JtYXRpb24gYmFzZWQgb24gZm9ybSBpbnB1dFxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcblxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgICAgIC8vIG1ha2UgYW55IGVkaXQgYnV0dG9uIGF2YWlsYWJsZSBhZ2FpblxuICAgICAgICAgICAgc2V0U3RhdHVzKHRydWUpXG5cbiAgICAgICAgICAgIC8vY2xvc2UgZm9ybVxuICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLmNsb3NlRWRpdFByb2plY3RGb3JtKClcblxuICAgICAgICAgICAgcHJvamVjdE9iamVjdC5zZXROYW1lKHRpdGxlSW5wdXQudmFsdWUpXG4gICAgICAgICAgICBwcm9qZWN0T2JqZWN0LnNldERlc2NyaXB0aW9uKHN1YlRpdGxlSW5wdXQudmFsdWUpXG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RPYmplY3QuZ2V0TmFtZSgpKVxuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvamVjdE9iamVjdC5nZXREZXNjcmlwdGlvbigpKVxuXG4gICAgICAgICAgICBkb21NYW5pcHVsYXRpb24uYWRkTWFpbkxheW91dCgpXG4gICAgICAgICAgICBkb21NYW5pcHVsYXRpb24ucG9wdWxhdGVNYWluTGF5b3V0KHRpdGxlSW5wdXQudmFsdWUsIHN1YlRpdGxlSW5wdXQudmFsdWUpXG4gICAgICAgIH0pXG5cbiAgICB9XG5cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYnV0dG9uQWRkUHJvamVjdExpc3RlbmVyLFxuICAgICAgICBidXR0b25BZGRUb0RvTGlzdGVuZXJcbiAgICB9XG59KSgpO1xuIiwiZXhwb3J0IGNvbnN0IHByb2plY3RPYmplY3RTdG9yYWdlID0gKCgpID0+IHtcblxuICAgIGxldCBfcHJvamVjdE9iamVjdFN0b3JhZ2UgPSB7fTtcbiAgICBsZXQgX2N1cnJlbnRQcm9qZWN0O1xuXG4gICAgY29uc3QgZ2V0UHJvamVjdE9iamVjdCA9ICh0aXRsZSkgPT4ge1xuICAgICAgICByZXR1cm4gX3Byb2plY3RPYmplY3RTdG9yYWdlLnRpdGxlXG4gICAgfVxuXG4gICAgY29uc3QgYWRkUHJvamVjdE9iamVjdCA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIF9wcm9qZWN0T2JqZWN0U3RvcmFnZS5rZXkgPSB2YWx1ZVxuICAgIH1cblxuICAgIGNvbnN0IGdldEN1cnJlbnRQcm9qZWN0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gX2N1cnJlbnRQcm9qZWN0XG4gICAgfVxuXG4gICAgY29uc3Qgc2V0Q3VycmVudFByb2plY3QgPSAob2JqZWN0KSA9PiB7XG4gICAgICAgIF9jdXJyZW50UHJvamVjdCA9IG9iamVjdFxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldFByb2plY3RPYmplY3QsXG4gICAgICAgIGFkZFByb2plY3RPYmplY3QsXG4gICAgICAgIGdldEN1cnJlbnRQcm9qZWN0LFxuICAgICAgICBzZXRDdXJyZW50UHJvamVjdFxuICAgIH1cbn0pKCk7IiwiLy8gRmFjdG9yeSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBQcm9qZWN0XG5cbmV4cG9ydCBjb25zdCBQcm9qZWN0ID0gKG5hbWUsIGRlc2NyaXB0aW9uKSA9PiB7XG5cbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgICBjb25zdCBzZXROYW1lID0gKG5ld05hbWUpID0+IG5hbWUgPSBuZXdOYW1lO1xuXG4gICAgY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAoKSA9PiBkZXNjcmlwdGlvbjtcbiAgICBjb25zdCBzZXREZXNjcmlwdGlvbiA9IChuZXdEZXNjcmlwdGlvbikgPT4gZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcblxuICAgIGxldCBfYXNzb2NpYXRlZFRvRG9zID0gW107XG5cbiAgICBjb25zdCBnZXRUb0RvID0gKGluZGV4KSA9PiBfYXNzb2NpYXRlZFRvRG9zW2luZGV4XTtcbiAgICBjb25zdCBnZXRBbGxUb0RvcyA9ICgpID0+IF9hc3NvY2lhdGVkVG9Eb3M7XG5cbiAgICBjb25zdCBhZGRUb0RvID0gKG9iamVjdCkgPT4gX2Fzc29jaWF0ZWRUb0Rvcy5wdXNoKG9iamVjdClcbiAgICBjb25zdCByZW1vdmVUb0RvID0gKGluZGV4KSA9PiBfYXNzb2NpYXRlZFRvRG9zLnNwbGljZShpbmRleCwgMSlcblxuICAgIGNvbnN0IF9jcmVhdGVUb0Rvc09iamVjdCA9ICgpID0+IHtcblxuICAgICAgICBsZXQgVG9Eb3NPYmplY3QgPSB7fVxuXG4gICAgICAgIF9hc3NvY2lhdGVkVG9Eb3MuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgVG9Eb3NPYmplY3RbZS5nZXROYW1lKCldID0gZS5jcmVhdGVUb0RvT2JqZWN0KClcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gVG9Eb3NPYmplY3RcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0T2JqZWN0ID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IHByb2plY3RPYmplY3QgPSB7IFxuICAgICAgICAgICAgXCJuYW1lXCIgOiBnZXROYW1lKCksXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBnZXREZXNjcmlwdGlvbigpLFxuICAgICAgICAgICAgXCJhc3NvY2lhdGVkVG9Eb3NcIiA6IF9jcmVhdGVUb0Rvc09iamVjdCgpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvamVjdE9iamVjdFxuICAgIH1cblxuXG4gICAgcmV0dXJuIHtnZXROYW1lLFxuICAgICAgICAgICAgc2V0TmFtZSxcbiAgICAgICAgICAgIHNldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0RGVzY3JpcHRpb24sXG4gICAgICAgICAgICBnZXRUb0RvLFxuICAgICAgICAgICAgYWRkVG9EbyxcbiAgICAgICAgICAgIHJlbW92ZVRvRG8sXG4gICAgICAgICAgICBnZXRBbGxUb0RvcyxcbiAgICAgICAgICAgIGNyZWF0ZVByb2plY3RPYmplY3QsXG4gICAgICAgIH1cbn1cblxuXG5cbiIsImV4cG9ydCBjb25zdCBzdG9yYWdlID0gKCgpID0+IHtcblxuICAgIGNvbnN0IHNhdmVPYmplY3RUb1N0b3JhZ2UgPSAoa2V5LCBvYmplY3QpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkob2JqZWN0KSlcbiAgICB9XG5cbiAgICBjb25zdCBnZXRPYmplY3RGcm9tU3RvcmFnZSA9IChrZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSlcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzYXZlT2JqZWN0VG9TdG9yYWdlLFxuICAgICAgICBnZXRPYmplY3RGcm9tU3RvcmFnZVxuICAgIH1cbiAgICBcbn0pKCk7IiwiLy8gRmFjdG9yeSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBUb0RvXG5cbmV4cG9ydCBjb25zdCBUb0RvID0gKG5hbWUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBzdGF0dXMpID0+IHtcblxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBuYW1lO1xuICAgIGNvbnN0IHNldE5hbWUgPSAobmV3TmFtZSkgPT4gbmFtZSA9IG5ld05hbWU7XG5cbiAgICBjb25zdCBnZXREZXNjcmlwdGlvbiA9ICgpID0+IGRlc2NyaXB0aW9uO1xuICAgIGNvbnN0IHNldERlc2NyaXB0aW9uID0gKG5ld0Rlc2NyaXB0aW9uKSA9PiBkZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuXG4gICAgY29uc3QgZ2V0RHVlRGF0ZSA9ICgpID0+IGR1ZURhdGU7XG4gICAgY29uc3Qgc2V0RHVlRGF0ZSA9IChuZXdEdWVEYXRlKSA9PiBkdWVEYXRlID0gbmV3RHVlRGF0ZTsgXG5cbiAgICBjb25zdCBnZXRTdGF0dXMgPSAoKSA9PiBzdGF0dXNcbiAgICBjb25zdCB0b2dnbGVTdGF0dXMgPSAoKSA9PiBzdGF0dXMgPSBzdGF0dXMgPyBmYWxzZSA6IHRydWU7XG5cbiAgICBjb25zdCBjcmVhdGVUb0RvT2JqZWN0ID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCB0b0RvT2JqZWN0ID0ge1xuICAgICAgICAgICAgXCJuYW1lXCIgOiBnZXROYW1lKCksXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBnZXREZXNjcmlwdGlvbigpLFxuICAgICAgICAgICAgXCJkdWVEYXRlXCIgOiBnZXREdWVEYXRlKCksXG4gICAgICAgICAgICBcInN0YXR1c1wiIDogZ2V0U3RhdHVzKClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b0RvT2JqZWN0XG4gICAgfVxuXG4gICAgcmV0dXJuIHtnZXROYW1lLFxuICAgICAgICAgICAgc2V0TmFtZSwgXG4gICAgICAgICAgICBzZXREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGdldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0RHVlRGF0ZSxcbiAgICAgICAgICAgIHNldER1ZURhdGUsXG4gICAgICAgICAgICBnZXRTdGF0dXMsXG4gICAgICAgICAgICB0b2dnbGVTdGF0dXMsXG4gICAgICAgICAgICBjcmVhdGVUb0RvT2JqZWN0fVxufVxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFRvRG8gfSBmcm9tICcuL3RvZG9zL3RvZG9zLmpzJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3RzL3Byb2plY3RzLmpzJztcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZS5qcydcbmltcG9ydCB7IGRvbU1hbmlwdWxhdGlvbiwgZXZlbnRMaXN0ZW5lciwgZm9ybUxvZ2ljIH0gZnJvbSAnLi9VSS91aS5qcyc7XG5cbmV2ZW50TGlzdGVuZXIuYnV0dG9uQWRkUHJvamVjdExpc3RlbmVyKClcbmV2ZW50TGlzdGVuZXIuYnV0dG9uQWRkVG9Eb0xpc3RlbmVyKClcblxuXG5cblxuLy9kb21NYW5pcHVsYXRpb24ucmVtb3ZlUHJvamVjdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKSlcblxuLypcbmNvbnN0IG5ld1Byb2plY3QgPSBQcm9qZWN0KFwiU2Nob29sXCIsIFwidGhpcyBwcm9qZWN0IGlzIGZvciBvcmdhbml6aW5nIG15IHNjaG9vbCB3b3JrXCIpO1xuXG5jb25zdCBmaXJzdFRvRG8gPSBUb0RvKFwiRG8gc29tZXRoaW5nXCIsIFwiR2V0IG9uIG15IExldmVsXCIsIFwiMTguMTAuMjAwMFwiLCBmYWxzZSlcbmNvbnN0IHNlY29uZFRvRG8gPSBUb0RvKFwiRG8gc29tZXRoaW5nIGVsc2VcIiwgXCJTZXQgb24gbXkgTGV2ZWxcIiwgXCIxMy4xMC4yMDAwXCIsIGZhbHNlKVxubmV3UHJvamVjdC5hZGRUb0RvKGZpcnN0VG9Ebylcbm5ld1Byb2plY3QuYWRkVG9EbyhzZWNvbmRUb0RvKVxuXG5sZXQgdmFsaWRPYmplY3QgPSBuZXdQcm9qZWN0LmNyZWF0ZVByb2plY3RPYmplY3QoKTtcblxuc3RvcmFnZS5zYXZlT2JqZWN0VG9TdG9yYWdlKG5ld1Byb2plY3QuZ2V0TmFtZSgpLCB2YWxpZE9iamVjdClcblxuY29uc29sZS5sb2coc3RvcmFnZS5nZXRPYmplY3RGcm9tU3RvcmFnZShcIlNjaG9vbFwiKSlcbiovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9