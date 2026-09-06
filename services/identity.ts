import { GeneratedIdentity, ExtractedInfo } from '../constants/types';

const firstNamesByCountry: Record<string, string[]> = {
  US: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Emily', 'Sarah', 'Jessica', 'Ashley', 'Amanda', 'Jennifer', 'Elizabeth', 'Megan', 'Nicole', 'Hannah'],
  GB: ['Oliver', 'Harry', 'George', 'Noah', 'Jack', 'Leo', 'Arthur', 'Freddie', 'Alfie', 'Oscar', 'Olivia', 'Amelia', 'Isla', 'Ava', 'Emily', 'Isabella', 'Mia', 'Sophie', 'Ella', 'Grace'],
  CA: ['Liam', 'Noah', 'William', 'James', 'Oliver', 'Benjamin', 'Elijah', 'Lucas', 'Mason', 'Ethan', 'Emma', 'Olivia', 'Charlotte', 'Sophia', 'Amelia', 'Isabella', 'Ava', 'Mia', 'Harper', 'Evelyn'],
  AU: ['Jack', 'William', 'Oliver', 'Noah', 'James', 'Lucas', 'Henry', 'Ethan', 'Mason', 'Logan', 'Charlotte', 'Olivia', 'Ava', 'Mia', 'Amelia', 'Harper', 'Sophie', 'Chloe', 'Isla', 'Grace'],
  FR: ['Lucas', 'Nathan', 'Thomas', 'Hugo', 'Theo', 'Maxime', 'Baptiste', 'Antoine', 'Louis', 'Julien', 'Emma', 'Jade', 'Lea', 'Manon', 'Chloe', 'Camille', 'Ines', 'Lucie', 'Clara', 'Anais'],
  DE: ['Leon', 'Luca', 'Finn', 'Jonas', 'Louis', 'Ben', 'Elias', 'Paul', 'Noah', 'Felix', 'Mia', 'Emma', 'Hannah', 'Sofia', 'Anna', 'Lea', 'Lena', 'Laura', 'Clara', 'Lina'],
  NL: ['Daan', 'Sem', 'Finn', 'Liam', 'Noah', 'Emma', 'Olivia', 'Mia', 'Anna', 'Sara'],
  ES: ['Alejandro', 'Pablo', 'Daniel', 'David', 'Adrian', 'Sofia', 'Lucia', 'Maria', 'Paula', 'Laura'],
  IT: ['Francesco', 'Alessandro', 'Andrea', 'Lorenzo', 'Matteo', 'Sofia', 'Giulia', 'Aurora', 'Alice', 'Ginevra'],
  BR: ['Pedro', 'Gabriel', 'Arthur', 'Miguel', 'Heitor', 'Sofia', 'Julia', 'Valentina', 'Isabella', 'Manuela'],
  MX: ['Santiago', 'Mateo', 'Sebastian', 'Miguel', 'Diego', 'Sofia', 'Valeria', 'Camila', 'Fernanda', 'Natalia'],
};

const lastNamesByCountry: Record<string, string[]> = {
  US: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee'],
  GB: ['Smith', 'Jones', 'Williams', 'Taylor', 'Brown', 'Davies', 'Evans', 'Wilson', 'Thomas', 'Roberts', 'Johnson', 'Walker', 'Wright', 'Thompson', 'Robinson', 'White', 'Hughes', 'Edwards', 'Green', 'Hall'],
  CA: ['Smith', 'Brown', 'Tremblay', 'Martin', 'Roy', 'Wilson', 'MacDonald', 'Taylor', 'Johnson', 'Anderson', 'Campbell', 'Lee', 'White', 'Thompson', 'Moore', 'Garcia', 'Davis', 'Miller', 'Clark', 'Lewis'],
  AU: ['Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Johnson', 'White', 'Martin', 'Anderson', 'Thompson', 'Thomas', 'Walker', 'Harris', 'Robinson', 'Kelly', 'King', 'Lee', 'Hall', 'Young'],
  FR: ['Martin', 'Bernard', 'Thomas', 'Petit', 'Robert', 'Richard', 'Durand', 'Dubois', 'Moreau', 'Laurent', 'Simon', 'Michel', 'Lefebvre', 'Leroy', 'Roux', 'David', 'Bertrand', 'Morel', 'Fournier', 'Girard'],
  DE: ['Mueller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann', 'Schaefer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf', 'Schroeder', 'Neumann', 'Schwarz', 'Zimmermann'],
  NL: ['de Jong', 'Jansen', 'de Vries', 'van den Berg', 'van Dijk', 'Bakker', 'Janssen', 'Visser', 'Smit', 'Meijer'],
  ES: ['Garcia', 'Martinez', 'Lopez', 'Sanchez', 'Gonzalez', 'Rodriguez', 'Fernandez', 'Perez', 'Gomez', 'Martin'],
  IT: ['Rossi', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Ricci', 'Marino', 'Greco', 'Bruno', 'Gallo'],
  BR: ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes'],
  MX: ['Hernandez', 'Garcia', 'Martinez', 'Lopez', 'Gonzalez', 'Perez', 'Rodriguez', 'Sanchez', 'Ramirez', 'Cruz'],
};

const streetsByCountry: Record<string, string[]> = {
  US: ['Main St', 'Oak Ave', 'Maple Dr', 'Washington Blvd', 'Park Ln', 'Cedar St', 'Elm Ave', 'Pine Rd', 'Lake Dr', 'Hill St'],
  GB: ['High Street', 'Church Lane', 'Victoria Road', 'Park Avenue', 'Station Road', 'Mill Lane', 'School Lane', 'The Green', 'Brookside', 'Riverside'],
  CA: ['Maple Ave', 'Queen St', 'King St', 'Main St', 'Yonge St', 'Bloor St', 'Dundas St', 'College St', 'Spadina Ave', 'Bay St'],
  AU: ['George St', 'Pitt St', 'Market St', 'King St', 'Queen St', 'Park Rd', 'Pacific Hwy', 'Victoria Ave', 'Elizabeth St', 'Bourke St'],
  FR: ['Rue de la Paix', 'Avenue des Champs', 'Rue Victor Hugo', 'Boulevard Haussmann', 'Rue de Rivoli', 'Avenue Montaigne', 'Rue du Faubourg', 'Place de la Republique', 'Rue Lafayette', 'Avenue de la Gare'],
  DE: ['Hauptstrasse', 'Bahnhofstrasse', 'Gartenstrasse', 'Schulstrasse', 'Dorfstrasse', 'Bergstrasse', 'Waldweg', 'Kirchstrasse', 'Ringstrasse', 'Lindenstrasse'],
  NL: ['Kerkstraat', 'Dorpsstraat', 'Schoolstraat', 'Molenweg', 'Nieuwstraat', 'Julianastraat', 'Wilhelminastraat', 'Beatrixstraat', 'Oranjestraat', 'Marktstraat'],
  ES: ['Calle Mayor', 'Paseo de la Castellana', 'Gran Via', 'Avenida de la Paz', 'Calle del Sol', 'Calle de la Luna', 'Rambla de Catalunya', 'Passeig de Gracia', 'Calle Real', 'Avenida Central'],
  IT: ['Via Roma', 'Via Garibaldi', 'Corso Vittorio Emanuele', 'Via Nazionale', 'Via del Corso', 'Via Veneto', 'Via Condotti', 'Piazza Navona', 'Via del Tritone', 'Via Appia'],
};

const banksByCountry: Record<string, { banks: string[]; binPrefixes: string[] }> = {
  US: { banks: ['Chase Bank', 'Bank of America', 'Wells Fargo', 'Citibank', 'Capital One', 'US Bank', 'PNC Bank', 'TD Bank'], binPrefixes: ['4111', '4532', '5424', '5425', '5522', '3714', '3782'] },
  GB: { banks: ['Barclays', 'HSBC', 'Lloyds Bank', 'NatWest', 'Santander UK', 'Halifax', 'Nationwide', 'TSB'], binPrefixes: ['4917', '4539', '5411', '5413', '4716', '4485'] },
  CA: { banks: ['Royal Bank of Canada', 'TD Canada Trust', 'Bank of Nova Scotia', 'BMO', 'CIBC', 'National Bank'], binPrefixes: ['4510', '4506', '5194', '5195', '4520'] },
  AU: { banks: ['Commonwealth Bank', 'Westpac', 'ANZ', 'NAB', 'Bendigo Bank', 'St George Bank'], binPrefixes: ['4564', '4565', '5163', '5164', '4560'] },
  FR: { banks: ['BNP Paribas', 'Credit Agricole', 'Societe Generale', 'Caisse Epargne', 'Banque Populaire', 'LCL'], binPrefixes: ['4978', '4979', '5331', '5332', '4970'] },
  DE: { banks: ['Deutsche Bank', 'Commerzbank', 'DZ Bank', 'KfW', 'UniCredit Bank', 'Postbank'], binPrefixes: ['4445', '4446', '5217', '5218', '4440'] },
  NL: { banks: ['ING Bank', 'ABN AMRO', 'Rabobank', 'SNS Bank', 'ASN Bank'], binPrefixes: ['4758', '4759', '5306', '5307'] },
  ES: { banks: ['Santander', 'BBVA', 'CaixaBank', 'Banco Sabadell', 'Bankia', 'Bankinter'], binPrefixes: ['4025', '4026', '5130', '5131'] },
  IT: { banks: ['UniCredit', 'Intesa Sanpaolo', 'Mediobanca', 'Banca Generali', 'Credem'], binPrefixes: ['4337', '4338', '5400', '5401'] },
  BR: { banks: ['Banco do Brasil', 'Bradesco', 'Itau', 'Caixa Economica', 'Santander Brasil'], binPrefixes: ['4012', '4013', '5066', '5067'] },
  MX: { banks: ['BBVA Mexico', 'Citibanamex', 'Banorte', 'HSBC Mexico', 'Inbursa'], binPrefixes: ['4126', '4127', '5121', '5122'] },
};

const rand = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

function luhnCheck(num: string): string {
  let sum = 0;
  let alternate = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let n = parseInt(num.charAt(i), 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return ((10 - (sum % 10)) % 10).toString();
}

function generateCardNumber(bin: string, length = 16): string {
  let num = bin;
  while (num.length < length - 1) {
    num += randInt(0, 9).toString();
  }
  num += luhnCheck(num);
  return num;
}

function formatCard(num: string): string {
  return num.match(/.{1,4}/g)?.join(' ') || num;
}

function generateExpiry(): string {
  const now = new Date();
  const year = now.getFullYear() + randInt(1, 4);
  const month = randInt(1, 12).toString().padStart(2, '0');
  return `${month}/${year.toString().slice(-2)}`;
}

function generateCVV(cardType: string): string {
  if (cardType === 'Amex') return randInt(1000, 9999).toString();
  return randInt(100, 999).toString();
}

function generatePhone(countryCode: string): string {
  const prefixes: Record<string, string> = {
    US: '+1', GB: '+44', CA: '+1', AU: '+61', FR: '+33', DE: '+49',
    NL: '+31', ES: '+34', IT: '+39', BR: '+55', MX: '+52',
  };
  const prefix = prefixes[countryCode] || '+1';
  if (countryCode === 'US' || countryCode === 'CA') {
    return `${prefix} ${randInt(200, 999)}-${randInt(100, 999)}-${randInt(1000, 9999)}`;
  }
  return `${prefix} ${randInt(100000000, 999999999)}`;
}

function generateBirthDate(): string {
  const year = randInt(1970, 2000);
  const month = randInt(1, 12).toString().padStart(2, '0');
  const day = randInt(1, 28).toString().padStart(2, '0');
  return `${month}/${day}/${year}`;
}

function generateUsername(firstName: string, lastName: string): string {
  const suffixes = ['', randInt(1, 99).toString(), randInt(100, 999).toString()];
  const patterns = [
    `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}${randInt(1, 999)}`,
    `${lastName.toLowerCase()}${firstName.charAt(0).toLowerCase()}${randInt(1, 99)}`,
  ];
  return rand(patterns) + rand(suffixes);
}

function generatePassword(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
  let pass = '';
  for (let i = 0; i < randInt(8, 14); i++) {
    pass += chars[randInt(0, chars.length - 1)];
  }
  return pass;
}

export function generateIdentity(countryCode: string, email: string): GeneratedIdentity {
  const cc = countryCode.toUpperCase();
  const firstNames = firstNamesByCountry[cc] || firstNamesByCountry['US'];
  const lastNames = lastNamesByCountry[cc] || lastNamesByCountry['US'];
  const streets = streetsByCountry[cc] || streetsByCountry['US'];
  const bankInfo = banksByCountry[cc] || banksByCountry['US'];

  const firstName = rand(firstNames);
  const lastName = rand(lastNames);
  const bankName = rand(bankInfo.banks);
  const bin = rand(bankInfo.binPrefixes);

  const cardType = bin.startsWith('3') ? 'Amex' : bin.startsWith('4') ? 'Visa' : 'Mastercard';
  const cardNumber = generateCardNumber(bin);
  const cardExpiry = generateExpiry();
  const cardCvv = generateCVV(cardType);

  return {
    firstName,
    lastName,
    email,
    phone: generatePhone(cc),
    address: `${randInt(1, 9999)} ${rand(streets)}`,
    city: extractCityForCountry(cc),
    state: extractStateForCountry(cc),
    postalCode: generatePostalCode(cc),
    country: cc,
    birthDate: generateBirthDate(),
    gender: Math.random() > 0.5 ? 'Male' : 'Female',
    cardType,
    cardNumber: formatCard(cardNumber),
    cardExpiry,
    cardCvv,
    cardHolder: `${firstName} ${lastName}`.toUpperCase(),
    bankName,
    username: generateUsername(firstName, lastName),
    password: generatePassword(),
  };
}

export function regenerateCVV(cardType: string): string {
  return generateCVV(cardType);
}

function extractCityForCountry(cc: string): string {
  const cities: Record<string, string[]> = {
    US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'Dallas', 'San Diego', 'San Jose'],
    GB: ['London', 'Birmingham', 'Leeds', 'Glasgow', 'Sheffield', 'Bradford', 'Liverpool', 'Edinburgh', 'Manchester', 'Bristol'],
    CA: ['Toronto', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton', 'Mississauga', 'Winnipeg', 'Vancouver', 'Brampton', 'Hamilton'],
    AU: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Sunshine Coast', 'Wollongong'],
    FR: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
    DE: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Dusseldorf', 'Dortmund', 'Essen', 'Leipzig'],
    NL: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningen', 'Almere', 'Breda', 'Nijmegen'],
    ES: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Malaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'],
    IT: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania'],
    BR: ['Sao Paulo', 'Rio de Janeiro', 'Brasilia', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'],
    MX: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'Leon', 'Juarez', 'Merida', 'Chihuahua', 'San Luis Potosi'],
  };
  return rand(cities[cc] || cities['US']);
}

function extractStateForCountry(cc: string): string {
  const states: Record<string, string[]> = {
    US: ['CA', 'TX', 'FL', 'NY', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI'],
    GB: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    CA: ['ON', 'QC', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB'],
    AU: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'],
    FR: ['Ile-de-France', 'Provence', 'Occitanie', 'Nouvelle-Aquitaine', 'Auvergne', 'Hauts-de-France'],
    DE: ['Bayern', 'NRW', 'Baden-Wuerttemberg', 'Niedersachsen', 'Hessen', 'Berlin'],
    NL: ['Noord-Holland', 'Zuid-Holland', 'Utrecht', 'Noord-Brabant', 'Gelderland'],
    ES: ['Madrid', 'Cataluna', 'Andalucia', 'Comunidad Valenciana', 'Galicia'],
    IT: ['Lazio', 'Lombardia', 'Sicilia', 'Campania', 'Piemonte', 'Toscana'],
    BR: ['SP', 'RJ', 'MG', 'BA', 'CE', 'RS', 'PR', 'PE'],
    MX: ['CDMX', 'JAL', 'NL', 'PUE', 'BC', 'YUC', 'GTO', 'VER'],
  };
  return rand(states[cc] || states['US']);
}

function generatePostalCode(cc: string): string {
  switch (cc) {
    case 'US': return `${randInt(10000, 99999)}`;
    case 'GB': {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      return `${letters[randInt(0, 25)]}${letters[randInt(0, 25)]}${randInt(1, 99)} ${randInt(1, 9)}${letters[randInt(0, 25)]}${letters[randInt(0, 25)]}`;
    }
    case 'CA': {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      return `${letters[randInt(0, 25)]}${randInt(1, 9)}${letters[randInt(0, 25)]} ${randInt(1, 9)}${letters[randInt(0, 25)]}${randInt(1, 9)}`;
    }
    case 'AU': return `${randInt(1000, 9999)}`;
    case 'FR': return `${randInt(10000, 99999)}`;
    case 'DE': return `${randInt(10000, 99999)}`;
    case 'NL': return `${randInt(1000, 9999)} ${String.fromCharCode(65 + randInt(0, 25))}${String.fromCharCode(65 + randInt(0, 25))}`;
    case 'ES': return `${randInt(10000, 52999)}`;
    case 'IT': return `${randInt(10000, 98168)}`;
    case 'BR': return `${randInt(10000, 99999)}-${randInt(100, 999)}`;
    case 'MX': return `${randInt(10000, 99999)}`;
    default: return `${randInt(10000, 99999)}`;
  }
}

export const USER_AGENTS = [
  { label: 'Chrome 124 / Windows 11', value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36' },
  { label: 'Chrome 123 / macOS', value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36' },
  { label: 'Firefox 125 / Windows', value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0' },
  { label: 'Safari 17.4 / macOS', value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15' },
  { label: 'Edge 124 / Windows', value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0' },
  { label: 'Chrome 124 / Android', value: 'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6367.82 Mobile Safari/537.36' },
  { label: 'Safari / iPhone iOS 17.4', value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Mobile/15E148 Safari/604.1' },
  { label: 'Opera 109 / Windows', value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0' },
  { label: 'Chrome 124 / Linux', value: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36' },
  { label: 'Random', value: 'random' },
];

export function generateUTM(url: string): string {
  const sources = ['google', 'facebook', 'twitter', 'instagram', 'tiktok', 'yahoo', 'bing', 'reddit', 'linkedin', 'pinterest'];
  const mediums = ['cpc', 'social', 'email', 'banner', 'organic', 'referral', 'display', 'ppc'];
  const campaigns = ['summer_sale', 'promo2024', 'deal_alert', 'special_offer', 'flash_deal', 'limited_time', 'win_prize', 'exclusive_offer'];

  const src = rand(sources);
  const med = rand(mediums);
  const camp = rand(campaigns);
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}utm_source=${src}&utm_medium=${med}&utm_campaign=${camp}&utm_content=${randInt(1000, 9999)}`;
}

export async function fetchGeoInfo(ip: string): Promise<ExtractedInfo | null> {
  try {
    const res = await fetch(`https://api.i.pn/json/${ip}`, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return {
      ip: data.ip || ip,
      country: data.country_name || data.country || 'Unknown',
      countryCode: data.country_code || data.countryCode || 'US',
      city: data.city || 'Unknown',
      region: data.region || data.region_name || 'Unknown',
      street: data.street || '',
      timezone: data.timezone || 'UTC',
      language: getLanguageByCountry(data.country_code || 'US'),
      isp: data.isp || data.org || 'Unknown',
      org: data.org || data.as || 'Unknown',
      latitude: data.lat || data.latitude,
      longitude: data.lon || data.longitude,
      postalCode: data.zip || data.postal,
      currency: data.currency?.code || data.currency || getCurrencyByCountry(data.country_code || 'US'),
      asn: data.asn || data.as || '',
      callingCode: data.calling_code || data.country_calling_code || '',
      flag: data.country_flag_emoji || data.flag || '',
      connectionType: data.connection_type || data.type || '',
      proxyDetected: data.security?.is_proxy || data.proxy || false,
    };
  } catch {
    return null;
  }
}

export async function checkLeadCPA(userId: string, apiKey: string, ip: string): Promise<boolean> {
  try {
    // Lead check must be done WITHOUT proxy (direct connection)
    const url = `https://www.cpagrip.com/common/lead_check_rss.php?user_id=${userId}&key=${apiKey}&time=1day&check=ip&value=${ip}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    const text = await res.text();
    // If response contains lead data, it means lead was found
    return text.includes('<item>') || text.includes('lead') || text.includes('count>0') === false;
  } catch {
    return false;
  }
}

export async function fetchProxyList(url: string): Promise<string[]> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    const text = await res.text();
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 5 && l.includes(':'));
    return lines;
  } catch {
    return [];
  }
}

function getLanguageByCountry(cc: string): string {
  const map: Record<string, string> = {
    US: 'en-US', GB: 'en-GB', CA: 'en-CA', AU: 'en-AU',
    FR: 'fr-FR', DE: 'de-DE', ES: 'es-ES', IT: 'it-IT',
    PT: 'pt-PT', BR: 'pt-BR', MX: 'es-MX', AR: 'es-AR',
    JP: 'ja-JP', KR: 'ko-KR', CN: 'zh-CN', RU: 'ru-RU',
    NL: 'nl-NL', PL: 'pl-PL', SE: 'sv-SE', NO: 'nb-NO',
    DK: 'da-DK', FI: 'fi-FI', TR: 'tr-TR', IN: 'en-IN',
  };
  return map[cc] || 'en-US';
}

function getCurrencyByCountry(cc: string): string {
  const map: Record<string, string> = {
    US: 'USD', GB: 'GBP', CA: 'CAD', AU: 'AUD',
    FR: 'EUR', DE: 'EUR', ES: 'EUR', IT: 'EUR', NL: 'EUR',
    JP: 'JPY', KR: 'KRW', CN: 'CNY', RU: 'RUB',
    MX: 'MXN', BR: 'BRL', IN: 'INR', SE: 'SEK',
    NO: 'NOK', DK: 'DKK', CH: 'CHF', PL: 'PLN',
  };
  return map[cc] || 'USD';
}

export const RANDOM_REFERRERS = [
  'https://www.google.com/search?q=best+deals',
  'https://www.google.com/search?q=free+gift+cards',
  'https://www.facebook.com/',
  'https://www.instagram.com/',
  'https://www.youtube.com/',
  'https://twitter.com/',
  'https://www.reddit.com/r/deals',
  'https://www.bing.com/search?q=free+offers',
  'https://www.yahoo.com/',
  'https://t.co/promo',
  'https://l.facebook.com/l.php',
  'https://www.pinterest.com/',
  'https://www.tiktok.com/',
  'https://news.google.com/',
];

export const COMPLETION_KEYWORDS_DEFAULT = [
  'thank you', 'thanks', 'congratulations', 'success', 'completed', 'confirmed',
  'you have won', 'winner', 'claim your', 'well done', 'great job', 'submitted',
  'you are entered', 'entry received', 'confirmation', 'all done',
];
