// 要素を取得
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const shareButton = document.getElementById('shareButton');

// 元の文字列を保持する変数
let originalText = '';

// 入力時にリアルタイムで伏字に変換
inputText.addEventListener('input', function(event) {
    // 現在の入力値を取得
    originalText = event.target.value; // 元の文字列を更新

    // 入力欄: 最後の1文字以外を●に
    if (originalText.length > 1) {
        const censoredInput = '●'.repeat(originalText.length - 1) + originalText.slice(-1);
        inputText.value = censoredInput;
    }

    // 変換結果: 全文字を●に
    outputText.textContent = '●'.repeat(originalText.length);
});

// 「Xに埋め込む」ボタン: 元の文字列をコピー＆Xに遷移
shareButton.addEventListener('click', function() {
    navigator.clipboard.writeText(originalText)
        .then(() => {
            alert('元の文字列をコピーしました。Xアプリの投稿欄にペーストしてください。');
            const xAppUrl = 'twitter://post';
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
