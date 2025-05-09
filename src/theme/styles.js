import { mode } from '@chakra-ui/theme-tools';

export const globalStyles = {
	colors: {
		gray: {
			700: '#003366'
		},
		teal: {
			50:  "#f0f7ff",  // very light
			100: "#d0e7ff",
			200: "#a6ceff",
			300: "#1e88ff",
			400: "#4a9eff",
			500: "#1e88ff",  // Primary (like iOS link blue)
			600: "#007aff",  // iOS system blue
			700: "#0062cc",
			800: "#004b99",
			900: "#003366",
			teal: "#0062cc",
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
