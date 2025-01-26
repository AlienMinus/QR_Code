function generateQRCode() {
    let inputText = document.getElementById("textInput").value.trim();
    let qrContainer = document.getElementById("qrCode");
    let qrSize = document.getElementById("sizeSelect").value;
    let padding = 20; // Padding around the QR code (in pixels)
    let downloadBtn = document.getElementById("downloadBtn");

    qrContainer.innerHTML = ""; // Clear previous QR code

    if (inputText === "") {
      alert("Please enter text or URL to generate QR code.");
      return;
    }

    // Generate the QR code
    let qrCode = new QRCode(qrContainer, {
      text: inputText,
      width: qrSize,
      height: qrSize,
      colorDark: "#000000", // Dark color for QR code
      colorLight: "#ffffff00", // Transparent background
      correctLevel: QRCode.CorrectLevel.H,
    });

    // Apply style to the QR code container
    qrContainer.style.borderRadius = "0";
    qrContainer.style.position = "relative";
    qrContainer.style.overflow = "visible";

    // After the QR code is rendered, modify the canvas
    setTimeout(() => {
      let qrCanvas = qrContainer.getElementsByTagName("canvas")[0];
      let ctx = qrCanvas.getContext("2d");

      // Create a larger canvas with padding around the QR code
      let newCanvas = document.createElement("canvas");
      newCanvas.width = qrCanvas.width + 2 * padding;
      newCanvas.height = qrCanvas.height + 2 * padding;
      let newCtx = newCanvas.getContext("2d");

      // Fill the new canvas with a white background
      newCtx.fillStyle = "#ffffff"; // Full white background
      newCtx.fillRect(0, 0, newCanvas.width, newCanvas.height);

      // Draw the QR code on the new canvas with padding
      newCtx.drawImage(qrCanvas, padding, padding);

      // Prepare the download link with the new canvas image (including padding)
      let qrDataUrl = newCanvas.toDataURL("image/png");
      downloadBtn.href = qrDataUrl;
      downloadBtn.style.display = "block"; // Show the download button
    }, 500); // Delay to ensure the QR code is fully rendered
  }