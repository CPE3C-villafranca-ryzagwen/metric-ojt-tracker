// ===================== DOM CORE SELECTORS =====================
const sideMenu = document.querySelector("aside");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");

const navDashboard = document.getElementById("nav-dashboard");
const navCalendar = document.getElementById("nav-calendar");
const navDtr = document.getElementById("nav-dtr");
const navDownload = document.getElementById("nav-download");
const navLogout = document.getElementById("nav-logout");
const clearAllDtrBtn = document.getElementById("clear-all-dtr-btn");

const dashboardView = document.getElementById("dashboard-view");
const calendarView = document.getElementById("calendar-view");
const dtrView = document.getElementById("dtr-view");
const shortcutToDtr = document.getElementById("shortcut-to-dtr");
const shortcutToCalendar = document.getElementById("shortcut-to-calendar");
const mainAppLayout = document.getElementById("main-app-layout");
const setupOverlayPanel = document.getElementById("profile-setup-view");
const appLoadingScreen = document.getElementById("app-loading-screen");

const profileNavBtn = document.getElementById("trigger-profile-modal-btn");
const profileModal = document.getElementById("profile-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const saveProfileBtn = document.getElementById("save-profile-btn");
const deleteAccountBtn = document.getElementById("btn-delete-profile-session");
const deleteAccountConfirmModal = document.getElementById("delete-account-confirm-modal");
const closeDeleteAccountConfirmModal = document.getElementById("close-delete-account-confirm-modal");
const cancelDeleteAccountBtn = document.getElementById("cancel-delete-account-btn");
const confirmDeleteAccountBtn = document.getElementById("confirm-delete-account-btn");

const editLogModal = document.getElementById("edit-log-modal");
const closeEditModalBtn = document.getElementById("close-edit-modal-btn");
const saveEditLogBtn = document.getElementById("save-edit-log-btn");

// IDENTITY GATEWAY RE-ALLOCATION SELECTORS
const loginFieldsBox = document.getElementById("login-fields-box");
const registerFieldsBox = document.getElementById("register-fields-box");
const goToRegisterLink = document.getElementById("go-to-register-trigger");
const goToLoginLink = document.getElementById("go-to-login-link");
const loginTriggerBtn = document.getElementById("login-trigger-btn");
const registerTriggerBtn = document.getElementById("core-register-trigger-action-btn");
const forgotPasswordTrigger = document.getElementById("forgot-password-trigger");
const forgotPasswordModal = document.getElementById("forgot-password-modal");
const closeForgotPasswordModal = document.getElementById("close-forgot-password-modal");
const sendResetEmailBtn = document.getElementById("send-reset-email-btn");
const backToAuthFromSetupBtn = document.getElementById("back-to-auth-from-setup-btn");

const progressFill = document.querySelector(".progress-bar-fill");
const progressText = document.querySelector(".intern-progress small");

// Global Cache Storage States
let appData = null; let currentActiveUid = null; let currentNavDate = new Date();
const ACTIVE_WORKSPACE_VIEW_KEY = "METRIC_ACTIVE_WORKSPACE_VIEW";
const THEME_STORAGE_KEY = "METRIC_ACTIVE_THEME";

// ===================== CORE COMPUTATION ENGINE & RENDERING FUNCTIONS =====================
// FIXED HOISTING: Inuna natin ang depinisyon ng updateUIMetrics para mabasa ito agad ng Google Auth
function updateUIMetrics() {
    if (!appData) return;
    const hoursToGo = Math.max(0, appData.totalGoalHours - appData.hoursEarned);
    const progressPercent = Math.min(100, (appData.hoursEarned / appData.totalGoalHours) * 100);
    const estDaysLeft = Math.ceil(hoursToGo / 8); const computedEndDate = calculateEstimatedEndDate(appData.startDate, appData.totalGoalHours, appData.logs);

    document.getElementById("header-user-name").textContent = appData.studentName.split(' ')[0];
    document.getElementById("student-name").textContent = appData.studentName; document.getElementById("display-school").textContent = appData.school;
    document.getElementById("display-dept").textContent = appData.department; document.getElementById("display-start-date").textContent = getFormattedAcademicDate(appData.startDate);
    document.getElementById("display-end-date").textContent = getFormattedAcademicDate(computedEndDate);

    document.querySelector(".total-goal h1").textContent = `${appData.totalGoalHours} Hours`;
    document.getElementById("hours-rendered-text").textContent = `${appData.hoursEarned.toFixed(2)} Hours`;
    document.getElementById("remaining-hours-text").textContent = `${hoursToGo.toFixed(2)} Hours`; document.getElementById("days-remaining-text").textContent = `${estDaysLeft} Days`;
    progressFill.style.width = `${progressPercent}%`; progressText.textContent = `${progressPercent.toFixed(0)}% Completed`;
}

function renderMonthlyCalendars() {
    if (!appData) return; const year = currentNavDate.getFullYear(); const month = currentNavDate.getMonth();
    const monthYearText = currentNavDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    document.getElementById("calendar-month-year").textContent = monthYearText;
    document.getElementById("gcal-month-year-title").textContent = monthYearText;

    const previewGrid = document.getElementById("preview-calendar-grid");
    previewGrid.innerHTML = `<div class="day-name">Sun</div><div class="day-name">Mon</div><div class="day-name">Tue</div><div class="day-name">Wed</div><div class="day-name">Thu</div><div class="day-name">Fri</div><div class="day-name">Sat</div>`;
    const gcalGrid = document.getElementById("gcal-cells-container"); gcalGrid.innerHTML = "";
    const firstDayIndex = new Date(year, month, 1).getDay(); const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = firstDayIndex; i > 0; i--) {
        previewGrid.innerHTML += `<div class="day-number empty"></div>`; gcalGrid.innerHTML += `<div class="gcal-cell empty-cell"></div>`;
    }
    for (let day = 1; day <= totalDaysInMonth; day++) {
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const logMatch = appData.logs.find(l => l.date === dateString); let statusClass = ""; let badgeHTML = "";
        if (logMatch) {
            statusClass = logMatch.type;
            if (['present', 'half-day', 'custom'].includes(logMatch.type)) badgeHTML = `<span class="cell-badge">${logMatch.total.toFixed(2)} hrs</span>`;
            else if (logMatch.type === 'holiday') badgeHTML = `<span class="cell-badge" style="background:rgba(181,122,242,0.2); color:#7c5cfa;">Holiday</span>`;
            else if (logMatch.type === 'absent') badgeHTML = `<span class="cell-badge" style="background:rgba(255,119,130,0.2); color:#d94b56;">Absent</span>`;
        }
        previewGrid.innerHTML += `<div class="day-number ${statusClass}">${day}</div>`;
        gcalGrid.innerHTML += `<div class="gcal-cell ${statusClass ? statusClass + '-cell' : ''}"><span class="cell-num">${day}</span>${badgeHTML}</div>`;
    }
}

function renderDtrTables() {
    const previewBody = document.getElementById("dtr-rows-preview"); const fullBody = document.getElementById("full-dtr-rows-root");
    previewBody.innerHTML = ""; fullBody.innerHTML = "";
    if (!appData || !appData.logs || appData.logs.length === 0) {
        previewBody.innerHTML = `<tr><td colspan="6" class="text-muted">No active logs tracked.</td></tr>`;
        fullBody.innerHTML = `<tr><td colspan="7" class="text-muted">No active logs tracked.</td></tr>`; return;
    }
    const ascendingLogs = [...appData.logs].sort((a, b) => new Date(a.date) - new Date(b.date));
    ascendingLogs.forEach((log) => {
        const originalIndex = appData.logs.findIndex(l => l.date === log.date);
        fullBody.innerHTML += `<tr><td>${getFormattedAcademicDate(log.date)}</td><td>${log.amIn}</td><td>${log.amOut}</td><td>${log.pmIn}</td><td>${log.pmOut}</td><td><strong>${log.total.toFixed(2)}</strong></td><td><div class="table-actions-container"><button type="button" class="action-edit-row-btn" onclick="openEditLogRowWorkspace(${originalIndex})">Edit</button><button type="button" class="action-delete-row-btn" onclick="triggerDeleteCloudLogEntry(${originalIndex})">Delete</button></div></td></tr>`;
    });
    const latestSixLogs = [...appData.logs].slice(0, 6);
    latestSixLogs.forEach((log) => {
        previewBody.innerHTML += `<tr><td>${getFormattedAcademicDate(log.date)}</td><td>${log.amIn}</td><td>${log.amOut}</td><td>${log.pmIn}</td><td>${log.pmOut}</td><td><strong>${log.total.toFixed(2)}</strong></td></tr>`;
    });
}

function synchronizeSystemUIPanels() { updateUIMetrics(); renderMonthlyCalendars(); renderDtrTables(); }

// ===================== HELPER UTILITIES =====================
function toggleOverlayPanelVisibility(shouldHide) {
    setupOverlayPanel.classList.toggle("hidden", shouldHide);
    setupOverlayPanel.setAttribute("aria-hidden", String(shouldHide));
}

function toggleLoadingScreen(shouldShow) {
    if (!appLoadingScreen) return;
    appLoadingScreen.classList.toggle("hidden", !shouldShow);
}

function redirectToAuthenticationPage() {
    profileModal.style.display = "none";
    if (deleteAccountConfirmModal) deleteAccountConfirmModal.style.display = "none";
    mainAppLayout.style.display = "none";
    document.getElementById("first-time-setup-modal").style.display = "none";
    registerFieldsBox.style.display = "none";
    loginFieldsBox.style.display = "block";
    toggleLoadingScreen(false);
    toggleOverlayPanelVisibility(false);
}

function getFormattedAcademicDate(dateString) {
    if (!dateString) return "--";
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
}

function calculateEstimatedEndDate(startDateString, totalGoalHours, loggedLogs) {
    if (!startDateString || isNaN(totalGoalHours) || totalGoalHours <= 0) return "--";

    const logs = loggedLogs || [];
    const logMap = {};
    logs.forEach(log => {
        if (log.date) logMap[log.date] = log;
    });

    const getProjectedHoursForDate = (dateObj) => {
        const weekday = dateObj.getDay();
        const samples = logs
            .filter(log => {
                const total = parseFloat(log.total) || 0;
                return total > 0 && new Date(log.date).getDay() === weekday;
            })
            .map(log => parseFloat(log.total) || 0);

        if (samples.length > 0) {
            const sum = samples.reduce((total, hours) => total + hours, 0);
            return sum / samples.length;
        }

        if (weekday === 0 || weekday === 6) return 0;
        return 8;
    };

    let accumulatedHours = 0;
    let currentDate = new Date(startDateString);

    while (accumulatedHours < totalGoalHours) {
        const dateKey = currentDate.toISOString().split('T')[0];
        const existingLog = logMap[dateKey];

        if (existingLog) {
            accumulatedHours += parseFloat(existingLog.total) || 0;
        } else {
            accumulatedHours += getProjectedHoursForDate(currentDate);
        }

        if (accumulatedHours >= totalGoalHours) break;
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return currentDate.toISOString().split('T')[0];
}

// THEME TOGGLER LOGIC
if (localStorage.getItem(THEME_STORAGE_KEY) === "dark") {
    document.body.classList.add("dark-theme-variables");
}

const setupThemeTogglerLogic = (wrapperSelector) => {
    document.querySelectorAll(wrapperSelector).forEach(toggle => {
        toggle.addEventListener("click", () => {
            const isDarkMode = document.body.classList.toggle('dark-theme-variables');
            localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? "dark" : "light");
        });
    });
};
setupThemeTogglerLogic(".theme-switch-wrapper");

// PASSWORD FIELD SELECTION CONFIGURATIONS
const bindPasswordToggleVisibility = (iconId, inputId) => {
    document.getElementById(iconId).addEventListener("click", function() {
        const passField = document.getElementById(inputId);
        if (passField.type === "password") {
            passField.type = "text"; this.textContent = "visibility";
        } else {
            passField.type = "password"; this.textContent = "visibility_off";
        }
    });
};
bindPasswordToggleVisibility("toggle-login-pass", "auth-password");
bindPasswordToggleVisibility("toggle-reg-pass", "reg-password");
bindPasswordToggleVisibility("toggle-confirm-pass", "reg-confirm-password");

// ROUTING INTERCEPT LOOPS
goToRegisterLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginFieldsBox.style.display = "none";
    registerFieldsBox.style.display = "block";
});
goToLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    registerFieldsBox.style.display = "none";
    loginFieldsBox.style.display = "block";
});

// FORGOT PASSWORD FUNCTIONALITY
forgotPasswordTrigger.addEventListener("click", (e) => {
    e.preventDefault();
    forgotPasswordModal.style.display = "flex";
});

closeForgotPasswordModal.addEventListener("click", () => {
    forgotPasswordModal.style.display = "none";
});

sendResetEmailBtn.addEventListener("click", async () => {
    const email = document.getElementById("reset-email").value.trim();
    if (!email) {
        alert("Please enter your email address.");
        return;
    }

    if (!window.firebaseCloudActiveState) {
        alert("Firebase is not active. Password reset is only available with cloud authentication.");
        return;
    }

    try {
        const { sendPasswordResetEmail } = window.firebaseAuthMethods;

        const resetContinueUrl =
            window.location.protocol === "file:"
                ? "https://metric-ojt.firebaseapp.com"
                : `${window.location.origin}${window.location.pathname}`;

        console.log("Sending password reset email to:", email);
        console.log("Password reset continue URL:", resetContinueUrl);

        await sendPasswordResetEmail(window.firebaseAuth, email, {
            url: resetContinueUrl,
            handleCodeInApp: false
        });

        console.log("Password reset email sent successfully");
        alert("Password reset email sent! Please check your inbox (and spam folder) for the reset link.");
        forgotPasswordModal.style.display = "none";
        document.getElementById("reset-email").value = "";
    } catch (error) {
        console.error("Password Reset Error:", error);
        if (error.code === 'auth/user-not-found') {
            alert("No account found with this email address.");
        } else if (error.code === 'auth/invalid-email') {
            alert("Invalid email address format.");
        } else if (error.code === 'auth/too-many-requests') {
            alert("Too many requests. Please try again later.");
        } else if (error.code === 'auth/unauthorized-continue-uri') {
            alert("Password reset failed because the reset redirect URL is not authorized in Firebase.");
        } else {
            alert("Password Reset Error: " + error.message);
        }
    }
});

// ===================== AUTH STATE LIFECYCLE MANAGERS =====================
function listenToUserSessionState() {
    if (!window.firebaseCloudActiveState) {
        const savedLocalUid = localStorage.getItem("METRIC_PERSISTED_UID");
        const sandboxCachedData = localStorage.getItem("METRIC_LOCAL_SANDBOX_CACHE");

        if (sandboxCachedData && savedLocalUid) {
            appData = JSON.parse(sandboxCachedData); currentActiveUid = savedLocalUid;
            toggleOverlayPanelVisibility(true); mainAppLayout.style.display = "block"; synchronizeSystemUIPanels(); restoreActiveWorkspaceView(); toggleLoadingScreen(false);
            return;
        }

        toggleLoadingScreen(false); toggleOverlayPanelVisibility(false); goToRegisterLink.click();
        return;
    }

    const { onAuthStateChanged } = window.firebaseAuthMethods;
    const { doc, getDoc, setDoc } = window.firebaseFirestoreMethods;
    onAuthStateChanged(window.firebaseAuth, async (user) => {
        try {
            if (!user) {
                currentActiveUid = null; appData = null; localStorage.removeItem("METRIC_PERSISTED_UID");
                mainAppLayout.style.display = "none"; toggleLoadingScreen(false); toggleOverlayPanelVisibility(false);
                return;
            }

            currentActiveUid = user.uid; localStorage.setItem("METRIC_PERSISTED_UID", currentActiveUid);
            const docRef = doc(window.firebaseDB, "users", currentActiveUid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                appData = docSnap.data();
            } else {
                appData = {
                    studentName: "OJT Intern",
                    school: "",
                    department: "",
                    startDate: new Date().toISOString().split('T')[0],
                    totalGoalHours: 250,
                    hoursEarned: 0.00,
                    logs: [],
                    email: user.email || "",
                    displayName: user.displayName || "",
                    needsProfileSetup: true,
                    provider: user.providerData?.[0]?.providerId || "firebase"
                };
                await setDoc(docRef, appData);
            }

            if (appData.needsProfileSetup || !appData.studentName || appData.studentName === "OJT Intern") {
                toggleOverlayPanelVisibility(true);
                mainAppLayout.style.display = "none";
                document.getElementById("first-time-setup-modal").style.display = "flex";
                toggleLoadingScreen(false);
            } else {
                document.getElementById("first-time-setup-modal").style.display = "none";
                toggleOverlayPanelVisibility(true); mainAppLayout.style.display = "block"; synchronizeSystemUIPanels(); restoreActiveWorkspaceView(); toggleLoadingScreen(false);
            }
        } catch (error) {
            console.error("Auth State Restore Error:", error);
            alert("Authentication session failed to load: " + error.message);
            currentActiveUid = null; appData = null; localStorage.removeItem("METRIC_PERSISTED_UID");
            mainAppLayout.style.display = "none"; toggleLoadingScreen(false); toggleOverlayPanelVisibility(false);
        }
    });
}

async function pushDataUpdateToCloudFirestore() {
    if (!appData || !currentActiveUid) return;
    localStorage.setItem("METRIC_LOCAL_SANDBOX_CACHE", JSON.stringify(appData));
    if (!window.firebaseCloudActiveState) return;
    
    const { doc, setDoc } = window.firebaseFirestoreMethods;
    await setDoc(doc(window.firebaseDB, "users", currentActiveUid), appData);
}

registerTriggerBtn.addEventListener("click", async () => {
    const email = document.getElementById("reg-email").value; const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm-password").value;

    if (!email || !password || !confirmPassword) { alert("Please fill out parameters."); return; }
    if (password !== confirmPassword) { alert("Password mismatch discrepancy."); return; }

    appData = { studentName: "OJT Intern", school: "BSU", department: "CpE", startDate: new Date().toISOString().split('T')[0], totalGoalHours: 250, hoursEarned: 0.00, logs: [], needsProfileSetup: true };

    if (!window.firebaseCloudActiveState) {
        currentActiveUid = "LOCAL_SANDBOX_USER_ID"; localStorage.setItem("METRIC_PERSISTED_UID", currentActiveUid);
        pushDataUpdateToCloudFirestore(); document.getElementById("first-time-setup-modal").style.display = "flex"; return;
    }

    try {
        const { createUserWithEmailAndPassword } = window.firebaseAuthMethods;
        const { doc, setDoc } = window.firebaseFirestoreMethods;
        const userCredential = await createUserWithEmailAndPassword(window.firebaseAuth, email, password);
        currentActiveUid = userCredential.user.uid; localStorage.setItem("METRIC_PERSISTED_UID", currentActiveUid);
        await setDoc(doc(window.firebaseDB, "users", currentActiveUid), appData);
        document.getElementById("first-time-setup-modal").style.display = "flex";
    } catch (error) { alert("Registration Error: " + error.message); }
});

document.getElementById("save-first-time-profile-btn").addEventListener("click", async () => {
    const name = document.getElementById("first-setup-name").value; const school = document.getElementById("first-setup-school").value;
    const dept = document.getElementById("first-setup-dept").value; const startDate = document.getElementById("first-setup-start-date").value;
    const goal = parseFloat(document.getElementById("first-setup-goal").value);

    if (!name || !school || !dept || !startDate || isNaN(goal)) { alert("Please fill profile parameters."); return; }

    appData = {
        ...appData,
        studentName: name,
        school,
        department: dept,
        startDate,
        totalGoalHours: goal,
        hoursEarned: appData?.hoursEarned || 0.00,
        logs: appData?.logs || [],
        needsProfileSetup: false
    };
    await pushDataUpdateToCloudFirestore();
    
    document.getElementById("first-time-setup-modal").style.display = "none";
    toggleOverlayPanelVisibility(true); mainAppLayout.style.display = "block"; synchronizeSystemUIPanels();
});

backToAuthFromSetupBtn.addEventListener("click", async () => {
    document.getElementById("first-time-setup-modal").style.display = "none";
    mainAppLayout.style.display = "none";
    currentActiveUid = null;
    appData = null;
    localStorage.removeItem("METRIC_PERSISTED_UID");
    localStorage.removeItem(ACTIVE_WORKSPACE_VIEW_KEY);

    if (window.firebaseCloudActiveState && window.firebaseAuth?.currentUser) {
        const { signOut } = window.firebaseAuthMethods;
        await signOut(window.firebaseAuth);
    }

    toggleOverlayPanelVisibility(false);
});

loginTriggerBtn.addEventListener("click", async () => {
    const email = document.getElementById("auth-email").value; const password = document.getElementById("auth-password").value;
    if (!window.firebaseCloudActiveState) {
        const cachedSandbox = localStorage.getItem("METRIC_LOCAL_SANDBOX_CACHE");
        if (cachedSandbox) {
            appData = JSON.parse(cachedSandbox); currentActiveUid = "LOCAL_SANDBOX_USER_ID";
            localStorage.setItem("METRIC_PERSISTED_UID", currentActiveUid);
            toggleOverlayPanelVisibility(true); mainAppLayout.style.display = "block"; synchronizeSystemUIPanels();
        } else { alert("No local profile cache active."); }
        return;
    }
    try {
        const { signInWithEmailAndPassword } = window.firebaseAuthMethods;
        const userCred = await signInWithEmailAndPassword(window.firebaseAuth, email, password);
        localStorage.setItem("METRIC_PERSISTED_UID", userCred.user.uid);
    } catch (error) { alert("Login Error: " + error.message); }
});

document.querySelectorAll(".google-login-action-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
        if (!window.firebaseCloudActiveState) {
            currentActiveUid = "LOCAL_SANDBOX_USER_ID"; localStorage.setItem("METRIC_PERSISTED_UID", currentActiveUid);
            toggleOverlayPanelVisibility(true);
            mainAppLayout.style.display = "none";
            document.getElementById("first-time-setup-modal").style.display = "flex"; return;
        }
        const { GoogleAuthProvider, signInWithPopup } = window.firebaseAuthMethods;
        const provider = new GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        try {
            await signInWithPopup(window.firebaseAuth, provider);
        } catch (error) {
            console.error("Google Auth Error:", error);
            if (error.code === 'auth/popup-closed-by-user') {
                alert("Google sign-in was cancelled. Please try again.");
            } else if (error.code === 'auth/popup-blocked') {
                alert("Popup was blocked by your browser. Please allow popups for this site and try again.");
            } else if (error.code === 'auth/unauthorized-domain') {
                alert("This domain is not authorized in Firebase Authentication settings.");
            } else if (error.code === 'auth/account-exists-with-different-credential') {
                alert("An account already exists with this email using a different sign-in method.");
            } else {
                alert("Google Authorization Error: " + error.message);
            }
        }
    });
});

navLogout.addEventListener("click", async (e) => {
    e.preventDefault();
    if (confirm("Log out?")) {
        localStorage.removeItem("METRIC_PERSISTED_UID");
        localStorage.removeItem(ACTIVE_WORKSPACE_VIEW_KEY);
        if (!window.firebaseCloudActiveState) { location.reload(); return; }
        const { signOut } = window.firebaseAuthMethods; await signOut(window.firebaseAuth); location.reload();
    }
});

const closeDeleteAccountModal = () => {
    deleteAccountConfirmModal.style.display = "none";
};

deleteAccountBtn.addEventListener("click", () => {
    deleteAccountConfirmModal.style.display = "flex";
});

closeDeleteAccountConfirmModal.addEventListener("click", closeDeleteAccountModal);
cancelDeleteAccountBtn.addEventListener("click", closeDeleteAccountModal);

confirmDeleteAccountBtn.addEventListener("click", async () => {
    confirmDeleteAccountBtn.disabled = true;
    confirmDeleteAccountBtn.textContent = "Deleting account...";

    const uidToDelete = currentActiveUid;
    const dataBackup = appData ? JSON.parse(JSON.stringify(appData)) : null;
    if (!window.firebaseCloudActiveState) {
        localStorage.removeItem("METRIC_LOCAL_SANDBOX_CACHE");
        localStorage.removeItem("METRIC_PERSISTED_UID");
        localStorage.removeItem(ACTIVE_WORKSPACE_VIEW_KEY);
        currentActiveUid = null;
        appData = null;
        redirectToAuthenticationPage();
        confirmDeleteAccountBtn.disabled = false;
        confirmDeleteAccountBtn.innerHTML = `<span class="material-icons-sharp" style="font-size:1rem; vertical-align:middle; margin-right:0.2rem;">delete_forever</span> Yes, delete account`;
        return;
    }

    try {
        const { deleteDoc, doc, setDoc } = window.firebaseFirestoreMethods;
        const { deleteUser, signOut } = window.firebaseAuthMethods;
        const activeUser = window.firebaseAuth.currentUser;

        if (!activeUser || !uidToDelete) {
            throw new Error("No active authenticated user found.");
        }

        await deleteDoc(doc(window.firebaseDB, "users", uidToDelete));

        try {
            await deleteUser(activeUser);
        } catch (deleteAuthError) {
            if (dataBackup) {
                await setDoc(doc(window.firebaseDB, "users", uidToDelete), dataBackup);
            }
            throw deleteAuthError;
        }

        localStorage.removeItem("METRIC_LOCAL_SANDBOX_CACHE");
        localStorage.removeItem("METRIC_PERSISTED_UID");
        localStorage.removeItem(ACTIVE_WORKSPACE_VIEW_KEY);
        currentActiveUid = null;
        appData = null;
        redirectToAuthenticationPage();

        if (window.firebaseAuth.currentUser) {
            await signOut(window.firebaseAuth);
        }
    } catch (err) {
        console.error("Permanent Account Delete Error:", err);
        if (err.code === "auth/requires-recent-login") {
            alert("For security, please log out, sign in again, then delete your account.");
        } else {
            alert("Delete Account Error: " + (err.message || "Please try again."));
        }
    } finally {
        confirmDeleteAccountBtn.disabled = false;
        confirmDeleteAccountBtn.innerHTML = `<span class="material-icons-sharp" style="font-size:1rem; vertical-align:middle; margin-right:0.2rem;">delete_forever</span> Yes, delete account`;
    }
});

// ===================== WORKSPACE NAVIGATION SWITCHERS =====================
function clearAllViewActiveStates() {
    document.querySelectorAll(".sidebar a").forEach(link => link.classList.remove("active"));
    dashboardView.style.display = "none"; calendarView.style.display = "none"; dtrView.style.display = "none";
}

function showWorkspaceView(viewName, shouldPersist = true) {
    clearAllViewActiveStates();

    if (viewName === "calendar") {
        navCalendar.classList.add("active");
        calendarView.style.display = "block";
        renderMonthlyCalendars();
    } else if (viewName === "dtr") {
        navDtr.classList.add("active");
        dtrView.style.display = "block";
        renderDtrTables();
    } else {
        viewName = "dashboard";
        navDashboard.classList.add("active");
        dashboardView.style.display = "block";
    }

    if (shouldPersist) localStorage.setItem(ACTIVE_WORKSPACE_VIEW_KEY, viewName);
}

function restoreActiveWorkspaceView() {
    const savedView = localStorage.getItem(ACTIVE_WORKSPACE_VIEW_KEY) || "dashboard";
    showWorkspaceView(savedView, false);
}

navDashboard.addEventListener("click", (e) => { e.preventDefault(); showWorkspaceView("dashboard"); });
navCalendar.addEventListener("click", (e) => { e.preventDefault(); showWorkspaceView("calendar"); });
navDtr.addEventListener("click", (e) => { e.preventDefault(); showWorkspaceView("dtr"); });
shortcutToCalendar.addEventListener("click", () => showWorkspaceView("calendar"));
shortcutToDtr.addEventListener("click", () => showWorkspaceView("dtr"));

// ===================== MS-EXCEL SHEET CONVERTER ENGINE =====================
const triggerExcelSpreadsheetDownload = (e) => {
    if (e) e.preventDefault();
    if (!appData || !appData.logs || appData.logs.length === 0) { alert("No logging records found to export."); return; }
    
    const sortedLogsForExcel = [...appData.logs].sort((a, b) => new Date(a.date) - new Date(b.date));
    const calculatedEnd = calculateEstimatedEndDate(appData.startDate, appData.totalGoalHours, appData.logs);
    const exportDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
    const safeStudentName = appData.studentName.replace(/[^\w\s-]/g, "").replace(/\s+/g, "_");
    const excelRows = sortedLogsForExcel;

    const getExcelRowClass = (type) => {
        if (type === "absent") return "absence-row";
        if (type === "holiday") return "holiday-row";
        return "";
    };
    const getExcelRowFill = (type) => {
        if (type === "absent") return "#fff0f2";
        if (type === "holiday") return "#f5edff";
        return "#ffffff";
    };
    const getExcelRowTextColor = (type) => {
        if (type === "absent") return "#d94b56";
        if (type === "holiday") return "#7c5cfa";
        return "#363949";
    };
    
    let excelTemplate = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
        <meta charset="UTF-8">
        <!--[if gte mso 9]>
        <xml>
            <x:ExcelWorkbook>
                <x:ExcelWorksheets>
                    <x:ExcelWorksheet>
                        <x:Name>Metric OJT Log</x:Name>
                        <x:WorksheetOptions>
                            <x:DisplayGridlines>False</x:DisplayGridlines>
                            <x:Print>
                                <x:FitWidth>1</x:FitWidth>
                                <x:FitHeight>0</x:FitHeight>
                            </x:Print>
                        </x:WorksheetOptions>
                    </x:ExcelWorksheet>
                </x:ExcelWorksheets>
            </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
            body { font-family: "Century Gothic", Arial, sans-serif; background: #ffffff; }
            table.metric-report { border-collapse: collapse; width: 1020px; table-layout: fixed; background: #ffffff; }
            .title-row td { background: #7380ec; color: #ffffff; font-size: 18pt; font-weight: 800; letter-spacing: 0.5px; text-align: center; height: 46px; border: 1px solid #7380ec; }
            .subtitle-row td { background: #ffffff; color: #677483; font-size: 10pt; text-align: center; height: 28px; border-left: 1px solid #dce1eb; border-right: 1px solid #dce1eb; }
            .meta-label { background: #f3f4ff; color: #363949; font-weight: 700; border: 1px solid #dce1eb; padding: 8px; text-align: center; vertical-align: middle; }
            .meta-value { background: #ffffff; color: #363949; border: 1px solid #dce1eb; padding: 8px; text-align: center; vertical-align: middle; }
            .section-gap td { height: 14px; border: none; background: #ffffff; }
            .table-header-main th { background: #363949; color: #ffffff; font-weight: 700; border: 1px solid #4b5164; padding: 8px; text-align: center; vertical-align: middle; }
            .table-header-sub th { background: #eef1ff; color: #363949; font-weight: 700; border: 1px solid #dce1eb; padding: 7px; text-align: center; vertical-align: middle; }
            .log-row td { background: #ffffff; border: 1px solid #7d8da1; color: #363949; padding: 7px; text-align: center; vertical-align: middle; }
            .absence-row td { background: #fff0f2; color: #d94b56; font-weight: 700; }
            .holiday-row td { background: #f5edff; color: #7c5cfa; font-weight: 700; }
            .date-cell { font-weight: 600; color: #111e88; }
            .hours-cell { font-weight: 800; background: #f6f6f9; color: #7380ec; }
            .absence-row .hours-cell { background: #ffe4e8; color: #d94b56; }
            .holiday-row .hours-cell { background: #eadcff; color: #7c5cfa; }
            .total-label { background: #363949; color: #ffffff; font-weight: 800; border: 1px solid #363949; padding: 10px; text-align: right; }
            .total-value { background: #41f1b6; color: #0e6b4b; font-size: 14pt; font-weight: 900; border: 1px solid #41f1b6; text-align: center; vertical-align: middle; }
            .signature-label { color: #363949; font-weight: 700; text-align: center; border-top: 2px solid #363949; padding-top: 6px; }
            .signature-space td { height: 36px; border: none; background: #ffffff; }
            .footer-note td { color: #7d8da1; font-size: 9pt; text-align: center; border: none; background: #ffffff; height: 28px; }
        </style>
    </head>
    <body>
        <table class="metric-report" border="1" cellspacing="0" cellpadding="0">
            <colgroup>
                <col style="width:170px;">
                <col style="width:170px;">
                <col style="width:170px;">
                <col style="width:170px;">
                <col style="width:170px;">
                <col style="width:170px;">
            </colgroup>
            <tr class="title-row">
                <td colspan="6">DAILY TIME RECORD</td>
            </tr>
            <tr class="subtitle-row">
                <td colspan="6">Metric Internship Tracker &bull; Exported ${exportDate}</td>
            </tr>
            <tr>
                <td class="meta-label">Intern Name</td>
                <td class="meta-value" colspan="2">${appData.studentName}</td>
                <td class="meta-label">School</td>
                <td class="meta-value" colspan="2">${appData.school}</td>
            </tr>
            <tr>
                <td class="meta-label">Track / Position</td>
                <td class="meta-value" colspan="2">${appData.department}</td>
                <td class="meta-label">Target</td>
                <td class="meta-value" colspan="2">${appData.totalGoalHours} Hours</td>
            </tr>
            <tr>
                <td class="meta-label">Start Date</td>
                <td class="meta-value" colspan="2">${getFormattedAcademicDate(appData.startDate)}</td>
                <td class="meta-label">Est. End Date</td>
                <td class="meta-value" colspan="2">${getFormattedAcademicDate(calculatedEnd)}</td>
            </tr>
            <tr class="section-gap"><td colspan="6"></td></tr>
            <thead>
                <tr class="table-header-main">
                    <th rowspan="2">Date Logged</th>
                    <th colspan="2">Morning Session (AM)</th>
                    <th colspan="2">Afternoon Session (PM)</th>
                    <th rowspan="2">Hours</th>
                </tr>
                <tr class="table-header-sub">
                    <th>Time In</th>
                    <th>Time Out</th>
                    <th>Time In</th>
                    <th>Time Out</th>
                </tr>
            </thead>
            <tbody>`;
            
    excelRows.forEach(log => {
        const rowClass = getExcelRowClass(log.type);
        const rowFill = getExcelRowFill(log.type);
        const rowTextColor = getExcelRowTextColor(log.type);
        const cellStyle = `background:${rowFill}; border:1px solid #7d8da1; color:${rowTextColor}; padding:7px; text-align:center; vertical-align:middle;`;
        const dateCellStyle = `${cellStyle} mso-number-format:'\\@'; font-weight:700; color:${log.type === "absent" || log.type === "holiday" ? rowTextColor : "#111e88"};`;
        const hoursCellStyle = `background:${rowFill}; border:1px solid #7d8da1; color:${log.type === "absent" || log.type === "holiday" ? rowTextColor : "#7380ec"}; padding:7px; text-align:center; vertical-align:middle; font-weight:800;`;
        excelTemplate += `
            <tr class="log-row ${rowClass}">
                <td class="date-cell" style="${dateCellStyle}">${getFormattedAcademicDate(log.date)}</td>
                <td style="${cellStyle}">${log.amIn || '--'}</td>
                <td style="${cellStyle}">${log.amOut || '--'}</td>
                <td style="${cellStyle}">${log.pmIn || '--'}</td>
                <td style="${cellStyle}">${log.pmOut || '--'}</td>
                <td class="hours-cell" style="${hoursCellStyle}">${parseFloat(log.total).toFixed(2)}</td>
            </tr>`;
    });
    
    excelTemplate += `
            <tr>
                <td class="total-label" colspan="5">TOTAL RENDERED HOURS ACQUIRED</td>
                <td class="total-value">${appData.hoursEarned.toFixed(2)}</td>
            </tr>
            <tr class="section-gap"><td colspan="6"></td></tr>
            <tr class="signature-space">
                <td colspan="3"></td>
                <td colspan="3"></td>
            </tr>
            <tr>
                <td class="signature-label" colspan="3">Student Intern Signature</td>
                <td class="signature-label" colspan="3">OJT Supervisor Signature</td>
            </tr>
            <tr class="footer-note">
                <td colspan="6">Generated by Metric Internship Tracker</td>
            </tr>
            </tbody>
        </table>
    </body>
    </html>`;

    const blobFile = new Blob([excelTemplate], { type: "application/vnd.ms-excel" });
    const downloadUrl = URL.createObjectURL(blobFile);
    const hiddenAnchor = document.createElement("a");
    hiddenAnchor.href = downloadUrl;
    hiddenAnchor.download = `Metric_DTR_${safeStudentName}.xls`;
    document.body.appendChild(hiddenAnchor);
    hiddenAnchor.click();
    document.body.removeChild(hiddenAnchor);
};

navDownload.addEventListener("click", triggerExcelSpreadsheetDownload);

// PROFILE DIALOG BINDINGS
profileNavBtn.addEventListener("click", () => {
    document.getElementById("input-name").value = appData.studentName;
    document.getElementById("input-school").value = appData.school;
    document.getElementById("input-dept").value = appData.department;
    document.getElementById("input-start-date").value = appData.startDate;
    document.getElementById("input-goal").value = appData.totalGoalHours;
    profileModal.style.display = "flex";
});
closeModalBtn.addEventListener("click", () => profileModal.style.display = "none");

saveProfileBtn.addEventListener("click", async () => {
    appData.studentName = document.getElementById("input-name").value;
    appData.school = document.getElementById("input-school").value;
    appData.department = document.getElementById("input-dept").value;
    appData.startDate = document.getElementById("input-start-date").value;
    appData.totalGoalHours = parseFloat(document.getElementById("input-goal").value);
    await pushDataUpdateToCloudFirestore(); synchronizeSystemUIPanels(); profileModal.style.display = "none";
});

const bindCalendarNavClick = (prevId, nextId) => {
    document.getElementById(prevId).addEventListener("click", () => { currentNavDate.setMonth(currentNavDate.getMonth() - 1); renderMonthlyCalendars(); });
    document.getElementById(nextId).addEventListener("click", () => { currentNavDate.setMonth(currentNavDate.getMonth() + 1); renderMonthlyCalendars(); });
};
bindCalendarNavClick("prev-month", "next-month"); bindCalendarNavClick("gcal-prev-month", "gcal-next-month");

function convertTimeTextToMinutes(timeText) {
    if (!timeText || timeText === "--") return null;
    const normalized = timeText.trim().toUpperCase();
    const timeInputMatch = normalized.match(/^(\d{1,2}):(\d{2})$/);
    if (timeInputMatch) {
        return (parseInt(timeInputMatch[1], 10) * 60) + parseInt(timeInputMatch[2], 10);
    }

    const match = normalized.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/);
    if (!match) return null;

    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2] || "0", 10);
    const period = match[3];

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    return (hours * 60) + minutes;
}

function formatTimeInputToDisplay(timeValue) {
    if (!timeValue || timeValue === "--") return "--";
    const minutes = convertTimeTextToMinutes(timeValue);
    if (minutes === null) return timeValue;

    let hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12;

    return `${hours}:${String(mins).padStart(2, "0")} ${period}`;
}

function formatDisplayTimeToInputValue(timeText) {
    const minutes = convertTimeTextToMinutes(timeText);
    if (minutes === null) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

function getTimePartsFromHiddenValue(timeValue) {
    const minutes = convertTimeTextToMinutes(timeValue) ?? 480;
    let hour24 = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const period = hour24 >= 12 ? "PM" : "AM";
    let hour12 = hour24 % 12;
    if (hour12 === 0) hour12 = 12;

    return {
        hour: String(hour12).padStart(2, "0"),
        minute: String(minute).padStart(2, "0"),
        period
    };
}

function getHiddenValueFromTimeParts(hour, minute, period) {
    let hour24 = parseInt(hour, 10);
    const minuteValue = parseInt(minute, 10);

    if (period === "PM" && hour24 !== 12) hour24 += 12;
    if (period === "AM" && hour24 === 12) hour24 = 0;

    return `${String(hour24).padStart(2, "0")}:${String(minuteValue).padStart(2, "0")}`;
}

function syncMetricTimePickerFromHidden(targetId) {
    const hiddenInput = document.getElementById(targetId);
    const picker = document.querySelector(`.metric-time-picker[data-time-target="${targetId}"]`);
    if (!hiddenInput || !picker) return;

    const parts = getTimePartsFromHiddenValue(hiddenInput.value);
    picker.querySelector(".metric-time-hour").value = parts.hour;
    picker.querySelector(".metric-time-minute").value = parts.minute;
    picker.querySelector(".metric-time-period").value = parts.period;
}

function initializeMetricTimePickers() {
    const hourOptions = Array.from({ length: 12 }, (_, index) => {
        const value = String(index + 1).padStart(2, "0");
        return `<option value="${value}">${value}</option>`;
    }).join("");
    const minuteOptions = Array.from({ length: 60 }, (_, index) => {
        const value = String(index).padStart(2, "0");
        return `<option value="${value}">${value}</option>`;
    }).join("");

    document.querySelectorAll(".metric-time-picker").forEach(picker => {
        const targetId = picker.dataset.timeTarget;
        const hiddenInput = document.getElementById(targetId);
        if (!targetId || !hiddenInput) return;

        picker.innerHTML = `
            <select class="metric-time-hour" aria-label="Hour">${hourOptions}</select>
            <select class="metric-time-minute" aria-label="Minute">${minuteOptions}</select>
            <select class="metric-time-period" aria-label="AM or PM">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
        `;

        const updateHiddenTime = () => {
            const hour = picker.querySelector(".metric-time-hour").value;
            const minute = picker.querySelector(".metric-time-minute").value;
            const period = picker.querySelector(".metric-time-period").value;
            hiddenInput.value = getHiddenValueFromTimeParts(hour, minute, period);

            if (targetId.startsWith("custom-")) updateLoggedCustomHoursField();
            if (targetId.startsWith("edit-")) updateEditLogHoursField();
        };

        picker.querySelectorAll("select").forEach(select => {
            select.addEventListener("change", updateHiddenTime);
        });

        syncMetricTimePickerFromHidden(targetId);
    });
}

function calculateManualShiftHours(amIn, amOut, pmIn, pmOut, noLunchBreak) {
    const amStart = convertTimeTextToMinutes(amIn);
    const amEnd = convertTimeTextToMinutes(amOut);
    const pmStart = convertTimeTextToMinutes(pmIn);
    const pmEnd = convertTimeTextToMinutes(pmOut);
    let totalMinutes = 0;

    if (amStart !== null && amEnd !== null && amEnd > amStart) totalMinutes += amEnd - amStart;
    if (pmStart !== null && pmEnd !== null && pmEnd > pmStart) totalMinutes += pmEnd - pmStart;

    if (noLunchBreak && amStart !== null && pmEnd !== null && pmEnd > amStart) {
        totalMinutes = pmEnd - amStart;
    }

    return Math.max(0, totalMinutes / 60);
}

function updateLoggedCustomHoursField() {
    const totalHours = calculateManualShiftHours(
        document.getElementById("custom-am-in").value,
        document.getElementById("custom-am-out").value,
        document.getElementById("custom-pm-in").value,
        document.getElementById("custom-pm-out").value,
        document.getElementById("custom-no-lunch").checked
    );
    document.getElementById("custom-total-hours").value = totalHours.toFixed(2);
}

["custom-am-in", "custom-am-out", "custom-pm-in", "custom-pm-out", "custom-no-lunch"].forEach(inputId => {
    document.getElementById(inputId).addEventListener("input", updateLoggedCustomHoursField);
    document.getElementById(inputId).addEventListener("change", updateLoggedCustomHoursField);
});

function updateEditLogHoursField() {
    const totalHours = calculateManualShiftHours(
        document.getElementById("edit-am-in").value,
        document.getElementById("edit-am-out").value,
        document.getElementById("edit-pm-in").value,
        document.getElementById("edit-pm-out").value,
        document.getElementById("edit-no-lunch").checked
    );
    document.getElementById("edit-total-hours").value = totalHours.toFixed(2);
}

["edit-am-in", "edit-am-out", "edit-pm-in", "edit-pm-out", "edit-no-lunch"].forEach(inputId => {
    document.getElementById(inputId).addEventListener("input", updateEditLogHoursField);
    document.getElementById(inputId).addEventListener("change", updateEditLogHoursField);
});

initializeMetricTimePickers();

window.openEditLogRowWorkspace = function(index) {
    if (!appData || !appData.logs || !appData.logs[index]) return;

    const log = appData.logs[index];
    document.getElementById("edit-log-index").value = index;
    document.getElementById("edit-log-date-text").value = getFormattedAcademicDate(log.date);
    document.getElementById("edit-am-in").value = formatDisplayTimeToInputValue(log.amIn);
    document.getElementById("edit-am-out").value = formatDisplayTimeToInputValue(log.amOut);
    document.getElementById("edit-pm-in").value = formatDisplayTimeToInputValue(log.pmIn);
    document.getElementById("edit-pm-out").value = formatDisplayTimeToInputValue(log.pmOut);
    ["edit-am-in", "edit-am-out", "edit-pm-in", "edit-pm-out"].forEach(syncMetricTimePickerFromHidden);
    document.getElementById("edit-no-lunch").checked = Boolean(log.noLunchBreak);
    document.getElementById("edit-status-type").value = log.type || "present";
    document.getElementById("edit-total-hours").value = (parseFloat(log.total) || 0).toFixed(2);
    editLogModal.style.display = "flex";
};

closeEditModalBtn.addEventListener("click", () => {
    editLogModal.style.display = "none";
});

saveEditLogBtn.addEventListener("click", async () => {
    const index = parseInt(document.getElementById("edit-log-index").value, 10);
    if (isNaN(index) || !appData || !appData.logs || !appData.logs[index]) return;

    const previousTotal = parseFloat(appData.logs[index].total) || 0;
    const selectedType = document.getElementById("edit-status-type").value;
    const noLunchBreak = document.getElementById("edit-no-lunch").checked;
    let amIn = document.getElementById("edit-am-in").value;
    let amOut = document.getElementById("edit-am-out").value;
    let pmIn = document.getElementById("edit-pm-in").value;
    let pmOut = document.getElementById("edit-pm-out").value;
    let total = parseFloat(document.getElementById("edit-total-hours").value) || 0;

    if (selectedType === "present") {
        amIn = "8:00 AM"; amOut = "12:00 PM"; pmIn = "1:00 PM"; pmOut = "5:00 PM"; total = 8;
    } else if (selectedType === "half-day") {
        amIn = "8:00 AM"; amOut = "12:00 PM"; pmIn = "--"; pmOut = "--"; total = 4;
    } else if (selectedType === "absent" || selectedType === "holiday") {
        amIn = selectedType.toUpperCase(); amOut = selectedType.toUpperCase();
        pmIn = selectedType.toUpperCase(); pmOut = selectedType.toUpperCase(); total = 0;
    } else {
        total = calculateManualShiftHours(amIn, amOut, pmIn, pmOut, noLunchBreak);
        amIn = formatTimeInputToDisplay(amIn);
        amOut = formatTimeInputToDisplay(amOut);
        pmIn = formatTimeInputToDisplay(pmIn);
        pmOut = formatTimeInputToDisplay(pmOut);
    }

    appData.logs[index] = {
        ...appData.logs[index],
        amIn,
        amOut,
        pmIn,
        pmOut,
        total,
        type: selectedType,
        noLunchBreak
    };
    appData.hoursEarned = Math.max(0, (parseFloat(appData.hoursEarned) || 0) - previousTotal + total);

    await pushDataUpdateToCloudFirestore();
    synchronizeSystemUIPanels();
    editLogModal.style.display = "none";
});

const statusPicker = document.getElementById("shift-status-picker");
statusPicker.addEventListener("change", () => {
    const manualInputsBox = document.getElementById("manual-time-inputs");
    if (statusPicker.value === "custom") { manualInputsBox.style.display = "block"; updateLoggedCustomHoursField(); }
    else { manualInputsBox.style.display = "none"; }
});

document.getElementById("confirm-log-btn").addEventListener("click", async () => {
    const datePicker = document.getElementById("shift-date-picker"); const targetDate = datePicker.value; const chosenStatus = statusPicker.value;
    if (!targetDate) { alert("Please select a valid date."); return; }
    if (appData.logs.some(l => l.date === targetDate)) { alert("Log already exists."); return; }

    let hoursToLog = 0; let amIn = "--", amOut = "--", pmIn = "--", pmOut = "--";
    if (chosenStatus === "present") { hoursToLog = 8; amIn = "8:00 AM"; amOut = "12:00 PM"; pmIn = "1:00 PM"; pmOut = "5:00 PM"; }
    else if (chosenStatus === "half-day") { hoursToLog = 4; amIn = "8:00 AM"; amOut = "12:00 PM"; }
    else if (["absent", "holiday"].includes(chosenStatus)) { amIn = chosenStatus.toUpperCase(); amOut = chosenStatus.toUpperCase(); pmIn = chosenStatus.toUpperCase(); pmOut = chosenStatus.toUpperCase(); }
    else if (chosenStatus === "custom") {
        amIn = document.getElementById("custom-am-in").value; amOut = document.getElementById("custom-am-out").value;
        pmIn = document.getElementById("custom-pm-in").value; pmOut = document.getElementById("custom-pm-out").value;
        hoursToLog = calculateManualShiftHours(amIn, amOut, pmIn, pmOut, document.getElementById("custom-no-lunch").checked);
        amIn = formatTimeInputToDisplay(amIn);
        amOut = formatTimeInputToDisplay(amOut);
        pmIn = formatTimeInputToDisplay(pmIn);
        pmOut = formatTimeInputToDisplay(pmOut);
    }
    appData.hoursEarned += hoursToLog; appData.logs.unshift({ date: targetDate, amIn, amOut, pmIn, pmOut, total: hoursToLog, type: chosenStatus, noLunchBreak: document.getElementById("custom-no-lunch").checked });
    await pushDataUpdateToCloudFirestore(); synchronizeSystemUIPanels(); alert("Logged successfully!");
});

window.triggerDeleteCloudLogEntry = async function(index) {
    if (confirm("Delete entry?")) {
        appData.hoursEarned = Math.max(0, appData.hoursEarned - appData.logs[index].total); appData.logs.splice(index, 1);
        await pushDataUpdateToCloudFirestore(); synchronizeSystemUIPanels();
    }
};

clearAllDtrBtn.addEventListener("click", async () => {
    if (!appData || !appData.logs || appData.logs.length === 0) {
        alert("No DTR records to clear.");
        return;
    }

    const confirmed = confirm("Clear all Daily Time Record entries? This will remove every attendance log and reset earned hours to 0.");
    if (!confirmed) return;

    appData.logs = [];
    appData.hoursEarned = 0.00;
    await pushDataUpdateToCloudFirestore();
    synchronizeSystemUIPanels();
    alert("All DTR records have been cleared.");
});

setTimeout(listenToUserSessionState, 500);
