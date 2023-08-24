export const projectObjectStorage = (() => {

    let _projectObjectStorage = {};

    const getProjectObject = (title) => {
        return _projectObjectStorage.title
    }

    const addProjectObject = (key, value) => {
        _projectObjectStorage.key = value
    }
})