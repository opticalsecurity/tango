@{%
const moo = require("moo");
const lexer = require("../lexer").lexer;
%}

@lexer lexer

Program -> _ StatementList _

StatementList -> StatementListItem:+
StatementListItem -> Statement NEWLINE_TOKEN

Statement ->
    VarDecl
| FuncDecl
| StructDecl
| PrintStmt
| InputStmt
| ReturnStmt
| IfStmt
| WhileStmt
| ExprStmt

VarDecl -> "let" _ identifier _ ":" _ Type _ "=" _ Expression _ ";" {% 
  ([, , id, , , , type, , , , expr]) => ({ type: "VarDecl", id, varType: type, expr }) 
%}

FuncDecl -> "fn" _ identifier _ "(" OptionalParamList ")" _ ":" _ Type _ "{" _ StatementList _ "}" {% 
  ([, , id, , , params, , , , type, , , , stmts]) => ({ type: "FuncDecl", id, params: params, returnType: type, body: stmts }) 
%}

OptionalParamList -> ParamList {% id %} | null {% () => [] %}

ParamList -> Param ParamListRest
{%
  ([first, rest]) => [first, ...rest]
%}

ParamListRest -> "," _ Param ParamListRest {% ([, , param, rest]) => [param, ...rest] %} | null {% data => [] %}

Param -> identifier _ ":" _ Type {% 
  ([id, , , , type]) => ({ id, type }) 
%}

StructDecl -> "struct" _ identifier _ "{" _ StructFieldList _ "}" {% 
  ([, , id, , , fields]) => ({ type: "StructDecl", id, fields }) 
%}

StructFieldList -> StructField RestOfStructFields {%
    ([sf, rsf_array]) => [sf, ...rsf_array]
%}

RestOfStructFields -> NEWLINE_TOKEN StructField RestOfStructFields {%
    ([, sf, more_sf]) => [sf, ...more_sf]
%}
| null {% () => [] %}

StructField -> identifier _ ":" _ Type _ ";" {% 
  ([id, , , , type]) => ({ id, type }) 
%}

PrintStmt -> "print" _ "(" _ Expression _ ")" _ ";" {% 
  ([, , , , expr]) => ({ type: "PrintStmt", expr }) 
%}

InputStmt -> "input" _ "(" _ string _ ")" _ ";" {% 
  ([, , , , prompt]) => ({ type: "InputStmt", prompt }) 
%}

ReturnStmt -> "return" _ OptionalExpression _ ";" {% 
  ([, expr]) => ({ type: "ReturnStmt", expr: expr }) 
%}

OptionalExpression -> Expression {% id %} | null {% () => null %}

IfStmt -> "if" _ "(" _ Expression _ ")" _ "{" _ StatementList _ "}" OptionalElseIfClauses OptionalElseClause {% 
  ([, , , , cond, , , , thenStmts, elseIfs, elseClause]) => ({
    type: "IfStmt", cond, then: thenStmts, elseIfs: elseIfs, else: elseClause
  }) 
%}

OptionalElseIfClauses -> ElseIfClause OptionalElseIfClauses {% (d) => [d[0], ...d[1]] %}
                       | null {% () => [] %}

ElseIfClause -> _ "else" _ "if" _ "(" _ Expression _ ")" _ "{" _ StatementList _ "}" {% 
  ([, , , , , , cond, , , , stmts]) => ({ cond, then: stmts }) 
%}

OptionalElseClause -> ElseClause {% (d) => d[0] %}
                   | null {% () => null %}

ElseClause -> _ "else" _ "{" _ StatementList _ "}" {% 
  ([, , , , stmts]) => stmts 
%}

WhileStmt -> "while" _ "(" _ Expression _ ")" _ "{" _ StatementList _ "}" {% 
  ([, , , , cond, , , , stmts]) => ({ type: "WhileStmt", cond, body: stmts }) 
%}

ExprStmt -> Expression _ ";" {% 
  ([expr]) => ({ type: "ExprStmt", expr }) 
%}

Expression -> Assignment

Assignment -> LogicOr OptionalAssignment {% 
  ([left, right]) => right ? ({ type: "Assignment", operator: right.op, left, right: right.expr }) : left 
%}
OptionalAssignment -> assignOp _ Assignment {% ([op, , expr]) => ({op, expr}) %} | null {% () => null %}

assignOp -> "="

LogicOr -> LogicAnd (orOp _ LogicAnd):* {% ([first, rest]) => rest.reduce((acc, [op, , right]) => ({ type: "LogicalExpr", op, left: acc, right }), first) %}
orOp -> "||"

LogicAnd -> Equality (andOp _ Equality):* {% ([first, rest]) => rest.reduce((acc, [op, , right]) => ({ type: "LogicalExpr", op, left: acc, right }), first) %}
andOp -> "&&"

Equality -> Relational ((eqOp | neqOp) _ Relational):* {% ([first, rest]) => rest.reduce((acc, [op, , right]) => ({ type: "BinaryExpr", op, left: acc, right }), first) %}
eqOp -> "=="
neqOp -> "!="

Relational -> AddSub ((ltOp | lteOp | gtOp | gteOp) _ AddSub):* {% ([first, rest]) => rest.reduce((acc, [op, , right]) => ({ type: "BinaryExpr", op, left: acc, right }), first) %}
ltOp -> "<"
lteOp -> "<="
gtOp -> ">"
gteOp -> ">="

AddSub -> MulDiv ((plusOp | minusOp) _ MulDiv):* {% ([first, rest]) => rest.reduce((acc, [op, , right]) => ({ type: "BinaryExpr", op, left: acc, right }), first) %}
plusOp -> "+"
minusOp -> "-"

MulDiv -> Unary ((timesOp | divideOp | modOp) _ Unary):* {% ([first, rest]) => rest.reduce((acc, [op, , right]) => ({ type: "BinaryExpr", op, left: acc, right }), first) %}
timesOp -> "*"
divideOp -> "/"
modOp -> "%"

Unary -> (notOp | ampOp | starOp) _ Unary {% 
  ([op, , expr]) => ({ type: "UnaryExpr", op: op[0], argument: expr }) 
%}
| AccessOrCallChain

notOp -> "!"
ampOp -> "&"
starOp -> "*"

AccessOrCallChain -> Primary (PostfixOperation):* {% 
  ([object, operations]) => operations.reduce((acc, op) => {
    if (op.opType === "call") {
      return { type: "CallExpr", callee: acc, arguments: op.args };
    } else if (op.opType === "member") {
      return { type: "MemberExpr", object: acc, property: op.property };
    } else if (op.opType === "index") {
      return { type: "IndexExpr", object: acc, index: op.index };
    }
    return acc;
  }, object) %}

PostfixOperation ->
    CallArguments
  | MemberAccess
  | ArrayIndex

CallArguments -> _ "(" OptionalArgList ")" {% 
  ([, , args]) => ({ opType: "call", args: args })
%}

OptionalArgList -> ArgList {% id %} | null {% () => [] %}

MemberAccess -> _ "." _ identifier {% 
  ([, , , id]) => ({ opType: "member", property: id })
%}

ArrayIndex -> _ "[" _ Expression _ "]" {% 
  ([, , , expr,]) => ({ opType: "index", index: expr })
%}

ArgList -> Expression ("," _ Expression):* {% ([first, rest]) => [first, ...rest.map(([, , e]) => e)] %}

Primary ->
    number
| float
| string
| boolean
| null
| identifier
| ArrayLiteral
| StructLiteral
| "(" _ Expression _ ")" {% ([, , expr]) => expr %}

ArrayLiteral -> "[" _ OptionalExpressionList _ "]" {% 
  ([, , exprList]) => ({ type: "ArrayLiteral", elements: exprList })
%}
OptionalExpressionList -> ExpressionList {% id %} | null {% () => [] %}
ExpressionList -> Expression ("," _ Expression):* {% ([first, rest]) => [first, ...rest.map(([, , e]) => e)] %}

StructLiteral -> identifier _ "{" _ OptionalStructLiteralFields _ "}" {% 
  ([id, , , , fields]) => ({ type: "StructLiteral", id, fields: fields })
%}
OptionalStructLiteralFields -> StructLiteralFields {% id %} | null {% () => [] %}
StructLiteralFields -> StructLiteralField ("," _ StructLiteralField):* {% ([first, rest]) => [first, ...rest.map(([, , f]) => f)] %}
StructLiteralField -> identifier _ ":" _ Expression {% 
  ([id, , , , expr]) => ({ id, expr }) 
%}

Type -> "int" | "float" | "string" | "bool" | ArrayType | PointerType | StructType
ArrayType -> Type _ "[]" {% ([type]) => ({ type: "ArrayType", baseType: type }) %}
PointerType -> "*" _ Type {% ([, , type]) => ({ type: "PointerType", baseType: type }) %}
StructType -> identifier

boolean -> "true" {% ([d]) => ({ type: "Literal", value: true, raw: d.value }) %} | "false" {% ([d]) => ({ type: "Literal", value: false, raw: d.value }) %}
null -> "null" {% ([d]) => ({ type: "Literal", value: null, raw: d.value }) %}

identifier -> %identifier {% ([d]) => ({ type: "Identifier", name: d.value }) %}
number -> %number {% ([d]) => ({ type: "Literal", value: Number(d.value), raw: d.value }) %}
float -> %float {% ([d]) => ({ type: "Literal", value: Number(d.value), raw: d.value }) %}
string -> %string {% ([d]) => ({ type: "Literal", value: d.value.slice(1, -1), raw: d.value }) %}

_ -> (%whitespace | %newline):*
NEWLINE_TOKEN -> %newline+
