import * as babel from "@babel/core";
import proposalClassStaticBlock from "../lib/index.js";
import proposalClassProperties from "@babel/plugin-proposal-class-properties";

describe("plugin ordering", () => {
  it("should work when @babel/plugin-proposal-class-static-block is after class features plugin", () => {
    const source = `class Foo {
      static {
        this.foo = Foo.bar;
      }
      static bar = 42;
    }
    `;
    expect(
      babel.transformSync(source, {
        filename: "example.js",
        highlightCode: false,
        configFile: false,
        babelrc: false,
        plugins: [proposalClassProperties, proposalClassStaticBlock],
      }).code,
    ).toMatchInlineSnapshot(`
      "function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
      class Foo {}
      Foo.foo = Foo.bar;
      _defineProperty(Foo, \\"bar\\", 42);"
    `);
  });
});
