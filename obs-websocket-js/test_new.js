// ライブラリのimport
const OBSWebSocket = require('obs-websocket-js');
// インスタンス初期化
const obs = new OBSWebSocket();
// OBSに接続してPromiseを受け取る

setTimeout(demo1, 1000);
setTimeout(demo2, 4000);
setTimeout(demo3, 7000);
setTimeout(exit_fn, 7500);

function exit_fn() {
    process.exit()
}

function demo1() {
    obs.connect({
        address: 'localhost:4444',
        password: 'demodemo'
    })
        // 接続成功
        .then(data => {
            obs.send('SetCurrentScene', {
                'scene-name': "demob_s"
            });
        })
        .catch(err => { // Promise convention dicates you have a catch on every chain.
            console.log(err);
        });
}

function demo2() {
    obs.connect({
        address: 'localhost:4444',
        password: 'demodemo'
    })
        // 接続成功
        .then(data => {
            obs.send('SetCurrentScene', {
                'scene-name': "democ_s"
            });
        })
        .catch(err => { // Promise convention dicates you have a catch on every chain.
            console.log(err);
        });
}

function demo3() {
    obs.connect({
        address: 'localhost:4444',
        password: 'demodemo'
    })
        // 接続成功
        .then(data => {
            obs.send('SetCurrentScene', {
                'scene-name': "demoa_s"
            });
        })
        .catch(err => { // Promise convention dicates you have a catch on every chain.
            console.log(err);
        });
}

// シーンが切り替わったイベントをObserveする
obs.on('SwitchScenes', data => {
  console.log(`New Active Scene: ${data.sceneName}`);
});
// エラーをObserveする
obs.on('error', err => {
  console.error('socket error:', err);
});
