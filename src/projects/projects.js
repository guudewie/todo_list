// Factory function for creating a Project

export const Project = (name, description) => {

    const getName = () => name;
    const setName = (newName) => name = newName;

    const getDescription = () => description;
    const setDescription = (newDescription) => description = newDescription;

    let _associatedToDos = {};

    const getToDo = (index) => _associatedToDos[index];
    const getAllToDos = () => _associatedToDos;

    let _projectDomElement;

    const setProjectDomElement = (newDomElement) => _projectDomElement = newDomElement;
    const getProjectDomElement = () =>{ return _projectDomElement }

    const addToDo = (object, toDoName) => _associatedToDos[toDoName] = object
    const removeToDo = (todoName) => delete _associatedToDos[todoName];

    const _createToDosObject = () => {

        let ToDosObject = {}

        for (let todo in _associatedToDos) {
            ToDosObject[_associatedToDos[todo].getName()] = _associatedToDos[todo].createToDoObject()
        }
        // IMPLEMENT ABOVE LOOP IF NEEDED
        // BELOW LOOP DOES NOT WORK

        //_associatedToDos.forEach((e) => {
        //    ToDosObject[e.getName()] = e.createToDoObject()
        //})

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
            setProjectDomElement,
            getProjectDomElement
        }
}



