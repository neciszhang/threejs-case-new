function showRot(argument) {
	if ($(window).width() > $(window).height()) {
		$("#ROT").show();
	} else {
		$("#ROT").hide();
	}
}

showRot();

window.addEventListener('resize', showRot);

var userAgent = window.navigator.userAgent,
	platform = window.navigator.platform,
	macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
	windowosPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
	iosPlatforms = ['iPhone', 'iPad', 'iPod'],
	os = 'win';

if (macosPlatforms.indexOf(platform) !== -1) {
	os = 'mac';
} else if(windowosPlatforms.indexOf(platform)!== -1) {
	os = 'win';
} else if(iosPlatforms.indexOf(platform) !== -1) {
	os = 'ios';
} else if(/Android/.test(userAgent)) {
	os = 'android';
} else if(!os & /Linux/.test(userAgent)) {
	os = 'linux';
}

document.onTouchMove = function() {
	return false;
}