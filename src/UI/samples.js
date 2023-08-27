import { format, nextSunday, subDays, isWithinInterval, parseISO} from 'date-fns';

export const samples = (() => {

    let _projectDescriptionSample = "Click the button on the right to change the description!"
    
    let allToDosHeading = "All To Dos"
    let allToDosSubHeading = "Here you can see all your coming up to dos!"

    let todayToDosHeading = "Today's To Dos"
    let todayToDosSubHeading = () => {
        return format(new Date(),"'It´s' cccc 'the' do 'of' MMMM" )
    }

    let weekToDosHeading = "Weekly To Dos"
    let weekToDosSubHeading = () => {

        let weekEnd = nextSunday(new Date())
        let weekStart = subDays(weekEnd, 6)
        let weekStartString = format(weekStart, "'You´re weekly Todo´s from' EEEEEE'. the' do 'to'")
        let weekEndString = format(weekEnd, " EEEEEE. 'the' do")
        
        return weekStartString + weekEndString
    }   


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