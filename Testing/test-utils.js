const React = require('react');
const { ChakraProvider } = require('@chakra-ui/react');
const { render } = require('@testing-library/react');

const AllProviders = ({ children }) => {
  return (
    <ChakraProvider>
      {children}
    </ChakraProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

// re-export everything
module.exports = {
  ...require('@testing-library/react'),
  render: customRender,
};
