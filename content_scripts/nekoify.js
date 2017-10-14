/*
nekoify():
* document.body に含まれるノードをすべて削除し、
* 選択された動物を挿入し、
* リスナを削除する 
*/
function nekoify(request, sender, sendResponse) {
  removeEverything();
  insertNeko(request.nekoURL);
  chrome.runtime.onMessage.removeListener(nekoify);
}

/*
document.body に含まれるノードをすべて削除する
*/
function removeEverything() {
  while (document.body.firstChild) {
    document.body.firstChild.remove();
  }
}

/*
動物の画像の URL を受け取り、画像を指す IMG 要素の作成・スタイル適用を行い、
作成したノードをドキュメント内に挿入する
*/
function insertNeko(nekoURL) {
  var nekoImage = document.createElement("img");
  nekoImage.setAttribute("src", nekoURL);
  nekoImage.setAttribute("style", "width: 100vw");
  nekoImage.setAttribute("style", "height: 100vh");
  document.body.appendChild(nekoImage);
}

/*
アドオンからのメッセージを受信するリスナに nekoify() を指定する
*/
chrome.runtime.onMessage.addListener(nekoify);