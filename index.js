// ===================== DOM CORE SELECTORS =====================
const sideMenu = document.querySelector("aside");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");

const navDashboard = document.getElementById("nav-dashboard");
const navCalendar = document.getElementById("nav-calendar");
const navDtr = document.getElementById("nav-dtr");
const navJournal = document.getElementById("nav-journal");
const downloadDtrBtnMatrix = document.getElementById("download-dtr-btn-matrix");
const navDownloadJournal = document.getElementById("nav-download-journal");
const navLogout = document.getElementById("nav-logout");
const clearAllDtrBtn = document.getElementById("clear-all-dtr-btn");

const dashboardView = document.getElementById("dashboard-view");
const calendarView = document.getElementById("calendar-view");
const dtrView = document.getElementById("dtr-view");
const journalView = document.getElementById("journal-view");
const shortcutToDtr = document.getElementById("shortcut-to-dtr");
const shortcutToCalendar = document.getElementById("shortcut-to-calendar");
const shortcutToJournal = document.getElementById("shortcut-to-journal");
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
const deleteEntryConfirmModal = document.getElementById("delete-entry-confirm-modal");
const closeDeleteEntryConfirmModal = document.getElementById("close-delete-entry-confirm-modal");
const cancelDeleteEntryBtn = document.getElementById("cancel-delete-entry-btn");
const confirmDeleteEntryBtn = document.getElementById("confirm-delete-entry-btn");
const clearDtrConfirmModal = document.getElementById("clear-dtr-confirm-modal");
const closeClearDtrConfirmModal = document.getElementById("close-clear-dtr-confirm-modal");
const cancelClearDtrBtn = document.getElementById("cancel-clear-dtr-btn");
const confirmClearDtrBtn = document.getElementById("confirm-clear-dtr-btn");
const deleteJournalConfirmModal = document.getElementById("delete-journal-confirm-modal");
const closeDeleteJournalConfirmModal = document.getElementById("close-delete-journal-confirm-modal");
const cancelDeleteJournalBtn = document.getElementById("cancel-delete-journal-btn");
const confirmDeleteJournalBtn = document.getElementById("confirm-delete-journal-btn");
const saveJournalEntryBtn = document.getElementById("save-journal-entry-btn");
const journalDateInput = document.getElementById("journal-date");
const journalWeekInput = document.getElementById("journal-week");
const journalTitleInput = document.getElementById("journal-title");
const journalRemarkInput = document.getElementById("journal-remark");
const journalCurrentDateTitle = document.getElementById("journal-current-date-title");
const journalEntryText = document.getElementById("journal-entry-text");
const journalPreviewList = document.getElementById("journal-preview-list");
const journalEntryList = document.getElementById("journal-entry-list");
const editJournalModal = document.getElementById("edit-journal-modal");
const closeEditJournalModal = document.getElementById("close-edit-journal-modal");
const saveEditJournalBtn = document.getElementById("save-edit-journal-btn");
const editJournalIdInput = document.getElementById("edit-journal-id");
const editJournalDateInput = document.getElementById("edit-journal-date");
const editJournalWeekInput = document.getElementById("edit-journal-week");
const editJournalTitleInput = document.getElementById("edit-journal-title");
const editJournalRemarkInput = document.getElementById("edit-journal-remark");
const editJournalEntryText = document.getElementById("edit-journal-entry-text");

// IDENTITY GATEWAY RE-ALLOCATION SELECTORS
const loginFieldsBox = document.getElementById("login-fields-box");
const registerFieldsBox = document.getElementById("register-fields-box");
const goToRegisterLink = document.getElementById("go-to-register-trigger");
const goToLoginLink = document.getElementById("go-to-login-link");
const loginTriggerBtn = document.getElementById("login-trigger-btn");
const registerTriggerBtn = document.getElementById("core-register-trigger-action-btn");
const registerPasswordInput = document.getElementById("reg-password");
const passwordStrengthMeter = document.getElementById("password-strength-meter");
const forgotPasswordTrigger = document.getElementById("forgot-password-trigger");
const forgotPasswordModal = document.getElementById("forgot-password-modal");
const closeForgotPasswordModal = document.getElementById("close-forgot-password-modal");
const sendResetEmailBtn = document.getElementById("send-reset-email-btn");
const backToAuthFromSetupBtn = document.getElementById("back-to-auth-from-setup-btn");
const appMessageModal = document.getElementById("app-message-modal");
const appMessageTitle = document.getElementById("app-message-title");
const appMessageText = document.getElementById("app-message-text");
const appMessageIcon = document.getElementById("app-message-icon");
const closeAppMessageModal = document.getElementById("close-app-message-modal");
const appMessageOkBtn = document.getElementById("app-message-ok-btn");
const logoutConfirmModal = document.getElementById("logout-confirm-modal");
const closeLogoutConfirmModal = document.getElementById("close-logout-confirm-modal");
const cancelLogoutBtn = document.getElementById("cancel-logout-btn");
const confirmLogoutBtn = document.getElementById("confirm-logout-btn");

const progressFill = document.querySelector(".progress-bar-fill");
const progressText = document.querySelector(".intern-progress small");

// Global Cache Storage States
let appData = null; let currentActiveUid = null; let currentNavDate = new Date();
let pendingDeleteLogIndex = null;
let editingJournalId = null;
let pendingDeleteJournalId = null;
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

function escapeHTML(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function ensureAppCollections() {
    if (!appData) return;
    if (!Array.isArray(appData.logs)) appData.logs = [];
    if (!Array.isArray(appData.journals)) appData.journals = [];
    appData.journals = appData.journals.map(entry => ({
        id: entry.id || `journal-${entry.date || "entry"}-${Math.random().toString(36).slice(2, 8)}`,
        ...entry
    }));
}

function getSortedJournalEntries() {
    ensureAppCollections();
    if (!appData) return [];
    return [...appData.journals].sort((a, b) => {
        const weekDiff = getJournalEntryWeekNumber(a) - getJournalEntryWeekNumber(b);
        if (weekDiff !== 0) return weekDiff;
        return new Date(a.date) - new Date(b.date);
    });
}

function getJournalEntryWeekNumber(entry) {
    const storedWeek = parseInt(entry?.weekNumber, 10);
    if (!isNaN(storedWeek) && storedWeek > 0) return storedWeek;

    if (!entry?.date || !appData?.startDate) return 1;
    const startDate = new Date(appData.startDate);
    const entryDate = new Date(entry.date);
    const diffDays = Math.max(0, Math.floor((entryDate - startDate) / 86400000));
    return Math.floor(diffDays / 7) + 1;
}

function getJournalWeekGroups(entries) {
    return entries.reduce((groups, entry) => {
        const weekNumber = getJournalEntryWeekNumber(entry);
        const existingGroup = groups.find(group => group.weekNumber === weekNumber);
        if (existingGroup) {
            existingGroup.entries.push(entry);
        } else {
            groups.push({ weekNumber, entries: [entry] });
        }
        return groups;
    }, []);
}

function updateJournalComposerDateTitle() {
    if (!journalCurrentDateTitle || !journalDateInput) return;
    if (!journalDateInput.value) {
        journalCurrentDateTitle.textContent = "Today";
        return;
    }
    const date = new Date(journalDateInput.value);
    journalCurrentDateTitle.textContent = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

function syncJournalWeekFromDate() {
    if (!journalDateInput || !journalWeekInput || !journalDateInput.value) return;
    journalWeekInput.value = getJournalEntryWeekNumber({ date: journalDateInput.value });
}

function createJournalItemHTML(entry) {
    const text = escapeHTML(entry.text || "No description added.");
    const title = escapeHTML(entry.title || "Untitled journal entry");
    const remark = escapeHTML(entry.remark || "Finished");
    return `
        <article class="journal-item" data-journal-id="${escapeHTML(entry.id)}">
            <div class="journal-report-date">
                <span>${getFormattedAcademicDate(entry.date)}</span>
            </div>
            <div class="journal-report-task">
                <div class="journal-actions">
                    <button type="button" class="journal-menu-trigger" data-journal-id="${escapeHTML(entry.id)}" aria-label="Activity entry actions">
                        <span class="material-icons-sharp">more_horiz</span>
                    </button>
                    <div class="journal-action-menu">
                        <button type="button" data-journal-action="edit" data-journal-id="${escapeHTML(entry.id)}">Edit</button>
                        <button type="button" data-journal-action="delete" data-journal-id="${escapeHTML(entry.id)}">Delete</button>
                    </div>
                </div>
                <div class="journal-item-meta">
                    <h3>${title}</h3>
                </div>
                <p>${text}</p>
            </div>
            <div class="journal-report-remark">
                <span>${remark}</span>
            </div>
        </article>
    `;
}

function createJournalWeekGroupHTML(group) {
    return `
        <section class="journal-week-group">
            <div class="journal-week-header">
                <h3>Week No. ${group.weekNumber}</h3>
                <span>${group.entries.length} ${group.entries.length === 1 ? "entry" : "entries"}</span>
            </div>
            <div class="journal-week-table">
                ${group.entries.map(createJournalItemHTML).join("")}
            </div>
        </section>
    `;
}

function renderJournalPanels() {
    if (!journalPreviewList || !journalEntryList) return;
    const entries = getSortedJournalEntries();

    if (entries.length === 0) {
        journalPreviewList.innerHTML = `<p class="text-muted">No activity entries yet.</p>`;
        journalEntryList.innerHTML = `<p class="text-muted">No activity entries yet.</p>`;
        return;
    }

    journalPreviewList.innerHTML = entries.slice(-3).reverse().map(createJournalItemHTML).join("");
    journalEntryList.innerHTML = getJournalWeekGroups(entries).map(createJournalWeekGroupHTML).join("");
}

function synchronizeSystemUIPanels() { ensureAppCollections(); updateUIMetrics(); renderMonthlyCalendars(); renderDtrTables(); renderJournalPanels(); }

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

function getFriendlyAppMessage(messageOrError) {
    const rawMessage = typeof messageOrError === "string"
        ? messageOrError
        : (messageOrError?.message || "Please try again.");
    const errorCode = typeof messageOrError === "object" ? messageOrError?.code : "";
    const normalized = `${errorCode} ${rawMessage}`.toLowerCase();

    if (normalized.includes("auth/invalid-credential") || normalized.includes("auth/wrong-password")) {
        return "The email or password you entered is incorrect.";
    }
    if (normalized.includes("auth/user-not-found")) return "No account was found with that email address.";
    if (normalized.includes("auth/email-already-in-use")) return "That email is already registered. Please sign in instead.";
    if (normalized.includes("auth/invalid-email")) return "Please enter a valid email address.";
    if (normalized.includes("auth/weak-password")) return "Please use a stronger password with at least 6 characters.";
    if (normalized.includes("auth/too-many-requests")) return "Too many attempts. Please wait a moment and try again.";
    if (normalized.includes("auth/popup-closed-by-user")) return "Google sign-in was cancelled. Please try again.";
    if (normalized.includes("auth/popup-blocked")) return "Your browser blocked the Google sign-in popup. Please allow popups for this site.";
    if (normalized.includes("auth/unauthorized-domain")) return "This website is not yet allowed in Firebase Authentication settings.";
    if (normalized.includes("auth/account-exists-with-different-credential")) return "An account already exists with this email using a different sign-in method.";
    if (normalized.includes("auth/requires-recent-login")) return "For security, please sign in again before deleting your account.";

    return rawMessage.replace(/^firebase:\s*/i, "").replace(/\s*\(auth\/[^)]+\)\.?$/i, ".");
}

function showAppMessage(messageOrError, title = "Metric Notice", type = "info") {
    appMessageTitle.textContent = title;
    appMessageText.textContent = getFriendlyAppMessage(messageOrError);
    appMessageIcon.textContent = type === "success" ? "check_circle" : type === "error" ? "error" : "info";
    appMessageModal.classList.remove("success", "error", "info");
    appMessageModal.classList.add(type);
    appMessageModal.style.display = "flex";
}

function closeAppMessage() {
    appMessageModal.style.display = "none";
}

closeAppMessageModal.addEventListener("click", closeAppMessage);
appMessageOkBtn.addEventListener("click", closeAppMessage);

function openMobileSidebar() {
    sideMenu.classList.add("sidebar-open");
    document.body.classList.add("sidebar-drawer-open");
}

function closeMobileSidebar() {
    sideMenu.classList.remove("sidebar-open");
    document.body.classList.remove("sidebar-drawer-open");
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

function getPasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (!password) return { level: "", label: "Password strength" };
    if (score <= 2) return { level: "weak", label: "Weak password" };
    if (score <= 4) return { level: "medium", label: "Medium password" };
    return { level: "strong", label: "Strong password" };
}

function updatePasswordStrengthMeter() {
    const strength = getPasswordStrength(registerPasswordInput.value);
    passwordStrengthMeter.classList.remove("visible", "weak", "medium", "strong");

    if (!strength.level) {
        passwordStrengthMeter.style.display = "none";
        passwordStrengthMeter.innerHTML = `<span class="material-icons-sharp" style="font-size:0.85rem; vertical-align:middle;">info</span> Password must be 8+ chars with a number & uppercase letter.`;
        return;
    }

    passwordStrengthMeter.style.display = "flex";
    passwordStrengthMeter.classList.add("visible", strength.level);
    passwordStrengthMeter.innerHTML = `<span class="material-icons-sharp" style="font-size:0.85rem; vertical-align:middle;">${strength.level === "strong" ? "check_circle" : "info"}</span> ${strength.label}`;
}

registerPasswordInput.addEventListener("input", updatePasswordStrengthMeter);

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
        showAppMessage("Please enter your email address.", "Email Required", "info");
        return;
    }

    if (!window.firebaseCloudActiveState) {
        showAppMessage("Password reset is only available when cloud authentication is active.", "Password Reset", "error");
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
        showAppMessage("Password reset email sent. Please check your inbox and spam folder for the reset link.", "Reset Link Sent", "success");
        forgotPasswordModal.style.display = "none";
        document.getElementById("reset-email").value = "";
    } catch (error) {
        console.error("Password Reset Error:", error);
        if (error.code === 'auth/user-not-found') {
            showAppMessage("No account found with this email address.", "Password Reset", "error");
        } else if (error.code === 'auth/invalid-email') {
            showAppMessage("Invalid email address format.", "Password Reset", "error");
        } else if (error.code === 'auth/too-many-requests') {
            showAppMessage("Too many requests. Please try again later.", "Password Reset", "error");
        } else if (error.code === 'auth/unauthorized-continue-uri') {
            showAppMessage("Password reset failed because the reset redirect URL is not authorized in Firebase.", "Password Reset", "error");
        } else {
            showAppMessage(error, "Password Reset", "error");
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
                    journals: [],
                    email: user.email || "",
                    displayName: user.displayName || "",
                    needsProfileSetup: true,
                    provider: user.providerData?.[0]?.providerId || "firebase"
                };
                await setDoc(docRef, appData);
            }
            ensureAppCollections();

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
            showAppMessage(error, "Session Error", "error");
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

    if (!email || !password || !confirmPassword) { showAppMessage("Please complete all registration fields.", "Missing Details", "info"); return; }
    if (password !== confirmPassword) { showAppMessage("The password confirmation does not match.", "Password Mismatch", "error"); return; }

    appData = { studentName: "OJT Intern", school: "BSU", department: "CpE", startDate: new Date().toISOString().split('T')[0], totalGoalHours: 250, hoursEarned: 0.00, logs: [], journals: [], needsProfileSetup: true };

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
    } catch (error) { showAppMessage(error, "Registration Error", "error"); }
});

document.getElementById("save-first-time-profile-btn").addEventListener("click", async () => {
    const name = document.getElementById("first-setup-name").value; const school = document.getElementById("first-setup-school").value;
    const dept = document.getElementById("first-setup-dept").value; const startDate = document.getElementById("first-setup-start-date").value;
    const goal = parseFloat(document.getElementById("first-setup-goal").value);

    if (!name || !school || !dept || !startDate || isNaN(goal)) { showAppMessage("Please complete your profile information.", "Profile Setup", "info"); return; }

    appData = {
        ...appData,
        studentName: name,
        school,
        department: dept,
        startDate,
        totalGoalHours: goal,
        hoursEarned: appData?.hoursEarned || 0.00,
        logs: appData?.logs || [],
        journals: appData?.journals || [],
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
        } else { showAppMessage("No local profile cache is active.", "Sign In", "info"); }
        return;
    }
    try {
        const { signInWithEmailAndPassword } = window.firebaseAuthMethods;
        const userCred = await signInWithEmailAndPassword(window.firebaseAuth, email, password);
        localStorage.setItem("METRIC_PERSISTED_UID", userCred.user.uid);
    } catch (error) { showAppMessage(error, "Login Error", "error"); }
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
                showAppMessage(error, "Google Sign-In", "info");
            } else if (error.code === 'auth/popup-blocked') {
                showAppMessage(error, "Google Sign-In", "error");
            } else if (error.code === 'auth/unauthorized-domain') {
                showAppMessage(error, "Google Sign-In", "error");
            } else if (error.code === 'auth/account-exists-with-different-credential') {
                showAppMessage(error, "Google Sign-In", "error");
            } else {
                showAppMessage(error, "Google Sign-In", "error");
            }
        }
    });
});

async function performLogout() {
    logoutConfirmModal.style.display = "none";
    localStorage.removeItem("METRIC_PERSISTED_UID");
    localStorage.removeItem(ACTIVE_WORKSPACE_VIEW_KEY);
    if (!window.firebaseCloudActiveState) { location.reload(); return; }
    const { signOut } = window.firebaseAuthMethods;
    await signOut(window.firebaseAuth);
    location.reload();
}

function closeLogoutConfirmModalPanel() {
    logoutConfirmModal.style.display = "none";
}

navLogout.addEventListener("click", (e) => {
    e.preventDefault();
    logoutConfirmModal.style.display = "flex";
});
closeLogoutConfirmModal.addEventListener("click", closeLogoutConfirmModalPanel);
cancelLogoutBtn.addEventListener("click", closeLogoutConfirmModalPanel);
confirmLogoutBtn.addEventListener("click", performLogout);

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
            showAppMessage(err, "Delete Account", "error");
        } else {
            showAppMessage(err, "Delete Account", "error");
        }
    } finally {
        confirmDeleteAccountBtn.disabled = false;
        confirmDeleteAccountBtn.innerHTML = `<span class="material-icons-sharp" style="font-size:1rem; vertical-align:middle; margin-right:0.2rem;">delete_forever</span> Yes, delete account`;
    }
});

// ===================== WORKSPACE NAVIGATION SWITCHERS =====================
function clearAllViewActiveStates() {
    document.querySelectorAll(".sidebar a").forEach(link => link.classList.remove("active"));
    dashboardView.style.display = "none"; calendarView.style.display = "none"; dtrView.style.display = "none"; journalView.style.display = "none";
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
    } else if (viewName === "journal") {
        navJournal.classList.add("active");
        journalView.style.display = "block";
        renderJournalPanels();
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
navJournal.addEventListener("click", (e) => { e.preventDefault(); showWorkspaceView("journal"); });
shortcutToCalendar.addEventListener("click", () => showWorkspaceView("calendar"));
shortcutToDtr.addEventListener("click", () => showWorkspaceView("dtr"));
shortcutToJournal.addEventListener("click", () => showWorkspaceView("journal"));

menuBtn.addEventListener("click", () => {
    openMobileSidebar();
});

closeBtn.addEventListener("click", () => {
    closeMobileSidebar();
});

[navDashboard, navCalendar, navDtr, navJournal, navLogout].forEach(navItem => {
    navItem.addEventListener("click", () => {
        closeMobileSidebar();
    });
});

document.addEventListener("click", (event) => {
    if (!document.body.classList.contains("sidebar-drawer-open")) return;
    if (sideMenu.contains(event.target) || menuBtn.contains(event.target)) return;
    closeMobileSidebar();
});

// ===================== MS-EXCEL SHEET CONVERTER ENGINE =====================
const triggerExcelSpreadsheetDownload = (e) => {
    if (e) e.preventDefault();
    if (!appData || !appData.logs || appData.logs.length === 0) { showAppMessage("No logging records found to export.", "Download DTR", "info"); return; }
    
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

if (downloadDtrBtnMatrix) {
    downloadDtrBtnMatrix.addEventListener("click", triggerExcelSpreadsheetDownload);
}

if (navDownloadJournal) {
    navDownloadJournal.addEventListener("click", (e) => {
        e.preventDefault();
        triggerJournalWordDownload();
    });
}

function getJournalExportWeekLabel(entries) {
    const firstWeek = getJournalEntryWeekNumber(entries[0]);
    return `Week No. ${firstWeek}`;
}

function createJournalTaskListHTML(text) {
    const lines = String(text || "No activities added.")
        .split(/\r?\n/)
        .map(line => line.replace(/^[\s>*•-]+/, "").trim())
        .filter(Boolean);

    return `<ul>${lines.map(line => `<li>${escapeHTML(line)}</li>`).join("")}</ul>`;
}

function triggerJournalWordDownload() {
    ensureAppCollections();
    const entries = getSortedJournalEntries().sort((a, b) => new Date(a.date) - new Date(b.date));

    if (!entries.length) {
        showAppMessage("No activity entries found to export.", "Daily Activities", "info");
        return;
    }

    const safeStudentName = appData.studentName.replace(/[^\w\s-]/g, "").replace(/\s+/g, "_");
    const exportDate = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    const createJournalRows = (groupEntries) => groupEntries.map(entry => `
        <tr>
            <td class="date-cell">${getFormattedAcademicDate(entry.date)}</td>
            <td class="task-cell">
                <strong>${escapeHTML(entry.title || "Daily accomplishment")}</strong>
                ${createJournalTaskListHTML(entry.text)}
            </td>
            <td class="remark-cell">${escapeHTML(entry.remark || "Finished")}</td>
        </tr>
    `).join("");

    const journalWeekTables = getJournalWeekGroups(entries).map(group => `
        <div class="week-label">Week No. ${group.weekNumber}</div>
        <table class="journal-report-table">
            <thead>
                <tr>
                    <th style="width:15%;">Date</th>
                    <th style="width:65%;">List of activities/tasks</th>
                    <th style="width:20%;">Remarks (Finished/On-going)</th>
                </tr>
            </thead>
            <tbody>${createJournalRows(group.entries)}</tbody>
        </table>
    `).join("");

    const wordTemplate = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
        <meta charset="UTF-8">
        <!--[if gte mso 9]>
        <xml>
            <w:WordDocument>
                <w:View>Print</w:View>
                <w:Zoom>100</w:Zoom>
                <w:DoNotOptimizeForBrowser/>
            </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
            @page {
                size: 8.5in 11in;
                margin: 0.55in 0.65in 0.65in 0.65in;
            }
            body {
                font-family: "Times New Roman", serif;
                color: #000000;
                background: #ffffff;
                font-size: 10pt;
            }
            .report-title {
                text-align: center;
                font-weight: 700;
                font-size: 10.5pt;
                margin: 0 0 18px;
            }
            .student-meta {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 12px;
            }
            .student-meta td {
                border: none;
                padding: 1px 0;
                font-size: 9.5pt;
            }
            .week-label {
                text-align: center;
                font-weight: 700;
                margin: 6px 0 6px;
            }
            .journal-report-table {
                width: 100%;
                border-collapse: collapse;
                table-layout: fixed;
            }
            .journal-report-table th,
            .journal-report-table td {
                border: 1px solid #000000;
                padding: 4px 5px;
                vertical-align: top;
                font-size: 9pt;
            }
            .journal-report-table th {
                text-align: center;
                font-weight: 700;
            }
            .date-cell {
                width: 15%;
                text-align: center;
                vertical-align: middle !important;
            }
            .task-cell {
                width: 65%;
            }
            .task-cell strong {
                display: block;
                margin-bottom: 2px;
            }
            .task-cell ul {
                margin: 2px 0 0 16px;
                padding: 0;
            }
            .remark-cell {
                width: 20%;
                text-align: center;
                vertical-align: middle !important;
            }
            .signatures {
                margin-top: 28px;
                font-size: 9pt;
            }
            .signature-line {
                display: inline-block;
                min-width: 210px;
                border-bottom: 1px solid #000000;
                padding: 0 8px 1px;
                text-align: center;
                font-size: 8.5pt;
            }
            .signature-label {
                display: block;
                margin-top: 1px;
                font-weight: 700;
                font-size: 8pt;
            }
        </style>
    </head>
    <body>
        <div class="report-title">STUDENT INTERNSHIP WEEKLY ACCOMPLISHMENT REPORT</div>
        <table class="student-meta">
            <tr><td>Name of Student: <strong>${escapeHTML((appData.studentName || "").toUpperCase())}</strong></td></tr>
            <tr><td>Department: <strong>${escapeHTML((appData.department || "N/A").toUpperCase())}</strong></td></tr>
        </table>
        ${journalWeekTables}
        <div class="signatures">
            <p><strong>Prepared by:</strong></p>
            <p><span class="signature-line">${escapeHTML((appData.studentName || "").toUpperCase())}</span><br><span class="signature-label">Printed Student Name over Signature</span></p>
            <br>
            <p><strong>Reviewed and Approved by:</strong></p>
            <p><span class="signature-line">&nbsp;</span><br><span class="signature-label">Intern Supervisor Name over Signature</span></p>
        </div>
    </body>
    </html>`;

    const blobFile = new Blob([wordTemplate], { type: "application/msword" });
    const downloadUrl = URL.createObjectURL(blobFile);
    const hiddenAnchor = document.createElement("a");
    hiddenAnchor.href = downloadUrl;
    hiddenAnchor.download = `Metric_Daily_Activities_${safeStudentName}.doc`;
    document.body.appendChild(hiddenAnchor);
    hiddenAnchor.click();
    document.body.removeChild(hiddenAnchor);
    URL.revokeObjectURL(downloadUrl);
}

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
if (journalDateInput) journalDateInput.value = new Date().toISOString().split('T')[0];
updateJournalComposerDateTitle();
syncJournalWeekFromDate();
if (journalDateInput) journalDateInput.addEventListener("change", () => {
    updateJournalComposerDateTitle();
    syncJournalWeekFromDate();
});
if (editJournalDateInput) editJournalDateInput.addEventListener("change", () => {
    if (!editJournalDateInput.value || !editJournalWeekInput) return;
    editJournalWeekInput.value = getJournalEntryWeekNumber({ date: editJournalDateInput.value });
});

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
    if (!targetDate) { showAppMessage("Please select a valid date.", "Attendance Log", "info"); return; }
    if (appData.logs.some(l => l.date === targetDate)) { showAppMessage("A log already exists for this date.", "Attendance Log", "info"); return; }

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
    await pushDataUpdateToCloudFirestore(); synchronizeSystemUIPanels(); showAppMessage("Attendance log saved successfully.", "Log Saved", "success");
});

saveJournalEntryBtn.addEventListener("click", async () => {
    const date = journalDateInput.value;
    const weekNumber = Math.max(1, parseInt(journalWeekInput.value, 10) || 1);
    const title = journalTitleInput.value.trim();
    const remark = journalRemarkInput.value;
    const text = journalEntryText.value.trim();

    if (!date) {
        showAppMessage("Please select an activity date.", "Daily Activities", "info");
        return;
    }

    if (!text) {
        showAppMessage("Please list at least one activity or task before saving.", "Daily Activities", "info");
        return;
    }

    ensureAppCollections();
    const existingIndex = editingJournalId
        ? appData.journals.findIndex(entry => entry.id === editingJournalId)
        : appData.journals.findIndex(entry => entry.date === date);
    const entryPayload = {
        id: editingJournalId || appData.journals[existingIndex]?.id || `journal-${Date.now()}`,
        date,
        weekNumber,
        title,
        remark,
        text,
        updatedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
        appData.journals[existingIndex] = entryPayload;
    } else {
        appData.journals.unshift(entryPayload);
    }

    await pushDataUpdateToCloudFirestore();
    renderJournalPanels();
    editingJournalId = null;
    journalTitleInput.value = "";
    journalRemarkInput.value = "Finished";
    journalEntryText.value = "";
    syncJournalWeekFromDate();
    saveJournalEntryBtn.innerHTML = `<span class="material-icons-sharp" style="font-size:1rem; vertical-align:middle; margin-right:0.25rem;">save</span> Save Activity Entry`;
    showAppMessage("Activity entry saved successfully.", "Daily Activities", "success");
});

function closeJournalMenus() {
    document.querySelectorAll(".journal-item.menu-open").forEach(item => item.classList.remove("menu-open"));
}

function handleJournalActionClick(event) {
    const menuTrigger = event.target.closest(".journal-menu-trigger");
    if (menuTrigger) {
        event.stopPropagation();
        const targetItem = menuTrigger.closest(".journal-item");
        const wasOpen = targetItem.classList.contains("menu-open");
        closeJournalMenus();
        if (!wasOpen) targetItem.classList.add("menu-open");
        return;
    }

    const actionButton = event.target.closest("[data-journal-action]");
    if (!actionButton) return;

    const journalId = actionButton.dataset.journalId;
    const action = actionButton.dataset.journalAction;
    const targetEntry = appData?.journals?.find(entry => entry.id === journalId);
    if (!targetEntry) return;

    closeJournalMenus();

    if (action === "edit") {
        editingJournalId = journalId;
        editJournalIdInput.value = journalId;
        editJournalDateInput.value = targetEntry.date || "";
        editJournalWeekInput.value = getJournalEntryWeekNumber(targetEntry);
        editJournalTitleInput.value = targetEntry.title || "";
        editJournalRemarkInput.value = targetEntry.remark || "Finished";
        editJournalEntryText.value = targetEntry.text || "";
        editJournalModal.style.display = "flex";
        return;
    }

    if (action === "delete") {
        pendingDeleteJournalId = journalId;
        deleteJournalConfirmModal.style.display = "flex";
    }
}

journalPreviewList.addEventListener("click", handleJournalActionClick);
journalEntryList.addEventListener("click", handleJournalActionClick);
document.addEventListener("click", (event) => {
    if (event.target.closest(".journal-actions")) return;
    closeJournalMenus();
});

function closeEditJournalModalPanel() {
    editingJournalId = null;
    editJournalModal.style.display = "none";
}

closeEditJournalModal.addEventListener("click", closeEditJournalModalPanel);
saveEditJournalBtn.addEventListener("click", async () => {
    const journalId = editJournalIdInput.value;
    const targetIndex = appData?.journals?.findIndex(entry => entry.id === journalId) ?? -1;
    const date = editJournalDateInput.value;
    const weekNumber = Math.max(1, parseInt(editJournalWeekInput.value, 10) || 1);
    const title = editJournalTitleInput.value.trim();
    const remark = editJournalRemarkInput.value;
    const text = editJournalEntryText.value.trim();

    if (targetIndex < 0) return;
    if (!date) {
        showAppMessage("Please select an activity date.", "Daily Activities", "info");
        return;
    }
    if (!text) {
        showAppMessage("Please list at least one activity or task before saving.", "Daily Activities", "info");
        return;
    }

    appData.journals[targetIndex] = {
        ...appData.journals[targetIndex],
        date,
        weekNumber,
        title,
        remark,
        text,
        updatedAt: new Date().toISOString()
    };

    await pushDataUpdateToCloudFirestore();
    renderJournalPanels();
    closeEditJournalModalPanel();
    showAppMessage("Activity entry updated successfully.", "Daily Activities", "success");
});

function closeDeleteJournalConfirmModalPanel() {
    pendingDeleteJournalId = null;
    deleteJournalConfirmModal.style.display = "none";
}

closeDeleteJournalConfirmModal.addEventListener("click", closeDeleteJournalConfirmModalPanel);
cancelDeleteJournalBtn.addEventListener("click", closeDeleteJournalConfirmModalPanel);
confirmDeleteJournalBtn.addEventListener("click", async () => {
    if (!pendingDeleteJournalId || !appData?.journals) {
        closeDeleteJournalConfirmModalPanel();
        return;
    }

    appData.journals = appData.journals.filter(entry => entry.id !== pendingDeleteJournalId);

    if (editingJournalId === pendingDeleteJournalId) {
        editingJournalId = null;
        journalTitleInput.value = "";
        journalRemarkInput.value = "Finished";
        journalEntryText.value = "";
        saveJournalEntryBtn.innerHTML = `<span class="material-icons-sharp" style="font-size:1rem; vertical-align:middle; margin-right:0.25rem;">save</span> Save Activity Entry`;
    }

    try {
        await pushDataUpdateToCloudFirestore();
        renderJournalPanels();
        showAppMessage("Activity entry deleted successfully.", "Daily Activities", "success");
    } catch (error) {
        showAppMessage(error, "Daily Activities", "error");
    } finally {
        closeDeleteJournalConfirmModalPanel();
    }
});

window.triggerDeleteCloudLogEntry = async function(index) {
    if (!appData || !appData.logs || !appData.logs[index]) return;
    pendingDeleteLogIndex = index;
    deleteEntryConfirmModal.style.display = "flex";
};

function closeDeleteEntryConfirmModalPanel() {
    pendingDeleteLogIndex = null;
    deleteEntryConfirmModal.style.display = "none";
}

closeDeleteEntryConfirmModal.addEventListener("click", closeDeleteEntryConfirmModalPanel);
cancelDeleteEntryBtn.addEventListener("click", closeDeleteEntryConfirmModalPanel);
confirmDeleteEntryBtn.addEventListener("click", async () => {
    if (pendingDeleteLogIndex === null || !appData?.logs?.[pendingDeleteLogIndex]) {
        closeDeleteEntryConfirmModalPanel();
        return;
    }

    appData.hoursEarned = Math.max(0, appData.hoursEarned - appData.logs[pendingDeleteLogIndex].total);
    appData.logs.splice(pendingDeleteLogIndex, 1);
    await pushDataUpdateToCloudFirestore();
    synchronizeSystemUIPanels();
    closeDeleteEntryConfirmModalPanel();
    showAppMessage("DTR entry deleted successfully.", "Daily Time Record", "success");
});

clearAllDtrBtn.addEventListener("click", async () => {
    if (!appData || !appData.logs || appData.logs.length === 0) {
        showAppMessage("No DTR records to clear.", "Daily Time Record", "info");
        return;
    }

    clearDtrConfirmModal.style.display = "flex";
});

function closeClearDtrConfirmModalPanel() {
    clearDtrConfirmModal.style.display = "none";
}

closeClearDtrConfirmModal.addEventListener("click", closeClearDtrConfirmModalPanel);
cancelClearDtrBtn.addEventListener("click", closeClearDtrConfirmModalPanel);
confirmClearDtrBtn.addEventListener("click", async () => {
    appData.logs = [];
    appData.hoursEarned = 0.00;
    await pushDataUpdateToCloudFirestore();
    synchronizeSystemUIPanels();
    closeClearDtrConfirmModalPanel();
    showAppMessage("All DTR records have been cleared.", "Daily Time Record", "success");
});

setTimeout(listenToUserSessionState, 500);