import { ToDo } from '../todos/todos.js';
import { Project } from '../projects/projects.js';
import { storage } from '../storage/storage.js'
import { samples } from './samples.js';
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
        addMainLayout
    }
})();






/*
export const formLogic = (() => {

    

    return {
        closeForm
    }

})();
*/






export const eventListener = (() => {

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

            // create Project "Factory" and save created Object in localstorage and _projects array
            let newProject = Project(input.value, "")
            _projects.push(newProject);
            storage.saveObjectToStorage(input.value, newProject.createProjectObject())

            
            // add event listener to corresponding navigation item
            let domProject = document.querySelector(`.project${_projects.length}`)

            //onclick populate main app section with project name and a sample description
            domProject.addEventListener("click", () => domManipulation.addMainLayout(newProject.getName(), samples.getProjectDescriptionSample() ))
        })
    }



    return {
        buttonAddProjectListener
    }
})();
