/**
 * @file Tree-sitter grammar for the X# language
 * @author robng <49914302+robng@users.noreply.github.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

/**
 * Creates a case-insensitive `RustRegex` from the given
 * string and returns it.
 * @param s {string}
 */
function ci(s) {
  return new RustRegex("(?i)" + s);
}

export default grammar({
  name: "xsharp",

  rules: {
    source_file: $ =>
      repeat($.namespace),

    namespace: $ => seq(
      $.kw_begin,
      $.kw_namespace,
      $.identifier,
      // TODO: optional($.namespace_body),
      $.kw_end,
      $.kw_namespace,
    ),

    identifier: _ =>
      new RustRegex(".*"),

    kw_begin: _ =>
      ci("begin"),
    kw_end: _ =>
      ci("end"),

    kw_namespace: _ =>
      ci("namespace"),
  }
});
