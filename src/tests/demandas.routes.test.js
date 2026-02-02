import request from "supertest";
import app from "../index.js";

let token;

beforeAll(async () => {
  const login = await request(app)
    .post("/login")
    .send({
      email: "empresa@teste.com",
      senha: "123456"
    });

  token = login.body.token;
});

describe("📦 Testes de Demandas", () => {

  it("✅ Criar demanda com token válido", async () => {
    const res = await request(app)
      .post("/api/demandas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        cargo: "Auxiliar",
        valor: 1200,
        descricao: "Teste",
        usuario_id: 1,
        formacao_id: 1
      });

    expect(res.statusCode).toBe(201);
  });

  it("❌ Erro ao criar demanda sem token", async () => {
    const res = await request(app)
      .post("/api/demandas")
      .send({ cargo: "Auxiliar" });

    expect(res.statusCode).toBe(401);
  });

});
