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
  