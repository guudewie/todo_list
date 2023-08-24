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
        console.log(mainAnker)

        mainAnker.insertAdjacentHTML("afterbegin", html)
    }

    const renderToDos = (project) => {

    }


    return {
        addProject,
        removeProject,
        openAddProjectForm,
        closeAddProjectForm,
        populateMainLayout,
        addMainLayout,
        openEditProjectForm,
        closeEditProjectForm
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

    const handleProjectFormSubmit = () => {

        let formSection = document.getElementById("project-form-section")
        let form = document.getElementById("new-project-form");
        let input = document.querySelector(".project-form-input")

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
        buttonAddProjectListener
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ2ZEOztBQUVPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7VUNyQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ053QztBQUNTO0FBQ0g7QUFDeUI7O0FBRXZFLG9EQUFhOzs7OztBQUtiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL1VJL3NhbXBsZXMuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL1VJL3VpLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9wcm9qZWN0cy9wcm9qZWN0X3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL3Byb2plY3RzL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9zdG9yYWdlL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL3RvZG9zL3RvZG9zLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc2FtcGxlcyA9ICgoKSA9PiB7XG5cbiAgICBsZXQgX3Byb2plY3REZXNjcmlwdGlvblNhbXBsZSA9IFwiQ2xpY2sgdGhlIGJ1dHRvbiBvbiB0aGUgcmlnaHQgdG8gY2hhbmdlIHRoZSBkZXNjcmlwdGlvbiFcIlxuXG4gICAgY29uc3QgZ2V0UHJvamVjdERlc2NyaXB0aW9uU2FtcGxlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gX3Byb2plY3REZXNjcmlwdGlvblNhbXBsZVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldFByb2plY3REZXNjcmlwdGlvblNhbXBsZVxuICAgIH1cbn0pKCk7IiwiaW1wb3J0IHsgVG9EbyB9IGZyb20gJy4uL3RvZG9zL3RvZG9zLmpzJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9wcm9qZWN0cy9wcm9qZWN0cy5qcyc7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnLi4vc3RvcmFnZS9zdG9yYWdlLmpzJ1xuaW1wb3J0IHsgc2FtcGxlcyB9IGZyb20gJy4vc2FtcGxlcy5qcyc7XG5pbXBvcnQgeyBwcm9qZWN0T2JqZWN0U3RvcmFnZSB9IGZyb20gJy4uL3Byb2plY3RzL3Byb2plY3Rfc3RvcmFnZS5qcyc7XG4vLyAgIEZ1bmN0aW9uYWxpdGllc1xuLy8gICBcbi8vICAgICBhZGQgcHJvamVjdCB0byBkb21cbi8vICAgICBhZGQgdG9kbyB0byBkb21cbi8vXG4vLyAgICAgcmVtb3ZlIHByb2plY3QgZnJvbSBkb21cbi8vICAgICByZW1vdmUgdG9kbyBmcm9tIGRvbVxuLy8gICAgIFxuLy8gICAgIGNoYW5nZSBpbnRlcmZhY2UgYmFzZWQgb24gbmF2aWdhdGlvblxuLy8gICAgIGNoYW5nZSBoaWdobGlnaHRpbmcgb2YgbmF2aWdhdGlvbiBpdGVtc1xuLy9cbi8vXG4vLyAgICAgIFRvRG86IFxuLy8gICAgICAgICAgICAgIC0gd3JpdGUgZnVuY3Rpb25zIHJlbmRlciBMYXlvdXQgJiByZW5kZXIgVG9Eb3Ncbi8vICAgICAgICAgICAgICAtIHByb2plY3QgYXJyYXkvb2JqZWN0IGluIHNlcGVyYXRlIGxvZ2ljXG4vL1xuXG5leHBvcnQgY29uc3QgZG9tTWFuaXB1bGF0aW9uID0gKCgpID0+IHtcblxuXG5cbiAgICBjb25zdCBhZGRQcm9qZWN0ID0gKG5hbWUpID0+IHtcblxuICAgICAgICBjb25zdCBwcm9qZWN0RE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzJyk7XG5cbiAgICAgICAgbGV0IGh0bWwgPSAoYDxzZWN0aW9uIGNsYXNzPVwicHJvamVjdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+VG9jPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2plY3RcIj4ke25hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5gKVxuXG4gICAgICAgIHByb2plY3RET00uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3Qgb3BlbkFkZFByb2plY3RGb3JtID0gKCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKTtcblxuICAgICAgICBsZXQgaHRtbCA9IChgPHNlY3Rpb24gaWQ9XCJwcm9qZWN0LWZvcm0tc2VjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+dG9jPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gaWQ9XCJuZXctcHJvamVjdC1mb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwicHJvamVjdC1mb3JtLWlucHV0XCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5gKVxuXG4gICAgICAgIHByb2plY3RET00uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3QgY2xvc2VBZGRQcm9qZWN0Rm9ybSA9ICgpID0+IHtcblxuICAgICAgICBsZXQgYWRkUHJvamVjdEZvcm1Eb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2VjdGlvbiNwcm9qZWN0LWZvcm0tc2VjdGlvblwiKVxuICAgICAgICBhZGRQcm9qZWN0Rm9ybURvbS5yZW1vdmUoKVxuICAgIH1cblxuICAgIGNvbnN0IG9wZW5FZGl0UHJvamVjdEZvcm0gPSAocHJvamVjdE9iamVjdCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRpdGxlRGVzY3JpcHRpb25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci50aXRsZS1kZXNjcmlwdGlvblwiKVxuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGVEb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRpbmcubWFpblwiKVxuICAgICAgICBjb25zdCBwcm9qZWN0RGVzY3JpcHRpb25Eb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Yi1oZWFkaW5nLm1haW5cIik7XG4gICAgICAgIFxuICAgICAgICBwcm9qZWN0VGl0bGVEb20ucmVtb3ZlKClcbiAgICAgICAgcHJvamVjdERlc2NyaXB0aW9uRG9tLnJlbW92ZSgpXG5cbiAgICAgICAgbGV0IGh0bWwgPSAoYDxmb3JtIGlkPVwiZWRpdC1wcm9qZWN0LWZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImhlYWRpbmcgbWFpbiBmb3JtXCIgdmFsdWU9XCIke3Byb2plY3RPYmplY3QuZ2V0TmFtZSgpfVwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJzdWItaGVhZGluZyBtYWluIGZvcm1cIiBwbGFjZWhvbGRlcj1cIiR7cHJvamVjdE9iamVjdC5nZXREZXNjcmlwdGlvbigpfVwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+YClcblxuICAgICAgICB0aXRsZURlc2NyaXB0aW9uQ29udGFpbmVyLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWJlZ2luXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3QgY2xvc2VFZGl0UHJvamVjdEZvcm0gPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGVkaXRQcm9qZWN0Rm9ybURvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtI2VkaXQtcHJvamVjdC1mb3JtXCIpXG4gICAgICAgIGVkaXRQcm9qZWN0Rm9ybURvbS5yZW1vdmUoKVxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZVByb2plY3QgPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LnJlbW92ZSgpXG4gICAgfVxuICAgIFxuICAgIFxuICAgIGNvbnN0IHBvcHVsYXRlTWFpbkxheW91dCA9ICh0aXRsZSwgc3ViVGl0bGUpID0+IHtcblxuICAgICAgICBsZXQgZG9tVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRpbmcubWFpblwiKTtcbiAgICAgICAgbGV0IGRvbVN1YlRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWItaGVhZGluZy5tYWluXCIpO1xuXG4gICAgICAgIFxuICAgICAgICBkb21UaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgICBkb21TdWJUaXRsZS50ZXh0Q29udGVudCA9IHN1YlRpdGxlO1xuICAgIH1cblxuICAgIGNvbnN0IGFkZE1haW5MYXlvdXQgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgbWFpbkFua2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRpdi5jb250YWluZXItbWFpblwiKVxuICAgICAgICBsZXQgaHRtbCA9IGA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIHRpdGxlLWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGluZyBtYWluXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3ViLWhlYWRpbmcgbWFpblwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gXG4gICAgICAgIGNvbnNvbGUubG9nKG1haW5BbmtlcilcblxuICAgICAgICBtYWluQW5rZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCBodG1sKVxuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlclRvRG9zID0gKHByb2plY3QpID0+IHtcblxuICAgIH1cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkUHJvamVjdCxcbiAgICAgICAgcmVtb3ZlUHJvamVjdCxcbiAgICAgICAgb3BlbkFkZFByb2plY3RGb3JtLFxuICAgICAgICBjbG9zZUFkZFByb2plY3RGb3JtLFxuICAgICAgICBwb3B1bGF0ZU1haW5MYXlvdXQsXG4gICAgICAgIGFkZE1haW5MYXlvdXQsXG4gICAgICAgIG9wZW5FZGl0UHJvamVjdEZvcm0sXG4gICAgICAgIGNsb3NlRWRpdFByb2plY3RGb3JtXG4gICAgfVxufSkoKTtcblxuXG5cblxuXG5cbi8qXG5leHBvcnQgY29uc3QgZm9ybUxvZ2ljID0gKCgpID0+IHtcblxuICAgIFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2xvc2VGb3JtXG4gICAgfVxuXG59KSgpO1xuKi9cblxuXG5cblxuXG5cbmV4cG9ydCBjb25zdCBldmVudExpc3RlbmVyID0gKCgpID0+IHtcblxuICAgIGxldCBfcHJvamVjdHMgPSBbXTtcbiAgICBsZXQgX2N1cnJlbnRQcm9qZWN0O1xuICAgIGxldCBfc3RhdHVzID0gdHJ1ZTtcblxuICAgIGNvbnN0IHNldFN0YXR1cyA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICBfc3RhdHVzID0gdmFsdWVcbiAgICB9XG5cbiAgICBjb25zdCBidXR0b25BZGRQcm9qZWN0TGlzdGVuZXIgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGFkZFByb2plY3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtcHJvamVjdFwiKVxuICAgICAgICBcbiAgICAgICAgYWRkUHJvamVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgXG5cbiAgICAgICAgICAgIC8vIG9wZW4gZm9ybSB2aWEgZG9tIG1vZHVsZSBhbmQgc2V0IHVwIGV2ZW50IGxpc3RlbmVyIGZvciBzdWJtaXR0aW5nIHRoZSBmb3JtXG4gICAgICAgICAgICBpZiAoX3N0YXR1cykgeyBcbiAgICAgICAgICAgICAgICBkb21NYW5pcHVsYXRpb24ub3BlbkFkZFByb2plY3RGb3JtKCk7XG4gICAgICAgICAgICAgICAgaGFuZGxlUHJvamVjdEZvcm1TdWJtaXQoKTtcbiAgICAgICAgICAgICAgICBzZXRTdGF0dXMoZmFsc2UpXG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlUHJvamVjdEZvcm1TdWJtaXQgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGZvcm1TZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWZvcm0tc2VjdGlvblwiKVxuICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXByb2plY3QtZm9ybVwiKTtcbiAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWZvcm0taW5wdXRcIilcblxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLmNsb3NlQWRkUHJvamVjdEZvcm0oKVxuXG4gICAgICAgICAgICAvLyBtYWtlIGFueSBlZGl0IGJ1dHRvbiBhdmFpbGFibGUgYWdhaW5cbiAgICAgICAgICAgIHNldFN0YXR1cyh0cnVlKVxuXG4gICAgICAgICAgICAvLyBhZGQgcHJvamVjdCBvbmx5IGlmIG5hbWUgaXMgbm90IGVtcHR5XG4gICAgICAgICAgICBpZiAoIWlucHV0LnZhbHVlKSByZXR1cm4gXG4gICAgICAgICAgICBlbHNlIGRvbU1hbmlwdWxhdGlvbi5hZGRQcm9qZWN0KGlucHV0LnZhbHVlKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIFByb2plY3QgXCJGYWN0b3J5XCIgd2l0aCBpbnB1dCB2YWx1ZSBhbmQgc2FtcGxlIGRlc2NyaXB0aW9uIGFuZCBzYXZlIGNyZWF0ZWQgT2JqZWN0IGluIGxvY2Fsc3RvcmFnZSBhbmQgX3Byb2plY3RzIGFycmF5XG4gICAgICAgICAgICBsZXQgbmV3UHJvamVjdCA9IFByb2plY3QoaW5wdXQudmFsdWUsIHNhbXBsZXMuZ2V0UHJvamVjdERlc2NyaXB0aW9uU2FtcGxlKCkpXG4gICAgICAgICAgICBwcm9qZWN0T2JqZWN0U3RvcmFnZS5hZGRQcm9qZWN0T2JqZWN0KG5ld1Byb2plY3QuZ2V0TmFtZSgpLCBuZXdQcm9qZWN0KTtcblxuICAgICAgICAgICAgcHJvamVjdE9iamVjdFN0b3JhZ2Uuc2V0Q3VycmVudFByb2plY3QobmV3UHJvamVjdClcblxuICAgICAgICAgICAgc3RvcmFnZS5zYXZlT2JqZWN0VG9TdG9yYWdlKGlucHV0LnZhbHVlLCBuZXdQcm9qZWN0LmNyZWF0ZVByb2plY3RPYmplY3QoKSlcblxuICAgICAgICAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGNvcnJlc3BvbmRpbmcgbmF2aWdhdGlvbiBpdGVtXG4gICAgICAgICAgICBsZXQgZG9tUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNlY3Rpb24ucHJvamVjdDpsYXN0LWNoaWxkYClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZG9tUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5wb3B1bGF0ZU1haW5MYXlvdXQobmV3UHJvamVjdC5nZXROYW1lKCksIG5ld1Byb2plY3QuZ2V0RGVzY3JpcHRpb24oKSlcbiAgICAgICAgICAgICAgICBwcm9qZWN0T2JqZWN0U3RvcmFnZS5zZXRDdXJyZW50UHJvamVjdChuZXdQcm9qZWN0KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZG9tTWFuaXB1bGF0aW9uLnBvcHVsYXRlTWFpbkxheW91dChuZXdQcm9qZWN0LmdldE5hbWUoKSwgbmV3UHJvamVjdC5nZXREZXNjcmlwdGlvbigpKVxuXG5cbiAgICAgICAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnMgdG8gaWNvbnMgdG8gZGVsZXRlIGFuZCBjaGFuZ2UgYSBwcm9qZWN0XG4gICAgICAgICAgICBsZXQgX3Byb2plY3RFZGl0SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZC5wcm9qZWN0LWVkaXRcIilcbiAgICAgICAgICAgIGxldCBfcHJvamVjdERlbGV0ZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQucHJvamVjdC1kZWxldGVcIilcblxuICAgICAgICAgICAgX3Byb2plY3RFZGl0SWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKF9zdGF0dXMpIHsgXG4gICAgICAgICAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5vcGVuRWRpdFByb2plY3RGb3JtKHByb2plY3RPYmplY3RTdG9yYWdlLmdldEN1cnJlbnRQcm9qZWN0KCkpXG4gICAgICAgICAgICAgICAgICAgIHNldFN0YXR1cyhmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlUHJvamVjdEVkaXRGb3JtU3VibWl0KHByb2plY3RPYmplY3RTdG9yYWdlLmdldEN1cnJlbnRQcm9qZWN0KCkpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldHVyblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVQcm9qZWN0RWRpdEZvcm1TdWJtaXQgPSAocHJvamVjdE9iamVjdCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdE9iamVjdClcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdE9iamVjdC5nZXROYW1lKCkpXG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LXByb2plY3QtZm9ybVwiKVxuICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Vzc1wiKVxuICAgICAgICBsZXQgdGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGluZy5tYWluLmZvcm1cIilcbiAgICAgICAgbGV0IHN1YlRpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Yi1oZWFkaW5nLm1haW4uZm9ybVwiKVxuXG5cblxuICAgICAgICAvLyBjaGFuZ2UgcHJvamVjdCBpbmZvcm1hdGlvbiBiYXNlZCBvbiBmb3JtIGlucHV0XG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICAgICAgLy8gbWFrZSBhbnkgZWRpdCBidXR0b24gYXZhaWxhYmxlIGFnYWluXG4gICAgICAgICAgICBzZXRTdGF0dXModHJ1ZSlcblxuICAgICAgICAgICAgLy9jbG9zZSBmb3JtXG4gICAgICAgICAgICBkb21NYW5pcHVsYXRpb24uY2xvc2VFZGl0UHJvamVjdEZvcm0oKVxuXG4gICAgICAgICAgICBwcm9qZWN0T2JqZWN0LnNldE5hbWUodGl0bGVJbnB1dC52YWx1ZSlcbiAgICAgICAgICAgIHByb2plY3RPYmplY3Quc2V0RGVzY3JpcHRpb24oc3ViVGl0bGVJbnB1dC52YWx1ZSlcblxuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvamVjdE9iamVjdC5nZXROYW1lKCkpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0T2JqZWN0LmdldERlc2NyaXB0aW9uKCkpXG5cbiAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5hZGRNYWluTGF5b3V0KClcbiAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5wb3B1bGF0ZU1haW5MYXlvdXQodGl0bGVJbnB1dC52YWx1ZSwgc3ViVGl0bGVJbnB1dC52YWx1ZSlcbiAgICAgICAgfSlcblxuICAgIH1cblxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBidXR0b25BZGRQcm9qZWN0TGlzdGVuZXJcbiAgICB9XG59KSgpO1xuIiwiZXhwb3J0IGNvbnN0IHByb2plY3RPYmplY3RTdG9yYWdlID0gKCgpID0+IHtcblxuICAgIGxldCBfcHJvamVjdE9iamVjdFN0b3JhZ2UgPSB7fTtcbiAgICBsZXQgX2N1cnJlbnRQcm9qZWN0O1xuXG4gICAgY29uc3QgZ2V0UHJvamVjdE9iamVjdCA9ICh0aXRsZSkgPT4ge1xuICAgICAgICByZXR1cm4gX3Byb2plY3RPYmplY3RTdG9yYWdlLnRpdGxlXG4gICAgfVxuXG4gICAgY29uc3QgYWRkUHJvamVjdE9iamVjdCA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIF9wcm9qZWN0T2JqZWN0U3RvcmFnZS5rZXkgPSB2YWx1ZVxuICAgIH1cblxuICAgIGNvbnN0IGdldEN1cnJlbnRQcm9qZWN0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gX2N1cnJlbnRQcm9qZWN0XG4gICAgfVxuXG4gICAgY29uc3Qgc2V0Q3VycmVudFByb2plY3QgPSAob2JqZWN0KSA9PiB7XG4gICAgICAgIF9jdXJyZW50UHJvamVjdCA9IG9iamVjdFxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldFByb2plY3RPYmplY3QsXG4gICAgICAgIGFkZFByb2plY3RPYmplY3QsXG4gICAgICAgIGdldEN1cnJlbnRQcm9qZWN0LFxuICAgICAgICBzZXRDdXJyZW50UHJvamVjdFxuICAgIH1cbn0pKCk7IiwiLy8gRmFjdG9yeSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBQcm9qZWN0XG5cbmV4cG9ydCBjb25zdCBQcm9qZWN0ID0gKG5hbWUsIGRlc2NyaXB0aW9uKSA9PiB7XG5cbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgICBjb25zdCBzZXROYW1lID0gKG5ld05hbWUpID0+IG5hbWUgPSBuZXdOYW1lO1xuXG4gICAgY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAoKSA9PiBkZXNjcmlwdGlvbjtcbiAgICBjb25zdCBzZXREZXNjcmlwdGlvbiA9IChuZXdEZXNjcmlwdGlvbikgPT4gZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcblxuICAgIGxldCBfYXNzb2NpYXRlZFRvRG9zID0gW107XG5cbiAgICBjb25zdCBnZXRUb0RvID0gKGluZGV4KSA9PiBfYXNzb2NpYXRlZFRvRG9zW2luZGV4XTtcbiAgICBjb25zdCBnZXRBbGxUb0RvcyA9ICgpID0+IF9hc3NvY2lhdGVkVG9Eb3M7XG5cbiAgICBjb25zdCBhZGRUb0RvID0gKG9iamVjdCkgPT4gX2Fzc29jaWF0ZWRUb0Rvcy5wdXNoKG9iamVjdClcbiAgICBjb25zdCByZW1vdmVUb0RvID0gKGluZGV4KSA9PiBfYXNzb2NpYXRlZFRvRG9zLnNwbGljZShpbmRleCwgMSlcblxuICAgIGNvbnN0IF9jcmVhdGVUb0Rvc09iamVjdCA9ICgpID0+IHtcblxuICAgICAgICBsZXQgVG9Eb3NPYmplY3QgPSB7fVxuXG4gICAgICAgIF9hc3NvY2lhdGVkVG9Eb3MuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgVG9Eb3NPYmplY3RbZS5nZXROYW1lKCldID0gZS5jcmVhdGVUb0RvT2JqZWN0KClcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gVG9Eb3NPYmplY3RcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0T2JqZWN0ID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IHByb2plY3RPYmplY3QgPSB7IFxuICAgICAgICAgICAgXCJuYW1lXCIgOiBnZXROYW1lKCksXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBnZXREZXNjcmlwdGlvbigpLFxuICAgICAgICAgICAgXCJhc3NvY2lhdGVkVG9Eb3NcIiA6IF9jcmVhdGVUb0Rvc09iamVjdCgpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvamVjdE9iamVjdFxuICAgIH1cblxuXG4gICAgcmV0dXJuIHtnZXROYW1lLFxuICAgICAgICAgICAgc2V0TmFtZSxcbiAgICAgICAgICAgIHNldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0RGVzY3JpcHRpb24sXG4gICAgICAgICAgICBnZXRUb0RvLFxuICAgICAgICAgICAgYWRkVG9EbyxcbiAgICAgICAgICAgIHJlbW92ZVRvRG8sXG4gICAgICAgICAgICBnZXRBbGxUb0RvcyxcbiAgICAgICAgICAgIGNyZWF0ZVByb2plY3RPYmplY3QsXG4gICAgICAgIH1cbn1cblxuIiwiZXhwb3J0IGNvbnN0IHN0b3JhZ2UgPSAoKCkgPT4ge1xuXG4gICAgY29uc3Qgc2F2ZU9iamVjdFRvU3RvcmFnZSA9IChrZXksIG9iamVjdCkgPT4ge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShvYmplY3QpKVxuICAgIH1cblxuICAgIGNvbnN0IGdldE9iamVjdEZyb21TdG9yYWdlID0gKGtleSkgPT4ge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHNhdmVPYmplY3RUb1N0b3JhZ2UsXG4gICAgICAgIGdldE9iamVjdEZyb21TdG9yYWdlXG4gICAgfVxuICAgIFxufSkoKTsiLCIvLyBGYWN0b3J5IGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIFRvRG9cblxuZXhwb3J0IGNvbnN0IFRvRG8gPSAobmFtZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHN0YXR1cykgPT4ge1xuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG4gICAgY29uc3Qgc2V0TmFtZSA9IChuZXdOYW1lKSA9PiBuYW1lID0gbmV3TmFtZTtcblxuICAgIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKCkgPT4gZGVzY3JpcHRpb247XG4gICAgY29uc3Qgc2V0RGVzY3JpcHRpb24gPSAobmV3RGVzY3JpcHRpb24pID0+IGRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG5cbiAgICBjb25zdCBnZXREdWVEYXRlID0gKCkgPT4gZHVlRGF0ZTtcbiAgICBjb25zdCBzZXREdWVEYXRlID0gKG5ld0R1ZURhdGUpID0+IGR1ZURhdGUgPSBuZXdEdWVEYXRlOyBcblxuICAgIGNvbnN0IGdldFN0YXR1cyA9ICgpID0+IHN0YXR1c1xuICAgIGNvbnN0IHRvZ2dsZVN0YXR1cyA9ICgpID0+IHN0YXR1cyA9IHN0YXR1cyA/IGZhbHNlIDogdHJ1ZTtcblxuICAgIGNvbnN0IGNyZWF0ZVRvRG9PYmplY3QgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHRvRG9PYmplY3QgPSB7XG4gICAgICAgICAgICBcIm5hbWVcIiA6IGdldE5hbWUoKSxcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IGdldERlc2NyaXB0aW9uKCksXG4gICAgICAgICAgICBcImR1ZURhdGVcIiA6IGdldER1ZURhdGUoKSxcbiAgICAgICAgICAgIFwic3RhdHVzXCIgOiBnZXRTdGF0dXMoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvRG9PYmplY3RcbiAgICB9XG5cbiAgICByZXR1cm4ge2dldE5hbWUsXG4gICAgICAgICAgICBzZXROYW1lLCBcbiAgICAgICAgICAgIHNldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0RGVzY3JpcHRpb24sXG4gICAgICAgICAgICBnZXREdWVEYXRlLFxuICAgICAgICAgICAgc2V0RHVlRGF0ZSxcbiAgICAgICAgICAgIGdldFN0YXR1cyxcbiAgICAgICAgICAgIHRvZ2dsZVN0YXR1cyxcbiAgICAgICAgICAgIGNyZWF0ZVRvRG9PYmplY3R9XG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVG9EbyB9IGZyb20gJy4vdG9kb3MvdG9kb3MuanMnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdHMvcHJvamVjdHMuanMnO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLmpzJ1xuaW1wb3J0IHsgZG9tTWFuaXB1bGF0aW9uLCBldmVudExpc3RlbmVyLCBmb3JtTG9naWMgfSBmcm9tICcuL1VJL3VpLmpzJztcblxuZXZlbnRMaXN0ZW5lci5idXR0b25BZGRQcm9qZWN0TGlzdGVuZXIoKVxuXG5cblxuXG4vL2RvbU1hbmlwdWxhdGlvbi5yZW1vdmVQcm9qZWN0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cycpKVxuXG4vKlxuY29uc3QgbmV3UHJvamVjdCA9IFByb2plY3QoXCJTY2hvb2xcIiwgXCJ0aGlzIHByb2plY3QgaXMgZm9yIG9yZ2FuaXppbmcgbXkgc2Nob29sIHdvcmtcIik7XG5cbmNvbnN0IGZpcnN0VG9EbyA9IFRvRG8oXCJEbyBzb21ldGhpbmdcIiwgXCJHZXQgb24gbXkgTGV2ZWxcIiwgXCIxOC4xMC4yMDAwXCIsIGZhbHNlKVxuY29uc3Qgc2Vjb25kVG9EbyA9IFRvRG8oXCJEbyBzb21ldGhpbmcgZWxzZVwiLCBcIlNldCBvbiBteSBMZXZlbFwiLCBcIjEzLjEwLjIwMDBcIiwgZmFsc2UpXG5uZXdQcm9qZWN0LmFkZFRvRG8oZmlyc3RUb0RvKVxubmV3UHJvamVjdC5hZGRUb0RvKHNlY29uZFRvRG8pXG5cbmxldCB2YWxpZE9iamVjdCA9IG5ld1Byb2plY3QuY3JlYXRlUHJvamVjdE9iamVjdCgpO1xuXG5zdG9yYWdlLnNhdmVPYmplY3RUb1N0b3JhZ2UobmV3UHJvamVjdC5nZXROYW1lKCksIHZhbGlkT2JqZWN0KVxuXG5jb25zb2xlLmxvZyhzdG9yYWdlLmdldE9iamVjdEZyb21TdG9yYWdlKFwiU2Nob29sXCIpKVxuKi8iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=