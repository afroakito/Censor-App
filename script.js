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
inputText.addEventListener('input', function(event) {
    // IME変換中は処理をスキップ
    if (event.isComposing) return;

    originalText = event.target.value; // 元の文字列を更新

    // 入力欄: 最後の1文字以外を●に
    if (originalText.length > 1) {
        const censoredInput = '●'.repeat(originalText.length - 1) + originalText.slice(-1);
        inputText.value = censoredInput;
    }

    // 変換結果: 全文字を●に
    outputText.textContent = '●'.repeat(originalText.length);

    // 元のテキストを表示（伏字ではない）
    originalTextDisplay.textContent = originalText || '（入力なし）';
});

// IME確定後に元の文字列を補正
inputText.addEventListener('compositionend', function(event) {
    originalText = event.target.value; // 確定後の文字列を更新

    // 入力欄: 最後の1文字以外を●に
    if (originalText.length > 1) {
        const censoredInput = '●'.repeat(originalText.length - 1) + originalText.slice(-1);
        inputText.value = censoredInput;
    }

    // 変換結果: 全文字を●に
    outputText.textContent = '●'.repeat(originalText.length);

    // 元のテキストを表示（伏字ではない）
    originalTextDisplay.textContent = originalText || '（入力なし）';
});

// 「Xに埋め込む」ボタン: 元の文字列をコピー＆Xに遷移
shareButton.addEventListener('click', function() {
    navigator.clipboard.writeText(originalText)
        .then(() => {
            // アラートを削除し、直接遷移処理へ
            const xAppUrl = 'twitter://post'; // スマホ用
            const xWebUrl = 'https://x.com/compose/post'; // PCおよびフォールバック用

            // 簡易的なデバイス判別（PCなら直接ウェブ版）
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                const opened = window.open(xAppUrl, '_blank');
                setTimeout(() => {
                    if (!opened || opened.closed) {
                        window.open(xWebUrl, '_blank');
                    }
                }, 500);
            } else {
                window.open(xWebUrl, '_blank'); // PCでは直接ウェブ版
            }
        })
        .catch(err => {
            console.error('コピーに失敗しました: ', err); // アラートをconsole.logに変更
        });
});
