import { ToDo } from '../todos/todos.js';
import { Project } from '../projects/projects.js';
import { samples } from './samples.js';
import { projectObjectStorage } from '../projects/project_storage.js';
import { format, nextSunday, subDays, isWithinInterval, parseISO} from 'date-fns';


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
    }

    const closeEditToDoForm = (toDoObject) => {

        let formContainer = document.getElementById("edit-todo-form-container")
        let checkIcon = toDoObject.getStatus() ? "check_box" : "check_box_outline_blank"
        let formattedDate = toDoObject.getDueDate() ? format(parseISO(toDoObject.getDueDate()), 'dd/MM/yyyy') : "";

        let html = `<div class="todo-container">
                        <div class="todo-name">${toDoObject.getName()}</div>
                        <div class="associated-project"></div>
                        <div class="todo-icons">
                            <div class="todo-date">${formattedDate}</div>
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
        let toDoDate = toDo.getDueDate() ? format(parseISO(toDo.getDueDate()), 'dd/MM/yyyy') : "";
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

    const openNavPage = (page) => {

        let projectEditIcon = document.querySelector(".material-symbols-outlined.project-edit")
        let projectDeleteIcon = document.querySelector(".material-symbols-outlined.project-delete")
        let todoAddIcon = document.querySelector("div#add-to-do");

        let heading;
        let subHeading;

        switch (page) {
            case "all":
                heading = samples.allToDosHeading
                subHeading = samples.allToDosSubHeading;
                break;
            case "today":
                heading = samples.todayToDosHeading
                subHeading = samples.todayToDosSubHeading();
                break;
            case "week":
                heading = samples.weekToDosHeading
                subHeading = samples.weekToDosSubHeading(); 
        }
        
        populateMainLayout(heading, subHeading)
        
        // remove event listeners from project edit icons
        let editIconClone = projectEditIcon.cloneNode(true)
        projectEditIcon.parentNode.replaceChild(editIconClone, projectEditIcon)

        let deleteIconClone = projectDeleteIcon.cloneNode(true)
        projectDeleteIcon.parentNode.replaceChild(deleteIconClone, projectDeleteIcon)

        let addIconClone = todoAddIcon.cloneNode(true)
        todoAddIcon.parentNode.replaceChild(addIconClone, todoAddIcon)

        addIconClone.classList.add("hidden")
        editIconClone.classList.add("hidden")
        deleteIconClone.classList.add("hidden")
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
        closeEditToDoForm,
        openNavPage
    }
})();














export const eventListener = (() => {

    let _status = true;

    const setStatus = (value) => {
        _status = value
    }

    const loadPage = () => {

        _checkForLocalStorage()

        _buttonAddProjectListener()
        _allPageListener()
        _todayPageListener()
        _weekPageListener()
        _vanishToDo()
    }

    const _vanishToDo = () => {
        let checkBox = document.querySelectorAll(".material-symbols-outlined.todo.check")
        
        checkBox.forEach((e) => {
            let todoContainer = e.parentNode.parentNode;

            e.addEventListener("mouseenter", () => {
                todoContainer.classList.toggle("opacity")
                e.textContent = "check_box"
            })
        })

        checkBox.forEach((e) => {
            let todoContainer = e.parentNode.parentNode;

            e.addEventListener("mouseleave", () => {
                todoContainer.classList.toggle("opacity")
                e.textContent = "check_box_outline_blank"
            })
        })
    }

    const _checkForLocalStorage = () => {
        
        if (localStorage.length == 0) _setUpProject(samples.getSampleProject())
        else _loopLocalStorage()


    }

    const _setUpProject = (newProject) => {
        // save created object and update local storage
        projectObjectStorage.addProjectObject(newProject.getName(), newProject)
        projectObjectStorage.setCurrentProject(newProject)

        domManipulation.addProject(newProject.getName());
        let domProject = document.querySelector(`section.project:last-child`)
        newProject.setProjectDomElement(domProject)

        // activate button to add to dos
        _buttonAddToDoListener()

        domProject.addEventListener("click", () => {
            _openProject(newProject, domProject)
        })
        _openProject(newProject, domProject)
    }

    const _openProject = (newProject, domProject) => {
        domManipulation.populateMainLayout(newProject.getName(), newProject.getDescription())
        projectObjectStorage.setCurrentProject(newProject)
        domManipulation.removeToDos()
        domManipulation.renderToDos(newProject)
        _toggleNavItemsStyling(domProject)

        let projectEditIcon = document.querySelector(".material-symbols-outlined.project-edit")
        let projectDeleteIcon = document.querySelector(".material-symbols-outlined.project-delete")
        let todoAddIcon = document.querySelector("div#add-to-do");

        // make icons available if hidden
        projectEditIcon.classList.remove("hidden")
        projectDeleteIcon.classList.remove("hidden")
        todoAddIcon.classList.remove("hidden")


        
        projectEditIcon.addEventListener("click", () => _handleProjectEdit())
        projectDeleteIcon.addEventListener("click", () => _handleProjectDelete())
        todoAddIcon.addEventListener("click", () => _buttonAddToDoListener())
    }

    const _loopLocalStorage = () => {

        // loop through objects in local storage and create project objects
        for (var i = 0; i < localStorage.length; i++){

            let storageProject = JSON.parse(localStorage.getItem(localStorage.key(i)));
            let storageProjectToDos = storageProject.associatedToDos

            let newProject = Project(storageProject.name, storageProject.description);

            // loop through todo objects in local storage, create todo object and link to associated project object
            for (let key in storageProjectToDos) {
                let newToDo = ToDo(storageProjectToDos[key].name,
                                    storageProjectToDos[key].description,
                                    storageProjectToDos[key].dueDate,
                                    storageProjectToDos[key].status)
                newProject.addToDo(newToDo, newToDo.getName())
            }

            _setUpProject(newProject)
            // open last project
            let domProject = document.querySelector(`section.project:last-child`)
            _openProject(newProject, domProject)
        }
    }

    const _buttonAddProjectListener = () => {

        let addProjectElement = document.getElementById("add-project")
        
        addProjectElement.addEventListener("click", () => { 

            // open form via dom module and set up event listener for submitting the form
            if (_status) { 
                domManipulation.openAddProjectForm();
                _handleProjectFormSubmit();
                setStatus(false)
            } else return
        })
    }

    const _buttonAddToDoListener = () => {

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
            let project = projectObjectStorage.getCurrentProject()
            project.addToDo(newToDo, newToDo.getName())

            //update local storage
            projectObjectStorage.updateLocalStorage()

            // Make any button available again
            setStatus(true)
            domManipulation.renderOneToDo(newToDo)

        })
    }

    const toDoListener = (element, todo) => {

        let checkIcon = element.querySelector(".todo.check");
        let editIcon = element.querySelector(".todo.edit");
        let deleteIcon = element.querySelector(".todo.delete");

        checkIcon.addEventListener("click", () => {

            // code to implement todos that still remain visisble in the UI when marked as done
            /////////////////////////////////////////////////////////////////////////////
            // todo.toggleStatus()
            // if (todo.getStatus() === true) {
            //     checkIcon.textContent = "check_box"
            //     toDoNameElement.classList.add("strikethrough")
            // } else {
            //     checkIcon.textContent = "check_box_outline_blank"
            //     toDoNameElement.classList.remove("strikethrough")
            // }
            // projectObjectStorage.updateLocalStorage()
            ///////////////////////////////////////////////////////////////////////////

            // remove todo from user interface
            deleteIcon.parentElement.parentElement.remove()

            // remove todo from object storage
            let project = projectObjectStorage.getCurrentProject()
            project.removeToDo(todo.getName())

            //update local storage
            projectObjectStorage.updateLocalStorage()
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

            let project = projectObjectStorage.getCurrentProject()

            project.removeToDo(todo.getName())

            //update local storage
            projectObjectStorage.updateLocalStorage()
        })
    }

    const _validateProjectForm = () => {
        
        let form = document.getElementById("new-project-form");
        let projectName = form.querySelector(".project-form-input")
        let projects = projectObjectStorage.getProjectObjectArray()
        let project = projectName.value
        let boolean = true;
    
        if (!projects) boolean = true;

        let projectNames = Object.keys(projects)
        
        if (projectNames.includes(project)) boolean = false;

        return boolean
    }


    const _handleProjectFormSubmit = () => {

        let form = document.getElementById("new-project-form");
        let input = document.querySelector(".project-form-input");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (!_validateProjectForm()) {
                alert("Please don't use duplicate names!")
                return
            } else _setUpProjectPage()  
        })

          
        const _setUpProjectPage = () => {

            domManipulation.closeAddProjectForm()
            domManipulation.removeToDos()

            // activate button to add to dos
            _buttonAddToDoListener()

            // make any edit button available again
            setStatus(true)

            // add project only if name is not empty
            if (!input.value) return 
            else domManipulation.addProject(input.value);

            // create Project "Factory" with input value and sample description and save created Object in localstorage and _projects array
            let newProject = Project(input.value, samples.getProjectDescriptionSample())
            projectObjectStorage.addProjectObject(newProject.getName(), newProject);
            projectObjectStorage.setCurrentProject(newProject)
            projectObjectStorage.updateLocalStorage()

            // add event listener to corresponding navigation item
            let domProject = document.querySelector(`section.project:last-child`)
            newProject.setProjectDomElement(domProject)

            _toggleNavItemsStyling(domProject) // highlight project in navigation
            
            domProject.addEventListener("click", () => {
                domManipulation.populateMainLayout(newProject.getName(), newProject.getDescription())
                projectObjectStorage.setCurrentProject(newProject)
                domManipulation.removeToDos()
                domManipulation.renderToDos(newProject)
                _toggleNavItemsStyling(domProject)

                let projectEditIcon = document.querySelector(".material-symbols-outlined.project-edit")
                let projectDeleteIcon = document.querySelector(".material-symbols-outlined.project-delete")
                let addTodoIcon = document.querySelector("div#add-to-do")

                // make icons available if hidden
                projectEditIcon.classList.remove("hidden")
                projectDeleteIcon.classList.remove("hidden")
                addTodoIcon.classList.remove("hidden")

                projectEditIcon.addEventListener("click", () => _handleProjectEdit())
                projectDeleteIcon.addEventListener("click", () => _handleProjectDelete())
                todoAddIcon.addEventListener("click", () => _buttonAddToDoListener())
            })
            
            //poulate main section with corresponding project information
            domManipulation.populateMainLayout(newProject.getName(), newProject.getDescription())

            // add event listeners to icons to delete and change a project
            let projectEditIcon = document.querySelector(".material-symbols-outlined.project-edit")
            let projectDeleteIcon = document.querySelector(".material-symbols-outlined.project-delete")

            projectEditIcon.addEventListener("click", () => _handleProjectEdit())
            projectDeleteIcon.addEventListener("click", () => _handleProjectDelete())
        }
    }

    const _handleProjectEdit = () => {
        if (_status) { 
            domManipulation.openEditProjectForm(projectObjectStorage.getCurrentProject())
            setStatus(false)
            handleProjectEditFormSubmit(projectObjectStorage.getCurrentProject())
        } else return
    }

    const _handleProjectDelete = () => {
        if (_status) {
            // remove project object from storage
            projectObjectStorage.removeProjectObject(projectObjectStorage.getCurrentProject().getName())
            
            // remove project navigation element
            projectObjectStorage.getCurrentProject().getProjectDomElement().remove()

            // update local storage
            projectObjectStorage.updateLocalStorage()

            // switch to all page
            let allPage = document.querySelector("#all-nav")
            allPage.click()

        } else return
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

            //update local storage
            projectObjectStorage.updateLocalStorage()

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

            // update local storage
            projectObjectStorage.updateLocalStorage()

            // close form
            domManipulation.closeEditToDoForm(toDoObject)
        })
    }

    const _allPageListener = () => {

        let allPageButton = document.getElementById("all-nav")

        allPageButton.addEventListener("click", () => {

            _toggleNavItemsStyling(allPageButton)

            domManipulation.openNavPage("all")
            domManipulation.removeToDos(projectObjectStorage.getCurrentProject())

            let projects = projectObjectStorage.getProjectObjectArray()

            for (let project in projects) {
                domManipulation.renderToDos(projects[project])
            }
        })
    }

    const _todayPageListener = () => {

        let todayPageButton = document.getElementById("today-nav")

        todayPageButton.addEventListener("click", () => {

            _toggleNavItemsStyling(todayPageButton)

            domManipulation.openNavPage("today")
            domManipulation.removeToDos(projectObjectStorage.getCurrentProject())

            let projects = projectObjectStorage.getProjectObjectArray()

            // filter for todays todos
            for (let project in projects) {
                
                let toDos = projects[project].getAllToDos();
                for (let todo in toDos) {

                    let todaysDate = _getFormattedDate(new Date())
                    let toDosDate = toDos[todo].getDueDate()        

                    if (todaysDate == toDosDate) {
                        domManipulation.renderOneToDo(toDos[todo])
                    }
                }
            }
        })
    }

    const _weekPageListener = () => {

        let weekPageButton = document.getElementById("week-nav")

        weekPageButton.addEventListener("click", () => {

            _toggleNavItemsStyling(weekPageButton)

            domManipulation.openNavPage("week")
            domManipulation.removeToDos(projectObjectStorage.getCurrentProject())

            let projects = projectObjectStorage.getProjectObjectArray()

            // filter for weekly todos
            for (let project in projects) {
                
                let toDos = projects[project].getAllToDos();
                for (let todo in toDos) {

                    let toDosDate = toDos[todo].getDueDate()

                    if (_isWithinCurrentWeek(toDosDate)) {
                        domManipulation.renderOneToDo(toDos[todo])
                    }
                }
            }
        })
    }

    const _getFormattedDate = (date) => {
        return format(date, 'yyyy-MM-dd')
    }

    const _isWithinCurrentWeek = (date) => {

        let weekEnd = nextSunday(new Date())
        let weekStart = subDays(weekEnd, 7)
        let week = {
            start: weekStart,
            end: weekEnd
        }

        return isWithinInterval(parseISO(date), week)
    }

    const _toggleNavItemsStyling = (clickedElement) => {

        //array with all navigation elements
        let navElements = [];

        let allNavItem = document.querySelector("#all-nav");
        navElements.push(allNavItem)
        let todayNavItem = document.querySelector("#today-nav");
        navElements.push(todayNavItem)
        let weekNavItem = document.querySelector("#week-nav");
        navElements.push(weekNavItem)

        let projects = projectObjectStorage.getProjectObjectArray()

        for (let project in projects) {
            navElements.push(projects[project].getProjectDomElement())
        }

        navElements.forEach(element => {
            element.classList.remove("nav-active")
        });

        clickedElement.classList.add("nav-active")
    }


    return {
        toDoListener,
        loadPage
    }
})();
