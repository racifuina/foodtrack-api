import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../src/app';
import { MakeEmpleado, MakeProducto, MakeRol, MakeUser } from './utils/factories';
import { AuthenticateUser } from './utils/helpers';
import sgMail from '@sendgrid/mail';

describe('productos', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
    });

    it('should create product', async () => {
        const user = await MakeUser();
        const token = await AuthenticateUser(user.email);
        const { body } = await request(app)
            .post('/productos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nombre: faker.commerce.product(),
                descripcion: faker.random.words(),
                imagen: faker.internet.url(),
                precio: faker.commerce.price(),
                estadoId: 1,
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(body).not.toBeUndefined();
        expect(body.nombre).not.toBeUndefined();
        expect(body.estadoId).toEqual(1);
    });

    it('should read product', async () => {
        const user = await MakeUser();
        const producto = await MakeProducto();
        const token = await AuthenticateUser(user.email);

        const { body } = await request(app)
            .get(`/productos/${producto.productoId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(body).not.toBeUndefined();
        expect(body.productoId).toEqual(producto.productoId);
    });

    it('should update product', async () => {
        const user = await MakeUser();
        const producto = await MakeProducto({ precio: 0 });
        const token = await AuthenticateUser(user.email);

        const { body } = await request(app)
            .post(`/productos/${producto.productoId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                precio: faker.commerce.price(),
            })
            .expect('Content-Type', /json/)
            .expect(200);
        expect(body).not.toBeUndefined();
        expect(body.productoId).toEqual(producto.productoId);
        expect(body.precio).not.toEqual(0);
    });
});
