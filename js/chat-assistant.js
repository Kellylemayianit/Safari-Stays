// ==========================================
// SAFARI STAYS AI CHAT SYSTEM - N8N BACKEND
// Replace your existing js/chat-assistant.js with this file
// ==========================================

// ==========================================
// N8N WEBHOOK CONFIGURATION
// ==========================================
const N8N_CONFIG = {
    // DEVELOPMENT: localhost webhook
    webhookUrl: 'http://localhost:5678/webhook-test/safari-assistant',
    
    // PRODUCTION: Change this when you deploy n8n to a real server
    // webhookUrl: 'https://n8n.yourdomain.com/webhook/safari-assistant',
    
    timeout: 30000 // 30 seconds
};

// Rate limiting configuration
const RATE_LIMIT = {
    maxMessages: 15,
    resetTime: 3600000 // 1 hour in milliseconds
};

// ==========================================
// CLIENT DATA CAPTURE SYSTEM
// ==========================================

let clientData = {
    name: null,
    email: null,
    phone: null,
    interest: null,
    captured: false
};

// Conversation history for context
let conversationHistory = [];
let messageCount = 0;
let lastResetTime = Date.now();

// Current property data (loaded from sessionStorage)
let currentPropertyData = null;

// ==========================================
// RATE LIMITING
// ==========================================
function checkRateLimit() {
    const now = Date.now();
    
    // Reset counter every hour
    if (now - lastResetTime > RATE_LIMIT.resetTime) {
        messageCount = 0;
        lastResetTime = now;
    }
    
    if (messageCount >= RATE_LIMIT.maxMessages) {
        return {
            allowed: false,
            message: `You've reached the message limit (${RATE_LIMIT.maxMessages} per hour). Please try again later or contact us directly at +254113556385.`
        };
    }
    
    messageCount++;
    return { allowed: true };
}

// ==========================================
// 1. CHECK IF CLIENT DATA IS CAPTURED
// ==========================================
function isClientDataCaptured() {
    const savedData = localStorage.getItem('safaristays_client');
    if (savedData) {
        clientData = JSON.parse(savedData);
        clientData.captured = true;
        return true;
    }
    return false;
}

// ==========================================
// 2. SAVE CLIENT DATA
// ==========================================
async function saveClientData(name, email, phone, interest) {
    clientData = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        interest: interest || 'General Inquiry',
        captured: true,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('safaristays_client', JSON.stringify(clientData));
    
    const submissionSuccess = await sendClientDataToBackend(clientData);
    
    return {
        clientData,
        submissionSuccess
    };
}

// ==========================================
// 3. SEND DATA TO BACKEND (Formspree)
// ==========================================
async function sendClientDataToBackend(data) {
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkgplpdo';
    
    const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        interest: data.interest,
        property: currentPropertyData ? currentPropertyData.name : 'None',
        timestamp: data.timestamp
    };
    
    try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log("✅ Lead data successfully submitted to Formspree!");
            return true;
        } else {
            console.error('⚠️ Formspree submission failed. Status:', response.status);
            const errorData = await response.json();
            console.error('Error Details:', errorData);
            return false;
        }
    } catch (error) {
        console.error('❌ Network Error during Formspree submission:', error);
        return false;
    }
}

// ==========================================
// 4. SHOW CLIENT DATA CAPTURE FORM
// ==========================================
function showClientDataForm() {
    const chatMessages = document.getElementById('chatMessages');
    
    chatMessages.innerHTML = `
        <div style="padding: 20px; background: white; border-radius: 8px; border: 2px solid #00b98e;">
            <h5 style="color: #00b98e; margin: 0 0 15px 0;">
                👋 Welcome to Safari Stays!
            </h5>
            <p style="margin: 0 0 15px 0; color: #666;">
                Before we begin, please share your details so we can assist you better:
            </p>
            
            <form id="clientDataForm" onsubmit="handleClientDataSubmit(event)" style="display: flex; flex-direction: column; gap: 10px;">
                <input 
                    type="text" 
                    id="clientName" 
                    placeholder="Your Name *" 
                    required 
                    style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;"
                />
                
                <input 
                    type="email" 
                    id="clientEmail" 
                    placeholder="Your Email *" 
                    required 
                    style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;"
                />
                
                <input 
                    type="tel" 
                    id="clientPhone" 
                    placeholder="Your Phone (e.g., +254712345678) *" 
                    required 
                    pattern="[+]?[0-9]{10,15}"
                    style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;"
                />
                
                <select 
                    id="clientInterest" 
                    style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;"
                >
                    <option value="">What are you interested in?</option>
                    <option value="Weekend Getaway">Weekend Getaway</option>
                    <option value="Safari Trip">Safari Trip</option>
                    <option value="Family Vacation">Family Vacation</option>
                    <option value="Business Travel">Business Travel</option>
                    <option value="Wedding/Event">Wedding/Event</option>
                    <option value="Long-term Stay">Long-term Stay</option>
                    <option value="Just Browsing">Just Browsing</option>
                </select>
                
                <button 
                    type="submit" 
                    style="padding: 12px; background: #00b98e; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; margin-top: 10px;"
                >
                    Start Chatting
                </button>
                
                <p style="font-size: 11px; color: #999; margin: 10px 0 0 0;">
                    We respect your privacy. Your information is used only to provide better service.
                </p>
            </form>
        </div>
    `;
}

// ==========================================
// 5. HANDLE FORM SUBMISSION
// ==========================================
async function handleClientDataSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('clientName').value;
    const email = document.getElementById('clientEmail').value;
    const phone = document.getElementById('clientPhone').value;
    const interest = document.getElementById('clientInterest').value;
    
    if (!phone.match(/^[+]?[0-9]{10,15}$/)) {
        alert('Please enter a valid phone number (10-15 digits)');
        return;
    }
    
    const result = await saveClientData(name, email, phone, interest);
    
    const chatMessages = document.getElementById('chatMessages');
    
    if (result.submissionSuccess) {
        chatMessages.innerHTML = `
            <div style="padding: 15px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; color: #155724; text-align: center;">
                <strong>✅ Thank you, ${name}!</strong><br/>
                <small>Your details are secured. Let's find your perfect stay...</small>
            </div>
        `;
        
        setTimeout(() => {
            initializeChatWithClientData();
        }, 1000);
    } else {
        chatMessages.innerHTML = `
            <div style="padding: 15px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; color: #721c24; text-align: center;">
                <strong>❌ Submission Failed.</strong><br/>
                <small>There was an error sending your details. Please check your connection and try again.</small>
            </div>
        `;
    }
}

// ==========================================
// 6. INITIALIZE CHAT WITH CLIENT DATA
// ==========================================
function initializeChatWithClientData() {
    const chatMessages = document.getElementById('chatMessages');
    const propertyName = currentPropertyData ? currentPropertyData.name : 'our properties';
    
    chatMessages.innerHTML = `
        <div style="padding: 12px 15px; border-radius: 8px; background: white; border-left: 4px solid #00b98e; align-self: flex-start; max-width: 100%;">
            <strong>Safari AI Assistant</strong><br/>
            👋 Hello <strong>${clientData.name}</strong>! Welcome to Safari Stays!
            ${currentPropertyData ? `<br/><br/>I see you're interested in <strong>${propertyName}</strong>. ` : ''}
            I'm here to help you with:
            <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                <li>Property details and pricing</li>
                <li>Amenities & facilities</li>
                <li>Booking process & policies</li>
                <li>Local area information</li>
            </ul>
            What would you like to know?
        </div>
    `;
    
    const chatInput = document.getElementById('chatInput404');
    if (chatInput) {
        chatInput.disabled = false;
        chatInput.placeholder = "Ask me anything...";
        chatInput.focus();
    }
}

// ==========================================
// 7. FORMAT PROPERTY CONTEXT
// ==========================================
function formatPropertyContext(propertyData) {
    if (!propertyData) return null;

    return {
        property_name: propertyData.name || "Unknown Property",
        type: propertyData.type || "Accommodation",
        price_per_night: propertyData.price || "Price on request",
        location: propertyData.location || "Kimana, Kajiado County",
        room_size: propertyData.sqft || "Standard",
        beds: propertyData.beds || "N/A",
        bathrooms: propertyData.baths || "N/A",
        description: propertyData.description || "No description available",
        amenities: Array.isArray(propertyData.amenities) 
            ? propertyData.amenities 
            : [],
        contact_number: propertyData.contact || "+254113556385"
    };
}

// ==========================================
// 8. BUILD PAYLOAD FOR N8N WEBHOOK
// ==========================================
function buildN8NPayload(userMessage) {
    const payload = {
        // The user's current message
        user_message: userMessage,
        
        // Conversation history (last 5 exchanges = 10 messages)
        conversation_history: conversationHistory.slice(-10),
        
        // Client information
        client_data: {
            name: clientData.name,
            email: clientData.email,
            phone: clientData.phone,
            interest: clientData.interest
        },
        
        // Property context (if viewing a specific property)
        property_context: currentPropertyData ? formatPropertyContext(currentPropertyData) : null,
        
        // General Safari Stays information
        general_context: {
            business_name: "Safari Stays",
            location: "Kimana, Kajiado County, Kenya",
            contact_phone: "+254113556385",
            contact_email: "kellylemayian6@gmail.com",
            whatsapp: "+254113556385",
            check_in: "2:00 PM - 6:00 PM",
            check_out: "8:00 AM - 11:00 AM",
            cancellation_policy: "Full refund if cancelled 7+ days before check-in; within 7 days subject to one night's fee",
            payment_methods: ["M-Pesa", "Bank Transfer", "Cash", "Cards"],
            pet_policy: "No pets allowed (except certified service animals)",
            location_info: "27-43 km from Amboseli National Park, views of Mount Kilimanjaro",
            airport_transfer: "Available from JKIA (book 48 hours in advance)"
        },
        
        // Metadata
        metadata: {
            timestamp: new Date().toISOString(),
            session_id: getSessionId(),
            page_url: window.location.href
        }
    };
    
    return payload;
}

// ==========================================
// 9. GET OR CREATE SESSION ID
// ==========================================
function getSessionId() {
    let sessionId = sessionStorage.getItem('safari_session_id');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('safari_session_id', sessionId);
    }
    return sessionId;
}

// ==========================================
// 10. SEND MESSAGE TO N8N WEBHOOK
// ==========================================
async function sendMessageWithAI() {
    const input = document.getElementById('chatInput404');
    const message = input.value.trim();
    
    if (!message) return;
    
    if (!clientData.captured) {
        alert('Please complete the registration form first.');
        return;
    }
    
    // Check rate limit
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
        displayBotMessage(rateLimitCheck.message);
        return;
    }
    
    const messagesDiv = document.getElementById('chatMessages');
    
    // Display user message
    const userMsg = document.createElement('div');
    userMsg.style.cssText = 'padding: 12px 15px; border-radius: 8px; background: #00B98E; color: white; align-self: flex-end; max-width: 80%; margin-bottom: 10px;';
    userMsg.innerHTML = `<small style="opacity: 0.8;">${clientData.name}</small><br/>${escapeHtml(message)}`;
    messagesDiv.appendChild(userMsg);
    
    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.id = 'typingIndicator';
    typingIndicator.style.cssText = 'padding: 12px 15px; border-radius: 8px; background: white; border-left: 4px solid #00B98E; align-self: flex-start; max-width: 80%; margin-bottom: 10px;';
    typingIndicator.innerHTML = '<strong>Safari AI Assistant</strong><br/><span style="opacity: 0.6;">Thinking...</span>';
    messagesDiv.appendChild(typingIndicator);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    try {
        // Build payload for n8n
        const payload = buildN8NPayload(message);
        
        console.log('📤 Sending to n8n:', payload);
        
        // Call n8n webhook with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), N8N_CONFIG.timeout);
        
        const response = await fetch(N8N_CONFIG.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`n8n webhook returned status ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('📥 Received from n8n:', data);
        
        // Extract AI response (adjust based on your n8n workflow response structure)
        let aiAnswer = data.ai_response || data.response || data.message;
        
        if (!aiAnswer) {
            console.error('No AI response in data:', data);
            aiAnswer = "I apologize, but I didn't receive a proper response. Please try again or contact us at +254113556385.";
        }
        
        // Remove typing indicator
        typingIndicator.remove();
        
        // Display bot response
        displayBotMessage(aiAnswer);
        
        // Add to conversation history
        conversationHistory.push({ role: "user", content: message });
        conversationHistory.push({ role: "assistant", content: aiAnswer });
        
        // Keep only last 10 messages (5 exchanges)
        if (conversationHistory.length > 10) {
            conversationHistory = conversationHistory.slice(-10);
        }
        
        // Log conversation
        logConversation(message, aiAnswer);
        
    } catch (error) {
        console.error('❌ n8n Communication Error:', error);
        
        // Remove typing indicator
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
        
        // Determine error type
        let errorMessage;
        if (error.name === 'AbortError') {
            errorMessage = "The request took too long. Please try a shorter question or contact us at +254113556385.";
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            errorMessage = "⚠️ Cannot connect to the AI service. \n\nThis usually means:\n• n8n is not running (check localhost:5678)\n• Webhook URL is incorrect\n• CORS issue (if on different domains)\n\nPlease contact us directly:\n📱 WhatsApp: +254113556385\n📧 Email: kellylemayian6@gmail.com";
        } else {
            errorMessage = `There was an error processing your request: ${error.message}\n\nPlease try again or contact us at +254113556385.`;
        }
        
        displayBotMessage(errorMessage);
    }
}

// ==========================================
// 11. DISPLAY BOT MESSAGE
// ==========================================
function displayBotMessage(message) {
    const messagesDiv = document.getElementById('chatMessages');
    const botMsg = document.createElement('div');
    botMsg.style.cssText = 'padding: 12px 15px; border-radius: 8px; background: white; border-left: 4px solid #00B98E; align-self: flex-start; max-width: 80%; white-space: pre-line;';
    botMsg.innerHTML = `<strong>Safari AI Assistant</strong><br/>${escapeHtml(message)}`;
    messagesDiv.appendChild(botMsg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ==========================================
// 12. ESCAPE HTML (Security)
// ==========================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// 13. LOG CONVERSATION
// ==========================================
function logConversation(question, answer) {
    const conversationLog = {
        client_name: clientData.name,
        client_email: clientData.email,
        client_phone: clientData.phone,
        client_interest: clientData.interest,
        property: currentPropertyData ? currentPropertyData.name : 'None',
        question: question,
        answer_preview: answer.substring(0, 100) + '...',
        timestamp: new Date().toISOString()
    };
    
    let logs = JSON.parse(localStorage.getItem('conversation_logs') || '[]');
    logs.push(conversationLog);
    
    if (logs.length > 50) logs = logs.slice(-50);
    localStorage.setItem('conversation_logs', JSON.stringify(logs));
    
    console.log('📊 Conversation logged:', conversationLog);
}

// ==========================================
// 14. CLEAR CLIENT DATA
// ==========================================
function clearClientData() {
    localStorage.removeItem('safaristays_client');
    conversationHistory = [];
    messageCount = 0;
    clientData = {
        name: null,
        email: null,
        phone: null,
        interest: null,
        captured: false
    };
}

// ==========================================
// 15. ALIAS FOR COMPATIBILITY
// ==========================================
const sendMessage404 = sendMessageWithAI;

// ==========================================
// 16. INITIALIZE ON PAGE LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Load property data from sessionStorage
    const propertyDataStr = sessionStorage.getItem('selectedProperty');
    if (propertyDataStr) {
        currentPropertyData = JSON.parse(propertyDataStr);
        console.log('✅ Property data loaded:', currentPropertyData.name);
    }
    
    // Check if client data exists
    if (isClientDataCaptured()) {
        console.log('✅ Client data found:', clientData.name);
        initializeChatWithClientData();
    } else {
        console.log('⚠️ No client data - showing form');
        showClientDataForm();
        
        const chatInput = document.getElementById('chatInput404');
        if (chatInput) {
            chatInput.disabled = true;
            chatInput.placeholder = "Complete the form above to start chatting...";
        }
    }
    
    // Enter key handler
    const chatInput = document.getElementById('chatInput404');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !chatInput.disabled) {
                e.preventDefault();
                sendMessageWithAI();
            }
        });
    }
});

// ==========================================
// 17. MAKE FUNCTIONS GLOBALLY AVAILABLE
// ==========================================
window.handleClientDataSubmit = handleClientDataSubmit;
window.clearClientData = clearClientData;
window.sendMessage404 = sendMessage404;