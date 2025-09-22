import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "en",
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          welcome: "AgriChain",
          title: "Track the supply chain from farm to fork with transparency.",
          dashboard: "Dashboard",
          Transactions: "Transactions",
          government: "Government Collaboration",
          govText1: "AgriChain allows government agencies to integrate directly with the supply chain ecosystem. This ensures proper monitoring of agricultural resources, subsidies, and quality standards.",
          govText2: "By connecting with AgriChain, government departments can reduce bureaucracy, increase accountability, and support sustainable agricultural practices nationwide.",
          learnMore: "Learn More",
          workflowTitle: "End-to-End Workflow",
          steps: [
            {
              title: "1. Farmer Adds Produce",
              text: "Farmer logs into the Web/Mobile App, enters crop details (name, quantity, price, quality, location). Backend stores data in the database and sends a transaction to the blockchain. A QR code and Batch ID are generated, linked to the blockchain record."
            },
            {
              title: "2. Distributor Picks Up Produce",
              text: "Distributor logs into the Web App to view available batches. Updates transport details such as pickup time, storage conditions, and delivery status. Backend updates both database and blockchain, creating a tamper-proof record."
            },
            {
              title: "3. Retailer Receives Produce",
              text: "Retailer logs in to view incoming batches, updates final price, stock availability, and confirms receipt. Backend again updates database and blockchain, ensuring full traceability and verified pricing."
            },
            {
              title: "4. Consumer Scans QR Code",
              text: "Consumer scans the QR code via Mobile App. The app calls the backend to fetch batch history from the blockchain, showing the entire journey: Farmer → Distributor → Retailer, with quality info, price transparency, and timestamps."
            },
            {
              title: "5. Blockchain Role",
              text: "Every update—Farmer to Distributor to Retailer—is committed to the blockchain. Immutable records prevent tampering or fraud, and each transaction is forever linked to the Batch ID for complete traceability."
            },
            {
              title: "6. Government Oversight",
              text: "Government agencies can monitor production, subsidies, and food safety in real time. Through secure dashboards they track blockchain-verified data, enforce quality standards, and quickly respond to supply-chain issues, ensuring nationwide agricultural transparency and support for farmers."
            }
          ]
        },
      },
      hi: {
        translation: {
          welcome: "एग्रीचेन",
          title: "खेत से लेकर कांटे तक आपूर्ति श्रृंखला पर पारदर्शिता के साथ नज़र रखें।",
          dashboard: "डैशबोर्ड",
          Transactions: "लेनदेन",
          government: "सरकारी सहयोग",
          govText1: "एग्रीचेन सरकारी एजेंसियों को आपूर्ति श्रृंखला पारिस्थितिकी तंत्र के साथ सीधे जुड़ने की अनुमति देता है। इससे कृषि संसाधनों, सब्सिडी और गुणवत्ता मानकों की उचित निगरानी सुनिश्चित होती है।",
          govText2: "एग्रीचेन से जुड़कर सरकारी विभाग नौकरशाही को कम कर सकते हैं, जवाबदेही बढ़ा सकते हैं और स्थायी कृषि प्रथाओं का समर्थन कर सकते हैं।",
          learnMore: "और जानें",
          workflowTitle: "संपूर्ण वर्कफ़्लो",
          steps: [
            { title: "1. किसान उत्पादन जोड़ता है", text: "किसान वेब/मोबाइल ऐप में लॉग इन करता है, फसल का विवरण (नाम, मात्रा, कीमत, गुणवत्ता, स्थान) दर्ज करता है। बैकएंड डेटाबेस में डेटा संग्रहीत करता है और ब्लॉकचेन को लेनदेन भेजता है। एक क्यूआर कोड और बैच आईडी जनरेट होती है, जो ब्लॉकचेन रिकॉर्ड से जुड़ी होती है।" },
            { title: "2. वितरक उत्पादन उठाता है", text: "वितरक उपलब्ध बैच देखने के लिए वेब ऐप में लॉग इन करता है। परिवहन विवरण जैसे पिकअप समय, भंडारण की स्थिति और डिलीवरी की स्थिति अपडेट करता है। बैकएंड डेटाबेस और ब्लॉकचेन दोनों को अपडेट करता है, जिससे छेड़छाड़-रोधी रिकॉर्ड बनता है।" },
            { title: "3. रिटेलर प्राप्त करता है", text: "रिटेलर आने वाले बैच देखने के लिए लॉग इन करता है, अंतिम मूल्य, स्टॉक की उपलब्धता अपडेट करता है और रसीद की पुष्टि करता है। बैकएंड फिर से डेटाबेस और ब्लॉकचेन को अपडेट करता है, जिससे पूर्ण ट्रेसेबिलिटी और सत्यापित मूल्य निर्धारण सुनिश्चित होता है।" },
            { title: "4. उपभोक्ता QR स्कैन करता है", text: "उपभोक्ता मोबाइल ऐप के ज़रिए क्यूआर कोड स्कैन करता है। ऐप ब्लॉकचेन से बैच हिस्ट्री लाने के लिए बैकएंड को कॉल करता है, जिसमें पूरी प्रक्रिया दिखाई जाती है: किसान → वितरक → खुदरा विक्रेता, गुणवत्ता की जानकारी, मूल्य पारदर्शिता और टाइमस्टैम्प के साथ।" },
            { title: "5. ब्लॉकचेन भूमिका", text: "हर अपडेट—किसान से लेकर वितरक और फिर खुदरा विक्रेता तक—ब्लॉकचेन के लिए प्रतिबद्ध है। अपरिवर्तनीय रिकॉर्ड छेड़छाड़ या धोखाधड़ी को रोकते हैं, और हर लेन-देन पूरी तरह से पता लगाने के लिए हमेशा बैच आईडी से जुड़ा रहता है।" },
            { title: "6. सरकारी निरीक्षण", text: "सरकारी एजेंसियाँ उत्पादन, सब्सिडी और खाद्य सुरक्षा की वास्तविक समय में निगरानी कर सकती हैं। सुरक्षित डैशबोर्ड के माध्यम से, वे ब्लॉकचेन-सत्यापित डेटा को ट्रैक करते हैं, गुणवत्ता मानकों को लागू करते हैं, और आपूर्ति-श्रृंखला संबंधी समस्याओं का त्वरित समाधान करते हैं, जिससे देशव्यापी कृषि पारदर्शिता और किसानों के लिए समर्थन सुनिश्चित होता है।" }
          ]
        },
      },
      gu: {
        translation: {
          welcome: "એગ્રીચેન",
          title: "ખેતરથી લઈને કાંટા સુધી સપ્લાય ચેઇનને પારદર્શિતા સાથે ટ્રેક કરો.",
          dashboard: "ડેશબોર્ડ",
          Transactions: "વ્યવહારો",
          government: "સરકારી સહયોગ",
          govText1: "એગ્રીચેન સરકારી એજન્સીઓને સપ્લાય ચેઇન ઇકોસિસ્ટમ સાથે સીધા જોડાવાની મંજૂરી આપે છે. તે કૃષિ સંસાધનો, સબસિડી અને ગુણવત્તા ધોરણોની યોગ્ય દેખરેખ સુનિશ્ચિત કરે છે.",
          govText2: "એગ્રીચેન સાથે જોડાવાથી સરકારી વિભાગો બ્યૂરોક્રેસી ઘટાડે શકે છે, જવાબદારી વધારી શકે છે અને ટકાઉ કૃષિ પ્રથાનો સમર્થન આપી શકે છે.",
          learnMore: "વધારે જાણવા માટે",
          workflowTitle: "એન્ડ-ટુ-એન્ડ વર્કફ્લો",
          steps: [
            { title: "1. ખેડૂત ઉત્પાદન ઉમેરે છે", text: "ખેડૂત વેબ/મોબાઇલ એપમાં લોગ ઇન કરે છે, પાકની વિગતો (નામ, જથ્થો, કિંમત, ગુણવત્તા, સ્થાન) દાખલ કરે છે. બેકએન્ડ ડેટાબેઝમાં ડેટા સ્ટોર કરે છે અને બ્લોકચેનને વ્યવહાર મોકલે છે. બ્લોકચેન રેકોર્ડ સાથે લિંક થયેલ QR કોડ અને બેચ ID જનરેટ થાય છે." },
            { title: "2. વિતરણકર્તા ઉત્પાદન લે છે", text: "ઉપલબ્ધ બેચ જોવા માટે ડિસ્ટ્રિબ્યુટર વેબ એપમાં લોગ ઇન કરે છે. પિકઅપ સમય, સ્ટોરેજ સ્થિતિ અને ડિલિવરીની સ્થિતિ જેવી પરિવહન વિગતો અપડેટ કરે છે. બેકએન્ડ ડેટાબેઝ અને બ્લોકચેન બંનેને અપડેટ કરે છે, જેનાથી ટેમ્પર-પ્રૂફ રેકોર્ડ બને છે." },
            { title: "3. રિટેલર પ્રાપ્ત કરે છે", text: "રિટેલર આવનારા બેચ જોવા માટે લોગ ઇન કરે છે, અંતિમ કિંમત, સ્ટોક ઉપલબ્ધતા અપડેટ કરે છે અને રસીદની પુષ્ટિ કરે છે. બેકએન્ડ ફરીથી ડેટાબેઝ અને બ્લોકચેનને અપડેટ કરે છે, સંપૂર્ણ ટ્રેસેબિલિટી અને ચકાસાયેલ કિંમત સુનિશ્ચિત કરે છે." },
            { title: "4. ગ્રાહક QR સ્કેન કરે છે", text: "ગ્રાહક મોબાઇલ એપ દ્વારા QR કોડ સ્કેન કરે છે. આ એપ બ્લોકચેનમાંથી બેચ ઇતિહાસ મેળવવા માટે બેકએન્ડને કોલ કરે છે, જે સમગ્ર મુસાફરી દર્શાવે છે: ખેડૂત → વિતરક → છૂટક વેપારી, ગુણવત્તા માહિતી, કિંમત પારદર્શિતા અને ટાઇમસ્ટેમ્પ સાથે." },
            { title: "5. બ્લોકચેન ભૂમિકા", text: "ખેડૂતથી વિતરક સુધીના દરેક અપડેટ - બ્લોકચેન પ્રત્યે પ્રતિબદ્ધ છે. અપરિવર્તનશીલ રેકોર્ડ્સ છેતરપિંડી અથવા છેતરપિંડી અટકાવે છે, અને દરેક વ્યવહાર સંપૂર્ણ ટ્રેસેબિલિટી માટે હંમેશા બેચ ID સાથે જોડાયેલ રહે છે." },
            { title: "6. સરકારી નિરીક્ષણ", text: "સરકારી એજન્સીઓ વાસ્તવિક સમયમાં ઉત્પાદન, સબસિડી અને ખાદ્ય સલામતીનું નિરીક્ષણ કરી શકે છે. સુરક્ષિત ડેશબોર્ડ દ્વારા તેઓ બ્લોકચેન-ચકાસાયેલ ડેટાને ટ્રેક કરે છે, ગુણવત્તા ધોરણો લાગુ કરે છે અને સપ્લાય-ચેઇન સમસ્યાઓનો ઝડપથી જવાબ આપે છે, જેનાથી રાષ્ટ્રવ્યાપી કૃષિ પારદર્શિતા અને ખેડૂતો માટે સહાય સુનિશ્ચિત થાય છે." }
          ]
        },
      },
    },
    interpolation: {
      escapeValue: false
    },
  });

export default i18n;
