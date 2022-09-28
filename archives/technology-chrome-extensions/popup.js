import { getCurrentTab } from "./utils.js";

const viewBookmarks = (currentBookmarks = []) => {
    const bookmarksElement = document.getElementById("bookmarks")
    bookmarksElement.innerHTML = ""

    if(currentBookmarks.length > 0){
        bookmarksElement.innerHTML = JSON.stringify(currentBookmarks)
    } else {
        bookmarksElement.innerHTML = "No bookmarks to show"
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getCurrentTab();
    const queryParameters = activeTab.url.split("?")[1]
    const urlParameters = new URLSearchParams(queryParameters)
    
    const currentVideo = urlParameters.get("v")
    console.log('ayy', currentVideo)
    if(activeTab.url.includes("youtube.com/watch") && currentVideo){
        chrome.storage.sync.get([currentVideo], (data) => {
            const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : []

            viewBookmarks(currentVideoBookmarks)

        })
    } else {
        const container = document.getElementsByClassName('container')[0]
        console.log(container)
        container.innerHTML = "Not a video :("
    }
});