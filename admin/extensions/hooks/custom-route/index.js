module.exports = function registerHook({ registerRoute }) {
  registerRoute({
    method: "GET", // HTTP method (GET, POST, PUT, DELETE, etc.)
    path: "/custom-route", // Your custom route path
    handler: async (req, res) => {
      res.send({ message: "Hello from custom route!" });
    },
  });
};
