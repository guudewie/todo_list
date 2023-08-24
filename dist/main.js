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

    const openEditProjectForm = (projectObject) => {

        const mainDom = document.querySelector(".container-main")

        const projectTitleDom = document.querySelector(".heading.main")
        const projectDescriptionDom = document.querySelector(".sub-heading.main");
        
        projectTitleDom.remove()
        projectDescriptionDom.remove()

        let html = (`<form id="edit-project-form">
                        <input class="heading main" placeholder="${projectObject.getName()}" type="text">
                        <div class="container sub-heading-icons">
                            <input class="sub-heading main" placeholder="${projectObject.getDescription()}" type="text">
                            <div class="edit-project-icons">
                                <span class="material-symbols-outlined project-edit">edit</span>
                                <span class="material-symbols-outlined project-delete">delete</span>
                            </div>
                        </div>
                    </form>`)

        mainDom.insertAdjacentHTML("beforebegin", html)
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
        addMainLayout,
        openEditProjectForm
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

            // create Project "Factory" with input value and sample description and save created Object in localstorage and _projects array
            let newProject = (0,_projects_projects_js__WEBPACK_IMPORTED_MODULE_1__.Project)(input.value, _samples_js__WEBPACK_IMPORTED_MODULE_3__.samples.getProjectDescriptionSample())
            _projects.push(newProject);
            _storage_storage_js__WEBPACK_IMPORTED_MODULE_2__.storage.saveObjectToStorage(input.value, newProject.createProjectObject())

            
            // add event listener to corresponding navigation item
            let domProject = document.querySelector(`.project${_projects.length}`)

            // onclick populate main app section with project name and description
            domProject.addEventListener("click", () => domManipulation.addMainLayout(newProject.getName(), newProject.getDescription() ))

            // add event listeners to icons to delete and change a project
            let _projectEditIcon = document.querySelector(".material-symbols-outlined.project-edit")
            let _projectDeleteIcon = document.querySelector(".material-symbols-outlined.project-delete")

            _projectEditIcon.addEventListener("click", () => domManipulation.openEditProjectForm(newProject))
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S2I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvVUkvc2FtcGxlcy5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvVUkvdWkuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL3Byb2plY3RzL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9zdG9yYWdlL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL3RvZG9zL3RvZG9zLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc2FtcGxlcyA9ICgoKSA9PiB7XG5cbiAgICBsZXQgX3Byb2plY3REZXNjcmlwdGlvblNhbXBsZSA9IFwiQ2xpY2sgdGhlIGJ1dHRvbiBvbiB0aGUgcmlnaHQgdG8gY2hhbmdlIHRoZSBkZXNjcmlwdGlvbiFcIlxuXG4gICAgY29uc3QgZ2V0UHJvamVjdERlc2NyaXB0aW9uU2FtcGxlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gX3Byb2plY3REZXNjcmlwdGlvblNhbXBsZVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldFByb2plY3REZXNjcmlwdGlvblNhbXBsZVxuICAgIH1cbn0pKCk7IiwiaW1wb3J0IHsgVG9EbyB9IGZyb20gJy4uL3RvZG9zL3RvZG9zLmpzJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9wcm9qZWN0cy9wcm9qZWN0cy5qcyc7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnLi4vc3RvcmFnZS9zdG9yYWdlLmpzJ1xuaW1wb3J0IHsgc2FtcGxlcyB9IGZyb20gJy4vc2FtcGxlcy5qcyc7XG4vLyAgIEZ1bmN0aW9uYWxpdGllc1xuLy8gICBcbi8vICAgICBhZGQgcHJvamVjdCB0byBkb21cbi8vICAgICBhZGQgdG9kbyB0byBkb21cbi8vXG4vLyAgICAgcmVtb3ZlIHByb2plY3QgZnJvbSBkb21cbi8vICAgICByZW1vdmUgdG9kbyBmcm9tIGRvbVxuLy8gICAgIFxuLy8gICAgIGNoYW5nZSBpbnRlcmZhY2UgYmFzZWQgb24gbmF2aWdhdGlvblxuLy8gICAgIGNoYW5nZSBoaWdobGlnaHRpbmcgb2YgbmF2aWdhdGlvbiBpdGVtc1xuLy9cbi8vXG4vLyAgICAgIFRvRG86IFxuLy8gICAgICAgICAgICAgIC0gd3JpdGUgZnVuY3Rpb25zIHJlbmRlciBMYXlvdXQgJiByZW5kZXIgVG9Eb3Ncbi8vICAgICAgICAgICAgICAtIHByb2plY3QgYXJyYXkvb2JqZWN0IGluIHNlcGVyYXRlIGxvZ2ljXG4vL1xuXG5leHBvcnQgY29uc3QgZG9tTWFuaXB1bGF0aW9uID0gKCgpID0+IHtcblxuXG5cbiAgICBjb25zdCBhZGRQcm9qZWN0ID0gKG5hbWUsIGlkZW50aWZpZXIpID0+IHtcblxuICAgICAgICBjb25zdCBwcm9qZWN0RE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzJyk7XG5cbiAgICAgICAgbGV0IGh0bWwgPSAoYDxzZWN0aW9uIGNsYXNzPVwicHJvamVjdCR7aWRlbnRpZmllcn1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPlRvYzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9qZWN0XCI+JHtuYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+YClcblxuICAgICAgICBwcm9qZWN0RE9NLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBodG1sKVxuICAgIH1cblxuICAgIGNvbnN0IG9wZW5Qcm9qZWN0Rm9ybSA9ICgpID0+IHtcblxuICAgICAgICBjb25zdCBwcm9qZWN0RE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzJyk7XG5cbiAgICAgICAgbGV0IGh0bWwgPSAoYDxzZWN0aW9uIGlkPVwicHJvamVjdC1mb3JtLXNlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPnRvYzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIGlkPVwibmV3LXByb2plY3QtZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInByb2plY3QtZm9ybS1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+YClcblxuICAgICAgICBwcm9qZWN0RE9NLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBodG1sKVxuICAgIH1cblxuICAgIGNvbnN0IG9wZW5FZGl0UHJvamVjdEZvcm0gPSAocHJvamVjdE9iamVjdCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IG1haW5Eb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci1tYWluXCIpXG5cbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkaW5nLm1haW5cIilcbiAgICAgICAgY29uc3QgcHJvamVjdERlc2NyaXB0aW9uRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWItaGVhZGluZy5tYWluXCIpO1xuICAgICAgICBcbiAgICAgICAgcHJvamVjdFRpdGxlRG9tLnJlbW92ZSgpXG4gICAgICAgIHByb2plY3REZXNjcmlwdGlvbkRvbS5yZW1vdmUoKVxuXG4gICAgICAgIGxldCBodG1sID0gKGA8Zm9ybSBpZD1cImVkaXQtcHJvamVjdC1mb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJoZWFkaW5nIG1haW5cIiBwbGFjZWhvbGRlcj1cIiR7cHJvamVjdE9iamVjdC5nZXROYW1lKCl9XCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgc3ViLWhlYWRpbmctaWNvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJzdWItaGVhZGluZyBtYWluXCIgcGxhY2Vob2xkZXI9XCIke3Byb2plY3RPYmplY3QuZ2V0RGVzY3JpcHRpb24oKX1cIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0LXByb2plY3QtaWNvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHByb2plY3QtZWRpdFwiPmVkaXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCBwcm9qZWN0LWRlbGV0ZVwiPmRlbGV0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+YClcblxuICAgICAgICBtYWluRG9tLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWJlZ2luXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlUHJvamVjdCA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKClcbiAgICB9XG4gICAgXG4gICAgXG4gICAgY29uc3QgYWRkTWFpbkxheW91dCA9ICh0aXRsZSwgc3ViVGl0bGUpID0+IHtcblxuICAgICAgICBsZXQgZG9tVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRpbmcubWFpblwiKTtcbiAgICAgICAgbGV0IGRvbVN1YlRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWItaGVhZGluZy5tYWluXCIpO1xuXG4gICAgICAgIFxuICAgICAgICBkb21UaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgICBkb21TdWJUaXRsZS50ZXh0Q29udGVudCA9IHN1YlRpdGxlO1xuXG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyVG9Eb3MgPSAocHJvamVjdCkgPT4ge1xuXG4gICAgfVxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRQcm9qZWN0LFxuICAgICAgICByZW1vdmVQcm9qZWN0LFxuICAgICAgICBvcGVuUHJvamVjdEZvcm0sXG4gICAgICAgIGFkZE1haW5MYXlvdXQsXG4gICAgICAgIG9wZW5FZGl0UHJvamVjdEZvcm1cbiAgICB9XG59KSgpO1xuXG5cblxuXG5cblxuLypcbmV4cG9ydCBjb25zdCBmb3JtTG9naWMgPSAoKCkgPT4ge1xuXG4gICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjbG9zZUZvcm1cbiAgICB9XG5cbn0pKCk7XG4qL1xuXG5cblxuXG5cblxuZXhwb3J0IGNvbnN0IGV2ZW50TGlzdGVuZXIgPSAoKCkgPT4ge1xuXG4gICAgbGV0IF9wcm9qZWN0cyA9IFtdO1xuICAgIGxldCBfc3RhdHVzID0gdHJ1ZTtcblxuICAgIGNvbnN0IGJ1dHRvbkFkZFByb2plY3RMaXN0ZW5lciA9ICgpID0+IHtcblxuICAgICAgICBsZXQgYWRkUHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0XCIpXG4gICAgICAgIFxuICAgICAgICBhZGRQcm9qZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyBcblxuICAgICAgICAgICAgLy8gb3BlbiBmb3JtIHZpYSBkb20gbW9kdWxlIGFuZCBzZXQgdXAgZXZlbnQgbGlzdGVuZXIgZm9yIHN1Ym1pdHRpbmcgdGhlIGZvcm1cbiAgICAgICAgICAgIGlmIChfc3RhdHVzKSB7IFxuICAgICAgICAgICAgICAgIGRvbU1hbmlwdWxhdGlvbi5vcGVuUHJvamVjdEZvcm0oKTtcbiAgICAgICAgICAgICAgICBoYW5kbGVQcm9qZWN0Rm9ybVN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgIF9zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm5cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVQcm9qZWN0Rm9ybVN1Ym1pdCA9ICgpID0+IHtcblxuICAgICAgICBsZXQgZm9ybVNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZm9ybS1zZWN0aW9uXCIpXG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcHJvamVjdC1mb3JtXCIpO1xuICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtZm9ybS1pbnB1dFwiKVxuXG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBmb3JtU2VjdGlvbi5yZW1vdmUoKVxuXG4gICAgICAgICAgICAvLyBtYWtlIFwiKyBBZGQgUHJvamVjdFwiIGJ1dHRvbiBhdmFpbGFibGUgYWdhaW5cbiAgICAgICAgICAgIF9zdGF0dXMgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBhZGQgcHJvamVjdCBvbmx5IGlmIG5hbWUgaXMgbm90IGVtcHR5XG4gICAgICAgICAgICBpZiAoIWlucHV0LnZhbHVlKSByZXR1cm4gXG4gICAgICAgICAgICBlbHNlIGRvbU1hbmlwdWxhdGlvbi5hZGRQcm9qZWN0KGlucHV0LnZhbHVlLCBfcHJvamVjdHMubGVuZ3RoICsgMSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfcHJvamVjdHMpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfcHJvamVjdHMubGVuZ3RoKzEpXG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBQcm9qZWN0IFwiRmFjdG9yeVwiIHdpdGggaW5wdXQgdmFsdWUgYW5kIHNhbXBsZSBkZXNjcmlwdGlvbiBhbmQgc2F2ZSBjcmVhdGVkIE9iamVjdCBpbiBsb2NhbHN0b3JhZ2UgYW5kIF9wcm9qZWN0cyBhcnJheVxuICAgICAgICAgICAgbGV0IG5ld1Byb2plY3QgPSBQcm9qZWN0KGlucHV0LnZhbHVlLCBzYW1wbGVzLmdldFByb2plY3REZXNjcmlwdGlvblNhbXBsZSgpKVxuICAgICAgICAgICAgX3Byb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG4gICAgICAgICAgICBzdG9yYWdlLnNhdmVPYmplY3RUb1N0b3JhZ2UoaW5wdXQudmFsdWUsIG5ld1Byb2plY3QuY3JlYXRlUHJvamVjdE9iamVjdCgpKVxuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lciB0byBjb3JyZXNwb25kaW5nIG5hdmlnYXRpb24gaXRlbVxuICAgICAgICAgICAgbGV0IGRvbVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucHJvamVjdCR7X3Byb2plY3RzLmxlbmd0aH1gKVxuXG4gICAgICAgICAgICAvLyBvbmNsaWNrIHBvcHVsYXRlIG1haW4gYXBwIHNlY3Rpb24gd2l0aCBwcm9qZWN0IG5hbWUgYW5kIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICBkb21Qcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBkb21NYW5pcHVsYXRpb24uYWRkTWFpbkxheW91dChuZXdQcm9qZWN0LmdldE5hbWUoKSwgbmV3UHJvamVjdC5nZXREZXNjcmlwdGlvbigpICkpXG5cbiAgICAgICAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnMgdG8gaWNvbnMgdG8gZGVsZXRlIGFuZCBjaGFuZ2UgYSBwcm9qZWN0XG4gICAgICAgICAgICBsZXQgX3Byb2plY3RFZGl0SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZC5wcm9qZWN0LWVkaXRcIilcbiAgICAgICAgICAgIGxldCBfcHJvamVjdERlbGV0ZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQucHJvamVjdC1kZWxldGVcIilcblxuICAgICAgICAgICAgX3Byb2plY3RFZGl0SWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZG9tTWFuaXB1bGF0aW9uLm9wZW5FZGl0UHJvamVjdEZvcm0obmV3UHJvamVjdCkpXG4gICAgICAgIH0pXG4gICAgfVxuXG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIGJ1dHRvbkFkZFByb2plY3RMaXN0ZW5lclxuICAgIH1cbn0pKCk7XG4iLCIvLyBGYWN0b3J5IGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIFByb2plY3RcblxuZXhwb3J0IGNvbnN0IFByb2plY3QgPSAobmFtZSwgZGVzY3JpcHRpb24pID0+IHtcblxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBuYW1lO1xuICAgIGNvbnN0IHNldE5hbWUgPSAobmV3TmFtZSkgPT4gbmFtZSA9IG5ld05hbWU7XG5cbiAgICBjb25zdCBnZXREZXNjcmlwdGlvbiA9ICgpID0+IGRlc2NyaXB0aW9uO1xuICAgIGNvbnN0IHNldERlc2NyaXB0aW9uID0gKG5ld0Rlc2NyaXB0aW9uKSA9PiBkZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuXG4gICAgbGV0IF9hc3NvY2lhdGVkVG9Eb3MgPSBbXTtcblxuICAgIGNvbnN0IGdldFRvRG8gPSAoaW5kZXgpID0+IF9hc3NvY2lhdGVkVG9Eb3NbaW5kZXhdO1xuICAgIGNvbnN0IGdldEFsbFRvRG9zID0gKCkgPT4gX2Fzc29jaWF0ZWRUb0RvcztcblxuICAgIGNvbnN0IGFkZFRvRG8gPSAob2JqZWN0KSA9PiBfYXNzb2NpYXRlZFRvRG9zLnB1c2gob2JqZWN0KVxuICAgIGNvbnN0IHJlbW92ZVRvRG8gPSAoaW5kZXgpID0+IF9hc3NvY2lhdGVkVG9Eb3Muc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgY29uc3QgX2NyZWF0ZVRvRG9zT2JqZWN0ID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBUb0Rvc09iamVjdCA9IHt9XG5cbiAgICAgICAgX2Fzc29jaWF0ZWRUb0Rvcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgICAgICBUb0Rvc09iamVjdFtlLmdldE5hbWUoKV0gPSBlLmNyZWF0ZVRvRG9PYmplY3QoKVxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBUb0Rvc09iamVjdFxuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3RPYmplY3QgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvamVjdE9iamVjdCA9IHsgXG4gICAgICAgICAgICBcIm5hbWVcIiA6IGdldE5hbWUoKSxcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IGdldERlc2NyaXB0aW9uKCksXG4gICAgICAgICAgICBcImFzc29jaWF0ZWRUb0Rvc1wiIDogX2NyZWF0ZVRvRG9zT2JqZWN0KClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm9qZWN0T2JqZWN0XG4gICAgfVxuXG5cbiAgICByZXR1cm4ge2dldE5hbWUsXG4gICAgICAgICAgICBzZXROYW1lLFxuICAgICAgICAgICAgc2V0RGVzY3JpcHRpb24sXG4gICAgICAgICAgICBnZXREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGdldFRvRG8sXG4gICAgICAgICAgICBhZGRUb0RvLFxuICAgICAgICAgICAgcmVtb3ZlVG9EbyxcbiAgICAgICAgICAgIGdldEFsbFRvRG9zLFxuICAgICAgICAgICAgY3JlYXRlUHJvamVjdE9iamVjdCxcbiAgICAgICAgfVxufVxuXG4iLCJleHBvcnQgY29uc3Qgc3RvcmFnZSA9ICgoKSA9PiB7XG5cbiAgICBjb25zdCBzYXZlT2JqZWN0VG9TdG9yYWdlID0gKGtleSwgb2JqZWN0KSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KG9iamVjdCkpXG4gICAgfVxuXG4gICAgY29uc3QgZ2V0T2JqZWN0RnJvbVN0b3JhZ2UgPSAoa2V5KSA9PiB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2F2ZU9iamVjdFRvU3RvcmFnZSxcbiAgICAgICAgZ2V0T2JqZWN0RnJvbVN0b3JhZ2VcbiAgICB9XG4gICAgXG59KSgpOyIsIi8vIEZhY3RvcnkgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgVG9Eb1xuXG5leHBvcnQgY29uc3QgVG9EbyA9IChuYW1lLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgc3RhdHVzKSA9PiB7XG5cbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgICBjb25zdCBzZXROYW1lID0gKG5ld05hbWUpID0+IG5hbWUgPSBuZXdOYW1lO1xuXG4gICAgY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAoKSA9PiBkZXNjcmlwdGlvbjtcbiAgICBjb25zdCBzZXREZXNjcmlwdGlvbiA9IChuZXdEZXNjcmlwdGlvbikgPT4gZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcblxuICAgIGNvbnN0IGdldER1ZURhdGUgPSAoKSA9PiBkdWVEYXRlO1xuICAgIGNvbnN0IHNldER1ZURhdGUgPSAobmV3RHVlRGF0ZSkgPT4gZHVlRGF0ZSA9IG5ld0R1ZURhdGU7IFxuXG4gICAgY29uc3QgZ2V0U3RhdHVzID0gKCkgPT4gc3RhdHVzXG4gICAgY29uc3QgdG9nZ2xlU3RhdHVzID0gKCkgPT4gc3RhdHVzID0gc3RhdHVzID8gZmFsc2UgOiB0cnVlO1xuXG4gICAgY29uc3QgY3JlYXRlVG9Eb09iamVjdCA9ICgpID0+IHtcblxuICAgICAgICBsZXQgdG9Eb09iamVjdCA9IHtcbiAgICAgICAgICAgIFwibmFtZVwiIDogZ2V0TmFtZSgpLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogZ2V0RGVzY3JpcHRpb24oKSxcbiAgICAgICAgICAgIFwiZHVlRGF0ZVwiIDogZ2V0RHVlRGF0ZSgpLFxuICAgICAgICAgICAgXCJzdGF0dXNcIiA6IGdldFN0YXR1cygpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9Eb09iamVjdFxuICAgIH1cblxuICAgIHJldHVybiB7Z2V0TmFtZSxcbiAgICAgICAgICAgIHNldE5hbWUsIFxuICAgICAgICAgICAgc2V0RGVzY3JpcHRpb24sXG4gICAgICAgICAgICBnZXREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGdldER1ZURhdGUsXG4gICAgICAgICAgICBzZXREdWVEYXRlLFxuICAgICAgICAgICAgZ2V0U3RhdHVzLFxuICAgICAgICAgICAgdG9nZ2xlU3RhdHVzLFxuICAgICAgICAgICAgY3JlYXRlVG9Eb09iamVjdH1cbn1cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBUb0RvIH0gZnJvbSAnLi90b2Rvcy90b2Rvcy5qcyc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0cy9wcm9qZWN0cy5qcyc7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2UuanMnXG5pbXBvcnQgeyBkb21NYW5pcHVsYXRpb24sIGV2ZW50TGlzdGVuZXIsIGZvcm1Mb2dpYyB9IGZyb20gJy4vVUkvdWkuanMnO1xuXG5ldmVudExpc3RlbmVyLmJ1dHRvbkFkZFByb2plY3RMaXN0ZW5lcigpXG5cblxuXG5cbi8vZG9tTWFuaXB1bGF0aW9uLnJlbW92ZVByb2plY3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzJykpXG5cbi8qXG5jb25zdCBuZXdQcm9qZWN0ID0gUHJvamVjdChcIlNjaG9vbFwiLCBcInRoaXMgcHJvamVjdCBpcyBmb3Igb3JnYW5pemluZyBteSBzY2hvb2wgd29ya1wiKTtcblxuY29uc3QgZmlyc3RUb0RvID0gVG9EbyhcIkRvIHNvbWV0aGluZ1wiLCBcIkdldCBvbiBteSBMZXZlbFwiLCBcIjE4LjEwLjIwMDBcIiwgZmFsc2UpXG5jb25zdCBzZWNvbmRUb0RvID0gVG9EbyhcIkRvIHNvbWV0aGluZyBlbHNlXCIsIFwiU2V0IG9uIG15IExldmVsXCIsIFwiMTMuMTAuMjAwMFwiLCBmYWxzZSlcbm5ld1Byb2plY3QuYWRkVG9EbyhmaXJzdFRvRG8pXG5uZXdQcm9qZWN0LmFkZFRvRG8oc2Vjb25kVG9EbylcblxubGV0IHZhbGlkT2JqZWN0ID0gbmV3UHJvamVjdC5jcmVhdGVQcm9qZWN0T2JqZWN0KCk7XG5cbnN0b3JhZ2Uuc2F2ZU9iamVjdFRvU3RvcmFnZShuZXdQcm9qZWN0LmdldE5hbWUoKSwgdmFsaWRPYmplY3QpXG5cbmNvbnNvbGUubG9nKHN0b3JhZ2UuZ2V0T2JqZWN0RnJvbVN0b3JhZ2UoXCJTY2hvb2xcIikpXG4qLyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==