import request from 'supertest';
import app from '../../src/app';

export const AuthenticateUser = async (email, password) => {
    const { body } = await request(app)
        .post('/usuarios/autenticar')
        .send({
            email,
            password: password ?? 'password',
        });

    return body.token;
};
