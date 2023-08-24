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

        const titleDescriptionContainer = document.querySelector(".container.title-description")
        const projectTitleDom = document.querySelector(".heading.main")
        const projectDescriptionDom = document.querySelector(".sub-heading.main");
        
        projectTitleDom.remove()
        projectDescriptionDom.remove()

        let html = (`<form id="edit-project-form">
                        <input class="heading main form" placeholder="${projectObject.getName()}" type="text">
                        <textarea class="sub-heading main form" placeholder="${projectObject.getDescription()}"></textarea>
                    </form>`)

        titleDescriptionContainer.insertAdjacentHTML("beforebegin", html)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9VSS9zYW1wbGVzLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9VSS91aS5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvcHJvamVjdHMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL3N0b3JhZ2Uvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvdG9kb3MvdG9kb3MuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBzYW1wbGVzID0gKCgpID0+IHtcblxuICAgIGxldCBfcHJvamVjdERlc2NyaXB0aW9uU2FtcGxlID0gXCJDbGljayB0aGUgYnV0dG9uIG9uIHRoZSByaWdodCB0byBjaGFuZ2UgdGhlIGRlc2NyaXB0aW9uIVwiXG5cbiAgICBjb25zdCBnZXRQcm9qZWN0RGVzY3JpcHRpb25TYW1wbGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBfcHJvamVjdERlc2NyaXB0aW9uU2FtcGxlXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0UHJvamVjdERlc2NyaXB0aW9uU2FtcGxlXG4gICAgfVxufSkoKTsiLCJpbXBvcnQgeyBUb0RvIH0gZnJvbSAnLi4vdG9kb3MvdG9kb3MuanMnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uL3Byb2plY3RzL3Byb2plY3RzLmpzJztcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICcuLi9zdG9yYWdlL3N0b3JhZ2UuanMnXG5pbXBvcnQgeyBzYW1wbGVzIH0gZnJvbSAnLi9zYW1wbGVzLmpzJztcbi8vICAgRnVuY3Rpb25hbGl0aWVzXG4vLyAgIFxuLy8gICAgIGFkZCBwcm9qZWN0IHRvIGRvbVxuLy8gICAgIGFkZCB0b2RvIHRvIGRvbVxuLy9cbi8vICAgICByZW1vdmUgcHJvamVjdCBmcm9tIGRvbVxuLy8gICAgIHJlbW92ZSB0b2RvIGZyb20gZG9tXG4vLyAgICAgXG4vLyAgICAgY2hhbmdlIGludGVyZmFjZSBiYXNlZCBvbiBuYXZpZ2F0aW9uXG4vLyAgICAgY2hhbmdlIGhpZ2hsaWdodGluZyBvZiBuYXZpZ2F0aW9uIGl0ZW1zXG4vL1xuLy9cbi8vICAgICAgVG9EbzogXG4vLyAgICAgICAgICAgICAgLSB3cml0ZSBmdW5jdGlvbnMgcmVuZGVyIExheW91dCAmIHJlbmRlciBUb0Rvc1xuLy8gICAgICAgICAgICAgIC0gcHJvamVjdCBhcnJheS9vYmplY3QgaW4gc2VwZXJhdGUgbG9naWNcbi8vXG5cbmV4cG9ydCBjb25zdCBkb21NYW5pcHVsYXRpb24gPSAoKCkgPT4ge1xuXG5cblxuICAgIGNvbnN0IGFkZFByb2plY3QgPSAobmFtZSwgaWRlbnRpZmllcikgPT4ge1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKTtcblxuICAgICAgICBsZXQgaHRtbCA9IChgPHNlY3Rpb24gY2xhc3M9XCJwcm9qZWN0JHtpZGVudGlmaWVyfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+VG9jPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2plY3RcIj4ke25hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5gKVxuXG4gICAgICAgIHByb2plY3RET00uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3Qgb3BlblByb2plY3RGb3JtID0gKCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKTtcblxuICAgICAgICBsZXQgaHRtbCA9IChgPHNlY3Rpb24gaWQ9XCJwcm9qZWN0LWZvcm0tc2VjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+dG9jPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gaWQ9XCJuZXctcHJvamVjdC1mb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwicHJvamVjdC1mb3JtLWlucHV0XCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5gKVxuXG4gICAgICAgIHByb2plY3RET00uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpXG4gICAgfVxuXG4gICAgY29uc3Qgb3BlbkVkaXRQcm9qZWN0Rm9ybSA9IChwcm9qZWN0T2JqZWN0KSA9PiB7XG5cbiAgICAgICAgY29uc3QgdGl0bGVEZXNjcmlwdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLnRpdGxlLWRlc2NyaXB0aW9uXCIpXG4gICAgICAgIGNvbnN0IHByb2plY3RUaXRsZURvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGluZy5tYWluXCIpXG4gICAgICAgIGNvbnN0IHByb2plY3REZXNjcmlwdGlvbkRvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3ViLWhlYWRpbmcubWFpblwiKTtcbiAgICAgICAgXG4gICAgICAgIHByb2plY3RUaXRsZURvbS5yZW1vdmUoKVxuICAgICAgICBwcm9qZWN0RGVzY3JpcHRpb25Eb20ucmVtb3ZlKClcblxuICAgICAgICBsZXQgaHRtbCA9IChgPGZvcm0gaWQ9XCJlZGl0LXByb2plY3QtZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaGVhZGluZyBtYWluIGZvcm1cIiBwbGFjZWhvbGRlcj1cIiR7cHJvamVjdE9iamVjdC5nZXROYW1lKCl9XCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cInN1Yi1oZWFkaW5nIG1haW4gZm9ybVwiIHBsYWNlaG9sZGVyPVwiJHtwcm9qZWN0T2JqZWN0LmdldERlc2NyaXB0aW9uKCl9XCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPmApXG5cbiAgICAgICAgdGl0bGVEZXNjcmlwdGlvbkNvbnRhaW5lci5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmViZWdpblwiLCBodG1sKVxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZVByb2plY3QgPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LnJlbW92ZSgpXG4gICAgfVxuICAgIFxuICAgIFxuICAgIGNvbnN0IGFkZE1haW5MYXlvdXQgPSAodGl0bGUsIHN1YlRpdGxlKSA9PiB7XG5cbiAgICAgICAgbGV0IGRvbVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkaW5nLm1haW5cIik7XG4gICAgICAgIGxldCBkb21TdWJUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3ViLWhlYWRpbmcubWFpblwiKTtcblxuICAgICAgICBcbiAgICAgICAgZG9tVGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICAgICAgZG9tU3ViVGl0bGUudGV4dENvbnRlbnQgPSBzdWJUaXRsZTtcblxuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlclRvRG9zID0gKHByb2plY3QpID0+IHtcblxuICAgIH1cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkUHJvamVjdCxcbiAgICAgICAgcmVtb3ZlUHJvamVjdCxcbiAgICAgICAgb3BlblByb2plY3RGb3JtLFxuICAgICAgICBhZGRNYWluTGF5b3V0LFxuICAgICAgICBvcGVuRWRpdFByb2plY3RGb3JtXG4gICAgfVxufSkoKTtcblxuXG5cblxuXG5cbi8qXG5leHBvcnQgY29uc3QgZm9ybUxvZ2ljID0gKCgpID0+IHtcblxuICAgIFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2xvc2VGb3JtXG4gICAgfVxuXG59KSgpO1xuKi9cblxuXG5cblxuXG5cbmV4cG9ydCBjb25zdCBldmVudExpc3RlbmVyID0gKCgpID0+IHtcblxuICAgIGxldCBfcHJvamVjdHMgPSBbXTtcbiAgICBsZXQgX3N0YXR1cyA9IHRydWU7XG5cbiAgICBjb25zdCBidXR0b25BZGRQcm9qZWN0TGlzdGVuZXIgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGFkZFByb2plY3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtcHJvamVjdFwiKVxuICAgICAgICBcbiAgICAgICAgYWRkUHJvamVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgXG5cbiAgICAgICAgICAgIC8vIG9wZW4gZm9ybSB2aWEgZG9tIG1vZHVsZSBhbmQgc2V0IHVwIGV2ZW50IGxpc3RlbmVyIGZvciBzdWJtaXR0aW5nIHRoZSBmb3JtXG4gICAgICAgICAgICBpZiAoX3N0YXR1cykgeyBcbiAgICAgICAgICAgICAgICBkb21NYW5pcHVsYXRpb24ub3BlblByb2plY3RGb3JtKCk7XG4gICAgICAgICAgICAgICAgaGFuZGxlUHJvamVjdEZvcm1TdWJtaXQoKTtcbiAgICAgICAgICAgICAgICBfc3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlUHJvamVjdEZvcm1TdWJtaXQgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGZvcm1TZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWZvcm0tc2VjdGlvblwiKVxuICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXByb2plY3QtZm9ybVwiKTtcbiAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWZvcm0taW5wdXRcIilcblxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZm9ybVNlY3Rpb24ucmVtb3ZlKClcblxuICAgICAgICAgICAgLy8gbWFrZSBcIisgQWRkIFByb2plY3RcIiBidXR0b24gYXZhaWxhYmxlIGFnYWluXG4gICAgICAgICAgICBfc3RhdHVzID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gYWRkIHByb2plY3Qgb25seSBpZiBuYW1lIGlzIG5vdCBlbXB0eVxuICAgICAgICAgICAgaWYgKCFpbnB1dC52YWx1ZSkgcmV0dXJuIFxuICAgICAgICAgICAgZWxzZSBkb21NYW5pcHVsYXRpb24uYWRkUHJvamVjdChpbnB1dC52YWx1ZSwgX3Byb2plY3RzLmxlbmd0aCArIDEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coX3Byb2plY3RzKVxuICAgICAgICAgICAgY29uc29sZS5sb2coX3Byb2plY3RzLmxlbmd0aCsxKVxuXG4gICAgICAgICAgICAvLyBjcmVhdGUgUHJvamVjdCBcIkZhY3RvcnlcIiB3aXRoIGlucHV0IHZhbHVlIGFuZCBzYW1wbGUgZGVzY3JpcHRpb24gYW5kIHNhdmUgY3JlYXRlZCBPYmplY3QgaW4gbG9jYWxzdG9yYWdlIGFuZCBfcHJvamVjdHMgYXJyYXlcbiAgICAgICAgICAgIGxldCBuZXdQcm9qZWN0ID0gUHJvamVjdChpbnB1dC52YWx1ZSwgc2FtcGxlcy5nZXRQcm9qZWN0RGVzY3JpcHRpb25TYW1wbGUoKSlcbiAgICAgICAgICAgIF9wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuICAgICAgICAgICAgc3RvcmFnZS5zYXZlT2JqZWN0VG9TdG9yYWdlKGlucHV0LnZhbHVlLCBuZXdQcm9qZWN0LmNyZWF0ZVByb2plY3RPYmplY3QoKSlcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXIgdG8gY29ycmVzcG9uZGluZyBuYXZpZ2F0aW9uIGl0ZW1cbiAgICAgICAgICAgIGxldCBkb21Qcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnByb2plY3Qke19wcm9qZWN0cy5sZW5ndGh9YClcblxuICAgICAgICAgICAgLy8gb25jbGljayBwb3B1bGF0ZSBtYWluIGFwcCBzZWN0aW9uIHdpdGggcHJvamVjdCBuYW1lIGFuZCBkZXNjcmlwdGlvblxuICAgICAgICAgICAgZG9tUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZG9tTWFuaXB1bGF0aW9uLmFkZE1haW5MYXlvdXQobmV3UHJvamVjdC5nZXROYW1lKCksIG5ld1Byb2plY3QuZ2V0RGVzY3JpcHRpb24oKSApKVxuXG4gICAgICAgICAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzIHRvIGljb25zIHRvIGRlbGV0ZSBhbmQgY2hhbmdlIGEgcHJvamVjdFxuICAgICAgICAgICAgbGV0IF9wcm9qZWN0RWRpdEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQucHJvamVjdC1lZGl0XCIpXG4gICAgICAgICAgICBsZXQgX3Byb2plY3REZWxldGVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkLnByb2plY3QtZGVsZXRlXCIpXG5cbiAgICAgICAgICAgIF9wcm9qZWN0RWRpdEljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGRvbU1hbmlwdWxhdGlvbi5vcGVuRWRpdFByb2plY3RGb3JtKG5ld1Byb2plY3QpKVxuICAgICAgICB9KVxuICAgIH1cblxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBidXR0b25BZGRQcm9qZWN0TGlzdGVuZXJcbiAgICB9XG59KSgpO1xuIiwiLy8gRmFjdG9yeSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBQcm9qZWN0XG5cbmV4cG9ydCBjb25zdCBQcm9qZWN0ID0gKG5hbWUsIGRlc2NyaXB0aW9uKSA9PiB7XG5cbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgICBjb25zdCBzZXROYW1lID0gKG5ld05hbWUpID0+IG5hbWUgPSBuZXdOYW1lO1xuXG4gICAgY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAoKSA9PiBkZXNjcmlwdGlvbjtcbiAgICBjb25zdCBzZXREZXNjcmlwdGlvbiA9IChuZXdEZXNjcmlwdGlvbikgPT4gZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcblxuICAgIGxldCBfYXNzb2NpYXRlZFRvRG9zID0gW107XG5cbiAgICBjb25zdCBnZXRUb0RvID0gKGluZGV4KSA9PiBfYXNzb2NpYXRlZFRvRG9zW2luZGV4XTtcbiAgICBjb25zdCBnZXRBbGxUb0RvcyA9ICgpID0+IF9hc3NvY2lhdGVkVG9Eb3M7XG5cbiAgICBjb25zdCBhZGRUb0RvID0gKG9iamVjdCkgPT4gX2Fzc29jaWF0ZWRUb0Rvcy5wdXNoKG9iamVjdClcbiAgICBjb25zdCByZW1vdmVUb0RvID0gKGluZGV4KSA9PiBfYXNzb2NpYXRlZFRvRG9zLnNwbGljZShpbmRleCwgMSlcblxuICAgIGNvbnN0IF9jcmVhdGVUb0Rvc09iamVjdCA9ICgpID0+IHtcblxuICAgICAgICBsZXQgVG9Eb3NPYmplY3QgPSB7fVxuXG4gICAgICAgIF9hc3NvY2lhdGVkVG9Eb3MuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgVG9Eb3NPYmplY3RbZS5nZXROYW1lKCldID0gZS5jcmVhdGVUb0RvT2JqZWN0KClcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gVG9Eb3NPYmplY3RcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0T2JqZWN0ID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IHByb2plY3RPYmplY3QgPSB7IFxuICAgICAgICAgICAgXCJuYW1lXCIgOiBnZXROYW1lKCksXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBnZXREZXNjcmlwdGlvbigpLFxuICAgICAgICAgICAgXCJhc3NvY2lhdGVkVG9Eb3NcIiA6IF9jcmVhdGVUb0Rvc09iamVjdCgpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvamVjdE9iamVjdFxuICAgIH1cblxuXG4gICAgcmV0dXJuIHtnZXROYW1lLFxuICAgICAgICAgICAgc2V0TmFtZSxcbiAgICAgICAgICAgIHNldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0RGVzY3JpcHRpb24sXG4gICAgICAgICAgICBnZXRUb0RvLFxuICAgICAgICAgICAgYWRkVG9EbyxcbiAgICAgICAgICAgIHJlbW92ZVRvRG8sXG4gICAgICAgICAgICBnZXRBbGxUb0RvcyxcbiAgICAgICAgICAgIGNyZWF0ZVByb2plY3RPYmplY3QsXG4gICAgICAgIH1cbn1cblxuIiwiZXhwb3J0IGNvbnN0IHN0b3JhZ2UgPSAoKCkgPT4ge1xuXG4gICAgY29uc3Qgc2F2ZU9iamVjdFRvU3RvcmFnZSA9IChrZXksIG9iamVjdCkgPT4ge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShvYmplY3QpKVxuICAgIH1cblxuICAgIGNvbnN0IGdldE9iamVjdEZyb21TdG9yYWdlID0gKGtleSkgPT4ge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHNhdmVPYmplY3RUb1N0b3JhZ2UsXG4gICAgICAgIGdldE9iamVjdEZyb21TdG9yYWdlXG4gICAgfVxuICAgIFxufSkoKTsiLCIvLyBGYWN0b3J5IGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIFRvRG9cblxuZXhwb3J0IGNvbnN0IFRvRG8gPSAobmFtZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHN0YXR1cykgPT4ge1xuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG4gICAgY29uc3Qgc2V0TmFtZSA9IChuZXdOYW1lKSA9PiBuYW1lID0gbmV3TmFtZTtcblxuICAgIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKCkgPT4gZGVzY3JpcHRpb247XG4gICAgY29uc3Qgc2V0RGVzY3JpcHRpb24gPSAobmV3RGVzY3JpcHRpb24pID0+IGRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG5cbiAgICBjb25zdCBnZXREdWVEYXRlID0gKCkgPT4gZHVlRGF0ZTtcbiAgICBjb25zdCBzZXREdWVEYXRlID0gKG5ld0R1ZURhdGUpID0+IGR1ZURhdGUgPSBuZXdEdWVEYXRlOyBcblxuICAgIGNvbnN0IGdldFN0YXR1cyA9ICgpID0+IHN0YXR1c1xuICAgIGNvbnN0IHRvZ2dsZVN0YXR1cyA9ICgpID0+IHN0YXR1cyA9IHN0YXR1cyA/IGZhbHNlIDogdHJ1ZTtcblxuICAgIGNvbnN0IGNyZWF0ZVRvRG9PYmplY3QgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHRvRG9PYmplY3QgPSB7XG4gICAgICAgICAgICBcIm5hbWVcIiA6IGdldE5hbWUoKSxcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IGdldERlc2NyaXB0aW9uKCksXG4gICAgICAgICAgICBcImR1ZURhdGVcIiA6IGdldER1ZURhdGUoKSxcbiAgICAgICAgICAgIFwic3RhdHVzXCIgOiBnZXRTdGF0dXMoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvRG9PYmplY3RcbiAgICB9XG5cbiAgICByZXR1cm4ge2dldE5hbWUsXG4gICAgICAgICAgICBzZXROYW1lLCBcbiAgICAgICAgICAgIHNldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0RGVzY3JpcHRpb24sXG4gICAgICAgICAgICBnZXREdWVEYXRlLFxuICAgICAgICAgICAgc2V0RHVlRGF0ZSxcbiAgICAgICAgICAgIGdldFN0YXR1cyxcbiAgICAgICAgICAgIHRvZ2dsZVN0YXR1cyxcbiAgICAgICAgICAgIGNyZWF0ZVRvRG9PYmplY3R9XG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVG9EbyB9IGZyb20gJy4vdG9kb3MvdG9kb3MuanMnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdHMvcHJvamVjdHMuanMnO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLmpzJ1xuaW1wb3J0IHsgZG9tTWFuaXB1bGF0aW9uLCBldmVudExpc3RlbmVyLCBmb3JtTG9naWMgfSBmcm9tICcuL1VJL3VpLmpzJztcblxuZXZlbnRMaXN0ZW5lci5idXR0b25BZGRQcm9qZWN0TGlzdGVuZXIoKVxuXG5cblxuXG4vL2RvbU1hbmlwdWxhdGlvbi5yZW1vdmVQcm9qZWN0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cycpKVxuXG4vKlxuY29uc3QgbmV3UHJvamVjdCA9IFByb2plY3QoXCJTY2hvb2xcIiwgXCJ0aGlzIHByb2plY3QgaXMgZm9yIG9yZ2FuaXppbmcgbXkgc2Nob29sIHdvcmtcIik7XG5cbmNvbnN0IGZpcnN0VG9EbyA9IFRvRG8oXCJEbyBzb21ldGhpbmdcIiwgXCJHZXQgb24gbXkgTGV2ZWxcIiwgXCIxOC4xMC4yMDAwXCIsIGZhbHNlKVxuY29uc3Qgc2Vjb25kVG9EbyA9IFRvRG8oXCJEbyBzb21ldGhpbmcgZWxzZVwiLCBcIlNldCBvbiBteSBMZXZlbFwiLCBcIjEzLjEwLjIwMDBcIiwgZmFsc2UpXG5uZXdQcm9qZWN0LmFkZFRvRG8oZmlyc3RUb0RvKVxubmV3UHJvamVjdC5hZGRUb0RvKHNlY29uZFRvRG8pXG5cbmxldCB2YWxpZE9iamVjdCA9IG5ld1Byb2plY3QuY3JlYXRlUHJvamVjdE9iamVjdCgpO1xuXG5zdG9yYWdlLnNhdmVPYmplY3RUb1N0b3JhZ2UobmV3UHJvamVjdC5nZXROYW1lKCksIHZhbGlkT2JqZWN0KVxuXG5jb25zb2xlLmxvZyhzdG9yYWdlLmdldE9iamVjdEZyb21TdG9yYWdlKFwiU2Nob29sXCIpKVxuKi8iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=