module.exports = {
  // Production DB is in env variable (hidden)
  mongoURI:
    process.env.MONGO_URI ||
    'mongodb://movieguru:test123@ds161653.mlab.com:61653/movie-api',
  omdbApiKey: process.env.OMDB_API_KEY || '507f97ce'
};
