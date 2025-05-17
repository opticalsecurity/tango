@{%
const moo = require("moo");
const lexer = require("../lexer").lexer;
%}

@lexer lexer

# OptionalLeadingPart -> _ NL | null // Comentado
# OptionalTrailingPart -> _ NL | null // Comentado

# Program -> OptionalLeadingPart _ StatementList OptionalTrailingPart _ {% // Comentado
#  (data) => {
#    return data[2]; // StatementList
#  }
# %}
Program -> Prefix FuncDecl # Usar Prefix para manejar cualquier basura inicial

Prefix -> (PrefixItem):* {% () => null %}
PrefixItem -> _ {% () => null %}
            | NL {% () => null %}

StatementList -> (StatementListItem):* {% 
    // Cero o más StatementListItems
    (d) => {
      if (!d || !d[0]) return []; // Maneja el caso de cero items
      return d[0].map(item => item[0]); // Extrae los statements reales
    }
%}

StatementListItem -> Statement _ NL {% (d) => d[0] %} # Un Statement seguido de NL

Statement -> ReturnStmt # Temporalmente, los cuerpos de las funciones solo pueden tener ReturnStmts
# Statement -> FuncDecl # Comentado para evitar recursión por ahora
# Statement -> VarDecl
# Statement -> PrintStmt
# Statement -> IfStmt
# Statement -> WhileStmt
# Statement -> ForStmt
# Statement -> ReturnStmt
# Statement -> ExpressionStmt
# Statement -> BlockStmt
# Statement -> Assignment
# Statement -> PointerAssignment
# Statement -> ArrayElementAssignment

# La siguiente definición de VarDecl estaba causando un error cuando se comentaba con //
# VarDecl -> %KW_LET _ identifier OptionalTypeAnnotation OptionalInitializer _ %eol {% 
#   (data) => {
#     // ... (contenido anterior de VarDecl)
#     return {
#       type: "VarDecl",
#       id: data[2],
#       varType: data[3],
#       expr: data[4]
#     };
#   }
# %}

OptionalTypeAnnotation -> _ %colon _ Type {% ([, , , type]) => type %} | null {% () => null %}
OptionalInitializer -> _ %assign _ Expression {% ([, , , expr]) => expr %} | null {% () => null %}

# La definición completa de VarDecl se mantiene aquí.
# No será utilizada por 'Statement' mientras esté simplificada,
# pero debería ser sintácticamente correcta para Nearley.
VarDecl -> %KW_LET _ identifier OptionalTypeAnnotation OptionalInitializer _ %eol {%
  (data) => {
    return {
      type: "VarDecl",
      id: data[2],
      varType: data[3],
      expr: data[4]
    };
  }
%}

FuncDecl -> %KW_FN _ identifier _ %lparen OptionalParamList %rparen _ %colon _ Type _ %lbrace _ StatementList _ %rbrace {% 
  ([, , id, , , params, , , , type, , , , stmts]) => ({ type: "FuncDecl", id, params: params, returnType: type, body: stmts }) 
%}

OptionalParamList -> ParamList {% id %} | null {% () => [] %}

ParamList -> Param ParamListRest
{%
  ([first, rest]) => [first, ...rest]
%}

ParamListRest -> %comma _ Param ParamListRest {% ([, , param, rest]) => [param, ...rest] %} | null {% data => [] %}

Param -> identifier _ %colon _ Type {% 
  ([id, , , , type]) => ({ id, type }) 
%}

StructDecl -> %KW_STRUCT _ identifier _ %lbrace _ StructFieldList _ %rbrace {% 
  ([, , id, , , fields]) => ({ type: "StructDecl", id, fields }) 
%}

StructFieldList -> StructField RestOfStructFields {% 
    ([sf, rsf_array]) => [sf, ...rsf_array]
%}

RestOfStructFields -> NL _ StructField _ RestOfStructFields {% 
    ([, , sf, , more_sf]) => [sf, ...more_sf]
%}
| null {% () => [] %}

StructField -> identifier _ %colon _ Type _ %eol {% 
  ([id, , , , type]) => ({ id, type }) 
%}

PrintStmt -> %IO_PRINT _ %lparen _ Expression _ %rparen _ %eol {% 
  ([, , , , expr]) => ({ type: "PrintStmt", expr }) 
%}

InputStmt -> %IO_INPUT _ %lparen _ %string _ %rparen _ %eol {% 
  ([, , , , prompt_token]) => ({ type: "InputStmt", prompt: prompt_token.value.slice(1, -1) }) 
%}

ReturnStmt -> %KW_RETURN _ OptionalExpression _ %eol {% 
  ([, , expr]) => ({ type: "ReturnStmt", expr: expr }) 
%}

OptionalExpression -> Expression {% id %} | null {% () => null %}

IfStmt -> %KW_IF _ %lparen _ Expression _ %rparen _ %lbrace _ StatementList _ %rbrace OptionalElseIfClauses OptionalElseClause {% 
  ([, , , , cond, , , , , thenStmts, , elseIfs, elseClause]) => ({
    type: "IfStmt", cond, then: thenStmts, elseIfs: elseIfs, else: elseClause
  }) 
%}

OptionalElseIfClauses -> ElseIfClause OptionalElseIfClauses {% (d) => [d[0], ...d[1]] %}
                       | null {% () => [] %}

ElseIfClause -> _ %KW_ELSE _ %KW_IF _ %lparen _ Expression _ %rparen _ %lbrace _ StatementList _ %rbrace {% 
  ([, , , , , , , cond, , , , , stmts]) => ({ cond, then: stmts }) 
%}

OptionalElseClause -> ElseClause {% (d) => d[0] %}
                   | null {% () => null %}

ElseClause -> _ %KW_ELSE _ %lbrace _ StatementList _ %rbrace {% 
  ([, , , , , stmts]) => stmts 
%}

WhileStmt -> %KW_WHILE _ %lparen _ Expression _ %rparen _ %lbrace _ StatementList _ %rbrace {% 
  ([, , , , cond, , , , , stmts]) => ({ type: "WhileStmt", cond, body: stmts }) 
%}

ExprStmt -> Expression _ %eol {% 
  ([expr]) => ({ type: "ExprStmt", expr }) 
%}

Expression -> Assignment

Assignment -> LogicOr OptionalAssignment {% 
  ([left, right_opt]) => right_opt ? ({ type: "Assignment", operator: right_opt.op.value, left, right: right_opt.expr }) : left 
%}
OptionalAssignment -> _ assignOp _ Assignment {% ([, op, , expr]) => ({op, expr}) %} | null {% () => null %}

assignOp -> %assign

LogicOr -> LogicAnd ( _ orOp _ LogicAnd):* {% ([first, rest]) => rest.reduce((acc, [, op, , right]) => ({ type: "LogicalExpr", op: op.value, left: acc, right }), first) %}
orOp -> %or

LogicAnd -> Equality ( _ andOp _ Equality):* {% ([first, rest]) => rest.reduce((acc, [, op, , right]) => ({ type: "LogicalExpr", op: op.value, left: acc, right }), first) %}
andOp -> %and

Equality -> Relational ( _ (eqOp | neqOp) _ Relational):* {% ([first, rest]) => rest.reduce((acc, [, op, , right]) => ({ type: "BinaryExpr", op: op.value, left: acc, right }), first) %}
eqOp -> %eq
neqOp -> %neq

Relational -> AddSub ( _ (ltOp | lteOp | gtOp | gteOp) _ AddSub):* {% ([first, rest]) => rest.reduce((acc, [, op, , right]) => ({ type: "BinaryExpr", op: op.value, left: acc, right }), first) %}
ltOp -> %lt
lteOp -> %lte
gtOp -> %gt
gteOp -> %gte

AddSub -> MulDiv ( _ (plusOp | minusOp) _ MulDiv ):* {% ([first, rest]) => rest.reduce((acc, [, op, , right]) => ({ type: "BinaryExpr", op: op.value, left: acc, right }), first) %}
plusOp -> %plus
minusOp -> %minus

MulDiv -> Unary ( _ (timesOp | divideOp | modOp) _ Unary ):* {% ([first, rest]) => rest.reduce((acc, [, op, , right]) => ({ type: "BinaryExpr", op: op.value, left: acc, right }), first) %}
timesOp -> %times
divideOp -> %divide
modOp -> %mod

Unary -> (notOp | ampOp | starOp) _ Unary {% 
  ([op_arr, , expr]) => ({ type: "UnaryExpr", op: op_arr[0].value, argument: expr }) 
%}
| AccessOrCallChain

notOp -> %not
ampOp -> %ampersand
starOp -> %times # Corrected: Should be %times as lexer prioritizes 'times' for '*'

AccessOrCallChain -> Primary (PostfixOperation):* {% 
  ([object, operations]) => operations.reduce((acc, op_spec) => {
    if (op_spec.opType === "call") {
      return { type: "CallExpr", callee: acc, arguments: op_spec.args };
    } else if (op_spec.opType === "member") {
      return { type: "MemberExpr", object: acc, property: op_spec.property };
    } else if (op_spec.opType === "index") {
      return { type: "IndexExpr", object: acc, index: op_spec.index };
    }
    return acc;
  }, object) %}

PostfixOperation ->
    CallArguments
  | MemberAccess
  | ArrayIndex

CallArguments -> _ %lparen OptionalArgList %rparen {% 
  ([, , args]) => ({ opType: "call", args: args })
%}

OptionalArgList -> ArgList {% id %} | null {% () => [] %}

MemberAccess -> _ %dot _ identifier {% 
  ([, , , id]) => ({ opType: "member", property: id })
%}

ArrayIndex -> _ %lbracket _ Expression _ %rbracket {% 
  ([, , , expr,]) => ({ opType: "index", index: expr })
%}

ArgList -> Expression (%comma _ Expression):* {% ([first, rest]) => [first, ...rest.map(([, , e]) => e)] %}

Primary ->
    number
|   float
|   string
|   boolean
|   null_keyword
|   identifier
|   ArrayLiteral
|   StructLiteral
|   %lparen _ Expression _ %rparen {% ([, , expr]) => expr %}

ArrayLiteral -> %lbracket _ OptionalExpressionList _ %rbracket {% 
  ([, , exprList]) => ({ type: "ArrayLiteral", elements: exprList })
%}
OptionalExpressionList -> ExpressionList {% id %} | null {% () => [] %}
ExpressionList -> Expression (%comma _ Expression):* {% ([first, rest]) => [first, ...rest.map(([, , e]) => e)] %}

StructLiteral -> identifier _ %lbrace _ OptionalStructLiteralFields _ %rbrace {% 
  ([id, , , , fields]) => ({ type: "StructLiteral", id, fields: fields })
%}
OptionalStructLiteralFields -> StructLiteralFields {% id %} | null {% () => [] %}
StructLiteralFields -> StructLiteralField (%comma _ StructLiteralField):* {% ([first, rest]) => [first, ...rest.map(([, , f]) => f)] %}
StructLiteralField -> identifier _ %colon _ Expression {% 
  ([id, , , , expr]) => ({ id, expr }) 
%}

Type -> %TYPE_INT | %TYPE_FLOAT | %TYPE_STRING | %TYPE_BOOL | ArrayType | PointerType | StructType
ArrayType -> Type _ %lbracket %rbracket {% ([type]) => ({ type: "ArrayType", baseType: type }) %}
PointerType -> %times _ Type {% ([, , type]) => ({ type: "PointerType", baseType: type }) %} # Corrected: Should be %times
StructType -> identifier

boolean -> %KW_TRUE {% ([d]) => ({ type: "Literal", value: true, raw: d.value }) %} 
         | %KW_FALSE {% ([d]) => ({ type: "Literal", value: false, raw: d.value }) %}
null_keyword -> %KW_NULL {% ([d]) => ({ type: "Literal", value: null, raw: d.value }) %}

identifier -> %identifier {% ([d]) => ({ type: "Identifier", name: d.value }) %}
number -> %number {% ([d]) => ({ type: "Literal", value: Number(d.value), raw: d.value }) %}
float -> %float {% ([d]) => ({ type: "Literal", value: Number(d.value), raw: d.value }) %}
string -> %string {% ([d]) => ({ type: "Literal", value: d.value.slice(1, -1), raw: d.value }) %}

_ -> (%whitespace | %comment):* {% () => null %}
NL -> %newline (%newline):* {% () => null %}
