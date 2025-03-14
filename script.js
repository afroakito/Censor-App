// 要素を取得
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const originalTextDisplay = document.getElementById('originalText');
const shareButton = document.getElementById('shareButton');

// 元の文字列を保持する変数
let originalText = '';

// 初期表示
originalTextDisplay.textContent = '（入力なし）';

// 入力時にリアルタイムで伏字に変換（IME変換中はスキップ）
inputText.addEventListener('input', function(event) {
    if (event.isComposing) return; // IME変換中は処理しない

    originalText = event.target.value;

    if (originalText.length > 1) {
        const censoredInput = '●'.repeat(originalText.length - 1) + originalText.slice(-1);
        inputText.value = censoredInput;
    }

    outputText.textContent = '●'.repeat(originalText.length);
    originalTextDisplay.textContent = originalText || '（入力なし）';
});

// IME確定後に元の文字列を補正
inputText.addEventListener('compositionend', function(event) {
    originalText = event.target.value; // 確定後の完全な文字列を取得

    // ●が混ざっている場合を考慮し、必要ならクリア
    if (originalText.includes('●')) {
        originalText = originalText.replace(/●/g, '');
    }

    if (originalText.length > 1) {
        const censoredInput = '●'.repeat(originalText.length - 1) + originalText.slice(-1);
        inputText.value = censoredInput;
    } else {
        inputText.value = originalText; // 1文字の場合はそのまま
    }

    outputText.textContent = '●'.repeat(originalText.length);
    originalTextDisplay.textContent = originalText || '（入力なし）';
});

// 「Xに埋め込む」ボタン: 元の文字列をコピー＆Xに遷移
shareButton.addEventListener('click', function() {
    navigator.clipboard.writeText(originalText)
        .then(() => {
            const xAppUrl = 'twitter://post';
            const xWebUrl = 'https://x.com/compose/post';
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                const opened = window.open(xAppUrl, '_blank');
                setTimeout(() => {
                    if (!opened || opened.closed) {
                        window.open(xWebUrl, '_blank');
                    }
                }, 500);
            } else {
                window.open(xWebUrl, '_blank');
            }
        })
        .catch(err => {
            console.error('コピーに失敗しました: ', err);
        });
});
