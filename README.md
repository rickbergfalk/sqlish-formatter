# sqlish-formatter

Formats sql-ish text

## Terminology

`statement` - full "query" statement: SELECT statement, UPDATE statement, etc.
`clause` - a section or portion within a statement
`expression` - a collection of some meaningful sql? :upsidedown-smiley:
`keyword` - a reserved word in sql.
`function` - in terms of this project, functions are keywords, followed by parens and parameters

When it comes to the above, statement is generally used for whole sql queries. However sometimes statement is used for the smaller parts within a clause, perhaps because sql can have subqueries?

Clause is pretty consistent. FROM clause, SELECT clause.

Expression is loose. It can be almost anything. [Oracle docs call SELECT statements expressions sometimes](https://docs.oracle.com/javadb/10.6.2.1/ref/rrefselectexpression.html#rrefselectexpression).

## Algo - First thoughts

Trying to keep this as simple as possible, without having to model aspects of SQL.

How whitespace is managed depends on preceding and following nodes
for example, sometimes new lines are determined because of a prior keyword, or comma
`SELECT` requires a new line and indentation
Other times can require knowing what follows something. JOINs for example require a new line prior

```
FROM
  sometable s
  JOIN another_table AS at ON
```

Ultimately we have indicators where we need to capture newLine after or newline prior
And each time we add a newline, we need to flag whether it needs an indent or not

## Algo - Second thoughts

The preceding/following token is not enough, particularly when dealing with subqueries and parens. There's no way of knowing whether a closing paren is for a function or a subquery without knowing the contents of that paren.

Because of this, we must get more formal.

SQL will be split into _statements_ (an entire sql query). Each statement is made up of multiple _clauses_. The clauses have one or more _expressions_.

This should allow for better handling and formatting. The lengths of entire expressions will be known so fancy formatting can go into effect. For example, `select foo, bar` can remain on 1 line because it is short, but a `select` with 10s of columns can switch to having a column on each line to assist scanning. Or this could even be something exposed via config.

Expressions can also be classified so that their contents are known. No more guessing whether a closing paren is for a subquery or function.
