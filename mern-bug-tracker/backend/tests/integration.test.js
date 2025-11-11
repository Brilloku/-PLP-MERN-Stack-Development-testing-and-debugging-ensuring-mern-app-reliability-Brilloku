const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Bug = require('../models/Bug');

describe('Integration Tests', () => {
  beforeAll(async () => {
    // Use a separate test database
    const testDB = 'mongodb://localhost:27017/bug-tracker-test';
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(testDB);
    }
  });

  afterAll(async () => {
    // Close database connection
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear database before each test
    await Bug.deleteMany({});
  });

  describe('GET /api/bugs', () => {
    test('should return empty array when no bugs exist', async () => {
      const response = await request(app).get('/api/bugs');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    test('should return all bugs', async () => {
      const bug = new Bug({ title: 'Test Bug', description: 'Test Description' });
      await bug.save();

      const response = await request(app).get('/api/bugs');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe('Test Bug');
    });
  });

  describe('POST /api/bugs', () => {
    test('should create a new bug', async () => {
      const newBug = { title: 'New Bug', description: 'New Description' };

      const response = await request(app).post('/api/bugs').send(newBug);
      expect(response.status).toBe(201);
      expect(response.body.title).toBe('New Bug');
      expect(response.body.status).toBe('open');
    });

    test('should return error for invalid data', async () => {
      const invalidBug = { title: '', description: '' };

      const response = await request(app).post('/api/bugs').send(invalidBug);
      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/bugs/:id', () => {
    test('should update a bug', async () => {
      const bug = new Bug({ title: 'Original Bug', description: 'Original Description' });
      await bug.save();

      const updatedBug = { title: 'Updated Bug', description: 'Updated Description', status: 'resolved' };

      const response = await request(app).put(`/api/bugs/${bug._id}`).send(updatedBug);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Bug');
      expect(response.body.status).toBe('resolved');
    });
  });

  describe('DELETE /api/bugs/:id', () => {
    test('should delete a bug', async () => {
      const bug = new Bug({ title: 'Bug to Delete', description: 'Description' });
      await bug.save();

      const response = await request(app).delete(`/api/bugs/${bug._id}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Bug deleted successfully');

      const deletedBug = await Bug.findById(bug._id);
      expect(deletedBug).toBeNull();
    });
  });
});
