const bcr = require('bcrypt');
const tokenJwt = require('../../Helpers/CreateJwt');
const response = require('../../Helpers/StandarRespon');
const Worker = require('../../Models/Models_Worker');
const Employer = require('../../Models/Modes_Employer');
const Login = {}

Login.worker = async (req, res) => {
    try {
        const { email, password } = req.body
        const checkEmail = await Worker.getByEmail(email)
        if (!checkEmail) {
            return response(res, 200, { msg: 'e-mail not registered!' }, true);
        }
        const { name, image, roles } = checkEmail;
        const cekPass = await bcr.compare(password, checkEmail.password);
        if (cekPass) {
          const token = await tokenJwt(email, roles);
          return response(res, 200, { name, email, image, token_key: token }, 'login berhasil!');
        } else {
          return response(res, 200, { msg: 'login gagal!' }, true);
        }
    } catch (error) {
        return response(res, 400, { msg: error.message }, true);
    }
}

Login.employer = async (req, res) => {
    try {
        const { email, password } = req.body
        const checkEmail = await Employer.getByEmail(email)
        if (!checkEmail) {
            return response(res, 200, { msg: 'e-mail not registered!' }, true);
        }
        const { name, image, roles } = checkEmail;
        const cekPass = await bcr.compare(password, checkEmail.password);
        if (cekPass) {
          const token = await tokenJwt(email, roles);
          return response(res, 200, { name, email, image, token_key: token }, 'login berhasil!');
        } else {
          return response(res, 200, { msg: 'login gagal!' }, true);
        }
    } catch (error) {
        return response(res, 400, { msg: error.message }, true);
    }
}

module.exports = Login;