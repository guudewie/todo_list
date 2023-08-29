// Factory function for creating a Project

export const Project = (name, description) => {
  const getName = () => name;
  const setName = (newName) => (name = newName);

  const getDescription = () => description;
  const setDescription = (newDescription) => (description = newDescription);

  const _associatedToDos = {};

  const getToDo = (index) => _associatedToDos[index];
  const getAllToDos = () => _associatedToDos;

  let _projectDomElement;

  const setProjectDomElement = (newDomElement) =>
    (_projectDomElement = newDomElement);
  const getProjectDomElement = () => _projectDomElement;

  const addToDo = (object, toDoName) => (_associatedToDos[toDoName] = object);
  const removeToDo = (todoName) => delete _associatedToDos[todoName];

  const _createToDosObject = () => {
    const ToDosObject = {};

    for (const todo in _associatedToDos) {
      ToDosObject[_associatedToDos[todo].getName()] =
        _associatedToDos[todo].createToDoObject();
    }

    return ToDosObject;
  };

  const createProjectObject = () => {
    const projectObject = {
      name: getName(),
      description: getDescription(),
      associatedToDos: _createToDosObject(),
    };

    return projectObject;
  };

  return {
    getName,
    setName,
    setDescription,
    getDescription,
    getToDo,
    addToDo,
    removeToDo,
    getAllToDos,
    createProjectObject,
    setProjectDomElement,
    getProjectDomElement,
  };
};
