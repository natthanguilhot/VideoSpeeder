const speedInput = document.querySelector("input#speedspeedvideo");
const isActiveInput = document.querySelector("input#activespeedvideo");
const toggleSpeedVideo = document.querySelector("label#toggleSpeedVideo");

function displayToggle(boolean) {
	if (boolean) {
		toggleSpeedVideo.classList.add("after:right-0");
		toggleSpeedVideo.classList.remove("after:left-0");
		toggleSpeedVideo.classList.add("after:content-['✅']");
		toggleSpeedVideo.classList.remove("after:content-['❌']");
	} else {
		toggleSpeedVideo.classList.remove("after:right-0");
		toggleSpeedVideo.classList.add("after:left-0");
		toggleSpeedVideo.classList.remove("after:content-['✅']");
		toggleSpeedVideo.classList.add("after:content-['❌']");
	}
}
isActiveInput.addEventListener("change", (e) => {
	displayToggle(e.target.checked);
});

document.querySelector("button#saveAndRefreshSpeedVideo").addEventListener("click", () => {
	chrome.storage.sync
		.set({ isActive: isActiveInput.checked, speed: speedInput.value > 16 ? 16 : document.querySelector("input#speedspeedvideo").value })
		.then(() => console.log("Options sauvegardées."))
		.catch((err) => console.log("ERROR : ", err));
	chrome.tabs.query({ active: true, currentWindow: true }, function (arrayOfTabs) {
		chrome.tabs.reload(arrayOfTabs[0].id);
	});
	window.close();
});

document.querySelector("button#plusSpeedVideo").addEventListener("click", () => {
	speedInput.value = (Number(speedInput.value) + 0.1).toFixed(1);
});
document.querySelector("button#minusSpeedVideo").addEventListener("click", () => {
	speedInput.value = (Number(speedInput.value) - 0.1).toFixed(1);
});

document.querySelector("button#saveSpeedVideo").addEventListener("click", () => {
	isActiveInput.checked;
	speedInput.value;
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
	displayToggle(isActiveInput.checked);
}

init();
