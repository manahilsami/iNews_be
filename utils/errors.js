module.exports = {
  BAD_REQUEST: {
    code: 400,
    message:
      "invalid data passed to the methods for creating an item/user or updating an item, or invalid ID passed to the params",
  },
  NOT_FOUND: {
    code: 404,
    message:
      "No resource found with the requested id, or the request was sent to a non-existent address.",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: "An error has occurred on the server",
  },
  CREATED: { code: 201, message: "Resource created successfully" },
  OK: { code: 200, message: "Success" },
  FORBIDDEN: {
    code: 403,
    message: "You do not have permission to perform this action",
  },
  CONFLICT: {
    code: 409,
    message: "Conflict with existing resource",
  },
  UNAUTHORIZED: {
    code: 401,
    message: "You must be logged in to perform this action",
  },
};
