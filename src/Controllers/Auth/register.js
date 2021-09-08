const Worker = require('../../Models/Models_Worker');
const Employer = require('../../Models/Modes_Employer');
const response = require('../../Helpers/StandarRespon');
const hash = require('../../Helpers/Hash');
const Register = {}

Register.worker = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body
        const cekEmail = await Worker.getByEmail(email);
        if (cekEmail) {
          return response(res, 200, { msg: 'e-mail already registered' }, true);
        }
        const data = {
          name: name,
          email: email,
          phone: phone,
          password: await hash(password),
          roles: 'worker',
          image: 'public/images/blank.jpg',
        };
        const register = await Worker.add(data);
        if (!register) {
            return response(res, 200, { msg: 'e-mail not registered!' }, true);
        }
        return response(res, 200, { msg: 'register success!' });
      } catch (error) {
        return response(res, 400, { msg: error.message }, true);
      }
}

Register.employer = async (req, res) => {
  try {
      const { name, email, company, position, phone, password } = req.body
      const cekEmail = await Employer.getByEmail(email);
      if (cekEmail) {
        return response(res, 200, { msg: 'e-mail already registered' }, true);
      }
      const data = {
        name: name,
        email: email,
        company: company,
        position: position,
        phone: phone,
        password: await hash(password),
        roles: 'employer',
        image: 'public/images/blank.jpg',
      };
      const register = await Employer.add(data);
      if (!register) {
          return response(res, 200, { msg: 'e-mail not registered!' }, true);
      }
      return response(res, 200, { msg: 'register success!' });
    } catch (error) {
      return response(res, 400, { msg: error.message }, true);
    }
}

module.exports = Register;