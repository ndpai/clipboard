const {Model, DataTypes} = require("sequelize");
const sequelize = require("../utils/database");

class Employee extends Model {
}

Employee.init({
    name: {
        type: DataTypes.STRING,
        required: true,
    },
    salary: {
        type: DataTypes.NUMBER,
        required: true,
    },
    currency: {
        type: DataTypes.STRING,
        required: true,
    },
    department: {
        type: DataTypes.STRING,
        required: true,
    },
    sub_department: {
        type: DataTypes.STRING,
        required: true,
    },
    on_contract: {
        type: DataTypes.BOOLEAN
    }
}, {
    sequelize,
    modelName: 'employee',
    timestamps: false,
});

module.exports = Employee;
