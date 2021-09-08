const modelExperience = require('../../Models/Worker_Experience');
const worker = require('../../Models/Models_Worker');
const response = require('../../Helpers/StandarRespon');
const decodeToken = require('../../Helpers/DecodeJwt');

const Experience = {}

Experience.add = async (req, res) => {
    try {
        const { idExperience, position, company, dateIn, dateOut, description } = req.body;
        const { user } = await decodeToken(req.headers.token);
        const { id } = await worker.getByEmail(user)
        let array = []
        for (let i = 0; i < req.body.position.length; i++) {
            const data = {
                id: idExperience[i],
                idWorker: id,
                position: position[i],
                company: company[i],
                dateIn: dateIn[i],
                dateOut: dateOut[i],
                description: description[i],
                image: 'image.jpg'
            }
            array.push(data)
        }
        const result = Promise.all(array.map( async (value) => {
            if (value.id === 'add') {
                return await modelExperience.add(value)
            }
            else {
                return await modelExperience.edit(value)
            }
        }))
        console.log(result)
    } catch (error) {
        response(res, 200, error.message, true)
    }
}

module.exports = Experience;