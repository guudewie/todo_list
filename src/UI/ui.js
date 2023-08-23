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

export const domManipulation = (() => {



    const addProject = (name) => {

        const projectDOM = document.getElementById('projects');

        let html = (`<section>
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

    return {
        addProject,
        removeProject,
        openProjectForm
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

    let status = true;
    const toggleStatus = () => status ? false : true;

    const addProjectListener = () => {

        let addProjectElement = document.getElementById("add-project")
        
        addProjectElement.addEventListener("click", () => { 

            if (status) { 
                domManipulation.openProjectForm();
                handleFormSubmit();
                toggleStatus()
            } else return
        })
    }

    const handleFormSubmit = () => {

        let formSection = document.getElementById("project-form-section")
        let form = document.getElementById("new-project-form");
        let input = document.querySelector(".project-form-input")

        form.addEventListener("submit", (e) => {
            
            e.preventDefault();
            formSection.remove()

            // make "+ Add Project" button available again
            toggleStatus()

            // add project only if name is not empty
            if (!input.value) return 
            else domManipulation.addProject(input.value);
        })
    }



    return {
        addProjectListener
    }
})();
