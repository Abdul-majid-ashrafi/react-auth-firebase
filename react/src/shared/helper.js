export const screenLockEnableOfflineMood = () => {
    // lock screen only for offline
    const lockScreen = document.getElementById("lock-screen-on-offline");
    lockScreen.style.display = "block";
}

export const screenLockDisableOfflineMood = () => {
    // unlock screen only for offline
    const lockScreen = document.getElementById("lock-screen-on-offline");
    lockScreen.style.display = "none";
}

export const screenLockEnable = () => {
    // lock screen
    const lockScreen = document.getElementById("lock-screen");
    lockScreen.style.display = "block";
}

export const screenLockDisable = () => {
    // unlock screen
    const lockScreen = document.getElementById("lock-screen");
    lockScreen.style.display = "none";
}
