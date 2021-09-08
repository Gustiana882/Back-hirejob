const modelSkill = require('../../Models/Worker_skill');
const worker = require('../../Models/Models_Worker');
const response = require('../../Helpers/StandarRespon');
const decodeToken = require('../../Helpers/DecodeJwt');

const Skill = {}

Skill.add = async (req, res) => {
    try {
        const { skill } = req.body;
        const { user } = await decodeToken(req.headers.token);
        const { id } = await worker.getByEmail(user)
        const checkSkill = await modelSkill.getByIdWorker(id)
        const data = {
            idWorker: id,
            skill,
        }
        if (checkSkill) {
            const result = await modelSkill.edit(data)
            if(result) {
                return response(res, 200, 'add skill succsess')
            }
            return response(res, 200, 'skill not added', true)
        } 
        else {
            const status = await modelSkill.add(data)
            if (status) {
                return response(res, 200, 'add skill succsess')
            }
            return response(res, 200, 'skill not added', true)
        }
    } catch (error) {
        response(res, 200, error.message, true)
    }
}

module.exports = Skill;