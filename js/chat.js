<script>
    function sendMessage404() {
        const input = document.getElementById('chatInput404');
        const message = input.value.trim();
        
        if (!message) return;

        const messagesDiv = document.getElementById('chatMessages');
        const userMsg = document.createElement('div');
        userMsg.style.cssText = 'padding: 12px 15px; border-radius: 8px; background: #00B98E; color: white; align-self: flex-end; max-width: 80%;';
        userMsg.textContent = message;
        messagesDiv.appendChild(userMsg);

        input.value = '';

        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.style.cssText = 'padding: 12px 15px; border-radius: 8px; background: white; border-left: 4px solid #00B98E; align-self: flex-start; max-width: 80%;';
            botMsg.innerHTML = '<strong>Safari AI Assistant</strong><br>Thanks! Our AI team will help you shortly. Meanwhile, visit our <a href="property-list.html" style="color: #00B98E;">properties page</a> or call 0113556385.';
            messagesDiv.appendChild(botMsg);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }, 500);

        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    document.getElementById('chatInput404').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage404();
    });
</script>