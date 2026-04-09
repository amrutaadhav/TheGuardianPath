const fs = require('fs');

const generatePhishing = () => {
  const result = [];
  const senders = ["security@chasey.com", "admin@paypal-update-info.com", "netflix-billing@notflix.com", "irs.gov.alert@gmail.com", "delivery@usps-track-package.net"];
  const subjects = ["URGENT: Account Locked", "Your Invoice #9912", "Action Required: Payment Failed", "You have a new secure message", "Final Notice before Closure"];
  const greetings = ["Dear Customer,", "Dear User,", "Valued Member,", "Hello,", "Dear [Email Address],"];
  const bodies = [
    "Your account has been locked due to suspicious activity. Please verify your identity immediately.",
    "Your recent payment of $499.99 was successful. If you did not make this, click the link to cancel.",
    "We tried to deliver your package but nobody was home. Please pay the $1.99 redelivery fee.",
    "Your tax return is ready. Claim your refund by clicking the button below.",
    "Your subscription has expired. Update your billing details now to avoid losing access."
  ];

  for (let i = 0; i < 50; i++) {
    result.push({
      id: i + 1,
      sender: senders[i % senders.length],
      subject: subjects[i % subjects.length],
      greeting: greetings[i % greetings.length],
      body: bodies[i % bodies.length],
      risks: [
        { id: 'sender', text: senders[i % senders.length], explanation: 'Suspicious sender email domain.', found: false },
        { id: 'greeting', text: greetings[i % greetings.length], explanation: 'Generic greeting instead of your name.', found: false },
        { id: 'link', text: 'Click Here', explanation: 'A dangerous button hiding a fake URL.', found: false }
      ]
    });
  }
  return result;
};

const generateRedFlags = () => {
  const result = [];
  const platforms = ["WhatsApp", "SMS", "Email", "Facebook", "Instagram"];
  const scenarios = [
    "You won a gift card!",
    "Your grandson is in jail and needs bail money instantly.",
    "An unfamiliar number sends a link to a funny video.",
    "Your bank asks you to reply with your PIN.",
    "A charity asks for donations via Apple Gift Cards."
  ];

  for (let i = 0; i < 50; i++) {
    const isScam = true; // all red flags are scams for practice
    result.push({
      id: i + 1,
      type: i % 2 === 0 ? 'sms' : 'email',
      scenario: `Scenario ${i + 1}: ${platforms[i % platforms.length]} message.`,
      message: scenarios[i % scenarios.length],
      question: "What is the biggest red flag here?",
      options: [
        { id: 'a', text: "It's asking for immediate money/info.", isCorrect: true, explanation: "Correct! Scammers create panic to force you to surrender cash or info." },
        { id: 'b', text: "It looks totally normal.", isCorrect: false },
        { id: 'c', text: "It came on a Tuesday.", isCorrect: false }
      ]
    });
  }
  return result;
};

const generateSecurePin = () => {
  const result = [];
  for (let i = 0; i < 50; i++) {
    const badPins = ["123456", "000000", "111111", "987654", "258025"];
    const goodPins = ["749281", "304812", "812049", "562912", "409183"];
    const isBad = i % 2 === 0;
    const pin = isBad ? badPins[i % badPins.length] : goodPins[i % goodPins.length];
    
    result.push({
      id: i + 1,
      pin: pin,
      isSecure: !isBad,
      explanation: isBad 
        ? "This PIN is too common. Scammers try sequences like 123456 or repeated numbers." 
        : "This is a strong, random PIN."
    });
  }
  return result;
};

const generateDigitalId = () => {
  const result = [];
  const scenarios = [
    "Uploading your driver's license to a public Facebook group.", 
    "Sending your passport photo via unencrypted email.",
    "Submitting your ID securely on an official ending in .gov website."
  ];
  
  for (let i = 0; i < 50; i++) {
    const isSafe = i % 3 === 2;
    result.push({
      id: i + 1,
      scenario: scenarios[i % scenarios.length],
      question: "Is this action safe for your Digital Identity?",
      options: [
        { id: 'safe', text: "Safe", isCorrect: isSafe, explanation: isSafe ? "Correct! Official government portals are secure." : "Incorrect! This exposes your identity to thieves." },
        { id: 'unsafe', text: "Unsafe", isCorrect: !isSafe, explanation: !isSafe ? "Correct! Never share ID over public or unencrypted channels." : "Incorrect! Official portals are designed for secure sharing." }
      ]
    });
  }
  return result;
};

const db = {
  phishing: generatePhishing(),
  redflags: generateRedFlags(),
  securepin: generateSecurePin(),
  digitalid: generateDigitalId()
};

fs.mkdirSync('./frontend/src/data', { recursive: true });
fs.writeFileSync('./frontend/src/data/modulesData.json', JSON.stringify(db, null, 2));
console.log("Successfully generated exactly 50 practice scenarios per module (200 total).");
