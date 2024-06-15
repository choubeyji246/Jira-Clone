const Redis = require("ioredis");

const redisClient = new Redis();

const fetchProjectsFromCache = async (key) => {
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      throw new Error(`Error in getting projects from cache ${error}`);
    }
  };
  
  const storeProjectsInCache = async (key,data) => {
    try {
      redisClient.set(key, JSON.stringify(data), "EX", 10); 
    } catch (error) {
      throw new Error(`Error in getting projects from cache ${error}`);
    }
  };

module.exports={ fetchProjectsFromCache, storeProjectsInCache}