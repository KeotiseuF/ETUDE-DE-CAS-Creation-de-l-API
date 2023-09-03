module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      env_production: {
        NODE_ENV: "production",
      },
      max_memory_restart: '200Mo',
      instances : "3",
      exec_mode : "cluster"
    },
  ],
};
