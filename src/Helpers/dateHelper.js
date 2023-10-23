export function formatMillisecondsToDateString(milliseconds) {
    const date = new Date(milliseconds);
  
    // Define the days of the week and months for formatting
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    // Extract the day, date, and year
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dateOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    // Format the string
    const dateString = `${month} ${dateOfMonth}, ${year}`;
    
    return dateString;
  }
  
  export const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
