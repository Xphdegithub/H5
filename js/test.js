;(function() {
    document.getElementById('testBtn').addEventListener('click', function() {
        console.log(1);
        $utils.showMessage('error', '奥利给，干了！')
    });
})();