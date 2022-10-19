import request from 'supertest';
import app from '../src/app';

describe('api', () => {
    it('should get api status', async () => {
        const response = await request(app).get('/').expect('Content-Type', /json/).expect(200);
        expect(response.body.app).toEqual('foodtrack-api');
    });

    it('should fail if not authenticated', async () => {
        await request(app).get('/usuarios').expect('Content-Type', /json/).expect(403);
    });

    it('should fail if endpoint does not exit', async () => {
        const response = await request(app).get('/users').expect('Content-Type', /json/).expect(404);
        expect(response.body.error).toEqual('No encontrado');
    });
});
