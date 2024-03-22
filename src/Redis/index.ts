import Redis from 'ioredis';
import { secretKeys } from '../Config/env';

const redisClient = new Redis({
    host: secretKeys.REDIS_HOST,
    port: +secretKeys.REDIS_PORT
});

class RedisFacade {
    private redisClientRef;
    private ttl: number;
    constructor(redisClientRef: any, ttl: number) {
        this.redisClientRef = redisClientRef;
        this.ttl = ttl
    }

    async getData(key: any) {
        try {
            const data = await this.redisClientRef.get(key)
            if (data) {
                console.log('data from redis', data)
                return JSON.parse(data);
            }
            else return null
        } catch (error) {
            console.log('error in getData', error)
            throw error
        }
    }

    async setData(key: any, data: any) {
        try {
            const results = JSON.stringify(data);
            await this.redisClientRef.set(key, results, 'EX', this.ttl)
            return
        } catch (error) {
            console.log('error in setData ', error)
            throw error
        }
    }

}

export const RedisFacadeClient = new RedisFacade(redisClient, +secretKeys.REDIS_TTL);