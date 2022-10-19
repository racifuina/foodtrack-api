import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../src/app';
import { MakeEmpleado, MakeRol, MakeUser } from './utils/factories';
import { AuthenticateUser } from './utils/helpers';
import sgMail from '@sendgrid/mail';

describe('usuarios', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
    });

    it('should authenticate user', async () => {
        const user = await MakeUser();

        const { body } = await request(app)
            .post('/usuarios/autenticar')
            .send({
                email: user.email,
                password: 'password',
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(body.mensaje).toEqual('Usuario autenticado');
        expect(body.usuario.usuarioId).toEqual(user.usuarioId);
        expect(body.token).not.toBeUndefined();
    });

    it('should fail if wrong password', async () => {
        const user = await MakeUser();

        await request(app)
            .post('/usuarios/autenticar')
            .send({
                email: user.email,
                password: 'abc',
            })
            .expect('Content-Type', /json/)
            .expect(400);
    });

    it('should fail if user does not exist', async () => {
        await request(app)
            .post('/usuarios/autenticar')
            .send({
                email: faker.internet.email(),
                password: 'password',
            })
            .expect('Content-Type', /json/)
            .expect(404);
    });

    it('should create user', async () => {
        const user = await MakeUser();
        const token = await AuthenticateUser(user.email);

        const rol = await MakeRol();
        const empleado = await MakeEmpleado();

        jest.spyOn(sgMail, 'send').mockImplementation(() => {
            return new Promise((resolve) => {
                resolve({});
            });
        });

        const { body } = await request(app)
            .post('/usuarios')
            .set('Authorization', `Bearer ${token}`)
            .send({
                email: faker.internet.email(),
                empleadoId: empleado.empleadoId,
                rolId: rol.rolId,
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(body).not.toBeUndefined();
    });

    it('should read user', async () => {
        const user = await MakeUser();
        const user2 = await MakeUser();
        const token = await AuthenticateUser(user.email);

        const { body } = await request(app)
            .get(`/usuarios/${user2.usuarioId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(body).not.toBeUndefined();
        expect(body.usuarioId).toEqual(user2.usuarioId);
    });
});
