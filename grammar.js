/**
 * @file Tree-sitter grammar for the X# language
 * @author robng <49914302+robng@users.noreply.github.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "xsharp",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
