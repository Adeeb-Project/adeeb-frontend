/*!

=========================================================
* Purity UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { mode } from '@chakra-ui/theme-tools';

export const globalStyles = {
	colors: {
		gray: {
			700: '#1f2733'
		},
		teal: {
			50:  "#f2e6ff",
    		100: "#d9b3ff",
			200: "#bf80ff",
			300: "#AD00FF",  // ← all the shade you care about
			400: "#9900e6",
			500: "#8800cc",
			600: "#7300a3",
			700: "#520075",
			800: "#3a004e",
			900: "#22002e",
		}
		
	},
	styles: {
		global: (props) => ({
			body: {
				bg:
					document.documentElement.layout === 'auth'
						? mode('white', 'gray.800')(props)
						: mode('gray.50', 'gray.800')(props),
				fontFamily: "'Roboto', sans-serif"
			},
			html: {
				fontFamily: "'Roboto', sans-serif"
			}
		})
	}
};
