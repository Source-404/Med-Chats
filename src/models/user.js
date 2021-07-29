const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  age: {
    type: Number,
    default: 18,
    validate(value) {
      if (value < 0) throw new Error("Age must a +ve nuber");
    },
  },
});

// const me = new User({
//   name: "source",
//   email: "source@",
//   age: 27,
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log("big error", error);
//   });

module.exports = User;
