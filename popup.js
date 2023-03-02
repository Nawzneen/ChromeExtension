import { getActiveTabURL } from "./utils.js";
console.log("pop up is working");
//Pushing
// adding a new bookmark row to the popup
const addNewBookmark = (bookmarksElement, bookmark) => {
  console.log("add new bookmark is working");
  const bookmarkTitleElement = document.createElement("div");
  const newBookmarkElement = document.createElement("div");
  bookmarkTitleElement.textContent = bookmark.desc;
  bookmarkTitleElement.className = "bookmark-title";
  newBookmarkElement.id = "bookmark-" + bookmark.time;
  newBookmarkElement.className = "bookmark";
  newBookmarkElement.setAttribute("timestamp", bookmark.time);
  newBookmarkElement.appendChild(bookmarkTitleElement);
  bookmarksElement.appendChild(newBookmarkElement);
};

const viewBookmarks = (currentBookmarks = []) => {
  console.log("view bookmarks is working");
  const bookmarksElement = document.getElementById("bookmarks");
  bookmarksElement.innerHTML = "";
  if (currentBookmarks.length > 0) {
    for (let i = 0; i < currentBookmarks.length; i++) {
      console.log("working");
      const bookmark = currentBookmarks[i];
      addNewBookmark(bookmarksElement, bookmark);
    }
  } else {
    bookmarksElement.innerHTML = `<i class="row"> No bookmarks to show</i>`;
  }
};

const onPlay = (e) => {};

const onDelete = (e) => {};

const setBookmarkAttributes = () => {};

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  const queryParameters = activeTab.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);
  const currentVideoId = urlParameters.get("v");
  // This line of code isnot working
  if (activeTab.url.includes("youtube.com/watch") && currentVideoId) {
    chrome.storage.sync.get([currentVideoId], (data) => {
      const currentVideoBookmarks = data[currentVideoId]
        ? JSON.parse(data[currentVideoId])
        : [];
      console.log("currentvideobookmarks", currentVideoBookmarks);
      viewBookmarks(currentVideoBookmarks);
    });
  } else {
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML =
      '<div class="title">This is not a youtube video page</div>';
  }
});
