const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const { unlink } = require("fs");

const User = require("../../models/people");
const { unlink } = require("../../router/loginRouter");

const addUserValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is Required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name should contain only alphabet")
    .trim(),

  check("email")
    .isEmail()
    .withMessage("Invalid Email Address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already in use");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true, // that means +88 is must
    })
    .withMessage("Mobile Number must be a valid Bangladeshi Mobile Number!")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile in use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("password")
    .isStrongPassword()
    .withMessage("Password Must be at least 8 charaters!"),
];

const addUserValidatorHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addUserValidator,
  addUserValidatorHandler,
};
