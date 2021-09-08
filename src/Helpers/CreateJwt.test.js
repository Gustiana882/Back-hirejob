const token = require('./CreateJwt');

describe("Test fuction create token", () => {
    test('should return random text', () => {
        const result = token('test@email.com', 'employer')
        expect(result)
    })
})