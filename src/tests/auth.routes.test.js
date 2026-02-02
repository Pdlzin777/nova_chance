import request from "supertest";
import app from "../index.js";

describe("🔐 Testes de Login", () => {

  it("✅ Login com sucesso", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        email: "empresa@teste.com",
        senha: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("❌ Erro ao logar com senha errada", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        email: "empresa@teste.com",
        senha: "senha_errada"
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });

});
