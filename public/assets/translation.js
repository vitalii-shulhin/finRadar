// Initialize Google Translate
function googleTranslateElementInit() {
  if (typeof google !== 'undefined' && google.translate) {
    new google.translate.TranslateElement(
      {
        pageLanguage: 'auto',
        includedLanguages: 'en,uk',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        multilanguagePage: true
      },
      'google_translate_element'
    );
  }
}

// Make it globally available
window.googleTranslateElementInit = googleTranslateElementInit;
