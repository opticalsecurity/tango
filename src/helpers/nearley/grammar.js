// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require("moo");
const lexer = require("../lexer").lexer;
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "OptionalLeadingPart", "symbols": ["_", "NL"]},
    {"name": "OptionalLeadingPart", "symbols": []},
    {"name": "OptionalTrailingPart", "symbols": ["_", "NL"]},
    {"name": "OptionalTrailingPart", "symbols": []},
    {"name": "Program", "symbols": ["OptionalLeadingPart", "_", "StatementList", "OptionalTrailingPart", "_"], "postprocess": 
        (data) => {
          return data[2]; // StatementList
        }
        },
    {"name": "StatementList$ebnf$1", "symbols": ["StatementListItem"]},
    {"name": "StatementList$ebnf$1", "symbols": ["StatementList$ebnf$1", "StatementListItem"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "StatementList", "symbols": ["StatementList$ebnf$1"]},
    {"name": "StatementListItem", "symbols": ["Statement", "_", "NL"]},
    {"name": "Statement", "symbols": ["VarDecl"], "postprocess": id},
    {"name": "Statement", "symbols": ["FuncDecl"]},
    {"name": "Statement", "symbols": ["StructDecl"]},
    {"name": "Statement", "symbols": ["PrintStmt"]},
    {"name": "Statement", "symbols": ["InputStmt"]},
    {"name": "Statement", "symbols": ["ReturnStmt"]},
    {"name": "Statement", "symbols": ["IfStmt"]},
    {"name": "Statement", "symbols": ["WhileStmt"]},
    {"name": "Statement", "symbols": ["ExprStmt"]},
    {"name": "VarDecl", "symbols": [(lexer.has("KW_LET") ? {type: "KW_LET"} : KW_LET), "_", "identifier", "_", (lexer.has("assign") ? {type: "assign"} : assign), "_", "Expression", "_", (lexer.has("eol") ? {type: "eol"} : eol)], "postprocess": 
        (d) => {
          return {
            type: "VarDecl",
            id: d[2],       // El token identifier
            varType: null,  // No hay tipo en esta versión simplificada
            expr: d[5]      // El nodo Expression (índice 0:KW_LET, 1:_, 2:id, 3:_, 4:assign, 5:expr)
          };
        }
        },
    {"name": "FuncDecl", "symbols": [(lexer.has("KW_FN") ? {type: "KW_FN"} : KW_FN), "_", "identifier", "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "OptionalParamList", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", (lexer.has("colon") ? {type: "colon"} : colon), "_", "Type", "_", (lexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "StatementList", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess":  
        ([, , id, , , params, , , , type, , , , stmts]) => ({ type: "FuncDecl", id, params: params, returnType: type, body: stmts }) 
        },
    {"name": "OptionalParamList", "symbols": ["ParamList"], "postprocess": id},
    {"name": "OptionalParamList", "symbols": [], "postprocess": () => []},
    {"name": "ParamList", "symbols": ["Param", "ParamListRest"], "postprocess": 
        ([first, rest]) => [first, ...rest]
        },
    {"name": "ParamListRest", "symbols": [(lexer.has("comma") ? {type: "comma"} : comma), "_", "Param", "ParamListRest"], "postprocess": ([, , param, rest]) => [param, ...rest]},
    {"name": "ParamListRest", "symbols": [], "postprocess": data => []},
    {"name": "Param", "symbols": ["identifier", "_", (lexer.has("colon") ? {type: "colon"} : colon), "_", "Type"], "postprocess":  
        ([id, , , , type]) => ({ id, type }) 
        },
    {"name": "StructDecl", "symbols": [(lexer.has("KW_STRUCT") ? {type: "KW_STRUCT"} : KW_STRUCT), "_", "identifier", "_", (lexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "StructFieldList", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess":  
        ([, , id, , , fields]) => ({ type: "StructDecl", id, fields }) 
        },
    {"name": "StructFieldList", "symbols": ["StructField", "RestOfStructFields"], "postprocess":  
        ([sf, rsf_array]) => [sf, ...rsf_array]
        },
    {"name": "RestOfStructFields", "symbols": ["NL", "_", "StructField", "_", "RestOfStructFields"], "postprocess":  
        ([, , sf, , more_sf]) => [sf, ...more_sf]
        },
    {"name": "RestOfStructFields", "symbols": [], "postprocess": () => []},
    {"name": "StructField", "symbols": ["identifier", "_", (lexer.has("colon") ? {type: "colon"} : colon), "_", "Type", "_", (lexer.has("eol") ? {type: "eol"} : eol)], "postprocess":  
        ([id, , , , type]) => ({ id, type }) 
        },
    {"name": "PrintStmt", "symbols": [(lexer.has("IO_PRINT") ? {type: "IO_PRINT"} : IO_PRINT), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "Expression", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", (lexer.has("eol") ? {type: "eol"} : eol)], "postprocess":  
        ([, , , , expr]) => ({ type: "PrintStmt", expr }) 
        },
    {"name": "InputStmt", "symbols": [(lexer.has("IO_INPUT") ? {type: "IO_INPUT"} : IO_INPUT), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", (lexer.has("string") ? {type: "string"} : string), "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", (lexer.has("eol") ? {type: "eol"} : eol)], "postprocess":  
        ([, , , , prompt_token]) => ({ type: "InputStmt", prompt: prompt_token.value.slice(1, -1) }) 
        },
    {"name": "ReturnStmt", "symbols": [(lexer.has("KW_RETURN") ? {type: "KW_RETURN"} : KW_RETURN), "_", "OptionalExpression", "_", (lexer.has("eol") ? {type: "eol"} : eol)], "postprocess":  
        ([, , expr]) => ({ type: "ReturnStmt", expr: expr }) 
        },
    {"name": "OptionalExpression", "symbols": ["Expression"], "postprocess": id},
    {"name": "OptionalExpression", "symbols": [], "postprocess": () => null},
    {"name": "IfStmt", "symbols": [(lexer.has("KW_IF") ? {type: "KW_IF"} : KW_IF), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "Expression", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", (lexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "StatementList", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace), "OptionalElseIfClauses", "OptionalElseClause"], "postprocess":  
        ([, , , , cond, , , , , thenStmts, , elseIfs, elseClause]) => ({
          type: "IfStmt", cond, then: thenStmts, elseIfs: elseIfs, else: elseClause
        }) 
        },
    {"name": "OptionalElseIfClauses", "symbols": ["ElseIfClause", "OptionalElseIfClauses"], "postprocess": (d) => [d[0], ...d[1]]},
    {"name": "OptionalElseIfClauses", "symbols": [], "postprocess": () => []},
    {"name": "ElseIfClause", "symbols": ["_", (lexer.has("KW_ELSE") ? {type: "KW_ELSE"} : KW_ELSE), "_", (lexer.has("KW_IF") ? {type: "KW_IF"} : KW_IF), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "Expression", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", (lexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "StatementList", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess":  
        ([, , , , , , , cond, , , , , stmts]) => ({ cond, then: stmts }) 
        },
    {"name": "OptionalElseClause", "symbols": ["ElseClause"], "postprocess": (d) => d[0]},
    {"name": "OptionalElseClause", "symbols": [], "postprocess": () => null},
    {"name": "ElseClause", "symbols": ["_", (lexer.has("KW_ELSE") ? {type: "KW_ELSE"} : KW_ELSE), "_", (lexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "StatementList", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess":  
        ([, , , , , stmts]) => stmts 
        },
    {"name": "WhileStmt", "symbols": [(lexer.has("KW_WHILE") ? {type: "KW_WHILE"} : KW_WHILE), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "Expression", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", (lexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "StatementList", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess":  
        ([, , , , cond, , , , , stmts]) => ({ type: "WhileStmt", cond, body: stmts }) 
        },
    {"name": "ExprStmt", "symbols": ["Expression", "_", (lexer.has("eol") ? {type: "eol"} : eol)], "postprocess":  
        ([expr]) => ({ type: "ExprStmt", expr }) 
        },
    {"name": "Expression", "symbols": ["Assignment"]},
    {"name": "Assignment", "symbols": ["LogicOr", "OptionalAssignment"], "postprocess":  
        ([left, right_opt]) => right_opt ? ({ type: "Assignment", operator: right_opt.op.value, left, right: right_opt.expr }) : left 
        },
    {"name": "OptionalAssignment", "symbols": ["_", "assignOp", "_", "Assignment"], "postprocess": ([, op, , expr]) => ({op, expr})},
    {"name": "OptionalAssignment", "symbols": [], "postprocess": () => null},
    {"name": "assignOp", "symbols": [(lexer.has("assign") ? {type: "assign"} : assign)]},
    {"name": "LogicOr$ebnf$1", "symbols": []},
    {"name": "LogicOr$ebnf$1$subexpression$1", "symbols": ["_", "orOp", "_", "LogicAnd"]},
    {"name": "LogicOr$ebnf$1", "symbols": ["LogicOr$ebnf$1", "LogicOr$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "LogicOr", "symbols": ["LogicAnd", "LogicOr$ebnf$1"], "postprocess": ([first, rest]) => rest.reduce((acc, [, op, , right]) => ({ type: "LogicalExpr", op: op.value, left: acc, right }), first)},
    {"name": "orOp", "symbols": [(lexer.has("or") ? {type: "or"} : or)]},
    {"name": "LogicAnd$ebnf$1", "symbols": []},
    {"name": "LogicAnd$ebnf$1$subexpression$1", "symbols": ["_", "andOp", "_", "Equality"]},
    {"name": "LogicAnd$ebnf$1", "symbols": ["LogicAnd$ebnf$1", "LogicAnd$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "LogicAnd", "symbols": ["Equality", "LogicAnd$ebnf$1"], "postprocess": ([first, rest]) => rest.reduce((acc, [, op, , right]) => ({ type: "LogicalExpr", op: op.value, left: acc, right }), first)},
    {"name": "andOp", "symbols": [(lexer.has("and") ? {type: "and"} : and)]},
    {"name": "Equality$ebnf$1", "symbols": []},
    {"name": "Equality$ebnf$1$subexpression$1$subexpression$1", "symbols": ["eqOp"]},
    {"name": "Equality$ebnf$1$subexpression$1$subexpression$1", "symbols": ["neqOp"]},
    {"name": "Equality$ebnf$1$subexpression$1", "symbols": ["_", "Equality$ebnf$1$subexpression$1$subexpression$1", "_", "Relational"]},
    {"name": "Equality$ebnf$1", "symbols": ["Equality$ebnf$1", "Equality$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Equality", "symbols": ["Relational", "Equality$ebnf$1"], "postprocess": ([first, rest]) => rest.reduce((acc, [, op, , right]) => ({ type: "BinaryExpr", op: op.value, left: acc, right }), first)},
    {"name": "eqOp", "symbols": [(lexer.has("eq") ? {type: "eq"} : eq)]},
    {"name": "neqOp", "symbols": [(lexer.has("neq") ? {type: "neq"} : neq)]},
    {"name": "Relational$ebnf$1", "symbols": []},
    {"name": "Relational$ebnf$1$subexpression$1$subexpression$1", "symbols": ["ltOp"]},
    {"name": "Relational$ebnf$1$subexpression$1$subexpression$1", "symbols": ["lteOp"]},
    {"name": "Relational$ebnf$1$subexpression$1$subexpression$1", "symbols": ["gtOp"]},
    {"name": "Relational$ebnf$1$subexpression$1$subexpression$1", "symbols": ["gteOp"]},
    {"name": "Relational$ebnf$1$subexpression$1", "symbols": ["_", "Relational$ebnf$1$subexpression$1$subexpression$1", "_", "AddSub"]},
    {"name": "Relational$ebnf$1", "symbols": ["Relational$ebnf$1", "Relational$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Relational", "symbols": ["AddSub", "Relational$ebnf$1"], "postprocess": ([first, rest]) => rest.reduce((acc, [, op, , right]) => ({ type: "BinaryExpr", op: op.value, left: acc, right }), first)},
    {"name": "ltOp", "symbols": [(lexer.has("lt") ? {type: "lt"} : lt)]},
    {"name": "lteOp", "symbols": [(lexer.has("lte") ? {type: "lte"} : lte)]},
    {"name": "gtOp", "symbols": [(lexer.has("gt") ? {type: "gt"} : gt)]},
    {"name": "gteOp", "symbols": [(lexer.has("gte") ? {type: "gte"} : gte)]},
    {"name": "AddSub$ebnf$1", "symbols": []},
    {"name": "AddSub$ebnf$1$subexpression$1$subexpression$1", "symbols": ["plusOp"]},
    {"name": "AddSub$ebnf$1$subexpression$1$subexpression$1", "symbols": ["minusOp"]},
    {"name": "AddSub$ebnf$1$subexpression$1", "symbols": ["_", "AddSub$ebnf$1$subexpression$1$subexpression$1", "_", "MulDiv"]},
    {"name": "AddSub$ebnf$1", "symbols": ["AddSub$ebnf$1", "AddSub$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "AddSub", "symbols": ["MulDiv", "AddSub$ebnf$1"], "postprocess": ([first, rest]) => rest.reduce((acc, [, op, , right]) => ({ type: "BinaryExpr", op: op.value, left: acc, right }), first)},
    {"name": "plusOp", "symbols": [(lexer.has("plus") ? {type: "plus"} : plus)]},
    {"name": "minusOp", "symbols": [(lexer.has("minus") ? {type: "minus"} : minus)]},
    {"name": "MulDiv$ebnf$1", "symbols": []},
    {"name": "MulDiv$ebnf$1$subexpression$1$subexpression$1", "symbols": ["timesOp"]},
    {"name": "MulDiv$ebnf$1$subexpression$1$subexpression$1", "symbols": ["divideOp"]},
    {"name": "MulDiv$ebnf$1$subexpression$1$subexpression$1", "symbols": ["modOp"]},
    {"name": "MulDiv$ebnf$1$subexpression$1", "symbols": ["_", "MulDiv$ebnf$1$subexpression$1$subexpression$1", "_", "Unary"]},
    {"name": "MulDiv$ebnf$1", "symbols": ["MulDiv$ebnf$1", "MulDiv$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "MulDiv", "symbols": ["Unary", "MulDiv$ebnf$1"], "postprocess": ([first, rest]) => rest.reduce((acc, [, op, , right]) => ({ type: "BinaryExpr", op: op.value, left: acc, right }), first)},
    {"name": "timesOp", "symbols": [(lexer.has("times") ? {type: "times"} : times)]},
    {"name": "divideOp", "symbols": [(lexer.has("divide") ? {type: "divide"} : divide)]},
    {"name": "modOp", "symbols": [(lexer.has("mod") ? {type: "mod"} : mod)]},
    {"name": "Unary$subexpression$1", "symbols": ["notOp"]},
    {"name": "Unary$subexpression$1", "symbols": ["ampOp"]},
    {"name": "Unary$subexpression$1", "symbols": ["starOp"]},
    {"name": "Unary", "symbols": ["Unary$subexpression$1", "_", "Unary"], "postprocess":  
        ([op_arr, , expr]) => ({ type: "UnaryExpr", op: op_arr[0].value, argument: expr }) 
        },
    {"name": "Unary", "symbols": ["AccessOrCallChain"]},
    {"name": "notOp", "symbols": [(lexer.has("not") ? {type: "not"} : not)]},
    {"name": "ampOp", "symbols": [(lexer.has("ampersand") ? {type: "ampersand"} : ampersand)]},
    {"name": "starOp", "symbols": [(lexer.has("times") ? {type: "times"} : times)]},
    {"name": "AccessOrCallChain$ebnf$1", "symbols": []},
    {"name": "AccessOrCallChain$ebnf$1$subexpression$1", "symbols": ["PostfixOperation"]},
    {"name": "AccessOrCallChain$ebnf$1", "symbols": ["AccessOrCallChain$ebnf$1", "AccessOrCallChain$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "AccessOrCallChain", "symbols": ["Primary", "AccessOrCallChain$ebnf$1"], "postprocess":  
        ([object, operations]) => operations.reduce((acc, op_spec) => {
          if (op_spec.opType === "call") {
            return { type: "CallExpr", callee: acc, arguments: op_spec.args };
          } else if (op_spec.opType === "member") {
            return { type: "MemberExpr", object: acc, property: op_spec.property };
          } else if (op_spec.opType === "index") {
            return { type: "IndexExpr", object: acc, index: op_spec.index };
          }
          return acc;
        }, object) },
    {"name": "PostfixOperation", "symbols": ["CallArguments"]},
    {"name": "PostfixOperation", "symbols": ["MemberAccess"]},
    {"name": "PostfixOperation", "symbols": ["ArrayIndex"]},
    {"name": "CallArguments", "symbols": ["_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "OptionalArgList", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess":  
        ([, , args]) => ({ opType: "call", args: args })
        },
    {"name": "OptionalArgList", "symbols": ["ArgList"], "postprocess": id},
    {"name": "OptionalArgList", "symbols": [], "postprocess": () => []},
    {"name": "MemberAccess", "symbols": ["_", (lexer.has("dot") ? {type: "dot"} : dot), "_", "identifier"], "postprocess":  
        ([, , , id]) => ({ opType: "member", property: id })
        },
    {"name": "ArrayIndex", "symbols": ["_", (lexer.has("lbracket") ? {type: "lbracket"} : lbracket), "_", "Expression", "_", (lexer.has("rbracket") ? {type: "rbracket"} : rbracket)], "postprocess":  
        ([, , , expr,]) => ({ opType: "index", index: expr })
        },
    {"name": "ArgList$ebnf$1", "symbols": []},
    {"name": "ArgList$ebnf$1$subexpression$1", "symbols": [(lexer.has("comma") ? {type: "comma"} : comma), "_", "Expression"]},
    {"name": "ArgList$ebnf$1", "symbols": ["ArgList$ebnf$1", "ArgList$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ArgList", "symbols": ["Expression", "ArgList$ebnf$1"], "postprocess": ([first, rest]) => [first, ...rest.map(([, , e]) => e)]},
    {"name": "Primary", "symbols": ["number"]},
    {"name": "Primary", "symbols": ["float"]},
    {"name": "Primary", "symbols": ["string"]},
    {"name": "Primary", "symbols": ["boolean"]},
    {"name": "Primary", "symbols": ["null_keyword"]},
    {"name": "Primary", "symbols": ["identifier"]},
    {"name": "Primary", "symbols": ["ArrayLiteral"]},
    {"name": "Primary", "symbols": ["StructLiteral"]},
    {"name": "Primary", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "Expression", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": ([, , expr]) => expr},
    {"name": "ArrayLiteral", "symbols": [(lexer.has("lbracket") ? {type: "lbracket"} : lbracket), "_", "OptionalExpressionList", "_", (lexer.has("rbracket") ? {type: "rbracket"} : rbracket)], "postprocess":  
        ([, , exprList]) => ({ type: "ArrayLiteral", elements: exprList })
        },
    {"name": "OptionalExpressionList", "symbols": ["ExpressionList"], "postprocess": id},
    {"name": "OptionalExpressionList", "symbols": [], "postprocess": () => []},
    {"name": "ExpressionList$ebnf$1", "symbols": []},
    {"name": "ExpressionList$ebnf$1$subexpression$1", "symbols": [(lexer.has("comma") ? {type: "comma"} : comma), "_", "Expression"]},
    {"name": "ExpressionList$ebnf$1", "symbols": ["ExpressionList$ebnf$1", "ExpressionList$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ExpressionList", "symbols": ["Expression", "ExpressionList$ebnf$1"], "postprocess": ([first, rest]) => [first, ...rest.map(([, , e]) => e)]},
    {"name": "StructLiteral", "symbols": ["identifier", "_", (lexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "OptionalStructLiteralFields", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess":  
        ([id, , , , fields]) => ({ type: "StructLiteral", id, fields: fields })
        },
    {"name": "OptionalStructLiteralFields", "symbols": ["StructLiteralFields"], "postprocess": id},
    {"name": "OptionalStructLiteralFields", "symbols": [], "postprocess": () => []},
    {"name": "StructLiteralFields$ebnf$1", "symbols": []},
    {"name": "StructLiteralFields$ebnf$1$subexpression$1", "symbols": [(lexer.has("comma") ? {type: "comma"} : comma), "_", "StructLiteralField"]},
    {"name": "StructLiteralFields$ebnf$1", "symbols": ["StructLiteralFields$ebnf$1", "StructLiteralFields$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "StructLiteralFields", "symbols": ["StructLiteralField", "StructLiteralFields$ebnf$1"], "postprocess": ([first, rest]) => [first, ...rest.map(([, , f]) => f)]},
    {"name": "StructLiteralField", "symbols": ["identifier", "_", (lexer.has("colon") ? {type: "colon"} : colon), "_", "Expression"], "postprocess":  
        ([id, , , , expr]) => ({ id, expr }) 
        },
    {"name": "Type", "symbols": [(lexer.has("TYPE_INT") ? {type: "TYPE_INT"} : TYPE_INT)]},
    {"name": "Type", "symbols": [(lexer.has("TYPE_FLOAT") ? {type: "TYPE_FLOAT"} : TYPE_FLOAT)]},
    {"name": "Type", "symbols": [(lexer.has("TYPE_STRING") ? {type: "TYPE_STRING"} : TYPE_STRING)]},
    {"name": "Type", "symbols": [(lexer.has("TYPE_BOOL") ? {type: "TYPE_BOOL"} : TYPE_BOOL)]},
    {"name": "Type", "symbols": ["ArrayType"]},
    {"name": "Type", "symbols": ["PointerType"]},
    {"name": "Type", "symbols": ["StructType"]},
    {"name": "ArrayType", "symbols": ["Type", "_", (lexer.has("lbracket") ? {type: "lbracket"} : lbracket), (lexer.has("rbracket") ? {type: "rbracket"} : rbracket)], "postprocess": ([type]) => ({ type: "ArrayType", baseType: type })},
    {"name": "PointerType", "symbols": [(lexer.has("times") ? {type: "times"} : times), "_", "Type"], "postprocess": ([, , type]) => ({ type: "PointerType", baseType: type })},
    {"name": "StructType", "symbols": ["identifier"]},
    {"name": "boolean", "symbols": [(lexer.has("KW_TRUE") ? {type: "KW_TRUE"} : KW_TRUE)], "postprocess": ([d]) => ({ type: "Literal", value: true, raw: d.value })},
    {"name": "boolean", "symbols": [(lexer.has("KW_FALSE") ? {type: "KW_FALSE"} : KW_FALSE)], "postprocess": ([d]) => ({ type: "Literal", value: false, raw: d.value })},
    {"name": "null_keyword", "symbols": [(lexer.has("KW_NULL") ? {type: "KW_NULL"} : KW_NULL)], "postprocess": ([d]) => ({ type: "Literal", value: null, raw: d.value })},
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": ([d]) => ({ type: "Identifier", name: d.value })},
    {"name": "number", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": ([d]) => ({ type: "Literal", value: Number(d.value), raw: d.value })},
    {"name": "float", "symbols": [(lexer.has("float") ? {type: "float"} : float)], "postprocess": ([d]) => ({ type: "Literal", value: Number(d.value), raw: d.value })},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": ([d]) => ({ type: "Literal", value: d.value.slice(1, -1), raw: d.value })},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("whitespace") ? {type: "whitespace"} : whitespace)]},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)]},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "_$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null},
    {"name": "NL$ebnf$1", "symbols": []},
    {"name": "NL$ebnf$1$subexpression$1", "symbols": [(lexer.has("newline") ? {type: "newline"} : newline)]},
    {"name": "NL$ebnf$1", "symbols": ["NL$ebnf$1", "NL$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "NL", "symbols": [(lexer.has("newline") ? {type: "newline"} : newline), "NL$ebnf$1"], "postprocess": () => null}
]
  , ParserStart: "OptionalLeadingPart"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
