import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import path from "path";
import ejs from "ejs";
import { getByTestId } from "@testing-library/dom";

const targetFile = path.resolve(__dirname, "../../views/shows/index.ejs");

let dom;
let container = null as any;
describe("Home page", () => {
  beforeEach(async () => {
    ejs.renderFile(targetFile, (err, str) => {
      if (str) {
        dom = new JSDOM(str, { runScripts: "dangerously" });
        container = dom.window.document.body;
      }
    });
  });

  test("search button should be present and empty", () => {
    const searchBox = getByTestId(container, "search-box");
    expect(searchBox).toBeInTheDocument();
    expect(searchBox).not.toHaveValue();
  });
});
