const mongoose = require('mongoose');
const router = require('express').Router();
const Admin = mongoose.model('Admin');

var passwordHash = require('password-hash');



router.post('/', (req, res, next) => {
  const { body } = req;
  console.log(body);
  if(!body.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!body.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  Admin.findOne({username: body.username}, (err, admin) => {
    if(err) {
      console.log("cannot find");
      return res.sendStatus(404);
    } else if(admin) {
      return res.status(422).json({
        errors: {
          username: 'username is taken',
        },
      });
    }
    else {
      var hashedPassword = passwordHash.generate(body.password);
      console.log("hashedPassword: ", hashedPassword);
      const NewAdmin = new Admin({username: body.username, password: hashedPassword});
      return NewAdmin.save()
        .then(() => res.json({ admin: NewAdmin.toJSON() }))
        .catch(next);

      } 
  }).catch(next);
});

  

module.exports = router;