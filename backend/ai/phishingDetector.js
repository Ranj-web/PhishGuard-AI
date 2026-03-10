const { URL } = require('url');

// Feature extraction for URLs
function extractUrlFeatures(urlString) {
  try {
    const parsedUrl = new URL(urlString);
    const hostname = parsedUrl.hostname || '';
    const path = parsedUrl.pathname || '';
    const query = parsedUrl.search || '';

    return {
      urlLength: urlString.length,
      hostnameLength: hostname.length,
      pathLength: path.length,
      queryLength: query.length,
      hasHttps: urlString.startsWith('https://'),
      numDots: (hostname.match(/\./g) || []).length,
      numHyphens: (hostname.match(/-/g) || []).length,
      numDigits: (hostname.match(/\d/g) || []).length,
      hasAtSymbol: hostname.includes('@'),
      hasDoubleSlash: urlString.includes('//'),
      hasIpAddress: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname),
      tld: hostname.split('.').pop() || '',
      subdomainCount: hostname.split('.').length - 2,
      suspiciousWords: ['login', 'secure', 'bank', 'paypal', 'account', 'verify', 'update'].filter(word =>
        hostname.toLowerCase().includes(word)
      ).length
    };
  } catch (error) {
    return {
      urlLength: urlString.length,
      hostnameLength: 0,
      pathLength: 0,
      queryLength: 0,
      hasHttps: false,
      numDots: 0,
      numHyphens: 0,
      numDigits: 0,
      hasAtSymbol: false,
      hasDoubleSlash: false,
      hasIpAddress: false,
      tld: '',
      subdomainCount: 0,
      suspiciousWords: 0
    };
  }
}

// Rule-based phishing detection
function ruleBasedDetection(features) {
  let score = 0;
  let reasons = [];

  // HTTPS check
  if (!features.hasHttps) {
    score += 20;
    reasons.push('No HTTPS encryption');
  }

  // URL length
  if (features.urlLength > 100) {
    score += 15;
    reasons.push('Unusually long URL');
  }

  // Hostname analysis
  if (features.hostnameLength > 50) {
    score += 10;
    reasons.push('Suspicious hostname length');
  }

  // IP address in URL
  if (features.hasIpAddress) {
    score += 25;
    reasons.push('IP address in URL instead of domain');
  }

  // @ symbol in hostname
  if (features.hasAtSymbol) {
    score += 20;
    reasons.push('@ symbol in hostname');
  }

  // Too many dots
  if (features.numDots > 3) {
    score += 15;
    reasons.push('Too many dots in domain');
  }

  // Suspicious words
  if (features.suspiciousWords > 0) {
    score += features.suspiciousWords * 10;
    reasons.push('Contains suspicious keywords');
  }

  // Too many hyphens
  if (features.numHyphens > 2) {
    score += 10;
    reasons.push('Too many hyphens in domain');
  }

  // Too many digits
  if (features.numDigits > 10) {
    score += 10;
    reasons.push('Too many digits in URL');
  }

  return { score: Math.min(score, 100), reasons };
}

// Simple ML model simulation (Logistic Regression)
function simpleMLPrediction(features) {
  // Coefficients based on typical phishing features (simplified)
  const weights = {
    urlLength: 0.001,
    hostnameLength: 0.002,
    hasHttps: -0.5,
    numDots: 0.1,
    numHyphens: 0.15,
    numDigits: 0.01,
    hasAtSymbol: 0.3,
    hasIpAddress: 0.4,
    suspiciousWords: 0.2
  };

  const bias = -1.5;

  let prediction = bias;
  prediction += features.urlLength * weights.urlLength;
  prediction += features.hostnameLength * weights.hostnameLength;
  prediction += (features.hasHttps ? 1 : 0) * weights.hasHttps;
  prediction += features.numDots * weights.numDots;
  prediction += features.numHyphens * weights.numHyphens;
  prediction += features.numDigits * weights.numDigits;
  prediction += (features.hasAtSymbol ? 1 : 0) * weights.hasAtSymbol;
  prediction += (features.hasIpAddress ? 1 : 0) * weights.hasIpAddress;
  prediction += features.suspiciousWords * weights.suspiciousWords;

  // Sigmoid function
  const probability = 1 / (1 + Math.exp(-prediction));

  return probability * 100; // Convert to percentage
}

// Main analysis function
function analyzeUrl(urlString) {
  const features = extractUrlFeatures(urlString);
  const ruleResult = ruleBasedDetection(features);
  const mlScore = simpleMLPrediction(features);

  // Combine rule-based and ML scores
  const combinedScore = (ruleResult.score * 0.6) + (mlScore * 0.4);
  const confidence = Math.round(combinedScore);

  let riskLevel = 'safe';
  let message = 'URL appears safe';

  if (confidence >= 70) {
    riskLevel = 'dangerous';
    message = 'High risk of phishing detected';
  } else if (confidence >= 40) {
    riskLevel = 'suspicious';
    message = 'URL shows suspicious characteristics';
  }

  return {
    riskLevel,
    confidence,
    features,
    reasons: ruleResult.reasons,
    message
  };
}

module.exports = {
  analyzeUrl,
  extractUrlFeatures,
  ruleBasedDetection,
  simpleMLPrediction
};
