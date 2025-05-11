@{%
const moo = require("moo");
const lexer = require("../lexer").lexer;
%}

@lexer lexer

Program -> _ StatementList _

StatementList -> StatementListItem:+
StatementListItem -> Statement NL

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

FuncDecl -> "fn" _ identifier _ "(" ParamList? ")" _ ":" _ Type _ "{" _ StatementList _ "}" {% 
  ([, , id, , , params, , , , type, , , , stmts]) => ({ type: "FuncDecl", id, params: params || [], returnType: type, body: stmts }) 
%}

ParamList -> Param ("," _ Param)* {% 
  ([first, rest]) => [first, ...rest.map(([, , p]) => p)] 
%}
Param -> identifier _ ":" _ Type {% 
  ([id, , , , type]) => ({ id, type }) 
%}

StructDecl -> "struct" _ identifier _ "{" _ StructFieldList _ "}" {% 
  ([, , id, , , fields]) => ({ type: "StructDecl", id, fields }) 
%}
StructFieldList -> StructField (NL StructField)* {% 
  ([first, rest]) => [first, ...rest.map(([, f]) => f)] 
%}
StructField -> identifier _ ":" _ Type _ ";" {% 
  ([id, , , , type]) => ({ id, type }) 
%}

PrintStmt -> "print" _ "(" _ Expression _ ")" _ ";" {% 
  ([, , , , expr]) => ({ type: "PrintStmt", expr }) 
%}

InputStmt -> "input" _ "(" _ string _ ")" _ ";" {% 
  ([, , , , prompt]) => ({ type: "InputStmt", prompt }) 
%}

ReturnStmt -> "return" _ Expression? _ ";" {% 
  ([, expr]) => ({ type: "ReturnStmt", expr: expr || null }) 
%}

IfStmt -> "if" _ "(" _ Expression _ ")" _ "{" _ StatementList _ "}" ElseIfClause* ElseClause? {% 
  ([, , , , cond, , , , thenStmts, elseIfs, elseClause]) => ({
    type: "IfStmt", cond, then: thenStmts, elseIfs, else: elseClause || null
  }) 
%}
ElseIfClause -> _ "else" _ "if" _ "(" _ Expression _ ")" _ "{" _ StatementList _ "}" {% 
  ([, , , , , , cond, , , , stmts]) => ({ cond, then: stmts }) 
%}
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

Assignment -> LogicOr (assignOp _ Assignment)? {% 
  ([left, right]) => right ? ({ type: "Assignment", left, right: right[2] }) : left 
%}
assignOp -> "="

LogicOr -> LogicAnd (orOp _ LogicAnd)* {% 
  ([first, rest]) => rest.reduce((acc, [op, , right]) => ({ type: "LogicalExpr", op, left: acc, right }), first) 
%}
orOp -> "||"

LogicAnd -> Equality (andOp _ Equality)* {% 
  ([first, rest]) => rest.reduce((acc, [op, , right]) => ({ type: "LogicalExpr", op, left: acc, right }), first) 
%}
andOp -> "&&"

Equality -> Relational ((eqOp | neqOp) _ Relational)* {% 
  ([first, rest]) => rest.reduce((acc, [op, , right]) => ({ type: "BinaryExpr", op, left: acc, right }), first) 
%}
eqOp -> "=="
neqOp -> "!="

Relational -> AddSub ((ltOp | lteOp | gtOp | gteOp) _ AddSub)* {% 
  ([first, rest]) => rest.reduce((acc, [op, , right]) => ({ type: "BinaryExpr", op, left: acc, right }), first) 
%}
ltOp -> "<"
lteOp -> "<="
gtOp -> ">"
gteOp -> ">="

AddSub -> MulDiv ((plusOp | minusOp) _ MulDiv)* {% 
  ([first, rest]) => rest.reduce((acc, [op, , right]) => ({ type: "BinaryExpr", op, left: acc, right }), first) 
%}
plusOp -> "+"
minusOp -> "-"

MulDiv -> Unary ((timesOp | divideOp | modOp) _ Unary)* {% 
  ([first, rest]) => rest.reduce((acc, [op, , right]) => ({ type: "BinaryExpr", op, left: acc, right }), first) 
%}
timesOp -> "*"
divideOp -> "/"
modOp -> "%"

Unary -> (notOp | ampOp | starOp) _ Unary {% 
  ([op, , expr]) => ({ type: "UnaryExpr", op, expr }) 
%}
  | Call
notOp -> "!"
ampOp -> "&"
starOp -> "*"

Call -> Primary (CallArgs)* {% 
  ([callee, calls]) => calls.reduce((acc, args) => ({ type: "CallExpr", callee: acc, args }), callee) 
%}
CallArgs -> _ "(" ArgList? ")" {% 
  ([, , args]) => args || [] 
%}
ArgList -> Expression ("," _ Expression)* {% 
  ([first, rest]) => [first, ...rest.map(([, , e]) => e)] 
%}

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

ArrayLiteral -> "[" _ (Expression ("," _ Expression)*)? _ "]" {% 
  ([, , first]) => ({ type: "ArrayLiteral", elements: first ? [first[0], ...first[1].map(([, , e]) => e)] : [] }) 
%}

StructLiteral -> identifier _ "{" _ StructLiteralFields? _ "}" {% 
  ([id, , , , fields]) => ({ type: "StructLiteral", id, fields: fields || [] }) 
%}
StructLiteralFields -> StructLiteralField ("," _ StructLiteralField)* {% 
  ([first, rest]) => [first, ...rest.map(([, , f]) => f)] 
%}
StructLiteralField -> identifier _ ":" _ Expression {% 
  ([id, , , , expr]) => ({ id, expr }) 
%}

Type -> "int" | "float" | "string" | "bool" | ArrayType | PointerType | StructType
ArrayType -> Type "[]" {% ([type]) => ({ type: "ArrayType", base: type }) %}
PointerType -> "*" Type {% ([, type]) => ({ type: "PointerType", base: type }) %}
StructType -> identifier

boolean -> "true" {% () => true %} | "false" {% () => false %}
null -> "null" {% () => null %}

identifier -> %identifier
number -> %number {% d => Number(d[0].value) %}
float -> %float {% d => Number(d[0].value) %}
string -> %string {% d => d[0].value.slice(1, -1) %}

_ -> (%whitespace | %newline)*
NL -> %newline
