const db = require("../config");
const request = require("supertest");
const app = require("../app");

//simple test for jest
test("It adds two numbers", () => {
    expect(1 + 1).toBe(2);
  });


  beforeAll(async () => {
    await db.query("CREATE TABLE students  (id SERIAL PRIMARY KEY, name TEXT)");
  });
  
  beforeEach(async () => {
    await db.query("INSERT INTO students (name) VALUES ('Okpo'), ('Doe')");
  });
  
  afterEach(async () => {
    await db.query("DELETE FROM students");
  });
  
  afterAll(async () => {
    await db.query("DROP TABLE students");
    db.end();
  });

  describe("GET /students", () => {
    test("It responds with an array of students", async () => {
      const response = await request(app)
      .get("/students");
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("name");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("POST /students", () => {
    test("It responds with the newly created student", async () => {
      const newStudent = await request(app)
        .post("/students")
        .send({
          name: "Jane"
        });
  
      expect(newStudent.body).toHaveProperty("id");
      expect(newStudent.body.name).toBe("Jane");
      expect(newStudent.statusCode).toBe(200);

      const response = await request(app)
      .get("/students");
      expect(response.body.length).toBe(3);
    });
  });

  describe("PATCH /students/1", () => {
    test("It responds with an updated student", async () => {
      const newStudent = await request(app)
        .post("/students")
        .send({
          name: "Emeka Ogar"
        });
      const updatedStudent = await request(app)
        .patch(`/students/${newStudent.body.id}`)
        .send({ name: "updated" });
      expect(updatedStudent.body.name).toBe("updated");
      expect(updatedStudent.body).toHaveProperty("id");
      expect(updatedStudent.statusCode).toBe(200);
  
      const response = await request(app).get("/students");
      expect(response.body.length).toBe(3);
    });
  });

  describe("DELETE /students/1", () => {
    test("It responds with a message of Deleted", async () => {
      const newStudent = await request(app)
        .post("/students")
        .send({
          name: "Emeka Ogar"
        });
      const removedStudent = await request(app)
      .delete(`/students/${newStudent.body.id}`);
      expect(removedStudent.body).toEqual({ message: "Deleted" });
      expect(removedStudent.statusCode).toBe(200);
  
      const response = await request(app)
      .get("/students");
      expect(response.body.length).toBe(2);
    });
  });