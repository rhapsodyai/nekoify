/*
動物の名前を受け取り、対応する画像の URL を返す
*/
function nekoNameToURL(nekoName) {
  switch (nekoName) {
    case "Neko1":
      return chrome.extension.getURL("neko/neko1.png");
    case "Neko2":
      return chrome.extension.getURL("neko/neko2.jpg");
    case "Neko3":
      return chrome.extension.getURL("neko/neko3.jpg");
  }
}

/*
ポップアップのクリックイベントをリッスンする。

動物以外がクリックされた場合は最初で return する。

そうでない場合、クリックされたノードの textContent から動物の名前を取得する。

アクティブなタブに content script "nekoify.js" を差し込む。

続いて、アクティブなタブへの参照を取得し、"nekoify.js" にメッセージを送信する。
このメッセージには、選択された動物に対応する画像の URL を含んでいる。
*/
document.addEventListener("click", function(e) {
  if (!e.target.classList.contains("neko")) {
    return;
  }

  var chosenNeko = e.target.textContent;
  var chosenNekoURL = nekoNameToURL(chosenNeko);

  chrome.tabs.executeScript(null, {
    file: "/content_scripts/nekoify.js"
  });

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {nekoURL: chosenNekoURL});
  });

});