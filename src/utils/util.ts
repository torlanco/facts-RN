const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/* @Params - date -> 2018-01-29
   @Return - date -> Jan 29 
*/
export const formatDate = (date: string | undefined) => {
    if (!date) return '';
    const dateArray = date.split('-');
    return `${MONTHS[parseInt(dateArray[1]) - 1]} ${parseInt(dateArray[2])}`;
};
  
export const capitalize = (text: string) => {
    const textArr = text.split(" ");
    for (let i = 0; i < textArr.length; i++) {
        textArr[i] = textArr[i].substr(0,1).toUpperCase() + textArr[i].substr(1).toLowerCase();
    }
    return textArr.join(" ");
}
