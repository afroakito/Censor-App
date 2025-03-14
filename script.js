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

// デバイス判定関数（簡易）
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 「Xに埋め込む」ボタン: 元の文字列をコピー＆Xに遷移
shareButton.addEventListener('click', function() {
    const originalText = inputText.value;
    navigator.clipboard.writeText(originalText)
        .then(() => {
            alert('元の文字列をコピーしました。Xの投稿欄にペーストしてください。');
            const xAppUrl = 'twitter://post'; // スマホ用アプリスキーム
            const xWebUrl = 'https://x.com/compose/post'; // ウェブ版（PC用またはフォールバック）

            if (isMobileDevice()) {
                // スマホの場合、まずアプリを試す
                const opened = window.open(xAppUrl, '_blank');
                // アプリが開かなかった場合、タイマーでフォールバック
                setTimeout(() => {
                    if (!opened || opened.closed) {
                        window.open(xWebUrl, '_blank');
                    }
                }, 1000);
            } else {
                // PCの場合、直接ウェブ版を開く
                window.open(xWebUrl, '_blank');
            }
        })
        .catch(err => {
            alert('コピーに失敗しました: ' + err);
        });
});