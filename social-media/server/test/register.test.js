// Import your User model at the top of your test file.
jest.mock('../models/User'); // Adjust the path accordingly

import { register } from '../controllers/auth';
import User from '../models/User';

describe('User Registration', () => {
  // Mock the User model save method properly
  beforeAll(() => {
    User.prototype.save = jest.fn();
  });

  it('should handle registration errors', async () => {
    // Test error handling scenario with incomplete or invalid data
    const req = {
      body: {
        firstName: 'Invalid', // An example of an invalid value
        lastName: 'Data',
        email: 'invalid-email', // An invalid email address
        password: '123', // A too short password
        picturePath: '', // An empty picture path
        friends: null, // An example of invalid friends data
        location: 'London',
        occupation: 'HR',
        viewedProfile: -1, // Negative value
        impressions: 8773,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User model save method to throw an error
    User.prototype.save.mockRejectedValue(new Error('Registration failed'));

    await register(req, res);

    // Add assertions to check the error response
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Registration failed' });
  });
});

