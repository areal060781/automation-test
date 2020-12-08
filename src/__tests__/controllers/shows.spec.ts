import { ShowsController } from "../../shows/controllers/shows";
import { Response } from "express";
import mockRes from "../../shows/services/__mocks__/batman";
import "jest-extended";

jest.mock("../../../src/shows/services/shows.service");

const resFactory = function (
  statusMockCb: (st: number) => unknown,
  renderMockCb: (view: string, data: unknown) => unknown
): Response<any> {
  const res = {
    status(statusCode: number) {
      statusMockCb(statusCode);
      return this;
    },
    render(template: string, data: unknown) {
      renderMockCb(template, data);
      return this;
    },
  };
  return res as Response<any>;
};

describe("Shows controller", () => {
  test("Controller correctly passes data to views", async () => {
    const mockCb = jest.fn((search: string, data: unknown) => {});

    const res = resFactory(() => {}, mockCb);

    const showCtrl = new ShowsController();
    await showCtrl.search(
      {
        search: "batman",
      },
      res
    );
    expect(mockCb).toHaveBeenCalledWith("shows/list", { shows: mockRes });
  });
  test("Empty query should return a 400 status", async () => {
    const renderMockCb = jest.fn((template: string, data: unknown) => {
      const hasErrors = (e: { errors: { message: string}}) => {
        return Boolean(e.errors.message);
      }
      expect(data).toSatisfy(hasErrors)
    });
    const statusMockCb = jest.fn((statusCode: number) => {
      expect(statusCode).toBe(400);
    });
    const res = resFactory(statusMockCb, renderMockCb);

    const showCtrl = new ShowsController();
    await showCtrl.search(
      {
        search: "",
      },
      res
    );
  });
  test("Should return results in array", async () => {
    const renderMockCb = jest.fn((template: string, data: unknown) => {
      const hasShows = (e: {shows: any[]}) => {
        return e.shows.length > 0;
      }
      expect(data).toSatisfy(hasShows)
    });
    const statusMockCb = jest.fn((statusCode: number) => {});
    const res = resFactory(statusMockCb, renderMockCb);

    const showCtrl = new ShowsController();
    await showCtrl.search(
      {
        search: "batman",
      },
      res
    );
  });
});
