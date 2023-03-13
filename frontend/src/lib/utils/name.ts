export const getName = (fullName: string) => {
  const nameArray = fullName.split(/\s/);
  let firstName = "";
  let lastName = "";
  if (nameArray.length > 2) {
    lastName = nameArray.slice(-2).join(" ");
    firstName = nameArray.slice(0, -2).join(" ");
  }
  if (nameArray.length === 2) {
    lastName = nameArray.slice(-1).join(" ");
    firstName = nameArray.slice(0, -1).join(" ");
  }

  if (nameArray.length === 1) {
    lastName = nameArray.slice(-1).join(" ");
    firstName = nameArray.slice(0, -1).join(" ");
  }

  return { firstName, lastName };
};
