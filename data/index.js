const UserService = require('../services/usuario.service');

const service = new UserService();
(async () => {
    await service.create({
        username:"admin",
        password: "admin",
        departamento_id: 1,
        role: "administrador"
    });
})()
