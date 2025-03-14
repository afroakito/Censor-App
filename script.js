// 要素を取得
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const shareButton = document.getElementById('shareButton');

// 入力時にリアルタイムで伏せ字に変換（表示のみ）
inputText.addEventListener('input', function() {
    const originalText = inputText.value;
    const censored = '●'.repeat(originalText.length);
    outputText.textContent = censored;
});

// 「Xに埋め込む」ボタン: 元の文字列をコピー＆Xに遷移
shareButton.addEventListener('click', function() {
    const originalText = inputText.value; // 元の文字列を取得
    navigator.clipboard.writeText(originalText)
        .then(() => {
            alert('元の文字列をコピーしました。Xの投稿欄にペーストしてください。');
            const xAppUrl = 'x://';
            const xWebUrl = 'https://x.com/compose/post';
            const opened = window.open(xAppUrl, '_blank');
            if (!opened) {
                window.open(xWebUrl, '_blank');
            }
        })
        .catch(err => {
            alert('コピーに失敗しました: ' + err);
        });
});