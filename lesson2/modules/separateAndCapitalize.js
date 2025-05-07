const capitalizedFirstLetter = require("./capitalizedFirstLetter");

function separateAndCapitalize(fullName) {
  const parts = fullName.split(" ");

  const firstName = parts?.[0];
  const surname = parts?.[1];

  const capitalizedFirstName = firstName
    ? capitalizedFirstLetter(firstName)
    : "";
  const capitalizedSurname = surname ? capitalizedFirstLetter(surname) : "";

  return { firstName: capitalizedFirstName, lastName: capitalizedSurname };
}

module.exports = separateAndCapitalize;
