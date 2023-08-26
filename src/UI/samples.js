export const samples = (() => {

    let _projectDescriptionSample = "Click the button on the right to change the description!"
    
    let allToDosHeading = "All To Dos"
    let allToDosSubHeading = "Here you can see all your coming up to dos!"

    let todayToDosHeading = "Today's To Dos"
    let todayToDosSubHeading = "Here you can see all todos dated for today!!"

    let weekToDosHeading = "Weekly To Dos"
    let weekToDosSubHeading = "Rough Week you got!!"



    const getProjectDescriptionSample = () => {
        return _projectDescriptionSample
    }


    return {
        getProjectDescriptionSample,
        allToDosHeading,
        allToDosSubHeading,
        todayToDosHeading,
        todayToDosSubHeading,
        weekToDosHeading,
        weekToDosSubHeading
    }
})();