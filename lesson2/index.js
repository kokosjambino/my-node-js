const { myPackage } = require("mpackage");
console.log(
  "mpackage: ",
  myPackage({
    name: "иван иванов",
    dateBirth: "10.11.1987",
    purpose: "карьерный рост",
  })
);
