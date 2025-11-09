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
  if (langCode === 'en') {
    direction = 'ltr';
  } else if (langCode === 'he' || langCode === 'ar') {
    direction = 'rtl';
  } else {
    // Default to LTR for other languages
    direction = 'ltr';
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
  const texts = {
      en: "Music, Muslims and Jews: Exploring Past and Contemporary Relationalities is supported by a Breakthrough Research Grant of the Israel Science Foundation (grant no. 1172/24)",
      ar: "بحاجة إلى نص عربي",
      he: "צריך טקסט בעברית"
    };
  document.getElementById("footer-text").textContent = texts[langCode] || "";

  console.log(`Page direction set to: ${direction} for language: ${langAttribute}`);
}

// Auto-run on page load
(function() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setPageDirection);
  } else {
    setPageDirection();
  }
})();