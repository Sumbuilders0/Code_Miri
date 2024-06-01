document.addEventListener('DOMContentLoaded', () => {
    const fileContainer = document.getElementById('file-container');

    // Function to get URL parameters
    function getQueryParams() {
        const params = {};
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        urlParams.forEach((value, key) => {
            params[key] = value;
        });

        return params;
    }

    // Function to fetch file details
    async function fetchFileDetails(fileId) {
        try {
            const response = await fetch(`https://your-api-endpoint.com/files/${fileId}`);
            const file = await response.json();

            displayFileDetails(file);
        } catch (error) {
            console.error('Error fetching file details:', error);
        }
    }

    // Function to display file details
    function displayFileDetails(file) {
        fileContainer.innerHTML = `
            <h1>${file.name}</h1>
            <img src="${file.thumbnailUrl}" alt="${file.name}">
            <p>Label: ${file.label}</p>
            <p><a href="${file.url}" target="_blank">Download/View File</a></p>
        `;
    }

    // Get file ID from URL parameters and fetch file details
    const params = getQueryParams();
    if (params.fileId) {
        fetchFileDetails(params.fileId);
    }
});
