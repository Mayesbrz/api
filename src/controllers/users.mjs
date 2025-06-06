import UserModel from '../models/user.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import validator from 'better-validator';

dotenv.config();

const validateUser = (data) => {
  const v = new validator();

  v(data).required().object();
  v(data.firstname).required().string().minLength(2);
  v(data.lastname).required().string().minLength(2);
  v(data.age).required().number().min(1).max(120);
  v(data.city).required().string().minLength(2);

  return v.run();
};

const Users = class Users {
  constructor(app, connect) {
    this.app = app;
    this.UserModel = connect.model('User', UserModel);
    this.run();
  }

  login() {
    this.app.post('/login', (req, res) => {
      const { firstname } = req.body;

      this.UserModel.findOne({ firstname })
        .then(user => {
          if (!user) {
            return res.status(404).json({ code: 404, message: 'Utilisateur introuvable' });
          }

          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

          return res.status(200).json({ token });
        })
        .catch(() => res.status(500).json({ code: 500, message: 'Erreur serveur' }));
    });
  }

  deleteById() {
    this.app.delete('/user/:id', (req, res) => {
      this.UserModel.findByIdAndDelete(req.params.id).then((user) => {
        res.status(200).json(user || {});
      }).catch(() => {
        res.status(500).json({
          code: 500,
          message: 'Internal Server error'
        });
      });
    });
  }

  showById() {
    this.app.get('/user/:id', (req, res) => {
      this.UserModel.findById(req.params.id).then((user) => {
        res.status(200).json(user || {});
      }).catch(() => {
        res.status(500).json({
          code: 500,
          message: 'Internal Server error'
        });
      });
    });
  }

  create() {
    this.app.post('/user', (req, res) => {
      const errors = validateUser(req.body);

      if (errors.length) {
        return res.status(400).json({ code: 400, message: 'Validation failed', errors });
      }

      const userModel = new this.UserModel(req.body);

      userModel.save().then((user) => {
        res.status(201).json(user || {});
      }).catch(() => {
        res.status(500).json({ code: 500, message: 'Erreur serveur' });
      });
    });
  }

  run() {
    this.create();
    this.showById();
    this.deleteById();
    this.login();
  }
};

export default Users;
