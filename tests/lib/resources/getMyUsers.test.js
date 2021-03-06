import getMyUsers from "../../../lib/resources/getMyUsers.js";
import query from "../../../lib/utils/query.js";
jest.mock("../../../lib/utils/query.js", () => jest.fn());
jest.mock("../../../lib/resources/GraphQLStrings.js", () => jest.fn());

beforeEach(() => {
  jest.clearAllMocks();
});

describe("QUERY getMyUsers()", () => {
  describe("when a query is successfully returned", () => {
    it("should return a list of objects (users)", async () => {
      // Mock query implementation to return list of objects
      query.mockImplementationOnce(() =>
        Promise.resolve({ data: { fetchUsers: [[Object], [Object]] } })
      );
      // Requires an API string
      var api = "";

      // Uses getMyUsers without using the client with the
      // jest.mocks above: Mocks the query and the gql strings
      await getMyUsers({ api: api }).then((response) => {
        // toStrictEqual instead of toBe to compare the array
        // and not the content of the array
        expect(response).toStrictEqual([[Object], [Object]]);
      });
    });
  });

  describe("when a query is sent with no API key", () => {
    it("should return a TypeError", async () => {
      // Call query, catch, throw and expect
      // (only way to make it work for some reason)
      await getMyUsers().catch((e) => {
        expect(() => {
          throw e;
        }).toThrow(TypeError);
      });
    });
  });

  describe("when a query is sent with an invalid API key", () => {
    it("should return an error about bad API key or no users", async () => {
      // Mock query implementation to return error
      query.mockImplementationOnce(() =>
        Promise.reject({
          graphQLErrors: [{ message: "GraphQL error Message" }],
          networkError: [],
          clientErrors: [],
        })
      );

      // Random API string
      var invalid_api = "aCBwq4zEfgIoRtcm3H1g0vdW9klM5BbcOlUprupgXyz";

      // Call query, catch, throw and expect
      // (only way to make it work for some reason)
      await getMyUsers({ api: invalid_api }).catch((e) => {
        expect(() => {
          throw e;
        }).toThrowError("GraphQL error Message");
      });
    });
  });

  describe("when a query is sent and a network error occurs", () => {
    it("should return the network error", async () => {
      // Mock query implementation to return error
      query.mockImplementationOnce(() =>
        Promise.reject({
          graphQLErrors: [],
          networkError: [{ message: "Network error message" }],
          clientErrors: [],
        })
      );

      // Requires an API string
      var api = "";

      // Call query, catch, throw and expect
      // (only way to make it work for some reason)
      await getMyUsers({ api: api }).catch((e) => {
        expect(() => {
          throw e;
        }).toThrowError("Network error message");
      });
    });
  });

  describe("when a query is sent and a client error occurs", () => {
    it("should return the client error", async () => {
      // Mock query implementation to return error
      query.mockImplementationOnce(() =>
        Promise.reject({
          graphQLErrors: [],
          networkError: [],
          clientErrors: [{ message: "Client error message" }],
        })
      );

      // Requires an API string
      var api = "";

      // Call query, catch, throw and expect
      // (only way to make it work for some reason)
      await getMyUsers({ api: api }).catch((e) => {
        expect(() => {
          throw e;
        }).toThrowError("Client error message");
      });
    });
  });

  describe("when a query is sent and an unknown error occurs", () => {
    it("should return the unknow error message", async () => {
      // Mock query implementation to return error
      query.mockImplementationOnce(() =>
        Promise.reject({
          graphQLErrors: [],
          networkError: [],
          clientErrors: [],
        })
      );

      // Requires an API string
      var api = "";

      // Call query, catch, throw and expect
      // (only way to make it work for some reason)
      await getMyUsers({ api: api }).catch((e) => {
        expect(() => {
          throw e;
        }).toThrowError("An Unknown error occurred while fetching users");
      });
    });
  });
});
