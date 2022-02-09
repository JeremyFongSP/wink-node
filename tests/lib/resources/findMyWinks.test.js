import findWinksSent from "../../../lib/resources/findWinksSent.js";
import query from "../../../lib/utils/query.js";
jest.mock("../../../lib/utils/query.js", () => jest.fn());
jest.mock("../../../lib/resources/GraphQLStrings.js", () => jest.fn());

beforeEach(() => {
  jest.clearAllMocks();
});

describe("QUERY findWinksSent()", () => {
  // NO USERS WERE PROVIDED

  describe("when a query is successfully returned", () => {
    it("should return a list of objects (winks)", async () => {
      // Mock query implementation to return list of objects
      query.mockImplementationOnce(() =>
        Promise.resolve({ data: { findWinksSent: [[Object], [Object]] } })
      );
      // Requires an API string
      var api = "";

      // Uses findWinksSent without using the client with the
      // jest.mocks above: Mocks the query and the gql strings
      await findWinksSent({ api: api }).then((response) => {
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
      await findWinksSent().catch((e) => {
        expect(() => {
          throw e;
        }).toThrow(TypeError);
      });
    });
  });

  describe("when a query is sent with an invalid API key", () => {
    it("should return an error about bad API key or no winks", async () => {
      // Mock query implementation to return error
      query.mockImplementationOnce(() =>
        Promise.reject({
          graphQLErrors: [{ message: "Error Message" }],
          networkError: [],
          clientErrors: [],
        })
      );

      // Random API string
      var invalid_api = "aCBwq4zEfgIoRtcm3H1g0vdW9klM5BbcOlUprupgXyz";

      // Call query, catch, throw and expect
      // (only way to make it work for some reason)
      await findWinksSent({ api: invalid_api }).catch((e) => {
        expect(() => {
          throw e;
        }).toThrowError("Is it the right API key? Did you create any winks?");
      });
    });
  });

  describe("when a query is sent and a network error occurs", () => {
    it("should return the network error", async () => {
      // Mock query implementation to return error
      query.mockImplementationOnce(() =>
        Promise.reject({
          graphQLErrors: [],
          networkError: [{ message: "Error Message" }],
          clientErrors: [],
        })
      );

      // Requires an API string
      var api = "";

      // Call query, catch, throw and expect
      // (only way to make it work for some reason)
      await findWinksSent({ api: api }).catch((e) => {
        expect(() => {
          throw e;
        }).toThrowError("A Network error has occurred");
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
          clientErrors: [{ message: "Error Message" }],
        })
      );

      // Requires an API string
      var api = "";

      // Call query, catch, throw and expect
      // (only way to make it work for some reason)
      await findWinksSent({ api: api }).catch((e) => {
        expect(() => {
          throw e;
        }).toThrowError("A Client side error occurred");
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
      await findWinksSent({ api: api }).catch((e) => {
        expect(() => {
          throw e;
        }).toThrowError("An Unknown error occurred while fetching winks");
      });
    });
  });
});
