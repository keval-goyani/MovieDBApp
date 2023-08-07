import { jest } from '@jest/globals';

module.exports = {
  PERMISSIONS: jest.fn(),
  check: jest.fn().mockResolvedValue({ status: 'granted' }),
};
