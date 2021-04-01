const mongoose = require('mongoose');
const router = require('express').Router();
const Admin = mongoose.model('Admin');

var passwordHash = require('password-hash');

router.post('/', (req, res, next) => {
  const { body } = req;


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

  return Admin.findOne({username: body.username}, (err, admin) => {
    if(err) {
      console.log("cannot find");
      return res.sendStatus(404);
    } else if(admin) {
      console.log(passwordHash.verify(body.password, admin.password));
      if (passwordHash.verify(body.password, admin.password))
        return res.status(200).json({
          response: {
            password: 'is correct',
          },
        });
      else 
        return res.status(422).json({
          errors: {
            password: 'is wrong',
          },
        });
    }
  }).catch(next);
});


module.exports = router;