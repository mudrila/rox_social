const path = require('path');
const fs = require('fs');
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const User = require('./model');

export function signUp (request, response) {
  let requestData = request.body;
  if (requestData.email &&
    requestData.name  &&
    requestData.password && requestData.confirmPassword) {
    if (requestData.password === requestData.confirmPassword) {
      User.findOne({ email: requestData.email}).exec(function (err, checkUser) {
        if (checkUser) {
          response.json({success:false, messageType:'warning', messageBody:'User with such email already exists!'})
        }
        else if (err) {
          response.status(500).json({success:false, messageType:'error', messageBody:'Unknown error while create user.'})
        }
        else {
          let userData = {
            email: requestData.email,
            name: requestData.name,
            password: bcrypt.hashSync(requestData.password, 10),
            uuid: uuid(),
            creationTime: new Date()
          };
          const newUser = new User(userData);
          newUser.save((err, saved) => {
            if (err) {
              response.status(500).json({success:false, messageType:'error', messageBody:'Error while create user'})
            }
            response.json({ success: true, messageType: 'success', messageBody: `${saved.name}, welcome on the board :)`})
          })
        }
      });
    }
    else {
      response.json({ success:false, messageType:'warning', messageBody:'User password and confirmation doesn`t match!'})
    }
  }
  else {
    response.json({
      success:false,
      messageType:'warning',
      messageBody:'Please, send all required data: Your name, Your email, your password and password confirmation'
    })
  }
}
export function login(request, response) {
  let requestData =  request.body;
  if (requestData.email && requestData.password) {
    User.findOne({ email: requestData.email }).exec(function (err, user) {
      if (err) {
        response.status(500).json({success:false, messageType:'error', messageBody:'Unknown error while login.'})
      } else if (user) {
        if (bcrypt.compareSync(requestData.password, user.password)) { // Sent password hash == user pass hash
          let userJSON = {
            id: user._id,
            name: user.name,
            uuid: user.uuid,
            creationTime: user.creationTime
          };
          response.json({
            success:true,
            messageType:'success',
            messageBody: 'You successfully logged in, congratulations, You are the best our visitor! :)',
            user: {
              name: user.name,
              uuid: user.uuid,
              creationTime: user.creationTime,
              email: user.email,
              token: jwt.sign({user:userJSON}, config.jwtSecret)
            }
          })
        } else {
          // Don't help to hackers - email is correct, but it can be brute force, so just tell that 'something' incorrect
          response.json({
            success:false,
            messageType:'warning',
            messageBody: 'Email or password incorrect'
          })
        }
      } else {
        response.json({
          success:false,
          messageType:'warning',
          messageBody: 'Email or password incorrect'
        })
      }
    });
  } else {
    response.json({
      success:false,
      messageType:'warning',
      messageBody:'Please, send all required fields: Your email and Your password'
    })
  }
}
export function getDetails(request, response) {
  let userID = request.params.userID;
  User.findOne( {uuid: userID} ).exec(function (err, user) {
    if (err) {
      response.status(500).json({
        success: false,
        messageType:'error',
        messageBody: 'Unknown error while getting user details'
      })
    } else if(!user) {
      response.json({
        success:false,
        messageType:'warning',
        messageBody: 'Such user does not exist!'
      })
    } else {
      response.json({
        success:true,
        messageType:'success',
        messageBody:'Successfully obtained data of user!',
        user: {
          name: user.name,
          email: user.email,
          creationTime: user.creationTime,
          uuid: user.uuid
        }
      })
    }
  })
}
export function uploadAvatar(request, response) {
  let userID = request.params.userID;
  User.findOne({ uuid: userID}).exec(function (err, user) {
    if (err) {
      response.status(500).json({
        success:false,
        messageType:'error',
        messageBody:'Unknown error while uploading user avatar'
      })
    } else if(!user) {
      response.json({
        success:false,
        messageType:'warning',
        messageBody:'Such user does not exist!'
      })
    } else {
      const tempPath = path.join(__dirname, `../../${request.file.path}`);
      const targetPath = path.join(__dirname, `../../static/avatars/${user.name}-${user.uuid}${path.extname(request.file.originalname).toLowerCase()}`);
      fs.rename(tempPath, targetPath, err => {
        if (err) {
          response.status(500).json({
            success:false,
            messageType:'error',
            messageBody: 'Unknown error while uploading user avatar'
          })
        } else {
          let updatedUser = user.toObject();
          delete updatedUser._id;
          updatedUser.avatarSrc = targetPath;
          User.update({_id: user._id}, updatedUser, {upsert: true}, function (err) {
            if (err) {
              fs.unlink(targetPath, function (err) {
                if (err) {
                   console.log(err)
                }
              });
              response.status(500).json({
                success:false,
                messageType:'error',
                messageBody: 'Unknown error while uploading user avatar'
              })
            } else {
              response.json({
                success:true,
                messageType:'success',
                messageBody:'Holy Guacamole! Thank you for your avatar!'
              })
            }
          });
        }
      })
    }
  });
}
export function getAvatar(request, response) {
  let userID = request.params.userID;
  User.findOne({ uuid: userID}).exec(function (err, user) {
    if (err) {
      response.status(500).json({
        success:false,
        messageType:'error',
        messageBody: 'Unknown error while getting user avatar'
      })
    } else if (!user){
      response.sendFile(path.join(__dirname, '../../static/avatars/anonymous.png'))
    } else {
      if (!user.avatarSrc) {
        response.sendFile(path.join(__dirname, '../../static/avatars/anonymous.png'))
      } else {
          if (fs.existsSync(user.avatarSrc)) {
            response.sendFile(user.avatarSrc)
          } else {
            response.sendFile(path.join(__dirname, '../../static/avatars/anonymous.png'))
          }
      }
    }
  });
}