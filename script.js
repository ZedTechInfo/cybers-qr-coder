document.addEventListener('DOMContentLoaded', function () {
    const qrText = document.getElementById('qr-text');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const qrCodeContainer = document.getElementById('qrcode-container');
    const placeholderText = document.getElementById('placeholder-text');
    let qrcode = null;

    generateBtn.addEventListener('click', generateQRCode);

    qrText.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission if it's in a form
            generateQRCode();
        }
    });

    downloadBtn.addEventListener('click', downloadQRCode);

    function generateQRCode() {
        const text = qrText.value.trim();

        if (!text) {
            alert('Please enter some text or a URL');
            return;
        }

        // Clear previous QR code
        qrCodeContainer.innerHTML = '';

        // Hide placeholder text
        placeholderText.style.display = 'none';

        // Generate the QR code using the library
        qrcode = new QRCode(qrCodeContainer, {
            text: text,
            width: 250,
            height: 250,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    function downloadQRCode() {
        // The library generates a canvas inside the container
        const qrCanvas = qrCodeContainer.querySelector('canvas');

        if (!qrCanvas) {
            alert('Please generate a QR code first');
            return;
        }

        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = qrCanvas.toDataURL('image/png');
        link.click();
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
