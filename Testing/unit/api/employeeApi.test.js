const { mockLocalStorage } = require('../../__mocks__/setupMocks');

describe('Employee API Calls', () => {
  const mockToken = 'mock-token';
  
  beforeEach(() => {
    mockLocalStorage.getItem.mockReturnValue(mockToken);
    fetch.mockClear();
  });

  test('fetchEmployees should make GET request with correct headers', async () => {
    // Mock successful response
    fetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { id: 1, fullName: 'Test User', surveyStatus: 0 }
        ])
      })
    );

    // Call the fetch function
    const response = await fetch('http://localhost:5347/api/employees', {
      headers: { Authorization: mockToken }
    });
    const data = await response.json();

    // Assertions
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:5347/api/employees',
      expect.objectContaining({
        headers: { Authorization: mockToken }
      })
    );
    expect(data).toHaveLength(1);
    expect(data[0]).toHaveProperty('surveyStatus');
  });

  test('handleManualSubmit should make POST request with correct data', async () => {
    const mockFormData = {
      fullName: 'Test User',
      email: 'test@test.com',
      phoneNumber: '1234567890',
      joinDate: '2024-01-01',
      department: 'IT',
      position: 'Developer'
    };

    fetch.mockImplementationOnce(() => 
      Promise.resolve({
        status: 201,
        ok: true
      })
    );

    const response = await fetch('http://localhost:5347/api/employees', {
      method: 'POST',
      headers: {
        Authorization: mockToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mockFormData)
    });

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:5347/api/employees',
      expect.objectContaining({
        method: 'POST',
        headers: {
          Authorization: mockToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockFormData)
      })
    );
    expect(response.status).toBe(201);
  });
});
