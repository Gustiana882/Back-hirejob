const Worker = require('../../Models/Models_Worker');
const response = require('../../Helpers/StandarRespon');
const decode = require('../../Helpers/DecodeJwt');

const Profile = async (req, res) => {
    try {
        const { user } = await decode(req.headers.token);
        const result = await Worker.getByEmail(user);
        if (result) {
            return response(res, 200, result);
        }
        return response(res, 200, 'not found!');
    } catch (error) {
        return response(res, 400, { msg: error.message }, true);
    }
}

module.exports = Profile;