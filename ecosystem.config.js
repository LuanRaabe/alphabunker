module.exports = {
  apps: [
    {
      name: "Backend",
      cwd: "./backend/",
      script: "npm",
      args: "run dev",
    },
    {
      name: "Frontend",
      cwd: "./frontend/",
      script: "npm",
      args: "run dev",
    },
  ],
};
