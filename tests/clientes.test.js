import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../src/app';
import { MakeCliente, MakeProducto, MakeUser } from './utils/factories';
import { AuthenticateUser } from './utils/helpers';

describe('clientes', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
    });

    it('should create client', async () => {
        const user = await MakeUser();
        const token = await AuthenticateUser(user.email);
        const { body } = await request(app)
            .post('/clientes')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nombre: faker.name.fullName(),
                email: faker.internet.email(),
                nit: faker.datatype.number().toString(),
                direccion: faker.address.streetAddress(),
                numeroTelefono: faker.phone.number(),
                estadoId: 1,
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(body).not.toBeUndefined();
        expect(body.nombre).not.toBeUndefined();
        expect(body.estadoId).toEqual(1);
    });

    it('should read client', async () => {
        const user = await MakeUser();
        const cliente = await MakeCliente();
        const token = await AuthenticateUser(user.email);

        const { body } = await request(app)
            .get(`/clientes/${cliente.clienteId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(body).not.toBeUndefined();
        expect(body.clienteId).toEqual(cliente.clienteId);
    });

    it('should update client', async () => {
        const user = await MakeUser();
        const cliente = await MakeCliente({ direccion: '' });
        const token = await AuthenticateUser(user.email);

        const { body } = await request(app)
            .post(`/clientes/${cliente.clienteId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                direccion: faker.address.streetAddress(),
            })
            .expect('Content-Type', /json/)
            .expect(200);
        expect(body).not.toBeUndefined();
        expect(body.clienteId).toEqual(cliente.clienteId);
        expect(body.precio).not.toEqual(0);
    });
});
