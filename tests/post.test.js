const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

// Bloco que agrupa os testes de Posts
describe('Testes da API de Posts', () => {
  
  // Roda antes de todos os testes começarem
  beforeAll(async () => {
    // Conectamos a um banco de dados de TESTE isolado, para não sujar o banco principal
    await mongoose.connect('mongodb://localhost:27017/blog_db_test');
  });

  // Roda depois de todos os testes terminarem
  afterAll(async () => {
    // Limpa o banco de teste e fecha a conexão para o terminal não travar
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  // Teste 1: Criar um Post
  it('Deve criar uma nova postagem com sucesso', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        title: 'Post de Teste Automatizado',
        content: 'Este post foi gerado pelo Jest',
        author: 'Sistema'
      });

    // Asserções (O que esperamos que aconteça)
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Post de Teste Automatizado');
  });

  // Teste 2: Listar Posts
  it('Deve retornar uma lista de postagens', async () => {
    const res = await request(app).get('/posts');

    expect(res.statusCode).toEqual(200);
    // Verifica se o retorno é um array
    expect(Array.isArray(res.body)).toBeTruthy();
    // Como criamos um post no teste anterior, o array deve ter pelo menos 1 item
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});