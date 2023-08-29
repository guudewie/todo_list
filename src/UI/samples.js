import {
  format,
  nextSunday,
  subDays,
  isWithinInterval,
  parseISO,
} from "date-fns";
import { ToDo } from "../todos/todos";
import { Project } from "../projects/projects";

export const samples = (() => {
  let _projectDescriptionSample =
    "Click the button on the right to change the description!";

  let allToDosHeading = "All To Dos";
  let allToDosSubHeading = "Here you can see all your coming up to dos!";

  let todayToDosHeading = "Today's To Dos";
  let todayToDosSubHeading = () => {
    return format(new Date(), "'It´s' cccc 'the' do 'of' MMMM");
  };

  let weekToDosHeading = "Weekly To Dos";
  let weekToDosSubHeading = () => {
    let weekEnd = nextSunday(new Date());
    let weekStart = subDays(weekEnd, 6);
    let weekStartString = format(
      weekStart,
      "'You´re weekly Todo´s from' EEEEEE'. the' do 'to'",
    );
    let weekEndString = format(weekEnd, " EEEEEE. 'the' do");

    return weekStartString + weekEndString;
  };

  const getSampleProject = () => {
    let heading = "Welcome";
    let description = "May I present TA DAAAA: The To Do App of your dreams!!!";
    let todoDate = format(new Date(), "yyyy-MM-dd");
    let toDo1 = ToDo(
      "💡 Click + Add Project to personalize your project portfolio",
    );
    let toDo2 = ToDo(
      "💡 Set up to dos for each project with the add to do button",
    );
    let toDo3 = ToDo("💡 Give your ToDos names and dates");
    let toDo4 = ToDo(
      "💡 Ohh Ohh, seems like this one is due today",
      "",
      todoDate,
    );
    let toDo5 = ToDo("💡 Check off your ToDos if done", "", todoDate, false);
    let toDoArray = [toDo1, toDo2, toDo3, toDo4, toDo5];

    let sampleProject = Project(heading, description);
    toDoArray.forEach((e) => {
      sampleProject.addToDo(e, e.getName());
    });

    return sampleProject;
  };

  const getProjectDescriptionSample = () => {
    return _projectDescriptionSample;
  };

  return {
    getProjectDescriptionSample,
    allToDosHeading,
    allToDosSubHeading,
    todayToDosHeading,
    todayToDosSubHeading,
    weekToDosHeading,
    weekToDosSubHeading,
    getSampleProject,
  };
})();
