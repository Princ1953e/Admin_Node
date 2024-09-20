const monModal = require("../Modal/Mongooes/mongooes");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const localHost = async (req, res) => {
  if (req.cookies.userId) {
    // const user = await monModal.find();
    const name = await req.cookies.userName;
    const lname = await req.cookies.lastName;
    res.render("admin", { name, lname });
  } else {
    res.render("login");
  }
};

const profilePage = async (req, res) => {
  const name = await req.cookies.userName;
  const lname = await req.cookies.lastName;
  const email = await req.cookies.email;
  res.render("profile", { name, lname, email });
};
const signUpPage = (req, res) => {
  res.render("register");
};
const signInPage = (req, res) => {
  res.render("login");
};
const signUpPageData = async (req, res) => {
  if (req.body.Password == req.body.conPass) {
    bcrypt.hash(req.body.Password, saltRounds, async (err, hasPass) => {
      const userObj = new monModal({
        FirstName: req.body.fName,
        LastName: req.body.lName,
        Email: req.body.email,
        Password: hasPass,
      });

      console.log("User", userObj);

      const adminData = new monModal(userObj);

      try {
        await adminData.save();
      } catch (error) {
        res.redirect("/signIn");
        // console.log(error);
      }
    });
  } else {
    res.redirect("/");
  }
};
const signInPageData = async (req, res) => {
  const Userr = await monModal.find({ Email: req.body.email });
  console.log("Us", Userr);

  if (Userr.length > 0) {
    console.log("req", req.body, Userr[0].Password);

    bcrypt.compare(
      req.body.Password,
      Userr[0].Password,
      function (err, result) {
        console.log(err, result);
        if (result) {
          res.cookie("userId", Userr[0]._id);
          res.cookie("userName", Userr[0].FirstName);
          res.cookie("lastName", Userr[0].LastName);
          res.cookie("email", Userr[0].Email);

          res.redirect("/");
        } else {
          res.redirect("/signIn");
        }
      }
    );
  } else {
    res.redirect("/signUp");
  }
};
module.exports = {
  localHost,
  signUpPage,
  signUpPageData,
  signInPage,
  signInPageData,
  profilePage,
};
