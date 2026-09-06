/**
 * Browser automation injection scripts for CPA task completion
 * These scripts are injected into WebView to automate form filling,
 * human behavior simulation, and smart completion detection.
 */

export function buildTimezoneScript(timezone: string, language: string): string {
  return `
(function() {
  try {
    // Override timezone
    const tz = '${timezone}';
    const lang = '${language}';
    
    // Patch Intl.DateTimeFormat
    const OrigIntl = window.Intl;
    const OrigDTF = Intl.DateTimeFormat;
    Intl.DateTimeFormat = function(locales, options) {
      options = options || {};
      if (!options.timeZone) options.timeZone = tz;
      return new OrigDTF(lang, options);
    };
    Intl.DateTimeFormat.prototype = OrigDTF.prototype;
    
    // Patch navigator.language
    Object.defineProperty(navigator, 'language', { get: () => lang, configurable: true });
    Object.defineProperty(navigator, 'languages', { get: () => [lang, lang.split('-')[0]], configurable: true });
    
    // Disable WebRTC
    if (window.RTCPeerConnection) window.RTCPeerConnection = undefined;
    if (window.webkitRTCPeerConnection) window.webkitRTCPeerConnection = undefined;
    if (window.mozRTCPeerConnection) window.mozRTCPeerConnection = undefined;
    
    // Block WebRTC via mediaDevices
    if (navigator.mediaDevices) {
      Object.defineProperty(navigator, 'mediaDevices', {
        get: () => ({ getUserMedia: () => Promise.reject(new Error('Blocked')) }),
        configurable: true,
      });
    }
    
    console.log('[CPA] Browser patched: tz=' + tz + ' lang=' + lang);
  } catch(e) {
    console.warn('[CPA] Patch error:', e.message);
  }
})();
true;
`;
}

export function buildSmartFormFillScript(identity: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  birthDate: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  zip?: string;
}): string {
  return `
(function() {
  var identity = ${JSON.stringify(identity)};
  
  function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
  
  function setNativeValue(element, value) {
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
    if (nativeInputValueSetter) {
      nativeInputValueSetter.set.call(element, value);
    } else {
      element.value = value;
    }
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new Event('blur', { bubbles: true }));
  }
  
  function matchField(el) {
    var raw = ((el.name || '') + ' ' + (el.id || '') + ' ' + (el.placeholder || '') + ' ' + (el.autocomplete || '') + ' ' + (el.className || '')).toLowerCase();
    
    if (raw.match(/first.?name|fname|given.?name|prenom|vorname/)) return 'firstName';
    if (raw.match(/last.?name|lname|surname|family.?name|nom|nachname/)) return 'lastName';
    if (raw.match(/full.?name|nombre.?completo|nom.?complet/)) return 'fullName';
    if (raw.match(/email|e-mail|courriel/)) return 'email';
    if (raw.match(/phone|tel|mobile|cel|movil/)) return 'phone';
    if (raw.match(/address|addr|street|rue|strasse|calle|via/)) return 'address';
    if (raw.match(/city|ville|stadt|ciudad|citta/)) return 'city';
    if (raw.match(/state|province|region|estado|region/)) return 'state';
    if (raw.match(/zip|postal|postcode|plz|cap/)) return 'postalCode';
    if (raw.match(/country|pays|land|pais|paese/)) return 'country';
    if (raw.match(/birth|dob|birthday|date.?of.?birth/)) return 'birthDate';
    if (raw.match(/card.?number|cardnum|cc.?num|numero.?carte/)) return 'cardNumber';
    if (raw.match(/expiry|expiration|exp.?date|mm.?yy|valid/)) return 'cardExpiry';
    if (raw.match(/cvv|cvc|cvn|security.?code|code.?securite/)) return 'cardCvv';
    return null;
  }
  
  async function fillAll() {
    var inputs = document.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=checkbox]):not([type=radio]), select, textarea');
    var filled = 0;
    
    for (var i = 0; i < inputs.length; i++) {
      var el = inputs[i];
      var field = matchField(el);
      var value = null;
      
      if (field === 'firstName') value = identity.firstName;
      else if (field === 'lastName') value = identity.lastName;
      else if (field === 'fullName') value = identity.firstName + ' ' + identity.lastName;
      else if (field === 'email') value = identity.email;
      else if (field === 'phone') value = identity.phone;
      else if (field === 'address') value = identity.address;
      else if (field === 'city') value = identity.city;
      else if (field === 'state') value = identity.state;
      else if (field === 'postalCode') value = identity.postalCode;
      else if (field === 'country') value = identity.country;
      else if (field === 'birthDate') value = identity.birthDate;
      else if (field === 'cardNumber' && identity.cardNumber) value = identity.cardNumber.replace(/\s/g, '');
      else if (field === 'cardExpiry' && identity.cardExpiry) value = identity.cardExpiry;
      else if (field === 'cardCvv' && identity.cardCvv) value = identity.cardCvv;
      
      if (value && el.tagName === 'SELECT') {
        var opts = el.options;
        for (var j = 0; j < opts.length; j++) {
          if (opts[j].text.toLowerCase().includes(value.toLowerCase()) ||
              opts[j].value.toLowerCase().includes(value.toLowerCase().slice(0, 3))) {
            el.selectedIndex = j;
            el.dispatchEvent(new Event('change', { bubbles: true }));
            filled++;
            break;
          }
        }
      } else if (value) {
        await delay(80 + Math.random() * 120);
        el.focus();
        await delay(50);
        setNativeValue(el, value);
        filled++;
      }
    }
    
    console.log('[CPA] Filled ' + filled + ' fields');
    
    // Click Continue/Next/Submit buttons
    setTimeout(function() {
      var btns = document.querySelectorAll('button, input[type=submit], a.btn, [class*=btn]');
      var keywords = ['continue', 'next', 'submit', 'go', 'proceed', 'enter', 'get', 'join', 'start', 'claim'];
      for (var k = 0; k < btns.length; k++) {
        var txt = (btns[k].textContent || btns[k].value || '').toLowerCase().trim();
        if (keywords.some(kw => txt.includes(kw))) {
          console.log('[CPA] Clicking: ' + txt);
          btns[k].click();
          break;
        }
      }
    }, 1500);
  }
  
  // Wait for page to load
  if (document.readyState === 'complete') {
    fillAll();
  } else {
    window.addEventListener('load', fillAll);
  }
  
  // Also fill on DOM mutations (for SPAs)
  var observer = new MutationObserver(function(mutations) {
    var hasNewInputs = mutations.some(m =>
      Array.from(m.addedNodes).some(n => n.nodeType === 1 && (n.tagName === 'INPUT' || n.querySelectorAll))
    );
    if (hasNewInputs) {
      setTimeout(fillAll, 500);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  
})();
true;
`;
}

export function buildHumanBehaviorScript(): string {
  return `
(function() {
  // Random mouse movement simulation
  var x = Math.random() * window.innerWidth;
  var y = Math.random() * window.innerHeight;
  
  function randomMove() {
    x += (Math.random() - 0.5) * 30;
    y += (Math.random() - 0.5) * 30;
    x = Math.max(0, Math.min(window.innerWidth, x));
    y = Math.max(0, Math.min(window.innerHeight, y));
    
    document.dispatchEvent(new MouseEvent('mousemove', {
      clientX: x, clientY: y, bubbles: true,
      screenX: x + window.screenX, screenY: y + window.screenY,
    }));
    setTimeout(randomMove, 300 + Math.random() * 700);
  }
  randomMove();
  
  // Random scroll
  function randomScroll() {
    var scrollY = Math.random() * 200 - 100;
    window.scrollBy({ top: scrollY, behavior: 'smooth' });
    setTimeout(randomScroll, 3000 + Math.random() * 5000);
  }
  setTimeout(randomScroll, 2000);
  
  console.log('[CPA] Human behavior active');
})();
true;
`;
}

export function buildCompletionDetectorScript(keywords: string[]): string {
  const kwList = JSON.stringify(keywords.map(k => k.toLowerCase()));
  return `
(function() {
  var keywords = ${kwList};
  var completionReported = false;
  
  function checkCompletion() {
    var bodyText = document.body.innerText.toLowerCase();
    var title = document.title.toLowerCase();
    var found = keywords.some(function(kw) {
      return bodyText.includes(kw) || title.includes(kw);
    });
    
    if (found && !completionReported) {
      completionReported = true;
      window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'TASK_COMPLETE',
        keyword: keywords.find(kw => bodyText.includes(kw) || title.includes(kw)),
        url: window.location.href,
      }));
      console.log('[CPA] Task completion detected!');
    }
    return found;
  }
  
  // Check on load and on DOM changes
  window.addEventListener('load', function() { setTimeout(checkCompletion, 1000); });
  
  var obs = new MutationObserver(function() {
    setTimeout(checkCompletion, 500);
  });
  obs.observe(document.body, { childList: true, subtree: true, characterData: true });
  
  console.log('[CPA] Completion detector ready, keywords: ' + keywords.join(', '));
})();
true;
`;
}

export function buildAntiDetectionScript(userAgent: string, timezone: string, language: string): string {
  return `
(function() {
  try {
    // Spoof WebGL
    var getParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function(parameter) {
      if (parameter === 37445) return 'Intel Inc.';
      if (parameter === 37446) return 'Intel Iris OpenGL Engine';
      return getParameter.call(this, parameter);
    };
  } catch(e) {}
  
  try {
    // Hide automation indicators
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined, configurable: true });
    Object.defineProperty(navigator, 'plugins', { get: () => [1,2,3,4,5], configurable: true });
    Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 4, configurable: true });
    Object.defineProperty(navigator, 'deviceMemory', { get: () => 8, configurable: true });
    
    // Canvas fingerprint spoofing
    var origToDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function(type) {
      if (type === 'image/png' && this.width === 16 && this.height === 16) {
        return origToDataURL.apply(this, arguments);
      }
      var result = origToDataURL.apply(this, arguments);
      return result.slice(0, -6) + btoa(String.fromCharCode(Math.floor(Math.random() * 256))) + '==';
    };
  } catch(e) {}
  
  console.log('[CPA] Anti-detection active');
})();
true;
`;
}
