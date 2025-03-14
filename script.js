// 要素を取得
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const originalTextDisplay = document.getElementById('originalText');
const shareButton = document.getElementById('shareButton');

// 元の文字列を保持する変数
let originalText = '';

// 初期表示
originalTextDisplay.textContent = '（入力なし）';

// 入力時にリアルタイムで伏字に変換
inputText.addEventListener('input', function() {
    const currentValue = inputText.value;
    originalText = currentValue; // 元の文字列を更新

    // 入力欄: 最後の1文字以外を●に
    if (currentValue.length > 1) {
        const censoredInput = '●'.repeat(currentValue.length - 1) + currentValue.slice(-1);
        inputText.value = censoredInput;
    }

    // 変換結果: 全文字を●に
    outputText.textContent = '●'.repeat(currentValue.length);

    // 元のテキストを表示
    originalTextDisplay.textContent = originalText || '（入力なし）';
});

// 「Xに埋め込む」ボタン: 元の文字列をコピー＆Xに遷移
shareButton.addEventListener('click', function() {
    navigator.clipboard.writeText(originalText)
        .then(() => {
            alert('元の文字列をコピーしました。Xの投稿欄にペーストしてください。');
            const xAppUrl = 'twitter://post';
            const xWebUrl = 'https://x.com/compose/post';
            const opened = window.open(xAppUrl, '_blank');
            setTimeout(() => {
                if (!opened || opened.closed) {
                    window.open(xWebUrl, '_blank');
                }
            }, 500);
        })
        .catch(err => {
            alert('コピーに失敗しました: ' + err);
        });
});