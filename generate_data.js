const fs = require('fs');

const generatePhishing = () => {
  const result = [];
  const senders = ["security@chasey.com", "admin@paypal-update-info.com", "netflix-billing@notflix.com", "irs.gov.alert@gmail.com", "delivery@usps-track-package.net"];
  const subjects_en = ["URGENT: Account Locked", "Your Invoice #9912", "Action Required: Payment Failed", "You have a new secure message", "Final Notice before Closure"];
  const subjects_mr = ["तातडीचे: खाते लॉक केले आहे", "तुमचे बिल #9912", "कृती आवश्यक: पेमेंट अयशस्वी", "तुमच्यासाठी एक नवीन सुरक्षित संदेश आहे", "बंद करण्यापूर्वी अंतिम सूचना"];
  
  const greetings_en = ["Dear Customer,", "Dear User,", "Valued Member,", "Hello,", "Dear [Email Address],"];
  const greetings_mr = ["प्रिय ग्राहक,", "प्रिय वापरकर्ता,", "माननीय सदस्य,", "नमस्कार,", "प्रिय [Email Address],"];

  const bodies_en = [
    "Your account has been locked due to suspicious activity. Please verify your identity immediately.",
    "Your recent payment of $499.99 was successful. If you did not make this, click the link to cancel.",
    "We tried to deliver your package but nobody was home. Please pay the $1.99 redelivery fee.",
    "Your tax return is ready. Claim your refund by clicking the button below.",
    "Your subscription has expired. Update your billing details now to avoid losing access."
  ];
  const bodies_mr = [
    "संशयास्पद कारवायांमुळे तुमचे खाते लॉक केले गेले आहे. कृपया त्वरित तुमची ओळख सत्यापित करा.",
    "तुमचे $499.99 चे अलीकडील पेमेंट यशस्वी झाले आहे. तुम्ही हे न केल्यास, रद्द करण्यासाठी लिंकवर क्लिक करा.",
    "आम्ही तुमचे पॅकेज पोहोचवण्याचा प्रयत्न केला पण घरी कोणीही नव्हते. कृपया $1.99 पुनर्प्राप्ती शुल्क भरा.",
    "तुमचा टॅक्स रिटर्न तयार आहे. खालील बटणावर क्लिक करून तुमचा परतावा मिळवा.",
    "तुमची सदस्यता संपली आहे. प्रवेश न गमावण्यासाठी तुमचे बिलिंग तपशील आता अपडेट करा."
  ];

  const ex_sender_en = "Suspicious sender email domain.";
  const ex_sender_mr = "संशयास्पद प्रेषक ईमेल डोमेन.";
  const ex_greeting_en = "Generic greeting instead of your name.";
  const ex_greeting_mr = "तुमच्या नावाऐवजी सामान्य अभिवादन.";
  const ex_link_en = "A dangerous button hiding a fake URL.";
  const ex_link_mr = "खोटा URL लपवणारे एक धोकादायक बटण.";
  const link_text_en = "Click Here";
  const link_text_mr = "येथे क्लिक करा";

  for (let i = 0; i < 50; i++) {
    result.push({
      id: i + 1,
      sender: senders[i % senders.length],
      subject: { en: subjects_en[i % subjects_en.length], mr: subjects_mr[i % subjects_mr.length] },
      greeting: { en: greetings_en[i % greetings_en.length], mr: greetings_mr[i % greetings_mr.length] },
      body: { en: bodies_en[i % bodies_en.length], mr: bodies_mr[i % bodies_mr.length] },
      risks: [
        { id: 'sender', text: senders[i % senders.length], explanation: { en: ex_sender_en, mr: ex_sender_mr }, found: false },
        { id: 'greeting', text: { en: greetings_en[i % greetings_en.length], mr: greetings_mr[i % greetings_mr.length] }, explanation: { en: ex_greeting_en, mr: ex_greeting_mr }, found: false },
        { id: 'link', text: { en: link_text_en, mr: link_text_mr }, explanation: { en: ex_link_en, mr: ex_link_mr }, found: false }
      ]
    });
  }
  return result;
};

const generateRedFlags = () => {
  const result = [];
  const platforms = ["WhatsApp", "SMS", "Email", "Facebook", "Instagram"];
  const scenarios_en = [
    "You won a gift card!",
    "Your grandson is in jail and needs bail money instantly.",
    "An unfamiliar number sends a link to a funny video.",
    "Your bank asks you to reply with your PIN.",
    "A charity asks for donations via Apple Gift Cards."
  ];
  const scenarios_mr = [
    "तुम्ही गिफ्ट कार्ड जिंकले आहे!",
    "तुमचा नातू तुरुंगात आहे आणि त्याला तातडीने जामीन रक्कम हवी आहे.",
    "एका अनोळखी नंबरवरून एका मजेदार व्हिडिओची लिंक येते.",
    "तुमची बँक तुम्हाला तुमचा PIN रिप्लाय करण्यास सांगते.",
    "एक संस्था ॲपल गिफ्ट कार्डद्वारे देणगी मागत आहे."
  ];

  const q_en = "What is the biggest red flag here?";
  const q_mr = "येथील सर्वात मोठा धोक्याचा इशारा कोणता आहे?";

  const opt_a_text_en = "It's asking for immediate money/info.";
  const opt_a_text_mr = "ती त्वरित पैसे/माहिती मागत आहे.";
  const opt_a_exp_en = "Correct! Scammers create panic to force you to surrender cash or info.";
  const opt_a_exp_mr = "बरोबर! फसवणूक करणारे तुमच्याकडून रोख रक्कम किंवा माहिती मिळवण्यासाठी घबराट निर्माण करतात.";

  const opt_b_text_en = "It looks totally normal.";
  const opt_b_text_mr = "ते पूर्णपणे सामान्य दिसते.";
  const opt_c_text_en = "It came on a Tuesday.";
  const opt_c_text_mr = "ते मंगळवारी आले.";

  for (let i = 0; i < 50; i++) {
    const isScam = true; // all red flags are scams for practice
    result.push({
      id: i + 1,
      type: i % 2 === 0 ? 'sms' : 'email',
      scenario: { en: `Scenario ${i + 1}: ${platforms[i % platforms.length]} message.`, mr: `परिदृश्य ${i + 1}: ${platforms[i % platforms.length]} संदेश.` },
      message: { en: scenarios_en[i % scenarios_en.length], mr: scenarios_mr[i % scenarios_mr.length] },
      question: { en: q_en, mr: q_mr },
      options: [
        { id: 'a', text: { en: opt_a_text_en, mr: opt_a_text_mr }, isCorrect: true, explanation: { en: opt_a_exp_en, mr: opt_a_exp_mr } },
        { id: 'b', text: { en: opt_b_text_en, mr: opt_b_text_mr }, isCorrect: false },
        { id: 'c', text: { en: opt_c_text_en, mr: opt_c_text_mr }, isCorrect: false }
      ]
    });
  }
  return result;
};

const generateSecurePin = () => {
  const result = [];
  const exp_bad_en = "This PIN is too common. Scammers try sequences like 123456 or repeated numbers.";
  const exp_bad_mr = "हा पिन खूप सामान्य आहे. फसवणूक करणारे 123456 किंवा पुनरावृत्ती केलेले नंबर वापरतात.";
  const exp_good_en = "This is a strong, random PIN.";
  const exp_good_mr = "हा एक मजबूत, यादृच्छिक पिन आहे.";

  for (let i = 0; i < 50; i++) {
    const badPins = ["123456", "000000", "111111", "987654", "258025"];
    const goodPins = ["749281", "304812", "812049", "562912", "409183"];
    const isBad = i % 2 === 0;
    const pin = isBad ? badPins[i % badPins.length] : goodPins[i % goodPins.length];
    
    result.push({
      id: i + 1,
      pin: pin,
      isSecure: !isBad,
      explanation: { 
        en: isBad ? exp_bad_en : exp_good_en, 
        mr: isBad ? exp_bad_mr : exp_good_mr 
      }
    });
  }
  return result;
};

const generateDigitalId = () => {
  const result = [];
  const scenarios_en = [
    "Uploading your driver's license to a public Facebook group.", 
    "Sending your passport photo via unencrypted email.",
    "Submitting your ID securely on an official ending in .gov website."
  ];
  const scenarios_mr = [
    "तुमचा ड्रायव्हिंग लायसन्स सार्वजनिक फेसबुक ग्रुपवर अपलोड करणे.", 
    "तुमचा पासपोर्ट फोटो अनएनक्रिप्टेड ईमेलद्वारे पाठवणे.",
    "अधिकृत .gov वेबसाइटवर तुमचा आयडी सुरक्षितपणे सबमिट करणे."
  ];

  const q_en = "Is this action safe for your Digital Identity?";
  const q_mr = "ही कृती तुमच्या डिजिटल ओळखीसाठी सुरक्षित आहे का?";

  const safe_exp_true_en = "Correct! Official government portals are secure.";
  const safe_exp_true_mr = "बरोबर! अधिकृत सरकारी पोर्टल्स सुरक्षित असतात.";
  const safe_exp_false_en = "Incorrect! This exposes your identity to thieves.";
  const safe_exp_false_mr = "चुकीचे! हे तुमची ओळख चोरांसमोर उघड करते.";

  const unsafe_exp_true_en = "Correct! Never share ID over public or unencrypted channels.";
  const unsafe_exp_true_mr = "बरोबर! सार्वजनिक किंवा अनएनक्रिप्टेड चॅनेलवर ओळख कधीही शेअर करू नका.";
  const unsafe_exp_false_en = "Incorrect! Official portals are designed for secure sharing.";
  const unsafe_exp_false_mr = "चुकीचे! सुरक्षित शेअरिंगसाठी अधिकृत पोर्टल्स तयार केली जातात.";
  
  for (let i = 0; i < 50; i++) {
    const isSafe = i % 3 === 2;
    result.push({
      id: i + 1,
      scenario: { en: scenarios_en[i % scenarios_en.length], mr: scenarios_mr[i % scenarios_mr.length] },
      question: { en: q_en, mr: q_mr },
      options: [
        { id: 'safe', text: { en: "Safe", mr: "सुरक्षित" }, isCorrect: isSafe, explanation: { en: isSafe ? safe_exp_true_en : safe_exp_false_en, mr: isSafe ? safe_exp_true_mr : safe_exp_false_mr } },
        { id: 'unsafe', text: { en: "Unsafe", mr: "असुरक्षित" }, isCorrect: !isSafe, explanation: { en: !isSafe ? unsafe_exp_true_en : unsafe_exp_false_en, mr: !isSafe ? unsafe_exp_true_mr : unsafe_exp_false_mr } }
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
