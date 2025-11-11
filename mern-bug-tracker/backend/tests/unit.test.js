const { validateBugData } = require('../routes/bugs');

describe('Unit Tests', () => {
  describe('validateBugData', () => {
    test('should pass validation for valid data', () => {
      const validData = { title: 'Test Bug', description: 'This is a test bug' };
      expect(() => validateBugData(validData)).not.toThrow();
    });

    test('should throw error for missing title', () => {
      const invalidData = { description: 'This is a test bug' };
      expect(() => validateBugData(invalidData)).toThrow('Title and description are required');
    });

    test('should throw error for missing description', () => {
      const invalidData = { title: 'Test Bug' };
      expect(() => validateBugData(invalidData)).toThrow('Title and description are required');
    });

    test('should throw error for title exceeding max length', () => {
      const invalidData = { title: 'a'.repeat(101), description: 'This is a test bug' };
      expect(() => validateBugData(invalidData)).toThrow('Title or description exceeds maximum length');
    });

    test('should throw error for description exceeding max length', () => {
      const invalidData = { title: 'Test Bug', description: 'a'.repeat(501) };
      expect(() => validateBugData(invalidData)).toThrow('Title or description exceeds maximum length');
    });
  });
});
