// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require("moo");
const lexer = require("../lexer").lexer;
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "Program", "symbols": ["_", "StatementList", "_"]},
    {"name": "StatementList$ebnf$1", "symbols": ["StatementListItem"]},
    {"name": "StatementList$ebnf$1", "symbols": ["StatementList$ebnf$1", "StatementListItem"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "StatementList", "symbols": ["StatementList$ebnf$1"]},
    {"name": "StatementListItem", "symbols": ["Statement", "NEWLINE_TOKEN"]},
    {"name": "Statement", "symbols": ["VarDecl"]},
    {"name": "Statement", "symbols": ["FuncDecl"]},
    {"name": "Statement", "symbols": ["StructDecl"]},
    {"name": "Statement", "symbols": ["PrintStmt"]},
    {"name": "Statement", "symbols": ["InputStmt"]},
    {"name": "Statement", "symbols": ["ReturnStmt"]},
    {"name": "Statement", "symbols": ["IfStmt"]},
    {"name": "Statement", "symbols": ["WhileStmt"]},
    {"name": "Statement", "symbols": ["ExprStmt"]},
    {"name": "VarDecl", "symbols": [{"literal":"let"}, "_", "identifier", "_", {"literal":":"}, "_", "Type", "_", {"literal":"="}, "_", "Expression", "_", {"literal":";"}], "postprocess":  
        ([, , id, , , , type, , , , expr]) => ({ type: "VarDecl", id, varType: type, expr }) 
        },
    {"name": "FuncDecl", "symbols": [{"literal":"fn"}, "_", "identifier", "_", {"literal":"("}, "OptionalParamList", {"literal":")"}, "_", {"literal":":"}, "_", "Type", "_", {"literal":"{"}, "_", "StatementList", "_", {"literal":"}"}], "postprocess":  
        ([, , id, , , params, , , , type, , , , stmts]) => ({ type: "FuncDecl", id, params: params, returnType: type, body: stmts }) 
        },
    {"name": "OptionalParamList", "symbols": ["ParamList"], "postprocess": id},
    {"name": "OptionalParamList", "symbols": [], "postprocess": () => []},
    {"name": "ParamList", "symbols": ["Param", "ParamListRest"], "postprocess": 
        ([first, rest]) => [first, ...rest]
        },
    {"name": "ParamListRest", "symbols": [{"literal":","}, "_", "Param", "ParamListRest"], "postprocess": ([, , param, rest]) => [param, ...rest]},
    {"name": "ParamListRest", "symbols": [], "postprocess": data => []},
    {"name": "Param", "symbols": ["identifier", "_", {"literal":":"}, "_", "Type"], "postprocess":  
        ([id, , , , type]) => ({ id, type }) 
        },
    {"name": "StructDecl", "symbols": [{"literal":"struct"}, "_", "identifier", "_", {"literal":"{"}, "_", "StructFieldList", "_", {"literal":"}"}], "postprocess":  
        ([, , id, , , fields]) => ({ type: "StructDecl", id, fields }) 
        },
    {"name": "StructFieldList", "symbols": ["StructField", "RestOfStructFields"], "postprocess": 
        ([sf, rsf_array]) => [sf, ...rsf_array]
        },
    {"name": "RestOfStructFields", "symbols": ["NEWLINE_TOKEN", "StructField", "RestOfStructFields"], "postprocess": 
        ([, sf, more_sf]) => [sf, ...more_sf]
        },
    {"name": "RestOfStructFields", "symbols": [], "postprocess": () => []},
    {"name": "StructField", "symbols": ["identifier", "_", {"literal":":"}, "_", "Type", "_", {"literal":";"}], "postprocess":  
        ([id, , , , type]) => ({ id, type }) 
        },
    {"name": "PrintStmt", "symbols": [{"literal":"print"}, "_", {"literal":"("}, "_", "Expression", "_", {"literal":")"}, "_", {"literal":";"}], "postprocess":  
        ([, , , , expr]) => ({ type: "PrintStmt", expr }) 
        },
    {"name": "InputStmt", "symbols": [{"literal":"input"}, "_", {"literal":"("}, "_", "string", "_", {"literal":")"}, "_", {"literal":";"}], "postprocess":  
        ([, , , , prompt]) => ({ type: "InputStmt", prompt }) 
        },
    {"name": "ReturnStmt", "symbols": [{"literal":"return"}, "_", "OptionalExpression", "_", {"literal":";"}], "postprocess":  
        ([, expr]) => ({ type: "ReturnStmt", expr: expr }) 
        },
    {"name": "OptionalExpression", "symbols": ["Expression"], "postprocess": id},
    {"name": "OptionalExpression", "symbols": [], "postprocess": () => null},
    {"name": "IfStmt", "symbols": [{"literal":"if"}, "_", {"literal":"("}, "_", "Expression", "_", {"literal":")"}, "_", {"literal":"{"}, "_", "StatementList", "_", {"literal":"}"}, "OptionalElseIfClauses", "OptionalElseClause"], "postprocess":  
        ([, , , , cond, , , , thenStmts, elseIfs, elseClause]) => ({
          type: "IfStmt", cond, then: thenStmts, elseIfs: elseIfs, else: elseClause
        }) 
        },
    {"name": "OptionalElseIfClauses", "symbols": ["ElseIfClause", "OptionalElseIfClauses"], "postprocess": (d) => [d[0], ...d[1]]},
    {"name": "OptionalElseIfClauses", "symbols": [], "postprocess": () => []},
    {"name": "ElseIfClause", "symbols": ["_", {"literal":"else"}, "_", {"literal":"if"}, "_", {"literal":"("}, "_", "Expression", "_", {"literal":")"}, "_", {"literal":"{"}, "_", "StatementList", "_", {"literal":"}"}], "postprocess":  
        ([, , , , , , cond, , , , stmts]) => ({ cond, then: stmts }) 
        },
    {"name": "OptionalElseClause", "symbols": ["ElseClause"], "postprocess": (d) => d[0]},
    {"name": "OptionalElseClause", "symbols": [], "postprocess": () => null},
    {"name": "ElseClause", "symbols": ["_", {"literal":"else"}, "_", {"literal":"{"}, "_", "StatementList", "_", {"literal":"}"}], "postprocess":  
        ([, , , , stmts]) => stmts 
        },
    {"name": "WhileStmt", "symbols": [{"literal":"while"}, "_", {"literal":"("}, "_", "Expression", "_", {"literal":")"}, "_", {"literal":"{"}, "_", "StatementList", "_", {"literal":"}"}], "postprocess":  
        ([, , , , cond, , , , stmts]) => ({ type: "WhileStmt", cond, body: stmts }) 
        },
    {"name": "ExprStmt", "symbols": ["Expression", "_", {"literal":";"}], "postprocess":  
        ([expr]) => ({ type: "ExprStmt", expr }) 
        },
    {"name": "Expression", "symbols": ["Assignment"]},
    {"name": "Assignment", "symbols": ["LogicOr", "OptionalAssignment"], "postprocess":  
        ([left, right]) => right ? ({ type: "Assignment", operator: right.op, left, right: right.expr }) : left 
        },
    {"name": "OptionalAssignment", "symbols": ["assignOp", "_", "Assignment"], "postprocess": ([op, , expr]) => ({op, expr})},
    {"name": "OptionalAssignment", "symbols": [], "postprocess": () => null},
    {"name": "assignOp", "symbols": [{"literal":"="}]},
    {"name": "LogicOr$ebnf$1", "symbols": []},
    {"name": "LogicOr$ebnf$1$subexpression$1", "symbols": ["orOp", "_", "LogicAnd"]},
    {"name": "LogicOr$ebnf$1", "symbols": ["LogicOr$ebnf$1", "LogicOr$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "LogicOr", "symbols": ["LogicAnd", "LogicOr$ebnf$1"], "postprocess": ([first, rest]) => rest.reduce((acc, [op, , right]) => ({ type: "LogicalExpr", op, left: acc, right }), first)},
    {"name": "orOp", "symbols": [{"literal":"||"}]},
    {"name": "LogicAnd$ebnf$1", "symbols": []},
    {"name": "LogicAnd$ebnf$1$subexpression$1", "symbols": ["andOp", "_", "Equality"]},
    {"name": "LogicAnd$ebnf$1", "symbols": ["LogicAnd$ebnf$1", "LogicAnd$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "LogicAnd", "symbols": ["Equality", "LogicAnd$ebnf$1"], "postprocess": ([first, rest]) => rest.reduce((acc, [op, , right]) => ({ type: "LogicalExpr", op, left: acc, right }), first)},
    {"name": "andOp", "symbols": [{"literal":"&&"}]},
    {"name": "Equality$ebnf$1", "symbols": []},
    {"name": "Equality$ebnf$1$subexpression$1$subexpression$1", "symbols": ["eqOp"]},
    {"name": "Equality$ebnf$1$subexpression$1$subexpression$1", "symbols": ["neqOp"]},
    {"name": "Equality$ebnf$1$subexpression$1", "symbols": ["Equality$ebnf$1$subexpression$1$subexpression$1", "_", "Relational"]},
    {"name": "Equality$ebnf$1", "symbols": ["Equality$ebnf$1", "Equality$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Equality", "symbols": ["Relational", "Equality$ebnf$1"], "postprocess": ([first, rest]) => rest.reduce((acc, [op, , right]) => ({ type: "BinaryExpr", op, left: acc, right }), first)},
    {"name": "eqOp", "symbols": [{"literal":"=="}]},
    {"name": "neqOp", "symbols": [{"literal":"!="}]},
    {"name": "Relational$ebnf$1", "symbols": []},
    {"name": "Relational$ebnf$1$subexpression$1$subexpression$1", "symbols": ["ltOp"]},
    {"name": "Relational$ebnf$1$subexpression$1$subexpression$1", "symbols": ["lteOp"]},
    {"name": "Relational$ebnf$1$subexpression$1$subexpression$1", "symbols": ["gtOp"]},
    {"name": "Relational$ebnf$1$subexpression$1$subexpression$1", "symbols": ["gteOp"]},
    {"name": "Relational$ebnf$1$subexpression$1", "symbols": ["Relational$ebnf$1$subexpression$1$subexpression$1", "_", "AddSub"]},
    {"name": "Relational$ebnf$1", "symbols": ["Relational$ebnf$1", "Relational$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Relational", "symbols": ["AddSub", "Relational$ebnf$1"], "postprocess": ([first, rest]) => rest.reduce((acc, [op, , right]) => ({ type: "BinaryExpr", op, left: acc, right }), first)},
    {"name": "ltOp", "symbols": [{"literal":"<"}]},
    {"name": "lteOp", "symbols": [{"literal":"<="}]},
    {"name": "gtOp", "symbols": [{"literal":">"}]},
    {"name": "gteOp", "symbols": [{"literal":">="}]},
    {"name": "AddSub$ebnf$1", "symbols": []},
    {"name": "AddSub$ebnf$1$subexpression$1$subexpression$1", "symbols": ["plusOp"]},
    {"name": "AddSub$ebnf$1$subexpression$1$subexpression$1", "symbols": ["minusOp"]},
    {"name": "AddSub$ebnf$1$subexpression$1", "symbols": ["AddSub$ebnf$1$subexpression$1$subexpression$1", "_", "MulDiv"]},
    {"name": "AddSub$ebnf$1", "symbols": ["AddSub$ebnf$1", "AddSub$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "AddSub", "symbols": ["MulDiv", "AddSub$ebnf$1"], "postprocess": ([first, rest]) => rest.reduce((acc, [op, , right]) => ({ type: "BinaryExpr", op, left: acc, right }), first)},
    {"name": "plusOp", "symbols": [{"literal":"+"}]},
    {"name": "minusOp", "symbols": [{"literal":"-"}]},
    {"name": "MulDiv$ebnf$1", "symbols": []},
    {"name": "MulDiv$ebnf$1$subexpression$1$subexpression$1", "symbols": ["timesOp"]},
    {"name": "MulDiv$ebnf$1$subexpression$1$subexpression$1", "symbols": ["divideOp"]},
    {"name": "MulDiv$ebnf$1$subexpression$1$subexpression$1", "symbols": ["modOp"]},
    {"name": "MulDiv$ebnf$1$subexpression$1", "symbols": ["MulDiv$ebnf$1$subexpression$1$subexpression$1", "_", "Unary"]},
    {"name": "MulDiv$ebnf$1", "symbols": ["MulDiv$ebnf$1", "MulDiv$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "MulDiv", "symbols": ["Unary", "MulDiv$ebnf$1"], "postprocess": ([first, rest]) => rest.reduce((acc, [op, , right]) => ({ type: "BinaryExpr", op, left: acc, right }), first)},
    {"name": "timesOp", "symbols": [{"literal":"*"}]},
    {"name": "divideOp", "symbols": [{"literal":"/"}]},
    {"name": "modOp", "symbols": [{"literal":"%"}]},
    {"name": "Unary$subexpression$1", "symbols": ["notOp"]},
    {"name": "Unary$subexpression$1", "symbols": ["ampOp"]},
    {"name": "Unary$subexpression$1", "symbols": ["starOp"]},
    {"name": "Unary", "symbols": ["Unary$subexpression$1", "_", "Unary"], "postprocess":  
        ([op, , expr]) => ({ type: "UnaryExpr", op: op[0], argument: expr }) 
        },
    {"name": "Unary", "symbols": ["AccessOrCallChain"]},
    {"name": "notOp", "symbols": [{"literal":"!"}]},
    {"name": "ampOp", "symbols": [{"literal":"&"}]},
    {"name": "starOp", "symbols": [{"literal":"*"}]},
    {"name": "AccessOrCallChain$ebnf$1", "symbols": []},
    {"name": "AccessOrCallChain$ebnf$1$subexpression$1", "symbols": ["PostfixOperation"]},
    {"name": "AccessOrCallChain$ebnf$1", "symbols": ["AccessOrCallChain$ebnf$1", "AccessOrCallChain$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "AccessOrCallChain", "symbols": ["Primary", "AccessOrCallChain$ebnf$1"], "postprocess":  
        ([object, operations]) => operations.reduce((acc, op) => {
          if (op.opType === "call") {
            return { type: "CallExpr", callee: acc, arguments: op.args };
          } else if (op.opType === "member") {
            return { type: "MemberExpr", object: acc, property: op.property };
          } else if (op.opType === "index") {
            return { type: "IndexExpr", object: acc, index: op.index };
          }
          return acc;
        }, object) },
    {"name": "PostfixOperation", "symbols": ["CallArguments"]},
    {"name": "PostfixOperation", "symbols": ["MemberAccess"]},
    {"name": "PostfixOperation", "symbols": ["ArrayIndex"]},
    {"name": "CallArguments", "symbols": ["_", {"literal":"("}, "OptionalArgList", {"literal":")"}], "postprocess":  
        ([, , args]) => ({ opType: "call", args: args })
        },
    {"name": "OptionalArgList", "symbols": ["ArgList"], "postprocess": id},
    {"name": "OptionalArgList", "symbols": [], "postprocess": () => []},
    {"name": "MemberAccess", "symbols": ["_", {"literal":"."}, "_", "identifier"], "postprocess":  
        ([, , , id]) => ({ opType: "member", property: id })
        },
    {"name": "ArrayIndex", "symbols": ["_", {"literal":"["}, "_", "Expression", "_", {"literal":"]"}], "postprocess":  
        ([, , , expr,]) => ({ opType: "index", index: expr })
        },
    {"name": "ArgList$ebnf$1", "symbols": []},
    {"name": "ArgList$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "_", "Expression"]},
    {"name": "ArgList$ebnf$1", "symbols": ["ArgList$ebnf$1", "ArgList$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ArgList", "symbols": ["Expression", "ArgList$ebnf$1"], "postprocess": ([first, rest]) => [first, ...rest.map(([, , e]) => e)]},
    {"name": "Primary", "symbols": ["number"]},
    {"name": "Primary", "symbols": ["float"]},
    {"name": "Primary", "symbols": ["string"]},
    {"name": "Primary", "symbols": ["boolean"]},
    {"name": "Primary", "symbols": []},
    {"name": "Primary", "symbols": ["identifier"]},
    {"name": "Primary", "symbols": ["ArrayLiteral"]},
    {"name": "Primary", "symbols": ["StructLiteral"]},
    {"name": "Primary", "symbols": [{"literal":"("}, "_", "Expression", "_", {"literal":")"}], "postprocess": ([, , expr]) => expr},
    {"name": "ArrayLiteral", "symbols": [{"literal":"["}, "_", "OptionalExpressionList", "_", {"literal":"]"}], "postprocess":  
        ([, , exprList]) => ({ type: "ArrayLiteral", elements: exprList })
        },
    {"name": "OptionalExpressionList", "symbols": ["ExpressionList"], "postprocess": id},
    {"name": "OptionalExpressionList", "symbols": [], "postprocess": () => []},
    {"name": "ExpressionList$ebnf$1", "symbols": []},
    {"name": "ExpressionList$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "_", "Expression"]},
    {"name": "ExpressionList$ebnf$1", "symbols": ["ExpressionList$ebnf$1", "ExpressionList$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ExpressionList", "symbols": ["Expression", "ExpressionList$ebnf$1"], "postprocess": ([first, rest]) => [first, ...rest.map(([, , e]) => e)]},
    {"name": "StructLiteral", "symbols": ["identifier", "_", {"literal":"{"}, "_", "OptionalStructLiteralFields", "_", {"literal":"}"}], "postprocess":  
        ([id, , , , fields]) => ({ type: "StructLiteral", id, fields: fields })
        },
    {"name": "OptionalStructLiteralFields", "symbols": ["StructLiteralFields"], "postprocess": id},
    {"name": "OptionalStructLiteralFields", "symbols": [], "postprocess": () => []},
    {"name": "StructLiteralFields$ebnf$1", "symbols": []},
    {"name": "StructLiteralFields$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "_", "StructLiteralField"]},
    {"name": "StructLiteralFields$ebnf$1", "symbols": ["StructLiteralFields$ebnf$1", "StructLiteralFields$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "StructLiteralFields", "symbols": ["StructLiteralField", "StructLiteralFields$ebnf$1"], "postprocess": ([first, rest]) => [first, ...rest.map(([, , f]) => f)]},
    {"name": "StructLiteralField", "symbols": ["identifier", "_", {"literal":":"}, "_", "Expression"], "postprocess":  
        ([id, , , , expr]) => ({ id, expr }) 
        },
    {"name": "Type", "symbols": [{"literal":"int"}]},
    {"name": "Type", "symbols": [{"literal":"float"}]},
    {"name": "Type", "symbols": [{"literal":"string"}]},
    {"name": "Type", "symbols": [{"literal":"bool"}]},
    {"name": "Type", "symbols": ["ArrayType"]},
    {"name": "Type", "symbols": ["PointerType"]},
    {"name": "Type", "symbols": ["StructType"]},
    {"name": "ArrayType", "symbols": ["Type", "_", {"literal":"[]"}], "postprocess": ([type]) => ({ type: "ArrayType", baseType: type })},
    {"name": "PointerType", "symbols": [{"literal":"*"}, "_", "Type"], "postprocess": ([, , type]) => ({ type: "PointerType", baseType: type })},
    {"name": "StructType", "symbols": ["identifier"]},
    {"name": "boolean", "symbols": [{"literal":"true"}], "postprocess": ([d]) => ({ type: "Literal", value: true, raw: d.value })},
    {"name": "boolean", "symbols": [{"literal":"false"}], "postprocess": ([d]) => ({ type: "Literal", value: false, raw: d.value })},
    {"name": "null", "symbols": [{"literal":"null"}], "postprocess": ([d]) => ({ type: "Literal", value: null, raw: d.value })},
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": ([d]) => ({ type: "Identifier", name: d.value })},
    {"name": "number", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": ([d]) => ({ type: "Literal", value: Number(d.value), raw: d.value })},
    {"name": "float", "symbols": [(lexer.has("float") ? {type: "float"} : float)], "postprocess": ([d]) => ({ type: "Literal", value: Number(d.value), raw: d.value })},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": ([d]) => ({ type: "Literal", value: d.value.slice(1, -1), raw: d.value })},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("whitespace") ? {type: "whitespace"} : whitespace)]},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("newline") ? {type: "newline"} : newline)]},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "_$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "NEWLINE_TOKEN", "symbols": [(lexer.has("newline+") ? {type: "newline+"} : newline+)]}
]
  , ParserStart: "Program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
