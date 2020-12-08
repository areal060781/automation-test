import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import path from "path";
import ejs from "ejs";
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  queryAllByAltText,
  waitFor,
  queryAllByTestId,
} from "@testing-library/dom";
import mockRes from "../../shows/services/__mocks__/batman";

const shows = mockRes.map((showInfo: any) => {
  return {
    ...showInfo,
    show: {
      ...showInfo.show,
      image: null,
    }
  };
});
const targetFile = path.resolve(__dirname, "../../views/shows/list.ejs");

let dom;
let container = null as any;
describe("List view", () => {
  beforeEach(async () => {
    ejs.renderFile(targetFile, { shows }, (err, str) => {
      if (str) {
        dom = new JSDOM(str, { runScripts: "dangerously" });
        container = dom.window.document.body;
      }
    });
  });

  test("When show.image is null should not render image elements", () => {
    const showImages = queryAllByTestId(container,'show-image');
    showImages.forEach((image) => {
      expect(image).not.toBeInTheDocument();
    })
  });

});
