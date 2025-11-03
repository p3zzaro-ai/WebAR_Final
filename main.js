let unityInstance = null;

createUnityInstance(document.querySelector("#unity-canvas"), {
    dataUrl: "Build/2a1a26ff642d31f1cd3edd6a722041ec.data.unityweb",
    frameworkUrl: "Build/e12b0b29dc0157589c8043a47dae28cf.framework.js.unityweb",
    codeUrl: "Build/3049e8df3148081e2a6923b7aa15988c.wasm.unityweb",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "Vidatra",
    productName: "WebAR_Final",
    productVersion: "1.0",
}).then((instance) => {
    unityInstance = instance;
    console.log("Unity Instance Berhasil Dimuat!");

    const sceneEl = document.querySelector('a-scene');
    const targetPenanda = sceneEl.querySelector('#target-penanda');

    targetPenanda.addEventListener("targetFound", event => {
        console.log("Penanda Ditemukan!");
        if (unityInstance) {
            unityInstance.SendMessage('JembatanAR', 'TampilkanModel');
        }
    });

    targetPenanda.addEventListener("targetLost", event => {
        console.log("Penanda Hilang!");
        if (unityInstance) {
            unityInstance.SendMessage('JembatanAR', 'SembunyikanModel');
        }
    });
    
    // PERINTAHKAN MINDAR UNTUK MULAI (BARU)
    // Kita gunakan metode yang lebih 'direct'
    console.log("Memulai MindAR dan meminta izin kamera...");
    try {
        // Metode 1 (dari sebelumnya)
        sceneEl.systems['mindar-image-system'].start();
    } catch (e) {
        // Metode 2 (Fallback jika metode 1 gagal)
        sceneEl.components['mindar-image-system'].start();
    }
    
}).catch((message) => {
    alert(message);
});