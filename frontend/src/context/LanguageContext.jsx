import React, { createContext, useState, useContext } from 'react';

export const translations = {
  en: {
    dashboard: "Home",
    welcome: "Welcome to The Guardian Path",
    safeSpace: "Here you can learn and practice how to stay safe online without any risks.",
    score: "Your Score",
    startHere: "Start learning to improve your digital safety skills.",
    courses: "Available Courses",
    comingSoon: "Coming Soon",
    begin: "Start",
    phishingTitle: "How to Spot Fake Emails",
    phishingDesc: "Learn how to tell if an email or message is fake and trying to trick you.",
    redflagsTitle: "Spotting Online Scams",
    redflagsDesc: "Learn how to find clues in messages that show they are from scammers.",
    securepinTitle: "Creating a Strong PIN",
    securepinDesc: "Learn how to make a safe PIN or password that others cannot guess.",
    digitalidTitle: "Sharing ID Safely",
    digitalidDesc: "Practice how to safely share photos of your ID cards.",
    loginTitle: "Welcome Back",
    loginSub: "Log in to your account.",
    username: "Username",
    password: "Password",
    loginBtn: "Log In",
    signUpBtn: "Create Account",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    logoutBtn: "Log Out",
    goBack: "Go Back Home",
    scenarioTitle: "Practice Scenarios",
    scenarioDesc: "Select an item below to practice your skills.",
    instructionsTitle: "Find the Tricks",
    instructionsDesc: "This is a fake example. There are mistakes that show it is a scam. Tap or click on the mistakes.",
    greatJob: "Great Job!",
    greatJobDesc: "You found all the tricks. You are safer now.",
    reviewMore: "Practice More",
    whatFound: "What Did You Find?",
    clickMistakesInfo: "Click on the mistakes above to learn why they are dangerous.",
    correct: "Correct!",
    inbox: "Your Inbox"
  },
  mr: { // Marathi
    dashboard: "होम",
    welcome: "द गार्डियन पाथ मध्ये आपले स्वागत आहे",
    safeSpace: "येथे तुम्ही कोणत्याही धोक्याशिवाय ऑनलाइन सुरक्षित कसे राहायचे ते शिकू शकता.",
    score: "तुमचा स्कोअर",
    startHere: "तुमची डिजिटल सुरक्षा कौशल्ये सुधारण्यासाठी शिकण्यास सुरुवात करा.",
    courses: "उपलब्ध कोर्सेस",
    comingSoon: "लवकरच येत आहे",
    begin: "सुरू करा",
    phishingTitle: "बनावट ईमेल कसे ओळखायचे",
    phishingDesc: "एखादा ईमेल किंवा संदेश बनावट आहे आणि तुम्हाला फसवण्याचा प्रयत्न करत आहे हे कसे ओळखायचे ते शिका.",
    redflagsTitle: "ऑनलाइन फसवणूक ओळखणे",
    redflagsDesc: "संदेश ऑनलाइन स्कॅमरकडून आहेत हे दाखवणारे संकेत कसे शोधायचे ते शिका.",
    securepinTitle: "मजबूत पिन तयार करणे",
    securepinDesc: "एक सुरक्षित पिन किंवा पासवर्ड कसा बनवायचा ते शिका जो इतरांना ओळखता येणार नाही.",
    digitalidTitle: "ओळखपत्र सुरक्षितपणे शेअर करणे",
    digitalidDesc: "तुमच्या ओळखपत्रांचे फोटो सुरक्षितपणे शेअर करण्याचा सराव करा.",
    loginTitle: "परत आल्याबद्दल स्वागत",
    loginSub: "तुमच्या खात्यात लॉग इन करा.",
    username: "वापरकर्तानाव (Username)",
    password: "पासवर्ड (Password)",
    loginBtn: "लॉग इन करा",
    signUpBtn: "खाते तयार करा",
    noAccount: "तुमचे खाते नाही का?",
    hasAccount: "तुमचे आधीच खाते आहे का?",
    logoutBtn: "लॉग आउट करा",
    goBack: "मागे जा",
    scenarioTitle: "सराव उदाहरणे",
    scenarioDesc: "सराव करण्यासाठी खालील एक उदाहरण निवडा.",
    instructionsTitle: "चुका शोधा",
    instructionsDesc: "हे एक बनावट उदाहरण आहे. यात काही चुका आहेत. तुम्हाला चुका दिसल्यावर त्यावर टॅप करा.",
    greatJob: "खूप छान!",
    greatJobDesc: "तुम्ही सर्व चुका शोधून काढल्या आहेत. आता तुम्ही अधिक सुरक्षित आहात.",
    reviewMore: "आणखी सराव करा",
    whatFound: "तुम्हाला काय सापडले?",
    clickMistakesInfo: "धोकादायक चुकांची माहिती घेण्यासाठी त्यांच्यावर क्लिक करा.",
    correct: "बरोबर!",
    inbox: "तुमचा इनबॉक्स"
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
