// JahidPulse - Care and Patient Management System - Main UI Script

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initNotifications();
    setupMobileMenu();
});

// Navigation Active State
function initNavigation() {
    const currentPath = window.location.pathname;
    let page = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    if (page === '') page = 'index.html';

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === page || (page === 'index.html' && (href === './' || href === 'index.html'))) {
            link.classList.add('active');
        } else if (page.startsWith('patient-details.html') && href === 'patients.html') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Notifications dropdown
function initNotifications() {
    const bellBtn = document.getElementById('notif-btn');
    const dropdown = document.getElementById('notif-dropdown');
    const notifCountBadge = document.getElementById('notif-count');
    const notifListContainer = document.getElementById('notif-list');

    if (!bellBtn || !dropdown) return;

    renderNotificationList();

    bellBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && !bellBtn.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });

    const markReadBtn = document.getElementById('mark-all-read');
    if (markReadBtn) {
        markReadBtn.addEventListener('click', () => {
            if (window.JahidPulseStore) {
                JahidPulseStore.markAllNotificationsRead();
            } else if (window.CarePulseStore) {
                CarePulseStore.markAllNotificationsRead();
            }
            renderNotificationList();
            showToast('All notifications marked as read', 'success', 'Updated');
        });
    }
}

function renderNotificationList() {
    const notifCountBadge = document.getElementById('notif-count');
    const notifListContainer = document.getElementById('notif-list');
    if (!notifListContainer) return;

    const store = window.JahidPulseStore || window.CarePulseStore;
    const notifs = store ? store.getNotifications() : [];
    const unread = notifs.filter(n => !n.read).length;

    if (notifCountBadge) {
        if (unread > 0) {
            notifCountBadge.textContent = unread;
            notifCountBadge.classList.remove('hidden');
        } else {
            notifCountBadge.classList.add('hidden');
        }
    }

    if (notifs.length === 0) {
        notifListContainer.innerHTML = '<div class="p-4 text-center text-sm text-slate-400">No notifications</div>';
        return;
    }

    notifListContainer.innerHTML = notifs.map(n => {
        let iconBg = 'bg-teal-100 text-teal-700';
        let icon = 'fa-info-circle';
        if (n.type === 'alert') {
            iconBg = 'bg-rose-100 text-rose-600';
            icon = 'fa-triangle-exclamation';
        } else if (n.type === 'warning') {
            iconBg = 'bg-amber-100 text-amber-600';
            icon = 'fa-clock';
        } else if (n.type === 'success') {
            iconBg = 'bg-emerald-100 text-emerald-600';
            icon = 'fa-check-circle';
        }

        return `
            <div class="p-3 border-b border-slate-100 hover:bg-slate-50 transition flex items-start gap-3 ${n.read ? 'opacity-60' : 'bg-teal-50/30'}">
                <div class="w-8 h-8 rounded-full ${iconBg} flex items-center justify-center shrink-0 text-sm">
                    <i class="fa-solid ${icon}"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                        <p class="text-xs font-semibold text-slate-800 truncate">${n.title}</p>
                        <span class="text-[10px] text-slate-400">${n.time}</span>
                    </div>
                    <p class="text-xs text-slate-500 mt-0.5 line-clamp-2">${n.message}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Mobile Menu
function setupMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Global Modal Helpers
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Global Toast System
window.showToast = function (message, type = 'info', title = '') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast flex items-start gap-3 p-4 bg-white rounded-xl shadow-xl border border-slate-100 min-w-[280px] max-w-sm';

    let iconClass = 'fa-circle-info text-teal-600';
    let borderColor = 'border-l-4 border-l-teal-600';

    if (type === 'success') {
        iconClass = 'fa-circle-check text-emerald-500';
        borderColor = 'border-l-4 border-l-emerald-500';
    } else if (type === 'warning') {
        iconClass = 'fa-circle-exclamation text-amber-500';
        borderColor = 'border-l-4 border-l-amber-500';
    } else if (type === 'error') {
        iconClass = 'fa-triangle-exclamation text-rose-500';
        borderColor = 'border-l-4 border-l-rose-500';
    }

    toast.classList.add(borderColor);

    toast.innerHTML = `
        <i class="fa-solid ${iconClass} text-lg mt-0.5"></i>
        <div class="flex-1 min-w-0">
            ${title ? `<h4 class="text-xs font-bold uppercase tracking-wider text-slate-800">${title}</h4>` : ''}
            <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">${message}</p>
        </div>
        <button class="text-slate-400 hover:text-slate-600 text-sm ml-2" onclick="this.parentElement.remove()">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
};
