export const errorCheck = (value, type, password1) => {
  switch (type) {
    case "text":
      if (!/[a-z]/gi.test(value)) {
        return "Invalid format";
      } else if (value.length > 50) {
        return "The input cannot be more than 50 characters long";
      } else {
        return "";
      }

    case "name":
      if (value === "") {
        return "This field cannot be left empty";
      } else if (!/[a-z]/gi.test(value)) {
        return "Invalid format";
      } else if (value.length > 15) {
        return "The input cannot be more than 15 characters long";
      } else {
        return "";
      }

    case "email":
      if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
      ) {
        return "Invalid email format";
      } else if (value.length > 20) {
        return "The input cannot be more than 20 characters long";
      } else {
        return "";
      }

    case "password":
      if (value.length < 5) {
        return "Password must be at least 5 characters long";
      }
      // validate it has one lower case letter
      if (!value.match(/[a-z]/)) {
        return "Password must contain at least a lower case";
      }
      // validate it has one upper case letter
      if (!value.match(/[A-Z]/)) {
        return "Password must contain at least an upper case";
      }
      // validate it has one number
      if (!value.match(/[0-9]/)) {
        return "Password must contain at least a number";
      }
      if (value.length > 25) {
        return "The input cannot be more than 25 characters long";
      } else {
        return "";
      }

    default:
      console.log("Error. Report it to someone");

      break;
  }
};
