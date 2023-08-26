export const projectObjectStorage = (() => {

    let _projectObjectStorage = {};
    let _currentProject;

    const getProjectObject = (title) => {
        return _projectObjectStorage[title]
    }

    const getProjectObjectArray = () => {
        return _projectObjectStorage
    }

    const addProjectObject = (key, value) => {
        _projectObjectStorage[key] = value
    }

    const getCurrentProject = () => {
        return _currentProject
    }

    const setCurrentProject = (object) => {
        _currentProject = object
    }

    const removeProjectObject = (key) => {
        delete _projectObjectStorage[key]
    }

    return {
        getProjectObject,
        getProjectObjectArray,
        addProjectObject,
        getCurrentProject,
        setCurrentProject,
        removeProjectObject
    }
})();