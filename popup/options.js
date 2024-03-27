document.querySelector("button#savespeedvideo").addEventListener("click", () => {
	const isActive = document.querySelector("input#activespeedvideo").checked;
	const speed = document.querySelector("input#speedspeedvideo").value;
	chrome.storage.sync
		.set({ isActive, speed })
		.then(() => console.log("Options sauvegardées."))
		.catch((err) => console.log("ERROR : ", err));
});

async function init() {
	const { isActive, speed } = await chrome.storage.sync.get(["isActive", "speed"]);
	const isActiveInput = document.querySelector("input#activespeedvideo");
	const speedInput = document.querySelector("input#speedspeedvideo");
	speedInput.value = speed;
	isActiveInput.checked = isActive;
}

init();
