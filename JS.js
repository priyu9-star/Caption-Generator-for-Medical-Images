async function uploadImage() {
    let fileInput = document.getElementById("imageInput").files[0];
    if (!fileInput) {
        alert("Please select an image!");
        return;
    }

    let formData = new FormData();
    formData.append("image", fileInput);

    const status = document.getElementById("status");
    const caption = document.getElementById("caption");
    const preview = document.getElementById("preview");

    status.innerText = "⏳ Processing...";
    caption.innerText = "";
    preview.style.display = "none";

    try {
        let response = await fetch("/upload", {
            method: "POST",
            body: formData
        });

        if (!response.ok) throw new Error("Failed to fetch caption.");

        let result = await response.json();
        if (result.error) {
            throw new Error(result.error);
        }

        preview.src = result.image_url;
        preview.style.display = "block";
        caption.innerText = result.caption;
        status.innerText = "✅ Caption Generated!";
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong: " + error.message);
        status.innerText = "";
    }
}
