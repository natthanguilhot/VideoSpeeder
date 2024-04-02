document.querySelector("button#saveAndRefreshSpeedVideo").addEventListener("click", () => {
	const isActive = document.querySelector("input#activespeedvideo").checked;
	const speed = document.querySelector("input#speedspeedvideo").value > 16 ? 16 : document.querySelector("input#speedspeedvideo").value;
	chrome.storage.sync
		.set({ isActive, speed })
		.then(() => console.log("Options sauvegardées."))
		.catch((err) => console.log("ERROR : ", err));
	chrome.tabs.query({ active: true, currentWindow: true }, function (arrayOfTabs) {
		chrome.tabs.reload(arrayOfTabs[0].id);
	});
	window.close();
});

document.querySelector("button#saveSpeedVideo").addEventListener("click", () => {
	const isActive = document.querySelector("input#activespeedvideo").checked;
	const speed = document.querySelector("input#speedspeedvideo").value;
	chrome.storage.sync
		.set({ isActive, speed })
		.then(() => console.log("Options sauvegardées."))
		.catch((err) => console.log("ERROR : ", err));
	window.close();
});

document.querySelector("button#refreshPage").addEventListener("click", () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (arrayOfTabs) {
		chrome.tabs.reload(arrayOfTabs[0].id);
	});
	window.close();
});

async function init() {
	const { isActive, speed } = await chrome.storage.sync.get(["isActive", "speed"]);
	const isActiveInput = document.querySelector("input#activespeedvideo");
	const speedInput = document.querySelector("input#speedspeedvideo");
	speedInput.value = speed;
	isActiveInput.checked = isActive;
}

init();
