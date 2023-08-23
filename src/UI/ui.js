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

export const domStuff = (() => {



    const addProject = (name) => {

        const projectDOM = document.getElementById('projects');

        let html = (`<section>
                    <span class="material-symbols-outlined">Toc</span>
                    <div class="project">${name}</div>
                    </section>`)

        projectDOM.insertAdjacentHTML("beforeend", html)
    }

    return {
        addProject,
    }
})();