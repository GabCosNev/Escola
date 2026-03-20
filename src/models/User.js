import { Sequelize, Model } from "sequelize";
import bcrypt from "bcryptjs";

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo deve ter entre 3 e 255 caracters'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Esse Email já existe'
        },
        validate: {
          isEmail: {
            msg: 'Email Inválido'
          },
        }
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'A senha deve ter entre 6 e 50 caracters'
          }
        }
      },
    }, {
      sequelize,
    });
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(String(user.password), 8);
      }
    });
    return this;
  }
  passwordIsValid(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
