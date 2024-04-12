// function parseQuery(query) {
//     const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
//     const match = query.match(selectRegex);

//     if (match) {
//         const [, fields, table, whereString] = match;
//         const whereClauses = whereString ? parseWhereClause(whereString) : [];
//         return {
//             fields: fields.split(",").map((field) => field.trim()),
//             table: table.trim(),
//             whereClauses: whereClauses.length > 0 ? whereClauses[0] : null,
//         };
//     } else {
//         throw new Error("Invalid query format");
//     }
// }

// function parseWhereClause(whereString) {
//     const conditions = whereString.split(/ AND | OR /i);
//     return conditions.map((condition) => {
//         const parts = condition.split(/\s+/);
//         if (parts.length !== 3) {
//             throw new Error("Invalid WHERE clause format");
//         }
//         const [field, operator, ...valueParts] = parts;
//         const value = valueParts.join(" ");
//         return { field, operator, value };
//     });
// }

// module.exports = parseQuery;
function parseQuery(query) {
    const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
    const match = query.match(selectRegex);

    if (match) {
        const [, fields, table, whereString] = match;
        const whereClauses = whereString ? parseWhereClause(whereString) : [];
        return {
            fields: fields.split(",").map((field) => field.trim()),
            table: table.trim(),
            whereClauses: whereClauses,
        };
    } else {
        throw new Error("Invalid query format");
    }
}

// function parseWhereClause(whereString) {
//     const conditionRegex =
//         /(?:\s+)?(AND|OR)?(?:\s+)?([^=<>!]+?)([=<>!]{1,2})\s*(["'].*?["']|\d+|\d*\.\d+|\w+)/gi;
//     const conditions = [];
//     let match;

//     while ((match = conditionRegex.exec(whereString)) !== null) {
//         const [, logicalOp, field, operator, value] = match;
//         conditions.push({
//             logicalOp: logicalOp ? logicalOp.trim() : null,
//             field: field.trim(),
//             operator: operator.trim(),
//             value: value.trim().replace(/^["']|["']$/g, ""), // Remove surrounding quotes from values
//         });
//     }

//     return conditions;
// }
function parseWhereClause(whereString) {
    const conditionRegex = /(.*?)(=|!=|>|<|>=|<=)(.*)/;
    return whereString.split(/ AND | OR /i).map((conditionString) => {
        const match = conditionString.match(conditionRegex);
        if (match) {
            const [, field, operator, value] = match;
            return { field: field.trim(), operator, value: value.trim() };
        }
        throw new Error("Invalid WHERE clause format");
    });
}

module.exports = parseQuery;
