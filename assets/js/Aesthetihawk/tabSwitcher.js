// tabSwitcher.js
document.addEventListener('DOMContentLoaded', () => {
    const tabContainers = document.querySelectorAll('[data-tab-container]');

    tabContainers.forEach(container => {
        const tabBar = container.querySelector('[data-tab-bar]');
        const tabButtons = Array.from(container.querySelectorAll('[data-tab-button]'));
        const tabContents = Array.from(container.querySelectorAll('[data-tab-content]'));
        const underline = container.querySelector('[data-tab-underline]');
        let currentTab = tabButtons[0]?.dataset.tabButton;

        function moveUnderline(tabId, animate = true) {
            const tabBtn = container.querySelector(`[data-tab-button="${tabId}"]`);
            if (!tabBtn) return;
            const tabRect = tabBtn.getBoundingClientRect();
            const barRect = tabBar.getBoundingClientRect();
            const left = tabRect.left - barRect.left + tabBar.scrollLeft;
            const width = tabRect.width;
            underline.style.transition = animate ? 'all 0.3s cubic-bezier(.4,0,.2,1)' : 'none';
            underline.style.left = `${left}px`;
            underline.style.width = `${width}px`;
        }

        function switchTab(newTab) {
            if (newTab === currentTab) return;

            const oldIdx = tabButtons.findIndex(btn => btn.dataset.tabButton === currentTab);
            const newIdx = tabButtons.findIndex(btn => btn.dataset.tabButton === newTab);
            const direction = newIdx > oldIdx ? 'left' : 'right';

            const oldContent = container.querySelector(`[data-tab-content="${currentTab}"]`);
            const newContent = container.querySelector(`[data-tab-content="${newTab}"]`);

            tabButtons.forEach(btn => btn.classList.remove('active', 'text-blue-500', 'border-blue-500'));
            container.querySelector(`[data-tab-button="${newTab}"]`)
                .classList.add('active', 'text-blue-500', 'border-blue-500');

            newContent.classList.remove('hidden', 'slide-in-left', 'slide-in-right', 'active');
            newContent.classList.add('tab-content', direction === 'left' ? 'slide-in-right' : 'slide-in-left', 'animating');

            oldContent.classList.remove('slide-in-left', 'slide-in-right', 'active');
            oldContent.classList.add(direction === 'left' ? 'slide-out-left' : 'slide-out-right', 'animating');

            moveUnderline(newTab, true);

            setTimeout(() => {
                oldContent.classList.remove('slide-out-left', 'slide-out-right', 'animating');
                oldContent.classList.add('hidden');
                newContent.classList.remove('slide-in-left', 'slide-in-right', 'animating');
                newContent.classList.add('active');
                currentTab = newTab;
            }, 300);
        }

        tabButtons.forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                switchTab(btn.dataset.tabButton);
            });
        });

        window.addEventListener('resize', () => moveUnderline(currentTab, false));
        setTimeout(() => moveUnderline(currentTab, false), 10);
    });
});
