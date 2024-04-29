const checkDate = (first, last) => {
  const firstDate = new Date(first);
  const firstyear = firstDate.getFullYear();
  const firstmonth = String(firstDate.getMonth() + 1).padStart(2, "0");
  const firstday = String(firstDate.getDate()).padStart(2, "0");
  const lastDate = new Date(last);
  const lastyear = lastDate.getFullYear();
  const lastmonth = String(lastDate.getMonth() + 1).padStart(2, "0");
  const lastday = String(lastDate.getDate()).padStart(2, "0");
  if (
    firstyear !== lastyear ||
    firstmonth !== lastmonth ||
    firstday !== lastday
  ) {
    return false;
  }
  return true;
};
export default checkDate;
