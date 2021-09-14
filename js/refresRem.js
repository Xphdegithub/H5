// 设置Rem标准
(function (doc, designWidth) {
	doc.documentElement.addEventListener('touchmove', function (event) {
		if (event.touches.length > 1) {
			event.preventDefault();
		}
	}, false);
	const html = doc.documentElement;
	const refresRem = () => {
		const clientWidth = html.clientWidth;
		if (clientWidth >= designWidth) {
			html.style.fontSize = '100px';
		} else {
			html.style.fontSize = 100 * (clientWidth / designWidth) + 'px';
		}
	}
	// console.log('refresRem');
	$('body').css('display', 'block');
	doc.addEventListener('DOMContentLoaded', refresRem);
})(document, 750);