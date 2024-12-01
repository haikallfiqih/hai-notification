import './styles.css';

class HaiNotification {
    constructor(options = {}) {
        this.options = {
            position: options.position || 'top-right',
            animation: options.animation || 'scale-up',
            theme: options.theme || 'light',
            duration: options.duration || 3000,
            showProgress: options.showProgress ?? true,
            closeOnEsc: options.closeOnEsc ?? true,
            closeOnClickOutside: options.closeOnClickOutside ?? true,
            container: options.container || document.body,
            maxNotifications: options.maxNotifications || 5,
            spacing: options.spacing || '1rem',
            width: options.width || '24rem',
            zIndex: options.zIndex || 1000,
            customStyles: options.customStyles || {},
            onShow: options.onShow || null,
            onClose: options.onClose || null,
            onClick: options.onClick || null,
            template: options.template || null
        };
        
        this.notifications = new Set();
        this.init();
    }

    init() {
        if (this.options.closeOnEsc) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeAll();
                }
            });
        }
    }

    createContainer() {
        const position = this.options.position;
        let container = this.options.container.querySelector(`.hai-notification-container[data-position="${position}"]`);
        
        if (!container) {
            container = document.createElement('div');
            container.className = 'hai-notification-container';
            container.setAttribute('data-position', position);
            
            // Apply position-specific styles
            switch (position) {
                case 'top-right':
                    container.style.top = this.options.spacing;
                    container.style.right = this.options.spacing;
                    break;
                case 'top-left':
                    container.style.top = this.options.spacing;
                    container.style.left = this.options.spacing;
                    break;
                case 'bottom-right':
                    container.style.bottom = this.options.spacing;
                    container.style.right = this.options.spacing;
                    break;
                case 'bottom-left':
                    container.style.bottom = this.options.spacing;
                    container.style.left = this.options.spacing;
                    break;
                case 'center':
                    container.style.top = '50%';
                    container.style.left = '50%';
                    container.style.transform = 'translate(-50%, -50%)';
                    break;
            }

            // Apply custom container styles
            Object.assign(container.style, {
                maxWidth: this.options.width,
                zIndex: this.options.zIndex,
                ...this.options.customStyles.container
            });
            
            this.options.container.appendChild(container);
        }
        
        return container;
    }

    createNotification(options = {}) {
        const {
            type = 'info',
            title = '',
            content,
            contentType = 'text',
            customClass = '',
            customStyle = {},
            position = this.options.position,
            animation = this.options.animation,
            theme = this.options.theme,
            duration = this.options.duration,
            showProgress = this.options.showProgress,
            onClick = this.options.onClick,
            onClose = this.options.onClose,
            template = this.options.template
        } = options;

        // Update instance position for this notification
        this.options.position = position;

        // Check max notifications
        if (this.notifications.size >= this.options.maxNotifications) {
            const oldestNotification = this.notifications.values().next().value;
            this.closeNotification(oldestNotification);
        }

        const container = this.createContainer();
        const notification = document.createElement('div');
        
        // Apply base classes and custom classes
        notification.className = `hai-notification ${type} ${theme} ${animation} ${customClass}`.trim();
        notification.setAttribute('data-position', position);
        
        // Apply custom styles
        Object.assign(notification.style, customStyle, this.options.customStyles.notification);

        // Create content using template or default layout
        if (template) {
            notification.innerHTML = typeof template === 'function' 
                ? template({ type, title, content }) 
                : template;
        } else {
            // Create wrapper for title/content and close button
            const headerWrapper = document.createElement('div');
            headerWrapper.className = 'hai-notification-header';
            notification.appendChild(headerWrapper);

            // Create content/title container
            const contentContainer = document.createElement('div');
            contentContainer.className = 'hai-notification-content-container';
            headerWrapper.appendChild(contentContainer);

            // Create title if provided
            if (title) {
                const titleElement = document.createElement('div');
                titleElement.className = 'hai-notification-title';
                titleElement.textContent = title;
                contentContainer.appendChild(titleElement);
            }

            // Create content
            const contentElement = this.createContent(content, contentType);
            contentContainer.appendChild(contentElement);

            // Add close button to header
            const closeButton = document.createElement('button');
            closeButton.className = 'hai-notification-close';
            closeButton.innerHTML = '×';
            closeButton.onclick = (e) => {
                e.stopPropagation();
                this.closeNotification(notification);
            };
            headerWrapper.appendChild(closeButton);
        }

        // Add progress bar
        if (showProgress && duration > 0) {
            const progress = this.createProgressBar();
            notification.appendChild(progress);
            this.animateProgress(progress, duration);
        }

        // Add click handler
        if (onClick) {
            notification.style.cursor = 'pointer';
            notification.addEventListener('click', (e) => onClick(e, notification));
        }

        // Add to container and track
        container.appendChild(notification);
        this.notifications.add(notification);

        // Trigger onShow callback
        if (this.options.onShow) {
            this.options.onShow(notification);
        }

        // Auto close
        if (duration > 0) {
            setTimeout(() => {
                this.closeNotification(notification);
            }, duration);
        }

        return notification;
    }

    createContent(content, contentType) {
        const wrapper = document.createElement('div');
        wrapper.className = 'hai-notification-content';

        switch (contentType) {
            case 'html':
                wrapper.innerHTML = content;
                break;
            case 'image':
                const img = document.createElement('img');
                img.src = content;
                img.className = 'hai-notification-image';
                wrapper.appendChild(img);
                break;
            case 'video':
                const video = document.createElement('video');
                video.src = content;
                video.className = 'hai-notification-video';
                video.controls = true;
                wrapper.appendChild(video);
                break;
            case 'audio':
                const audio = document.createElement('audio');
                audio.src = content;
                audio.className = 'hai-notification-audio';
                audio.controls = true;
                wrapper.appendChild(audio);
                break;
            case 'custom':
                if (content instanceof HTMLElement) {
                    wrapper.appendChild(content);
                } else {
                    wrapper.textContent = 'Invalid custom content';
                }
                break;
            default:
                wrapper.textContent = content;
        }

        return wrapper;
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'hai-notification-progress';
        Object.assign(progressBar.style, this.options.customStyles.progressBar);
        return progressBar;
    }

    animateProgress(progress, duration) {
        progress.style.transition = `width ${duration}ms linear`;
        progress.style.width = '100%';
        setTimeout(() => {
            progress.style.width = '0%';
        }, 10);
    }

    closeNotification(notification) {
        notification.classList.add('hai-notification-exit');
        
        // Trigger onClose callback
        if (this.options.onClose) {
            this.options.onClose(notification);
        }

        setTimeout(() => {
            const container = notification.parentElement;
            if (container) {
                container.removeChild(notification);
                this.notifications.delete(notification);
                if (container.children.length === 0) {
                    container.remove();
                }
            }
        }, 300);
    }

    // API Methods
    show(options = {}) {
        return this.createNotification(options);
    }

    success(message, title = '') {
        return this.show({ type: 'success', title, content: message });
    }

    error(message, title = '') {
        return this.show({ type: 'error', title, content: message });
    }

    warning(message, title = '') {
        return this.show({ type: 'warning', title, content: message });
    }

    info(message, title = '') {
        return this.show({ type: 'info', title, content: message });
    }

    closeAll() {
        this.notifications.forEach(notification => {
            this.closeNotification(notification);
        });
    }

    setDefaultOptions(options) {
        this.options = { ...this.options, ...options };
    }

    getActiveNotifications() {
        return Array.from(this.notifications);
    }

    setTemplate(template) {
        this.options.template = template;
    }

    setCustomStyles(styles) {
        this.options.customStyles = { ...this.options.customStyles, ...styles };
    }
}

export default HaiNotification;
