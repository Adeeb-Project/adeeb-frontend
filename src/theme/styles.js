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
			700: '#AD00FF'
		},
		teal: {
			50:  "#AD00FF",
    		100: "#AD00FF",
			200: "#AD00FF	",
			300: "#AD00FF",  // ← all the shade you care about
			400: "#AD00FF",
			500: "#AD00FF",
			600: "#AD00FF",
			700: "#AD00FF",
			800: "#AD00FF",
			900: "#AD00FF",
			teal: "#AD00FF",
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
