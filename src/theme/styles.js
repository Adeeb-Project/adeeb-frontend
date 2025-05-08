import { mode } from '@chakra-ui/theme-tools';

export const globalStyles = {
	colors: {
		gray: {
			700: '#AD00FF'
		},
		teal: {
			50:  "#2E005E",
    		100: "#2E005E",
			200: "#2E005E	",
			300: "#2E005E",  // ← all the shade you care about
			400: "#2E005E",
			500: "#2E005E",
			600: "#2E005E",
			700: "#2E005E",
			800: "#2E005E",
			900: "#2E005E",
			teal: "#2E005E",
		}
		
	},
	styles: {
		global: (props) => ({
			body: {
				bg:
					document.documentElement.layout === 'auth'
						? mode('white', 'gray.800')(props)
						: mode('gray.50', 'gray.800')(props),
                fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`
            },
            html: {
                fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`
            }
		})
	}
};
