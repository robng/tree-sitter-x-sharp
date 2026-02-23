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

  word: $ => $.identifier,
  extras: _ => [/\s/],

  supertypes: $ => [
    $.decl_of_type,
    $.visibility,
  ],

  rules: {
    source_file: $ => repeat(
      $.decl_of_namespace
    ),

    decl_of_namespace: $ => seq(
      $.kw_begin,
      $.kw_namespace,
      $.identifier,
      repeat($.decl_of_type),
      $.kw_end,
      $.kw_namespace,
    ),

    decl_of_type: $ => choice(
      $.decl_of_enum,
      $.decl_of_struct,
      $.decl_of_interface,
      $.decl_of_class,
    ),

    decl_of_enum: $ => seq(
      optional($.visibility),
      $.kw_enum,
      $.identifier,
      repeat($.identifier),
      $.kw_end,
      $.kw_enum,
    ),
    decl_of_struct: $ => seq(
      optional($.visibility),
      $.kw_struct,
      $.identifier,
      repeat($.identifier),
      $.kw_end,
      $.kw_struct,
    ),
    decl_of_class: $ => seq(
      optional($.visibility),
      $.kw_class,
      $.identifier,
      repeat($.identifier),
      $.kw_end,
      $.kw_class,
    ),
    decl_of_interface: $ => seq(
      optional($.visibility),
      $.kw_interface,
      $.identifier,
      repeat($.identifier),
      $.kw_end,
      $.kw_interface,
    ),

    visibility: $ => choice(
      $.kw_public,
      $.kw_protected,
      $.kw_private,
      $.kw_internal,
    ),

    identifier: _ =>
      new RustRegex("[\\p{L}\\p{N}]+"),

    // ---------------------------------------------------------------------
    //  Keywords
    // ---------------------------------------------------------------------

    // Begin & end
    kw_begin: _ =>
      token(prec(1, /begin/i)),
    kw_end: _ =>
      token(prec(1, /end/i)),

    // Namespace- & type declarators
    kw_namespace: _ =>
      token(prec(1, /namespace/i)),
    kw_enum: _ =>
      token(prec(1, /enum/i)),
    kw_struct: _ =>
      token(prec(1, /struct/i)),
    kw_interface: _ =>
      token(prec(1, /interface/i)),
    kw_class: _ =>
      token(prec(1, /class/i)),

    // Visibility
    kw_public: _ =>
      token(prec(1, /public/i)),
    kw_protected: _ =>
      token(prec(1, /protected/i)),
    kw_private: _ =>
      token(prec(1, /private/i)),
    kw_internal: _ =>
      token(prec(1, /internal/i)),

    // Scope
    kw_global: _ =>
      prec(1, /global/i),
    kw_local: _ =>
      prec(1, /local/i),

    // Mutability
    kw_const: _ =>
      prec(1, /const/i),
    kw_var: _ =>
      prec(1, /var/i)
  }
});
