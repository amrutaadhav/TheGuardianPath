import React, { createContext, useState, useContext } from 'react';

export const translations = {
  en: {
    dashboard: "Return to Dashboard",
    welcome: "Digital Security Hub",
    safeSpace: "This isolated environment enables you to verify and fortify your digital skills with zero exposure to real-world risks.",
    score: "Security Proficiency",
    startHere: "Begin an interactive curriculum module to elevate your proficiency.",
    courses: "Available Simulation Modules",
    comingSoon: "Module Deploying Soon",
    begin: "Initialize Module",
    phishingTitle: "Phishing Threat Analysis",
    phishingDesc: "Analyze sophisticated, fabricated communications to identify deceptive social engineering vectors.",
    redflagsTitle: "Social Engineering Detection",
    redflagsDesc: "Enhance your cognitive firewall. Verify fraudulent SMS and Email payloads in a localized sandbox.",
    securepinTitle: "Cryptographic PIN configuration",
    securepinDesc: "Deploy a resilient, randomized banking PIN and understand the fundamental vulnerabilities of sequential passcodes.",
    digitalidTitle: "Biometric Identity Portal",
    digitalidDesc: "Navigate an emulated Government ID portal. Practice the secure transmission of sensitive identification imagery.",
    loginTitle: "Guardian Authentication",
    loginSub: "Access your centralized security training environment.",
    username: "Username",
    password: "Password",
    loginBtn: "Authenticate Securely",
    signUpBtn: "Initialize New Account",
    noAccount: "Require a new access pass?",
    hasAccount: "Already a registered trainee?"
  },
  mr: { // Marathi
    dashboard: "डॅशबोर्डवर परत जा",
    welcome: "डिजिटल सुरक्षा हब (Digital Security Hub)",
    safeSpace: "हे स्वतंत्र वातावरण तुम्हाला वास्तविक जगाच्या जोखमींशिवाय तुमच्या डिजिटल कौशल्यांची पडताळणी आणि बळकटी करण्यास सक्षम करते.",
    score: "सुरक्षा प्रवीणता (Security Proficiency)",
    startHere: "तुमची प्रवीणता वाढवण्यासाठी संवादात्मक अभ्यासक्रम ला सुरुवात करा.",
    courses: "उपलब्ध सिम्युलेशन मॉड्यूल्स",
    comingSoon: "लवकरच उपलब्ध होत आहे",
    begin: "मॉड्यूल सुरू करा",
    phishingTitle: "फिशिंग धोका विश्लेषण (Phishing Analysis)",
    phishingDesc: "फसव्या संवाद तंत्रांना ओळखण्यासाठी अत्याधुनिक, बनावट संवादांचे विश्लेषण करा.",
    redflagsTitle: "सोशल इंजिनिअरिंग शोध (Red Flags)",
    redflagsDesc: "तुमची संज्ञानात्मक सुरक्षितता वाढवा. सुरक्षित सँडबॉक्समध्ये बनावट एसएमएस आणि ईमेलची पडताळणी करा.",
    securepinTitle: "क्रिप्टोग्राफिक पिन कॉन्फिगरेशन",
    securepinDesc: "सुरक्षित, यादृच्छिक बँकिंग पिन तयार करा आणि सोप्या पासवर्डचे मूलभूत धोके समजून घ्या.",
    digitalidTitle: "बायोमेट्रिक ओळख पोर्टल",
    digitalidDesc: "एका बनावट सरकारी आयडी पोर्टलवर मार्गक्रमण करा. संवेदनशील ओळखपत्रांचे फोटो सुरक्षितपणे पाठवण्याचा सराव करा.",
    loginTitle: "गार्डियन ऑथेंटिकेशन (प्रमाणीकरण)",
    loginSub: "तुमच्या केंद्रित सुरक्षा प्रशिक्षण वातावरणात प्रवेश करा.",
    username: "वापरकर्तानाव (Username)",
    password: "पासवर्ड (Password)",
    loginBtn: "सुरक्षितपणे प्रमाणित करा",
    signUpBtn: "नवीन खाते प्रमाणित करा",
    noAccount: "नवीन खाते हवे आहे का?",
    hasAccount: "आधीच नोंदणीकृत प्रशिक्षणार्थी आहात?"
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'mr' : 'en');
  };

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
