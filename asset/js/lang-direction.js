/**
 * sets direction and lignment according to language
 */

document.addEventListener('DOMContentLoaded', function() {
  const resourceNames = document.querySelectorAll('.resource-name, .title');
  resourceNames.forEach(span => {
    // Hebrew Unicode range: \u0590-\u05FF
    // Arabic Unicode range: \u0600-\u06FF
    if (/[\u0590-\u05FF\u0600-\u06FF]/.test(span.textContent)) {
      // Contains Hebrew or Arabic - apply RTL styling
      span.style.direction = 'rtl';
      span.style.textAlign = 'right';
      span.style.display = 'inline-block';
      span.style.width = '100%';
    } else {
      // No Hebrew or Arabic - apply LTR styling
      span.style.direction = 'ltr';
      span.style.textAlign = 'left';
      span.style.display = 'inline-block';
      span.style.width = '100%';
    }
  });
});



/**
 * Automatic Page Direction Setter
 * Sets page direction based on HTML lang attribute
 * LTR for English, RTL for Hebrew and Arabic
 */

// Define the function globally so it can be called from other scripts
function setPageDirection() {
  'use strict';
  
  // Get the HTML element
  const htmlElement = document.documentElement;
  
  // Get the lang attribute value
  const langAttribute = htmlElement.getAttribute('lang');
  
  if (!langAttribute) {
    console.warn('No lang attribute found on HTML element');
    return;
  }
  
  // Extract the language code (handle formats like "en-US", "en", "he", "ar")
  const langCode = langAttribute.toLowerCase().split('-')[0];
  
  // Determine direction based on language
  let direction;
  let txtAlign;
  if (langCode === 'en') {
    direction = 'ltr';
    txtAlign = 'left'; 
  } else if (langCode === 'he' || langCode === 'ar') {
    direction = 'rtl';
    txtAlign = 'right';
  } else {
    // Default to LTR for other languages
    direction = 'ltr';
    txtAlign = 'left'; 
    console.info(`Language "${langCode}" not explicitly handled, defaulting to LTR`);
  }
  
  // Set direction on HTML element
  htmlElement.setAttribute('dir', direction);
  
  // Set direction on main-content div if it exists
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.setAttribute('dir', direction);
  }
 
  // set footer text
  const footerTexts = {
      en: "Music, Muslims and Jews: Exploring Past and Contemporary Relationalities is supported by a Breakthrough Research Grant of the Israel Science Foundation (grant no. 1172/24). Contact: <a href='mailto:mmj@gmail.com'>mmj@gmail.com</a>",
      ar: "''الموسيقى والمسلمون واليهود: استكشاف العلاقات المتبادلة في الماضي والحاضر'' ممول بمنحة ''أبحاث رائدة'' من صندوق العلوم الوطني الإسرائيلي (منحة رقم 1172/24). للتواصل: <a href='mailto:mmj@gmail.com'>mmj@gmail.com</a>",
      he: "''מוזיקה, מוסלמים ויהודים: מחקר על יחסיות בעבר ובהווה'' ממומן ע''י מענק ''מחקר פורץ דרך'' של הקרן הלאומית למדע (מענק מס' 1172/24). ליצירת קשר: <a href='mailto:mmj@gmail.com'>mmj@gmail.com</a>"
    };
  document.getElementById("footer-text").innerHTML = footerTexts[langCode] || "";
  
  setTextDirection(document.getElementById('footer-text'), direction, txtAlign);

  
  console.log(`Page direction set to: ${direction} for language: ${langAttribute}`);
}

function setTextDirection(element, direction, textAlign) {
  if (element) {
    element.style.direction = direction;
    element.style.textAlign = textAlign;
  }
}

// Auto-run on page load
(function() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setPageDirection);
  } else {
    setPageDirection();
  }
})();

// fix problem in lightbox on rtl pages
window.addEventListener('load', () => {
  var lg= document.querySelector('.lg-container');
  if (lg) {lg.dir = 'ltr';}
});