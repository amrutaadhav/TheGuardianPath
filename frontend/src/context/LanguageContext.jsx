import React, { createContext, useState, useContext } from 'react';

export const translations = {
  en: {
    dashboard: "Home",
    welcome: "Welcome to The Guardian Path",
    safeSpace: "A safe place to learn how to use your phone safely, without any worries.",
    score: "Your Score",
    startHere: "Start here to learn how to stay safe.",
    courses: "Available Courses",
    comingSoon: "Coming Soon",
    begin: "Start",
    phishingTitle: "Spot Fake Emails & SMS",
    phishingDesc: "Learn how to tell if an email or message is fake to protect your money.",
    redflagsTitle: "Stop Online Scams",
    redflagsDesc: "Learn simple tricks to know when someone is lying to you online.",
    securepinTitle: "Make a Strong PIN",
    securepinDesc: "Learn how to make a safe password or PIN number.",
    digitalidTitle: "Share IDs Safely",
    digitalidDesc: "Learn the right way to send photos of your ID cards.",
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
    scenarioTitle: "Practice Here",
    scenarioDesc: "Pick one below to test yourself.",
    instructionsTitle: "Find the Tricks",
    instructionsDesc: "This is a fake example. Tap or click on the dangerous parts.",
    greatJob: "Great Job!",
    greatJobDesc: "You found all the tricks. You are much safer now.",
    reviewMore: "Practice More",
    whatFound: "What Did You Find?",
    clickMistakesInfo: "Click on the mistakes above to learn why they are bad.",
    correct: "Correct!",
    inbox: "Your Inbox",
    innovationLabs: "New Learning Tools",
    aiScamTitle: "Fake Phone Call Practice",
    aiScamDesc: "Talk to a fake scammer on your screen. Learn how they try to pressure you.",
    communitySirenTitle: "Local Scam Alerts",
    communitySirenDesc: "Tell neighbors about scams near you, and see what scams to avoid.",
    deepfakeLabTitle: "Spot Fake Videos (Deepfakes)",
    deepfakeLabDesc: "Learn how scammers use computers to copy the faces and voices of your family.",
    launchSimulator: "Start Practice",
    reviewModule: "Review Practice",
    practiceScenariosLabel: "Easy Practice Tests",
    helpNow: "Need Help Now?",
    nationalFraud: "Fraud Help Number:",
    panicText: "Don't panic. If someone took your money, block your cards right away and call the number on the back of your bank card.",
    builtWith: "Built with ❤️ to keep you safe.",
    onboardingTitle: "How to use this website",
    onboardingDesc: "We want to help you stay safe. Change the language to Marathi using the 'Globe' button above. Click on any course below to begin.",
    gotIt: "I Understand",
    backToDashboard: "Back to Home"
  },
  mr: { // Marathi
    dashboard: "होम",
    welcome: "द गार्डियन पाथ मध्ये आपले स्वागत आहे",
    safeSpace: "येथे तुम्ही कोणत्याही भीतीशिवाय मोबाईल सुरक्षित कसा वापरायचा ते शिकू शकता.",
    score: "तुमचा स्कोअर",
    startHere: "तुमची सुरक्षा वाढवण्यासाठी येथून सुरुवात करा.",
    courses: " उपलब्ध कोर्सेस",
    comingSoon: "लवकरच येत आहे",
    begin: "सुरू करा",
    phishingTitle: "बनावट मेसेज ओळखा",
    phishingDesc: "तुमचे पैसे चोरण्यासाठी आलेला मेसेज खोटा आहे हे कसे ओळखायचे ते शिका.",
    redflagsTitle: "ऑनलाइन फसवणूक टाळा",
    redflagsDesc: "एखादी व्यक्ती तुम्हाला फसवण्याचा प्रयत्न करत आहे हे ओळखण्याच्या सोप्या युक्त्या शिका.",
    securepinTitle: "मजबूत पासवर्ड बनवा",
    securepinDesc: "सुरक्षित पासवर्ड आणि पिन कसा बनवायचा ते शिका जे कोणीही ओळखू शकणार नाही.",
    digitalidTitle: "ओळखपत्र सुरक्षित पाठवा",
    digitalidDesc: "तुमच्या आधार कार्ड किंवा पॅन कार्डचे फोटो सुरक्षितपणे कसे पाठवायचे याचा सराव करा.",
    loginTitle: "परत आल्याबद्दल स्वागत",
    loginSub: "तुमच्या खात्यात लॉग इन करा.",
    username: "वापरकर्तानाव (Username)",
    password: "पासवर्ड (Password)",
    loginBtn: "लॉग इन करा",
    signUpBtn: "खाते तयार करा",
    noAccount: "खाते नाही का?",
    hasAccount: "आधीच खाते आहे का?",
    logoutBtn: "लॉग आउट करा",
    goBack: "मागे जा",
    scenarioTitle: "येथे सराव करा",
    scenarioDesc: "स्वतःची चाचणी घेण्यासाठी खालीलपैकी एक निवडा.",
    instructionsTitle: "चुका शोधा",
    instructionsDesc: "हे खोटे उदाहरण आहे. यातील धोक्याच्या भागांवर क्लिक करा.",
    greatJob: "खूप छान!",
    greatJobDesc: "तुम्ही सर्व धोकादायक गोष्टी शोधल्या. तुम्ही आता अधिक सुरक्षित आहात.",
    reviewMore: "आणखी सराव करा",
    whatFound: "तुम्हाला काय समजले?",
    clickMistakesInfo: "धोकादायक चुका का वाईट आहेत हे जाणून घेण्यासाठी त्यांच्यावर क्लिक करा.",
    correct: "बरोबर!",
    inbox: "तुमचा इनबॉक्स",
    innovationLabs: "नवीन शिकण्याची साधने",
    aiScamTitle: "बनावट फोन कॉलचा सराव",
    aiScamDesc: "फोनवर फसवणूक करणारे कसे बोलतात आणि ते कसे फसवतात ते शिका.",
    communitySirenTitle: "स्थानिक फसवणूक सूचना",
    communitySirenDesc: "तुमच्या भागात झालेल्या फसवणुकीची माहिती शेजाऱ्यांना द्या आणि सुरक्षित राहा.",
    deepfakeLabTitle: "बनावट व्हिडिओ ओळखा",
    deepfakeLabDesc: "फसवणूक करणारे कॉम्प्युटरचा वापर करून तुमच्या ओळखीच्या लोकांचा चेहरा आणि आवाज कसा बनवतात ते शिका.",
    launchSimulator: "सराव सुरू करा",
    reviewModule: "सरावाची उजळणी करा",
    practiceScenariosLabel: "सोप्या सरावाच्या चाचण्या",
    helpNow: "तातडीची मदत हवी आहे?",
    nationalFraud: "फसवणूक हेल्पलाइन नंबर:",
    panicText: "घाबरू नका. तुमच्या बँक खात्यातून पैसे गेले असल्यास, लगेच तुमचे कार्ड ब्लॉक करा आणि बँकेला कॉल करा.",
    builtWith: "तुम्हाला सुरक्षित ठेवण्यासाठी ❤️ ने बनवलेले.",
    onboardingTitle: "ही वेबसाइट कशी वापरावी",
    onboardingDesc: "तुम्हाला सुरक्षित ठेवणे हा आमचा उद्देश आहे. भाषा बदलण्यासाठी वरच्या 'ग्लोब' बटणावर क्लिक करा. सुरू करण्यासाठी कोणत्याही कोर्सवर क्लिक करा.",
    gotIt: "मला समजले",
    backToDashboard: "होमवर परत जा"
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
