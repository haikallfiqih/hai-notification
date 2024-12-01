# Hai-Notification

A lightweight, flexible, and feature-rich notification library for modern web applications. Built with vanilla JavaScript, zero dependencies.

## ✨ Features

- 🎨 **Rich Customization**
  - Multiple themes (light/dark)
  - Flexible positioning
  - Beautiful animations
  - Progress bar
  - Custom duration

- 📦 **Content Types**
  - Text messages
  - HTML content
  - Images
  - Custom templates

- 🛠 **Developer Experience**
  - Zero dependencies
  - Simple API
  - Event handling
  - UMD support
  - jQuery support

## 📦 Installation

### NPM
```bash
npm install hai-notify
```

### CDN
```html
<script src="https://unpkg.com/hai-notify@0.1.0/dist/notify.min.js"></script>
```

## 🚀 Quick Start

```javascript
// Initialize
const notification = new HaiNotification();

// Show a simple notification
notification.show({
    title: 'Hello!',
    content: 'Welcome to Hai-Notification'
});

// Show different types
notification.success('Operation successful!');
notification.error('Something went wrong');
notification.warning('Please be careful');
notification.info('Just FYI');
```

## 📖 Usage Guide

### Position & Animation

```javascript
notification.show({
    title: 'Custom Position',
    content: 'Bottom left with slide-up animation',
    position: 'bottom-left',
    animation: 'slide-up'
});
```

### Duration & Progress

```javascript
notification.show({
    content: '5 seconds with progress bar',
    duration: 5000,
    showProgress: true
});
```

### Rich Content

```javascript
// HTML Content
notification.show({
    title: 'HTML Example',
    content: '<strong>Bold</strong> and <em>italic</em>',
    contentType: 'html'
});

// Image Content
notification.show({
    title: 'Image Example',
    content: 'path/to/image.jpg',
    contentType: 'image'
});

// Custom Template
notification.show({
    title: 'Template Example',
    content: 'Custom content',
    template: ({ title, content }) => `
        <div class="my-title">${title}</div>
        <div class="my-content">${content}</div>
    `
});
```

### jQuery Integration

If you're using jQuery, you can easily integrate Hai-Notification:

```html
<!-- Include jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Include Hai-Notification -->
<script src="https://unpkg.com/hai-notify@0.1.0/dist/notify.min.js"></script>
```

```javascript
// jQuery Plugin
(function($) {
    $.notification = new HaiNotification();
    
    // Add jQuery methods
    $.extend({
        notify: function(options) {
            return $.notification.show(options);
        },
        notifySuccess: function(message, title) {
            return $.notification.success(message, title);
        },
        notifyError: function(message, title) {
            return $.notification.error(message, title);
        },
        notifyWarning: function(message, title) {
            return $.notification.warning(message, title);
        },
        notifyInfo: function(message, title) {
            return $.notification.info(message, title);
        }
    });
})(jQuery);

// Usage with jQuery
$.notify({
    title: 'Hello jQuery!',
    content: 'Notification using jQuery'
});

// Shorthand methods
$.notifySuccess('Operation successful!');
$.notifyError('Something went wrong');
$.notifyWarning('Please be careful');
$.notifyInfo('Just FYI');
```

## ⚙️ Configuration

### Initialization Options

Create a notification instance with custom default settings:

```javascript
const notification = new HaiNotification({
    position: 'top-right',
    animation: 'scale-up',
    // ... other options
});
```

#### Available Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | string | 'top-right' | Notification position: 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'center' |
| `animation` | string | 'scale-up' | Animation type: 'scale-up', 'slide-up', 'slide-down', 'fade-in' |
| `theme` | string | 'light' | Color theme: 'light' or 'dark' |
| `duration` | number | 3000 | How long notification stays visible (in milliseconds) |
| `showProgress` | boolean | true | Show/hide the progress bar |
| `maxNotifications` | number | 5 | Maximum number of concurrent notifications |
| `spacing` | string | '1rem' | Space between notifications |
| `width` | string | '24rem' | Width of notifications |
| `zIndex` | number | 1000 | Z-index for notifications |
| `container` | Element | document.body | Container element for notifications |
| `customStyles` | object | {} | Custom CSS styles object |
| `template` | function | null | Default template function |
| `onShow` | function | null | Callback when notification appears |
| `onClose` | function | null | Callback when notification closes |
| `onClick` | function | null | Callback when notification is clicked |

### Show Options

Options available when showing a notification:

```javascript
notification.show({
    type: 'success',
    title: 'Hello',
    content: 'World'
});
```

#### Available Show Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | 'info' | Notification type: 'info', 'success', 'warning', 'error' |
| `title` | string | '' | Notification title (optional) |
| `content` | string | '' | Main notification content |
| `contentType` | string | 'text' | Content type: 'text', 'html', 'image' |
| `position` | string | * | Override default position |
| `animation` | string | * | Override default animation |
| `theme` | string | * | Override default theme |
| `duration` | number | * | Override default duration |
| `showProgress` | boolean | * | Override progress bar setting |
| `customClass` | string | '' | Additional CSS classes |
| `customStyle` | object | {} | Inline styles for this notification |
| `onClick` | function | null | Click handler for this notification |
| `onClose` | function | null | Close handler for this notification |

\* Inherits from initialization options

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License  Haikal Fiqih

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.
