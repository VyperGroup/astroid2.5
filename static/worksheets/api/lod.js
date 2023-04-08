		// Get the saved settings, or set default values
		const savedSettings = JSON.parse(localStorage.getItem('site-settings')) || {};
		const defaultFavicon = '/worksheets/assets/favicon/logo.png';
		const defaultSiteName = 'Astroid';

		// Apply the settings site-wide
		const favicon = document.querySelector('link[rel="icon"]');
		favicon.href = savedSettings.favicon || defaultFavicon;
		document.title = savedSettings.siteName || defaultSiteName;