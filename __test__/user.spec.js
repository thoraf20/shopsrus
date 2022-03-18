import { createUser } from "../src/controllers/user.js";
import User from "../src/models/User.js";
import httpMocks from "node-mocks-http";


describe("createUsererHandler", () => {
  it('creates user given correct request', async () => {
    let mockRequest = httpMocks.createRequest({
      body: {
        name: 'anyname',
        user_type: 'affiliate'
      },
    })
    let mockResponse = httpMocks.createResponse();

    const userModelCreateMock = jest
      .spyOn(User, "create")
      .mockImplementation();

    await createUser(mockRequest, mockResponse, jest.fn());
    expect(mockResponse._getStatusCode()).toEqual(201);
    expect(userModelCreateMock).toHaveBeenCalledWith({
      name: "anyname",
      user_type: "affiliate",
    });
  })
  it('does not creates user given incorrect request', async () => {
    let mockRequest = httpMocks.createRequest({
      body: {
        name: 'anyname',
      },
    })
    let mockResponse = httpMocks.createResponse();

    const userModelCreateMock = jest
      .spyOn(User, "create")
      .mockImplementation();

    await createUser(mockRequest, mockResponse, jest.fn());
    expect(mockResponse._getStatusCode()).toEqual(400);
  })
})

