// ライブラリのimport
const OBSWebSocket = require('obs-websocket-js');
// インスタンス初期化
const obs = new OBSWebSocket();
// OBSに接続してPromiseを受け取る
obs.connect({
      address: 'localhost:4444',
      password: 'demodemo'
  })
  // 接続成功
  .then(() => {
      console.log(`Success! We're connected & authenticated.`);
      // シーンの一覧を取得するリクエスト
      return obs.send('GetSceneList');
  })
  .then(data => {
      console.log(`${data.scenes.length} Available Scenes!`);
      // シーンの一覧から現在のシーンを探す
      data.scenes.forEach(scene => {
          if (scene.name !== data.currentScene) {
              console.log(`Found a different scene! Switching to Scene: ${scene.name}`);
              // 現在のシーンを切り替えるリクエスト
              obs.send('SetCurrentScene', {
                  'scene-name': scene.name
              });
          }
      });
  })
  .catch(err => { // Promise convention dicates you have a catch on every chain.
      console.log(err);
  });


// シーンが切り替わったイベントをObserveする
obs.on('SwitchScenes', data => {
  console.log(`New Active Scene: ${data.sceneName}`);
});
// エラーをObserveする
obs.on('error', err => {
  console.error('socket error:', err);
});
