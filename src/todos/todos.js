// Factory function for creating a ToDo

export const ToDo = (name, description, dueDate, status) => {

    const getName = () => name;
    const setName = (newName) => name = newName;

    const getDescription = () => description;
    const setDescription = (newDescription) => description = newDescription;

    const getDueDate = () => dueDate;
    const setDueDate = (newDueDate) => dueDate = newDueDate; 

    const getStatus = () => status
    const toggleStatus = () => status = status ? false : true;


    return {getName,
            setName, 
            setDescription,
            getDescription,
            getDueDate,
            setDueDate,
            toogleStatus,
            toggleStatus}
}

