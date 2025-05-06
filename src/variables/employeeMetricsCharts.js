import { lineChartOptionsDefault, barChartOptionsDefault, donutChartOptionsGeneral } from './charts';

// Line Chart for Combined View (Turnover + Retention)
export const combinedLineChartOptions = {
  ...lineChartOptionsDefault,
  colors: ['#E53E3E', '#38A169'], // Red for turnover, green for retention
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  xaxis: {
    ...lineChartOptionsDefault.xaxis,
    categories: ['Q1', 'Q2', 'Q3', 'Q4'], // For quarterly
    // categories: ['2020', '2021', '2022', '2023'], // For yearly
    // categories: ['2018', '2019', '2020', '2021', '2022', '2023'], // For all time
  },
  yaxis: {
    ...lineChartOptionsDefault.yaxis,
    labels: {
      formatter: (value) => `${value}%`,
    },
  },
  tooltip: {
    ...lineChartOptionsDefault.tooltip,
    y: {
      formatter: (value) => `${value}%`,
    },
  },
};

// Separate Line Chart for Turnover Only
export const turnoverLineChartOptions = {
  ...lineChartOptionsDefault,
  colors: ['#E53E3E'], // Red for turnover
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  xaxis: {
    ...lineChartOptionsDefault.xaxis,
    categories: ['Q1', 'Q2', 'Q3', 'Q4'],
  },
  yaxis: {
    ...lineChartOptionsDefault.yaxis,
    labels: {
      formatter: (value) => `${value}%`,
    },
  },
  tooltip: {
    ...lineChartOptionsDefault.tooltip,
    y: {
      formatter: (value) => `${value}%`,
    },
  },
};

// Separate Line Chart for Retention Only
export const retentionLineChartOptions = {
  ...lineChartOptionsDefault,
  colors: ['#38A169'], // Green for retention
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  xaxis: {
    ...lineChartOptionsDefault.xaxis,
    categories: ['Q1', 'Q2', 'Q3', 'Q4'],
  },
  yaxis: {
    ...lineChartOptionsDefault.yaxis,
    labels: {
      formatter: (value) => `${value}%`,
    },
  },
  tooltip: {
    ...lineChartOptionsDefault.tooltip,
    y: {
      formatter: (value) => `${value}%`,
    },
  },
};

// Bar Chart for Combined View
export const combinedBarChartOptions = {
  ...barChartOptionsDefault,
  colors: ['#E53E3E', '#38A169'], // Red for turnover, green for retention
  xaxis: {
    ...barChartOptionsDefault.xaxis,
    categories: ['Q1', 'Q2', 'Q3', 'Q4'],
  },
  yaxis: {
    ...barChartOptionsDefault.yaxis,
    labels: {
      formatter: (value) => `${value}%`,
    },
  },
  tooltip: {
    ...barChartOptionsDefault.tooltip,
    y: {
      formatter: (value) => `${value}%`,
    },
  },
};

// Donut Chart for Current Status
export const currentStatusDonutOptions = {
  ...donutChartOptionsGeneral,
  colors: ['#E53E3E', '#38A169'], // Red for turnover, green for retention
  labels: ['Turnover Rate', 'Retention Rate'],
  tooltip: {
    ...donutChartOptionsGeneral.tooltip,
    y: {
      formatter: (value) => `${value}%`,
    },
  },
};

// Pie Chart for Current Status (Pie variant)
export const currentStatusPieOptions = {
  ...donutChartOptionsGeneral,
  chart: {
    ...donutChartOptionsGeneral.chart,
    type: 'pie',
  },
  colors: ['#E53E3E', '#38A169'],
  labels: ['Turnover Rate', 'Retention Rate'],
  tooltip: {
    ...donutChartOptionsGeneral.tooltip,
    y: {
      formatter: (value) => `${value}%`,
    },
  },
};
