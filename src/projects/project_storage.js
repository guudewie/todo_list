export const projectObjectStorage = (() => {
  let _projectObjectStorage = {};
  let _currentProject;

  const getProjectObject = (title) => {
    return _projectObjectStorage[title];
  };

  const getProjectObjectArray = () => {
    return _projectObjectStorage;
  };

  const addProjectObject = (key, value) => {
    _projectObjectStorage[key] = value;
  };

  function removeProjectObject(key) {
    delete _projectObjectStorage[key];
  }

  const getCurrentProject = () => {
    return _currentProject;
  };

  const setCurrentProject = (object) => {
    _currentProject = object;
  };

  const updateLocalStorage = () => {
    localStorage.clear();

    for (let key in _projectObjectStorage) {
      let project = _projectObjectStorage[key].createProjectObject();

      window.localStorage.setItem(
        _projectObjectStorage[key].getName(),
        JSON.stringify(project),
      );
    }
  };

  const getObjectFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  return {
    getProjectObject,
    getProjectObjectArray,
    addProjectObject,
    getCurrentProject,
    setCurrentProject,
    removeProjectObject,
    updateLocalStorage,
  };
})();
