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

    // 入力欄: 最後の1文字以外を●に
    if (currentValue.length > 1) {
        const censoredInput = '●'.repeat(currentValue.length - 1) + currentValue.slice(-1);
        inputText.value = censoredInput;
    }

    // 変換結果: 全文字を●に
    outputText.textContent = '●'.repeat(currentValue.length);
});

// 確定時（Enterや変換確定）に元の文字列を更新
inputText.addEventListener('keyup', function(event) {
    // Enterキーまたは確定後の処理
    if (event.key === 'Enter' || event.isComposing === false) {
        originalText = inputText.value.replace(/●/g, '') + (event.key === 'Enter' ? '' : event.key);
        originalTextDisplay.textContent = originalText || '（入力なし）';
    }
});

// IME入力中の確定を補足
inputText.addEventListener('compositionend', function() {
    originalText = inputText.value.replace(/●/g, ''); // ●を除去して元の文字を取得
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
