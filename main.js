// Variabel untuk menyimpan instance Unity setelah dimuat
let unityInstance = null;

// --- 1. MEMUAT UNITY WEBGL ---
createUnityInstance(document.querySelector("#unity-canvas"), {
    // Ganti nama file-file ini agar sesuai dengan yang ada di folder 'Build' Anda
    dataUrl: "Build/c25dc7311c58a429558cdf8192b56694.data.unityweb",
    frameworkUrl: "Build/e12b0b29dc0157589c8043a47dae28cf.framework.js.unityweb",
    codeUrl: "Build/3049e8df3148081e2a6923b7aa15988c.wasm.unityweb",
    // ---
    streamingAssetsUrl: "StreamingAssets",
    companyName: "Vidatra",
    productName: "WebARIndie",
    productVersion: "1.0",
}).then((instance) => {
    // Simpan instance Unity di variabel global
    unityInstance = instance;
    console.log("Unity Instance Berhasil Dimuat!");
}).catch((message) => {
    alert(message);
});


// --- 2. MENDENGARKAN EVENT DARI MINDAR ---

// Tunggu hingga A-Frame (MindAR) siap
document.addEventListener('DOMContentLoaded', () => {
    // Dapatkan akses ke "scene" A-Frame
    const sceneEl = document.querySelector('a-scene');
    
    // Dapatkan akses ke "target" penanda
    const targetPenanda = sceneEl.querySelector('#target-penanda');

    // Dengarkan event "targetFound" (penanda terdeteksi)
    targetPenanda.addEventListener("targetFound", event => {
        console.log("Penanda Ditemukan!");
        // Periksa apakah Unity sudah siap
        if (unityInstance) {
            // Panggil fungsi C# 'TampilkanModel' di GameObject 'JembatanAR'
            unityInstance.SendMessage('JembatanAR', 'TampilkanModel');
        }
    });

    // Dengarkan event "targetLost" (penanda hilang)
    targetPenanda.addEventListener("targetLost", event => {
        console.log("Penanda Hilang!");
        // Periksa apakah Unity sudah siap
        if (unityInstance) {
            // Panggil fungsi C# 'SembunyikanModel' di GameObject 'JembatanAR'
            unityInstance.SendMessage('JembatanAR', 'SembunyikanModel');
        }
    });
});