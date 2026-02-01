document.addEventListener('DOMContentLoaded', () => {
    const lostForm = document.getElementById('lostForm');
    const foundForm = document.getElementById('foundForm');

    if (lostForm) {
        lostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmit(lostForm, 'Lost item reported successfully.');
        });
    }

    if (foundForm) {
        foundForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmit(foundForm, 'Found item reported successfully.');
        });
    }

    function handleFormSubmit(form, successText) {
        // Simple validation
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff3b30'; // Apple-style red

                // Reset border color on input
                input.addEventListener('input', () => {
                    input.style.borderColor = '';
                }, { once: true });
            }
        });

        if (isValid) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            // Interaction feedback
            submitBtn.disabled = true;
            submitBtn.innerText = 'Reporting...';
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = '1';

                showSuccess(successText);
            }, 1000);
        }
    }

    function showSuccess(message) {
        let successDiv = document.querySelector('.success-message');
        if (!successDiv) {
            successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            const form = document.querySelector('form');
            form.parentNode.insertBefore(successDiv, form.nextSibling);
        }

        successDiv.innerText = message;
        successDiv.style.display = 'block';

        // Auto hide success message after 5 seconds
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 5000);
    }

    // Add visual feedback to file inputs
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        const dropZone = input.parentElement;

        input.addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name;
            const span = dropZone.querySelector('span');
            if (fileName) {
                span.innerText = `Selected: ${fileName}`;
                span.style.color = '#0071e3';
            }
        });

        // Drag and drop feedback
        ['dragenter', 'dragover'].forEach(eventName => {
            input.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.add('drag-over');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            input.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.remove('drag-over');
            }, false);
        });
        // AI Chat Bot Logic
        const chatForm = document.getElementById('chatForm');
        const chatInput = document.getElementById('chatInput');
        const chatMessages = document.getElementById('chatMessages');

        if (chatForm && chatInput && chatMessages) {
            chatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const message = chatInput.value.trim();
                if (message) {
                    appendMessage('user', message);
                    chatInput.value = '';

                    // Simulate bot thinking
                    setTimeout(() => {
                        handleBotReply(message);
                    }, 800);
                }
            });
        }

        function appendMessage(sender, text) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            messageDiv.innerText = text;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function handleBotReply(userMsg) {
            const msg = userMsg.toLowerCase();
            let reply = "I'm sorry, I'm just a simple assistant. Please contact our support team for more help.";

            if (msg.includes('lost')) {
                reply = "You can report a lost item by clicking the 'Dashboard' button and selecting 'Report Lost'.";
            } else if (msg.includes('found')) {
                reply = "Great! You can report a found item using our report form on the main dashboard.";
            } else if (msg.includes('hello') || msg.includes('hi')) {
                reply = "Hello! How can I assist you with the Lost & Found system today?";
            } else if (msg.includes('contact') || msg.includes('phone')) {
                reply = "You can reach us at +1 (888) 123-4567 or email support@lostandfound.ai.";
            }

            appendMessage('bot', reply);
        }
    });
