import { ToDo } from '../todos/todos.js';
import { Project } from '../projects/projects.js';
import { storage } from '../storage/storage.js'
import { samples } from './samples.js';
import { projectObjectStorage } from '../projects/project_storage.js';
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

export const domManipulation = (() => {



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














export const eventListener = (() => {

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
            let newToDo = ToDo(todoName.value, "", todoDate.value, false);
            
            // add todo to assosiated project
            projectObjectStorage.getCurrentProject().addToDo(newToDo)

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
            let newProject = Project(input.value, samples.getProjectDescriptionSample())
            projectObjectStorage.addProjectObject(newProject.getName(), newProject);

            projectObjectStorage.setCurrentProject(newProject)

            storage.saveObjectToStorage(input.value, newProject.createProjectObject())

            // add event listener to corresponding navigation item
            let domProject = document.querySelector(`section.project:last-child`)
            
            domProject.addEventListener("click", () => {
                domManipulation.populateMainLayout(newProject.getName(), newProject.getDescription())
                projectObjectStorage.setCurrentProject(newProject)
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
                    domManipulation.openEditProjectForm(projectObjectStorage.getCurrentProject())
                    setStatus(false)
                    handleProjectEditFormSubmit(projectObjectStorage.getCurrentProject())
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
