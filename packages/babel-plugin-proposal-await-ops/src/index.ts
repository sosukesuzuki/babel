import { declare } from "@babel/helper-plugin-utils";
import syntaxAwaitOps from "@babel/plugin-syntax-await-ops";
import * as t from "@babel/types";
import type { NodePath } from "@babel/traverse";

export default declare(api => {
  api.assertVersion("^7.14.5");
  return {
    name: "proposal-await-ops",
    inherits: syntaxAwaitOps,
    visitor: {
      AwaitExpression: {
        exit(path: NodePath<t.AwaitExpression>) {
          const { node } = path;
          if (!node.operation) {
            return;
          }
          const operationName = node.operation.name;
          const operationPath = path.get("operation");
          operationPath.remove();
          const argument = node.argument;
          const argumentPath = path.get("argument");
          argumentPath.replaceWith(
            t.callExpression(
              t.memberExpression(
                t.identifier("Promise"),
                t.identifier(operationName),
              ),
              [argument],
            ),
          );
        },
      },
    },
  };
});
