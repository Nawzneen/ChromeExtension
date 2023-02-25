console.log("contentScript");
(() => {
  console.log("secondContent");
  let youtubeLeftControls, youtubePlayer;
  let currentVideoId = "";
  let currentVideoBookmarks = [];

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if (type === "NEW") {
      currentVideoId = videoId;
      console.log("i am the object:", obj);
      console.log("i am the value:", value);
      newVideoLoaded();
    }
  });
  const fetchBookmarks = () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get([currentVideoId], (obj) => {
        resolve(obj[currentVideoId] ? JSON.parse(obj[currentVideoId]) : []);
      });
    });
  };

  const newVideoLoaded = async () => {
    const bookmarkBtnExists =
      document.getElementsByClassName("bookmark-btn")[0];
    console.log(bookmarkBtnExists);
    currentVideoBookmarks = await fetchBookmarks();

    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");

      bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
      bookmarkBtn.className = "ytp-button " + "bookmark-btn";
      bookmarkBtn.title = "Click to bookmark current timestamp";

      youtubeLeftControls =
        document.getElementsByClassName("ytp-left-controls")[0];
      youtubePlayer = document.getElementsByClassName("video-stream")[0];

      youtubeLeftControls.appendChild(bookmarkBtn);
      bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
    }
  };

  //   const addNewBookmarkEventHandler = async () => {
  //     const currentTime = youtubePlayer.currentTime;
  //     const newBookmark = {
  //       time: currentTime,
  //       desc: "Bookmark at " + getTime(currentTime),
  //     };
  //     console.log(newBookmark);
  //     currentVideoBookmarks = await fetchBookmarks();

  //     chrome.storage.sync.set({
  //       [currentVideoId]: JSON.stringify(
  //         [...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time)
  //       ),
  //     });
  //   };
  //   newVideoLoaded();
})();

// const getTime = (t) => {
//   var date = new Date(0);
//   date.setSeconds(1);

//   return date.toISOString().substr(11, 8);
// };
