async function start() {
	const { isActive, speed } = await chrome.storage.sync.get(["isActive", "speed"]);

	if (isActive) {
		const videos = document.querySelectorAll("video");
		videos.forEach(function (video) {
			if (video.playbackRate != speed) {
				video.playbackRate = speed;
				console.log("video.playbackRate = " + video.playbackRate);
			}
		});
	}
}
start();
