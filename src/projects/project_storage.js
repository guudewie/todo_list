export const projectObjectStorage = (() => {

    let _projectObjectStorage = {};
    let _currentProject;

    const getProjectObject = (title) => {
        return _projectObjectStorage.title
    }

    const addProjectObject = (key, value) => {
        _projectObjectStorage.key = value
    }

    const getCurrentProject = () => {
        return _currentProject
    }

    const setCurrentProject = (object) => {
        _currentProject = object
    }

    return {
        getProjectObject,
        addProjectObject,
        getCurrentProject,
        setCurrentProject
    }
})();