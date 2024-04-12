test("Basic Jest Test", () => {
    expect(1).toBe(1);
});
const readCSV = require("../csvReader");

test("Read CSV File", async () => {
    const data = await readCSV("./sample.csv");
    expect(data.length).toBeGreaterThan(0);
    expect(data.length).toBe(3);
    expect(data[0].name).toBe("John");
    expect(data[0].age).toBe("30");
});

const parseQuery = require("../queryParser");

test("Parse SQL Query", () => {
    const query = "SELECT id, name FROM sample";
    const parsed = parseQuery(query);
    expect(parsed).toEqual({
        fields: ["id", "name"],
        table: "sample",
        whereClauses: [],
    });
});
const executeSELECTQuery = require("../index");

test("Execute SQL Query with WHERE Clause", async () => {
    const query = "SELECT id, name FROM sample WHERE age = 25";
    const result = await executeSELECTQuery(query);
    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("name");
    expect(result[0].id).toBe("2");
});

test("Parse SQL Query with Multiple WHERE Clauses", () => {
    const query = "SELECT id, name FROM sample WHERE age = 30 AND name = John";
    const parsed = parseQuery(query);
    expect(parsed).toEqual({
        fields: ["id", "name"],
        table: "sample",
        whereClauses: [
            {
                field: "age",
                operator: "=",
                value: "30",
            },
            {
                field: "name",
                operator: "=",
                value: "John",
            },
        ],
    });
});

test("Execute SQL Query with Multiple WHERE Clause", async () => {
    const query = "SELECT id, name FROM sample WHERE age = 30 AND name = John";
    const result = await executeSELECTQuery(query);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({ id: "1", name: "John" });
});

test("Execute SQL Query with Greater Than", async () => {
    const queryWithGT = "SELECT id FROM sample WHERE age > 22";
    const result = await executeSELECTQuery(queryWithGT);
    expect(result.length).toEqual(2);
    expect(result[0]).toHaveProperty("id");
});

test("Execute SQL Query with Not Equal to", async () => {
    const queryWithGT = "SELECT name FROM sample WHERE age != 25";
    const result = await executeSELECTQuery(queryWithGT);
    expect(result.length).toEqual(2);
    expect(result[0]).toHaveProperty("name");
});
