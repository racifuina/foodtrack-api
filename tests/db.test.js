import { QueryTypes } from 'sequelize';
import { dbConnection } from '../src/dbconn';

describe('database', () => {
    it('should connect to db', async () => {
        const result = await dbConnection.query('SELECT 1+1 AS result', {
            type: QueryTypes.SELECT,
        });
        expect(result).not.toBeUndefined();
        expect(result.length).toEqual(1);
        expect(result[0].result).toEqual(2);
    });
});
