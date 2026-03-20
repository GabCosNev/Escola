import { Sequelize, Model } from "sequelize";

export default class Aluno extends Model {
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
      sobrenome: {
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
      idade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Idade precisa ser um número inteiro'
          },
          min: {
            args: [0],
            msg: 'Idade não pode ser negativa'
          },
          max: {
            args: [120],
            msg: 'Idade muito alta'
          }
        }
      },
      peso: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          isFloat: {
            msg: 'Peso precisa ser um número'
          },
          min: {
            args: [1],
            msg: 'Peso inválido'
          },
          max: {
            args: [500],
            msg: 'Peso muito alto'
          }
        }
      },
      altura: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          isFloat: {
            msg: 'Altura precisa ser um número'
          },
          min: {
            args: [0.3],
            msg: 'Altura inválida'
          },
          max: {
            args: [3],
            msg: 'Altura muito alta'
          }
        }
      }
    }, {
      sequelize,
    });
    return this;
  }
  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: 'aluno_id' });
  }
}
