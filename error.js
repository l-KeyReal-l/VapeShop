class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        // Отслеживаем онлайн/оффлайн статус
        window.addEventListener('online', () => this.hideOfflineMessage());
        window.addEventListener('offline', () => this.showOfflineMessage());
        
        // Отслеживаем ошибки загрузки страницы
        window.addEventListener('error', (e) => this.handlePageError(e));
        
        // Проверяем статус при загрузке
        if (!navigator.onLine) {
            this.showOfflineMessage();
        }
    }

    showOfflineMessage() {
        if (document.querySelector('.offline-message')) return;
        
        const offlineHTML = `
            <div class="offline-message">
                <div class="offline-content">
                    <div class="offline-icon">📡</div>
                    <h3>Нет соединения с интернетом</h3>
                    <p>Проверьте подключение к сети и попробуйте снова</p>
                    <button onclick="location.reload()" class="btn btn-primary">Обновить страницу</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', offlineHTML);
    }

    hideOfflineMessage() {
        const offlineMsg = document.querySelector('.offline-message');
        if (offlineMsg) {
            offlineMsg.remove();
        }
    }

    handlePageError(error) {
        console.error('Page error:', error);
        
        // Показываем ошибку только для критических сбоев
        if (this.isCriticalError(error)) {
            this.showErrorPage();
        }
    }

    isCriticalError(error) {
        // Критические ошибки: загрузка ресурсов, скриптов и т.д.
        return error.target && (
            error.target.tagName === 'SCRIPT' || 
            error.target.tagName === 'LINK' ||
            error.target.tagName === 'IMG'
        );
    }

    showErrorPage() {
        const errorHTML = `
            <div class="error-overlay">
                <div class="error-content">
                    <div class="error-icon">🚨</div>
                    <h3>Что-то пошло не так</h3>
                    <p>Произошла непредвиденная ошибка. Мы уже работаем над исправлением.</p>
                    <div class="error-actions">
                        <button onclick="location.reload()" class="btn btn-primary">Перезагрузить</button>
                        <button onclick="history.back()" class="btn btn-ghost">Назад</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.innerHTML = errorHTML;
    }
}

// Инициализация
const errorHandler = new ErrorHandler();
