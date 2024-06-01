document.addEventListener("DOMContentLoaded", () => {
    const filesTableBody = document.querySelector("#files-table tbody");
  
    // Function to fetch files from API
    async function fetchFiles() {
      try {
        const response = await fetch("https://your-api-endpoint.com/files");
        const files = await response.json();
  
        displayFiles(files);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    }
  
    // Function to display files
    function displayFiles(files) {
      files.forEach((file) => {
        const fileRow = document.createElement("tr");
  
        fileRow.innerHTML = `
                  <td><img src="${file.thumbnailUrl}" alt="${file.name}"></td>
                  <td>${file.name}</td>
                  <td>${file.label}</td>
              `;
  
        fileRow.addEventListener("click", () => {
          window.location.href = `file-view.html?fileId=${file.id}`;
        });
  
        filesTableBody.appendChild(fileRow);
      });
    }
  
    // Fetch and display files on page load
    fetchFiles();
  });
  