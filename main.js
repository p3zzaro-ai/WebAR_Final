// Variabel untuk menyimpan instance Unity setelah dimuat
let unityInstance = null;

// --- 1. MEMUAT UNITY WEBGL ---
createUnityInstance(document.querySelector("#unity-canvas"), {
    // Ganti nama file-file ini agar sesuai dengan yang ada di folder 'Build' Anda
    dataUrl: "Build/e8af64faf29c0baf73e3ad09f1d8ec5f.data.unityweb",
    frameworkUrl: "Build/62cdff2458dc86fc2c552ba417033a5c.framework.js.unityweb",
    codeUrl: "Build/5b45edd38a6cb5e85f87764a53d68f02.wasm.unityweb",
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