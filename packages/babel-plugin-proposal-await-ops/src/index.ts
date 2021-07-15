import { declare } from "@babel/helper-plugin-utils";
import syntaxAwaitOps from "@babel/plugin-syntax-await-ops";
import type * as t from "@babel/types";
import type { NodePath } from "@babel/traverse";

export default declare(api => {
  api.assertVersion("^7.15.0");
  return {
    name: "proposal-await-ops",
    inherits: syntaxAwaitOps,
    visitor: {
      AwaitExpression: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        exit(path: NodePath<t.AwaitExpression>) {},
      },
    },
  };
});
