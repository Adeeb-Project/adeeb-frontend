// Sample data for employee metrics visualization
export const employeeMetricsData = {
  // Quarterly data for the last 4 quarters
  quarterly: {
    labels: ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"],
    turnover: {
      company: [5.2, 4.8, 6.1, 5.5],
      departments: {
        engineering: [4.5, 4.2, 5.8, 4.9],
        marketing: [6.2, 5.9, 7.1, 6.5],
        sales: [5.8, 5.4, 6.5, 5.9],
        hr: [4.2, 3.9, 4.8, 4.1]
      },
      gender: {
        male: [5.4, 5.1, 6.3, 5.7],
        female: [5.0, 4.5, 5.9, 5.3]
      }
    },
    retention: {
      company: [94.8, 95.2, 93.9, 94.5],
      departments: {
        engineering: [95.5, 95.8, 94.2, 95.1],
        marketing: [93.8, 94.1, 92.9, 93.5],
        sales: [94.2, 94.6, 93.5, 94.1],
        hr: [95.8, 96.1, 95.2, 95.9]
      },
      gender: {
        male: [94.6, 94.9, 93.7, 94.3],
        female: [95.0, 95.5, 94.1, 94.7]
      }
    }
  },

  // Yearly data for the last 4 years
  yearly: {
    labels: ["2021", "2022", "2023", "2024"],
    turnover: {
      company: [5.4, 5.1, 4.9, 5.3],
      departments: {
        engineering: [4.8, 4.5, 4.2, 4.6],
        marketing: [6.4, 6.1, 5.8, 6.2],
        sales: [6.0, 5.7, 5.4, 5.8],
        hr: [4.4, 4.1, 3.9, 4.2]
      },
      gender: {
        male: [5.6, 5.3, 5.1, 5.4],
        female: [5.2, 4.9, 4.7, 5.0]
      }
    },
    retention: {
      company: [94.6, 94.9, 95.1, 94.7],
      departments: {
        engineering: [95.2, 95.5, 95.8, 95.4],
        marketing: [93.6, 93.9, 94.2, 93.8],
        sales: [94.0, 94.3, 94.6, 94.2],
        hr: [95.6, 95.9, 96.1, 95.8]
      },
      gender: {
        male: [94.4, 94.7, 94.9, 94.6],
        female: [94.8, 95.1, 95.3, 95.0]
      }
    }
  },

  // All-time data (last 6 years)
  allTime: {
    labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
    turnover: {
      company: [5.2, 5.4, 5.1, 4.9, 5.3, 5.0],
      departments: {
        engineering: [4.6, 4.8, 4.5, 4.3, 4.7, 4.4],
        marketing: [6.2, 6.4, 6.1, 5.9, 6.3, 6.0],
        sales: [5.8, 6.0, 5.7, 5.5, 5.9, 5.6],
        hr: [4.2, 4.4, 4.1, 3.9, 4.3, 4.0]
      },
      gender: {
        male: [5.4, 5.6, 5.3, 5.1, 5.5, 5.2],
        female: [5.0, 5.2, 4.9, 4.7, 5.1, 4.8]
      }
    },
    retention: {
      company: [94.8, 94.6, 94.9, 95.1, 94.7, 95.0],
      departments: {
        engineering: [95.4, 95.2, 95.5, 95.7, 95.3, 95.6],
        marketing: [93.8, 93.6, 93.9, 94.1, 93.7, 94.0],
        sales: [94.2, 94.0, 94.3, 94.5, 94.1, 94.4],
        hr: [95.8, 95.6, 95.9, 96.1, 95.7, 96.0]
      },
      gender: {
        male: [94.6, 94.4, 94.7, 94.9, 94.5, 94.8],
        female: [95.0, 94.8, 95.1, 95.3, 94.9, 95.2]
      }
    }
  },

  // Current status (latest quarter)
  currentStatus: {
    turnover: {
      company: 5.5,
      departments: {
        engineering: 4.9,
        marketing: 6.5,
        sales: 5.9,
        hr: 4.1
      },
      gender: {
        male: 5.7,
        female: 5.3
      }
    },
    retention: {
      company: 94.5,
      departments: {
        engineering: 95.1,
        marketing: 93.5,
        sales: 94.1,
        hr: 95.9
      },
      gender: {
        male: 94.3,
        female: 94.7
      }
    },
    lastUpdated: "2024-03-15"
  }
}; 