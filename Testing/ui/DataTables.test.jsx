const React = require('react');
const { render, screen, fireEvent, waitFor } = require('../test-utils');
const { mockLocalStorage } = require('../__mocks__/setupMocks');

// Mock Chakra components
jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useColorModeValue: () => 'gray.700',
}));

// Simple mock declarations
jest.mock('components/Card/Card');
jest.mock('components/Card/CardBody');
jest.mock('components/Card/CardHeader');
jest.mock('components/Tables/SearchTable1');

// Import DataTables after the mocks
const DataTables = require('../../src/views/Applications/DataTables').default;

describe('DataTables Component', () => {
  const mockEmployees = [
    {
      id: 1,
      fullName: 'John Doe',
      email: 'john@example.com',
      joinDate: '2024-01-01',
      department: 'IT',
      position: 'Developer',
      phoneNumber: '1234567890',
      surveyStatus: 0
    }
  ];

  beforeEach(() => {
    fetch.mockClear();
    mockLocalStorage.getItem.mockReturnValue('mock-token');
  });

  test('renders loading state initially', () => {
    render(<DataTables />);
    expect(screen.getByText('Loading employee data…')).toBeInTheDocument();
  });

  test('renders employee table after data is loaded', async () => {
    fetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockEmployees)
      })
    );

    render(<DataTables />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Not Sent')).toBeInTheDocument();
    });
  });

  test('opens add employee modal when "Add Manually" is clicked', async () => {
    render(<DataTables />);
    
    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);
    
    const addManuallyOption = screen.getByText('Add Manually');
    fireEvent.click(addManuallyOption);
    
    expect(screen.getByText('Add New Employee')).toBeInTheDocument();
  });

  test('displays correct survey status colors', async () => {
    const employeesWithDifferentStatuses = [
      { ...mockEmployees[0], surveyStatus: 0 }, // Not Sent
      { ...mockEmployees[0], id: 2, surveyStatus: 1 }, // Pending
      { ...mockEmployees[0], id: 3, surveyStatus: 2 }, // Completed
    ];

    fetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(employeesWithDifferentStatuses)
      })
    );

    render(<DataTables />);

    await waitFor(() => {
      const notSentStatus = screen.getByText('Not Sent');
      const pendingStatus = screen.getByText('Pending');
      const completedStatus = screen.getByText('Completed');

      expect(notSentStatus).toHaveStyle({ backgroundColor: 'var(--chakra-colors-red-100)' });
      expect(pendingStatus).toHaveStyle({ backgroundColor: 'var(--chakra-colors-yellow-100)' });
      expect(completedStatus).toHaveStyle({ backgroundColor: 'var(--chakra-colors-green-100)' });
    });
  });
});
