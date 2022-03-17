import { createDiscount } from "../src/controllers/discounts.js";
import Discount from "../src/models/Discount.js";
import httpMocks from "node-mocks-http";

describe("createDiscountHandler", () => {
  it("creates discount given correct request", async () => {
    let mockRequest = httpMocks.createRequest({
      body: {
        discount_type: "anyname",
        discount_value: 30,
      },
    });
    let mockResponse = httpMocks.createResponse();

    const discountModelCreateMock = jest
      .spyOn(Discount, "create")
      .mockImplementation();

    await createDiscount(mockRequest, mockResponse, jest.fn());
    expect(mockResponse._getStatusCode()).toEqual(201);
    expect(discountModelCreateMock).toHaveBeenCalledWith({
      discount_type: "anyname",
      discount_value: 30,
    });
  });
  it("does not creates discount given incorrect request", async () => {
    let mockRequest = httpMocks.createRequest({
      body: {
        discount_value: "affiliate",
      },
    });
    let mockResponse = httpMocks.createResponse();

    const discountModelCreateMock = jest
      .spyOn(Discount, "create")
      .mockImplementation();

    await createDiscount(mockRequest, mockResponse, jest.fn());
    expect(mockResponse._getStatusCode()).toEqual(400);
  });
});
