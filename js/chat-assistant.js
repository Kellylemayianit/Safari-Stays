// ==========================================
// COMPLETE SAFARI STAYS AI CHAT SYSTEM
// Place in: js/chat-assistant.js
// ==========================================




// ==========================================
// CLIENT DATA CAPTURE SYSTEM
// Add to: js/chat-assistant.js (at the beginning)
// ==========================================

// Store client data globally
let clientData = {
    name: null,
    email: null,
    phone: null,
    interest: null,
    captured: false
};

// ==========================================
// 1. CHECK IF CLIENT DATA IS CAPTURED
// ==========================================
function isClientDataCaptured() {
    // Check localStorage for persistent storage
    const savedData = localStorage.getItem('safaristays_client');
    if (savedData) {
        clientData = JSON.parse(savedData);
        clientData.captured = true;
        return true;
    }
    return false;
}

// ==========================================
// 2. SAVE CLIENT DATA (UPDATED to Async)
// ==========================================
async function saveClientData(name, email, phone, interest) { // <-- ADD async
    clientData = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        interest: interest || 'General Inquiry',
        captured: true,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage (persists across pages)
    localStorage.setItem('safaristays_client', JSON.stringify(clientData));
    
    // Await the asynchronous Formspree submission before continuing the flow
    const submissionSuccess = await sendClientDataToBackend(clientData);
    
    // Return the client data and the success status of the submission
    return {
        clientData,
        submissionSuccess
    };
}



// ==========================================
// 3. SEND DATA TO BACKEND (Formspree Integration)
// ==========================================
async function sendClientDataToBackend(data) {
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkgplpdo'; // Your provided Formspree URL
    
    // Prepare data to send (Formspree fields are based on the keys in the JSON)
    const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        interest: data.interest,
        // The property data is available through the global variable
        property: currentPropertyData ? currentPropertyData.name : 'None', 
        timestamp: data.timestamp
    };
    
    try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            // Setting 'Accept': 'application/json' tells Formspree we want a JSON response
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log("✅ Lead data successfully submitted to Formspree!");
            return true; // Submission successful
        } else {
            console.error('⚠️ Formspree submission failed. Status:', response.status);
            // Log the error details from Formspree for debugging
            const errorData = await response.json(); 
            console.error('Error Details:', errorData);
            return false; // Submission failed
        }
    } catch (error) {
        console.error('❌ Network Error during Formspree submission:', error);
        return false; // Submission failed
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
// 5. HANDLE FORM SUBMISSION (UPDATED for Async)
// ==========================================
async function handleClientDataSubmit(event) { // <-- ADD async
    event.preventDefault();
    
    const name = document.getElementById('clientName').value;
    const email = document.getElementById('clientEmail').value;
    const phone = document.getElementById('clientPhone').value;
    const interest = document.getElementById('clientInterest').value;
    
    // Validate phone number format
    if (!phone.match(/^[+]?[0-9]{10,15}$/)) {
        alert('Please enter a valid phone number (10-15 digits)');
        return;
    }
    
    // Save data and await Formspree submission
    const result = await saveClientData(name, email, phone, interest); // <-- ADD await
    
    const chatMessages = document.getElementById('chatMessages');
    
    if (result.submissionSuccess) {
        // Formspree was successful, show the success message
        chatMessages.innerHTML = `
            <div style="padding: 15px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; color: #155724; text-align: center;">
                <strong>✅ Thank you, ${name}!</strong><br/>
                <small>Your details are secured. Let's find your perfect stay...</small>
            </div>
        `;
        
        // This initiates the "redirect" (transition to the chat interface) after 1 second
        setTimeout(() => {
            initializeChatWithClientData();
        }, 1000);
    } else {
         // Formspree failed, show an error message
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
                <li>Pricing and rates</li>
                <li>Amenities & facilities</li>
                <li>Booking process</li>
                <li>Any questions you have!</li>
            </ul>
            What would you like to know?
        </div>
    `;
    
    // Enable chat input
    const chatInput = document.getElementById('chatInput404');
    if (chatInput) {
        chatInput.disabled = false;
        chatInput.placeholder = "Ask me anything...";
        chatInput.focus();
    }
}

// ==========================================
// 7. CLEAR CLIENT DATA (for testing/logout)
// ==========================================
function clearClientData() {
    localStorage.removeItem('safaristays_client');
    clientData = {
        name: null,
        email: null,
        phone: null,
        interest: null,
        captured: false
    };
}

// ==========================================
// 8. UPDATE sendMessage404 TO USE CLIENT DATA
// ==========================================
// Modify the existing sendMessage404 function to include client context
const originalSendMessage404 = sendMessage404;
sendMessage404 = async function() {
    // Check if client data is captured
    if (!clientData.captured) {
        alert('Please complete the form first to start chatting.');
        return;
    }
    
    // Call original function
    await originalSendMessage404();
};

// ==========================================
// 9. INITIALIZE ON PAGE LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Load property data from sessionStorage (existing code)
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
        
        // Disable chat input until form is submitted
        const chatInput = document.getElementById('chatInput404');
        if (chatInput) {
            chatInput.disabled = true;
            chatInput.placeholder = "Complete the form above to start chatting...";
        }
    }
    
    // Enter key handler (existing code)
    const chatInput = document.getElementById('chatInput404');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !chatInput.disabled) {
                e.preventDefault();
                sendMessage404();
            }
        });
    }
});

// ==========================================
// MAKE FUNCTION GLOBALLY AVAILABLE
// ==========================================
window.handleClientDataSubmit = handleClientDataSubmit;
window.clearClientData = clearClientData;



// ==========================================
// GENERAL KNOWLEDGE BASE (Official Policies)
// Based on: General Booking & Policy Inquiries.pdf
// ==========================================
const generalKnowledge = {
    // CANCELLATION POLICY
    cancellation: {
        keywords: ['cancel', 'cancellation', 'refund', 'policy', 'change booking', 'reservation'],
        answer: "Our **standard cancellation policy** allows for a **full refund** if you cancel **7 days before your check-in date**.\n\n" +
               "Cancellations made **within 7 days** are subject to a fee equal to **one night's stay**.\n\n" +
               "All details are included in your booking confirmation email."
    },
    
    // PAYMENT METHODS
    payment: {
        keywords: ['payment', 'pay', 'accept', 'credit', 'card', 'mpesa', 'cash', 'method', 'visa', 'mastercard', 'paypal'],
        answer: "We accept **major credit cards** (Visa, MasterCard), **PayPal**, and **M-Pesa** via the number provided in your booking confirmation.\n\n" +
               "**Please note:** We do not accept cash payments on-site."
    },
    
    // CHECK-IN/CHECK-OUT TIMES
    checkin: {
        keywords: ['check in', 'check-in', 'check out', 'check-out', 'time', 'arrival', 'departure', 'late checkout', 'early checkin'],
        answer: "**Standard check-in** is at **2:00 PM** and **check-out** is at **10:00 AM**.\n\n" +
               "**Early check-in or late check-out** is subject to availability and may incur a small fee. " +
               "Please inquire with the property **24 hours prior**."
    },
    
    // AIRPORT TRANSFER
    transport: {
        keywords: ['airport', 'transfer', 'transport', 'pickup', 'jkia', 'nairobi', 'how to get', 'travel'],
        answer: "We can arrange **private airport transfers** from **Jomo Kenyatta International Airport (JKIA)** for a flat fee.\n\n" +
               "Please let us know your **flight details at least 48 hours in advance** to confirm."
    },
    
    // PET POLICY
    pets: {
        keywords: ['pet', 'dog', 'cat', 'animal', 'bring pet', 'allowed'],
        answer: "**Safari Stays has a strict no-pet policy** across all our lodges and rentals to ensure the safety of local wildlife and adherence to park regulations.\n\n" +
               "**Certified service animals** are an exception. Please contact us directly regarding this."
    },
    
    // CONTACT/SUPPORT
    contact: {
        keywords: ['contact', 'phone', 'call', 'email', 'whatsapp', 'support', 'help', 'human', 'agent', 'talk to someone', 'customer service'],
        answer: "We are happy to help!\n\n" +
               "You can reach our **24/7 customer support team**:\n" +
               "• 📱 WhatsApp: **+254113556385**\n" +
               "• ☎️ Call: **+254113556385**\n" +
               "• 📧 Email: **kellylemayian6@gmail.com**"
    },
    
    // COMPANY INFO
    about: {
        keywords: ['about', 'safari stays', 'company', 'kenyan', 'who', 'what is', 'operates'],
        answer: "**Safari Stays** is a **Kenyan-owned property management service** specializing in high-quality, authentic safari accommodation near Kimana and Amboseli National Park."
    }
};

// Current property data (loaded from sessionStorage)
let currentPropertyData = null;

// ==========================================
// 1. FORMAT PROPERTY CONTEXT FOR AI
// ==========================================
function formatPropertyContext(propertyData) {
    if (!propertyData) return null;

    const cleanedContext = {
        property_name: propertyData.name || "Unknown Property",
        type: propertyData.type || "Accommodation",
        price_per_night: propertyData.price || "Price on request",
        location: propertyData.location || "Kimana, Kajiado County",
        room_size: propertyData.sqft || "Standard",
        beds: propertyData.beds || "N/A",
        bathrooms: propertyData.baths || "N/A",
        description: propertyData.description || "No description available",
        amenities: Array.isArray(propertyData.amenities) 
            ? propertyData.amenities.join(", ") 
            : "Standard amenities",
        contact_number: propertyData.contact || "+254113556385",
        check_in_time: "2:00 PM - 6:00 PM",
        check_out_time: "8:00 AM - 11:00 AM"
    };

    return cleanedContext;
}

// ==========================================
// 2. MATCH USER QUESTION TO ANSWER
// ==========================================
function getAnswerFromKnowledge(userMessage) {
    const messageLower = userMessage.toLowerCase();
    
    // Check general knowledge base
    for (const [key, knowledge] of Object.entries(generalKnowledge)) {
        for (const keyword of knowledge.keywords) {
            if (messageLower.includes(keyword)) {
                return knowledge.answer;
            }
        }
    }
    
    // Check property-specific questions
    if (!currentPropertyData) return null;
    
    const context = formatPropertyContext(currentPropertyData);
    
    // Price questions
    if (messageLower.match(/price|cost|rate|how much|tariff|fee/)) {
        return `💰 **Pricing for ${context.property_name}:**\n\n` +
               `**${context.price_per_night}** per night\n\n` +
               `*Note: Taxes and fees should be confirmed upon booking. A 30% deposit is typically required.*\n\n` +
               `Contact: ${context.contact_number}`;
    }
    
    // Amenities questions
    if (messageLower.match(/amenities|facilities|wifi|pool|breakfast|restaurant|parking|service/)) {
        return `🏨 **Amenities at ${context.property_name}:**\n\n` +
               `${context.amenities.split(', ').map(a => `✅ ${a}`).join('\n')}\n\n` +
               `Need more details? Call: ${context.contact_number}`;
    }
    
    // Location/Description questions
    if (messageLower.match(/location|where|address|describe|about|summary|overview/)) {
        return `📍 **About ${context.property_name}:**\n\n` +
               `**Location:** ${context.location}\n` +
               `**Type:** ${context.type}\n` +
               `**Room:** ${context.room_size}\n\n` +
               `${context.description}\n\n` +
               `**Distance:** ~27-43 km from Amboseli National Park`;
    }
    
    // Capacity questions
    if (messageLower.match(/capacity|people|sleep|accommodate|guest|occupancy/)) {
        return `👥 **Room Details for ${context.property_name}:**\n\n` +
               `🛏️ **Beds:** ${context.beds}\n` +
               `🚿 **Bathrooms:** ${context.bathrooms}\n` +
               `📏 **Size:** ${context.room_size}\n\n` +
               `Perfect for couples, families, or small groups!`;
    }
    
    // Booking questions
    if (messageLower.match(/book|reserve|available|availability|confirm|reservation/)) {
        return `📅 **Ready to Book ${context.property_name}?**\n\n` +
               `Contact us directly to check availability:\n\n` +
               `📱 WhatsApp/Call: ${context.contact_number}\n` +
               `📧 Email: kellylemayian6@gmail.com\n\n` +
               `We'll help you secure your dates!`;
    }
    
    return null;
}

// ==========================================
// UPDATED sendMessage404 WITH CLIENT CONTEXT
// Replace the existing sendMessage404 in chat-assistant.js
// ==========================================

async function sendMessage404() {
    const input = document.getElementById('chatInput404');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Check if client data is captured
    if (!clientData.captured) {
        alert('Please complete the registration form first.');
        return;
    }
    
    const messagesDiv = document.getElementById('chatMessages');
    
    // Display user message with client name
    const userMsg = document.createElement('div');
    userMsg.style.cssText = 'padding: 12px 15px; border-radius: 8px; background: #00B98E; color: white; align-self: flex-end; max-width: 80%; margin-bottom: 10px;';
    userMsg.innerHTML = `<small style="opacity: 0.8;">${clientData.name}</small><br/>${message}`;
    messagesDiv.appendChild(userMsg);
    
    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.style.cssText = 'padding: 12px 15px; border-radius: 8px; background: white; border-left: 4px solid #00B98E; align-self: flex-start; max-width: 80%; margin-bottom: 10px;';
    typingIndicator.innerHTML = '<strong>Safari AI Assistant</strong><br/><span style="opacity: 0.6;">Typing...</span>';
    messagesDiv.appendChild(typingIndicator);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get personalized answer
    let answer = getPersonalizedAnswer(message, clientData);
    
    // Remove typing indicator
    typingIndicator.remove();
    
    // Display bot response
    const botMsg = document.createElement('div');
    botMsg.style.cssText = 'padding: 12px 15px; border-radius: 8px; background: white; border-left: 4px solid #00B98E; align-self: flex-start; max-width: 80%; white-space: pre-line;';
    botMsg.innerHTML = `<strong>Safari AI Assistant</strong><br/>${answer}`;
    messagesDiv.appendChild(botMsg);
    
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    // Log conversation for analytics (optional)
    logConversation(clientData, message, answer);
}

// ==========================================
// GET PERSONALIZED ANSWER WITH CLIENT CONTEXT
// ==========================================
function getPersonalizedAnswer(userMessage, client) {
    // Get the standard answer
    let answer = getAnswerFromKnowledge(userMessage);
    
    // Personalize based on client interest
    if (client.interest && !answer.includes(client.name)) {
        // Add personalized touch based on their interest
        const personalizations = {
            'Weekend Getaway': 'Perfect for a weekend escape! ',
            'Safari Trip': 'Great choice for a safari adventure! ',
            'Family Vacation': 'Ideal for families! ',
            'Business Travel': 'We offer business-friendly amenities. ',
            'Wedding/Event': 'We can help plan your special event! ',
            'Long-term Stay': 'We offer flexible long-term rates. '
        };
        
        const prefix = personalizations[client.interest] || '';
        if (prefix && !userMessage.toLowerCase().includes('hello') && !userMessage.toLowerCase().includes('hi')) {
            answer = prefix + answer;
        }
    }
    
    // Add booking urgency if they ask about availability
    if (userMessage.toLowerCase().includes('available') && client.name) {
        answer += `\n\n💡 **Quick tip for ${client.name}:** Properties in Kimana book fast, especially during peak safari season. Contact us ASAP to secure your dates!`;
    }
    
    return answer;
}

// ==========================================
// LOG CONVERSATION FOR ANALYTICS (Optional)
// ==========================================
function logConversation(client, question, answer) {
    const conversationLog = {
        client_name: client.name,
        client_email: client.email,
        client_phone: client.phone,
        client_interest: client.interest,
        property: currentPropertyData ? currentPropertyData.name : 'None',
        question: question,
        answer_provided: answer.substring(0, 100) + '...',
        timestamp: new Date().toISOString()
    };
    
    // Option 1: Send to backend
    // fetch('/api/log-conversation', { ... })
    
    // Option 2: Store in localStorage for later export
    let logs = JSON.parse(localStorage.getItem('conversation_logs') || '[]');
    logs.push(conversationLog);
    // Keep only last 50 conversations
    if (logs.length > 50) logs = logs.slice(-50);
    localStorage.setItem('conversation_logs', JSON.stringify(logs));
    
    console.log('📊 Conversation logged:', conversationLog);
}

// ==========================================
// 4. INITIALIZE CHAT ON PAGE LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Load property data from sessionStorage
    const propertyDataStr = sessionStorage.getItem('selectedProperty');
    if (propertyDataStr) {
        currentPropertyData = JSON.parse(propertyDataStr);
        console.log('✅ Property data loaded for chat:', currentPropertyData.name);
    }
    
    // Enter key handler
    const chatInput = document.getElementById('chatInput404');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage404();
            }
        });
    }
    
    // Send button handler (in case it's not already set in HTML)
    const sendBtn = document.querySelector('button[onclick="sendMessage404()"]');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage404);
    }
});

// ==========================================
// 5. OPTIONAL: ADVANCED AI INTEGRATION
// For real AI (Gemini/OpenAI), uncomment and configure
// ==========================================

/*
async function sendMessageWithAI() {
    const input = document.getElementById('chatInput404');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Display user message (same as above)
    // ...
    
    // Format context
    const context = formatPropertyContext(currentPropertyData);
    const systemPrompt = `You are the Safari Stays AI Assistant. Use ONLY the context provided to answer questions. Be helpful, concise, and friendly. Use emojis appropriately.

PROPERTY CONTEXT:
${JSON.stringify(context, null, 2)}

GENERAL POLICIES:
- Check-in: 2:00 PM - 6:00 PM
- Check-out: 8:00 AM - 11:00 AM
- Payment: M-Pesa, Bank Transfer, Cash, Cards
- Cancellation: Free up to 7 days before check-in
- Contact: +254113556385

Answer the user's question based on this information.`;

    try {
        // Example: Gemini API call
        const response = await fetch('YOUR_GEMINI_API_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY'
            },
            body: JSON.stringify({
                prompt: systemPrompt + "\n\nUser: " + message,
                temperature: 0.7,
                max_tokens: 300
            })
        });
        
        const data = await response.json();
        const aiAnswer = data.text || data.choices[0].message.content;
        
        // Display AI answer
        // ...
        
    } catch (error) {
        console.error('AI Error:', error);
        // Fallback to keyword matching
        const answer = getAnswerFromKnowledge(message);
        // Display fallback answer
        // ...
    }
}
*/