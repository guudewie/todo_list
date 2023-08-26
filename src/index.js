import { ToDo } from './todos/todos.js';
import { Project } from './projects/projects.js';
import { storage } from './storage/storage.js'
import { domManipulation, eventListener, formLogic } from './UI/ui.js';

window.addEventListener("load", () => eventListener.loadPage())




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