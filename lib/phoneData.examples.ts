// 更多国家配置示例
// 复制需要的国家配置到 phoneData.ts 的 phoneCountries 数组中

import { CountryPhone } from './phoneData';

/*
以下是一些常见国家的配置示例，可以直接复制使用。
数据基于各国真实运营商号段和格式。
*/

export const exampleCountries: CountryPhone[] = [
  // 亚洲地区
  {
    code: 'CN',
    name: '中国',
    nameEn: 'China',
    dialCode: '+86',
    flag: '🇨🇳',
    carriers: [
      { name: 'China Mobile', prefixes: ['134', '135', '136', '137', '138', '139', '147', '150', '151', '152', '157', '158', '159', '182', '183', '184', '187', '188'] },
      { name: 'China Unicom', prefixes: ['130', '131', '132', '145', '155', '156', '166', '171', '175', '176', '185', '186'] },
      { name: 'China Telecom', prefixes: ['133', '149', '153', '173', '177', '180', '181', '189', '191', '199'] },
    ],
    format: '1XX XXXX XXXX',
    length: 11
  },
  {
    code: 'JP',
    name: '日本',
    nameEn: 'Japan',
    dialCode: '+81',
    flag: '🇯🇵',
    carriers: [
      { name: 'NTT Docomo', prefixes: ['90', '80', '70'] },
      { name: 'au', prefixes: ['90', '80', '70'] },
      { name: 'SoftBank', prefixes: ['90', '80', '70'] },
    ],
    format: '9X XXXX XXXX',
    length: 10
  },
  {
    code: 'KR',
    name: '韩国',
    nameEn: 'South Korea',
    dialCode: '+82',
    flag: '🇰🇷',
    carriers: [
      { name: 'SKT', prefixes: ['10'] },
      { name: 'KT', prefixes: ['11'] },
      { name: 'LG U+', prefixes: ['16'] },
    ],
    format: '1X XXXX XXXX',
    length: 10
  },
  {
    code: 'IN',
    name: '印度',
    nameEn: 'India',
    dialCode: '+91',
    flag: '🇮🇳',
    carriers: [
      { name: 'Jio', prefixes: ['70', '79', '89', '90', '91', '93', '95', '96', '97', '98'] },
      { name: 'Airtel', prefixes: ['70', '72', '73', '74', '75', '76', '77', '78', '80', '81', '82', '83', '84', '85', '86', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'] },
      { name: 'Vi', prefixes: ['70', '72', '73', '74', '75', '76', '77', '78', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'] },
    ],
    format: '9X XXXX XXXX',
    length: 10
  },
  {
    code: 'TH',
    name: '泰国',
    nameEn: 'Thailand',
    dialCode: '+66',
    flag: '🇹🇭',
    carriers: [
      { name: 'AIS', prefixes: ['61', '62', '63', '64', '65', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '98'] },
      { name: 'DTAC', prefixes: ['66', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '99'] },
      { name: 'True', prefixes: ['60', '61', '62', '63', '64', '65', '66', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'] },
    ],
    format: '9X XXXX XXXX',
    length: 9
  },
  {
    code: 'VN',
    name: '越南',
    nameEn: 'Vietnam',
    dialCode: '+84',
    flag: '🇻🇳',
    carriers: [
      { name: 'Viettel', prefixes: ['86', '96', '97', '98', '32', '33', '34', '35', '36', '37', '38', '39'] },
      { name: 'Vinaphone', prefixes: ['88', '91', '94', '81', '82', '83', '84', '85'] },
      { name: 'Mobifone', prefixes: ['89', '90', '93', '70', '76', '77', '78', '79'] },
    ],
    format: '9X XXX XXXX',
    length: 9
  },
  {
    code: 'ID',
    name: '印度尼西亚',
    nameEn: 'Indonesia',
    dialCode: '+62',
    flag: '🇮🇩',
    carriers: [
      { name: 'Telkomsel', prefixes: ['811', '812', '813', '821', '822', '823', '851', '852', '853'] },
      { name: 'Indosat', prefixes: ['814', '815', '816', '855', '856', '857', '858'] },
      { name: 'XL', prefixes: ['817', '818', '819', '859', '877', '878'] },
    ],
    format: '8XX XXX XXXX',
    length: 10
  },
  {
    code: 'PH',
    name: '菲律宾',
    nameEn: 'Philippines',
    dialCode: '+63',
    flag: '🇵🇭',
    carriers: [
      { name: 'Globe', prefixes: ['905', '906', '915', '916', '917', '926', '927', '935', '936', '937'] },
      { name: 'Smart', prefixes: ['908', '918', '919', '920', '921', '928', '929', '939', '946', '947'] },
      { name: 'Sun', prefixes: ['922', '923', '924', '925', '931', '932', '933', '934'] },
    ],
    format: '9XX XXX XXXX',
    length: 10
  },
  {
    code: 'MY',
    name: '马来西亚',
    nameEn: 'Malaysia',
    dialCode: '+60',
    flag: '🇲🇾',
    carriers: [
      { name: 'Maxis', prefixes: ['12', '142', '17'] },
      { name: 'Celcom', prefixes: ['13', '19', '148'] },
      { name: 'Digi', prefixes: ['16', '146', '11'] },
    ],
    format: '1X XXX XXXX',
    length: 9
  },
  {
    code: 'SG',
    name: '新加坡',
    nameEn: 'Singapore',
    dialCode: '+65',
    flag: '🇸🇬',
    carriers: [
      { name: 'Singtel', prefixes: ['90', '91', '92', '93', '94', '95', '96', '97', '98'] },
      { name: 'StarHub', prefixes: ['81', '82', '83', '84', '85', '86', '87'] },
      { name: 'M1', prefixes: ['88', '89'] },
    ],
    format: '9X XXX XXX',
    length: 8
  },

  // 欧洲地区
  {
    code: 'GB',
    name: '英国',
    nameEn: 'United Kingdom',
    dialCode: '+44',
    flag: '🇬🇧',
    carriers: [
      { name: 'EE', prefixes: ['7400', '7401', '7500', '7701', '7702', '7703'] },
      { name: 'O2', prefixes: ['7435', '7436', '7440', '7510', '7520'] },
      { name: 'Vodafone', prefixes: ['7423', '7460', '7550', '7720'] },
    ],
    format: '74XX XXX XXX',
    length: 10
  },
  {
    code: 'DE',
    name: '德国',
    nameEn: 'Germany',
    dialCode: '+49',
    flag: '🇩🇪',
    carriers: [
      { name: 'Telekom', prefixes: ['151', '160', '170', '171', '175'] },
      { name: 'Vodafone', prefixes: ['152', '162', '172', '173', '174'] },
      { name: 'O2', prefixes: ['159', '176', '177', '178', '179'] },
    ],
    format: '1XX XXXX XXXX',
    length: 11
  },
  {
    code: 'FR',
    name: '法国',
    nameEn: 'France',
    dialCode: '+33',
    flag: '🇫🇷',
    carriers: [
      { name: 'Orange', prefixes: ['607', '608', '630', '640', '670', '680'] },
      { name: 'SFR', prefixes: ['609', '610', '611', '612', '613', '614', '615', '616', '617', '618', '619', '620', '621'] },
      { name: 'Bouygues', prefixes: ['650', '651', '652', '653', '658', '659', '660', '661', '662', '663', '664', '665', '666', '667'] },
    ],
    format: '6XX XX XX XX',
    length: 9
  },
  {
    code: 'IT',
    name: '意大利',
    nameEn: 'Italy',
    dialCode: '+39',
    flag: '🇮🇹',
    carriers: [
      { name: 'TIM', prefixes: ['330', '331', '333', '334', '335', '336', '337', '338', '339', '360', '366', '368'] },
      { name: 'Vodafone', prefixes: ['340', '341', '342', '343', '344', '345', '346', '347', '348', '349', '383'] },
      { name: 'Wind Tre', prefixes: ['320', '322', '323', '324', '327', '328', '329', '380', '388', '389'] },
    ],
    format: '3XX XXX XXXX',
    length: 10
  },
  {
    code: 'ES',
    name: '西班牙',
    nameEn: 'Spain',
    dialCode: '+34',
    flag: '🇪🇸',
    carriers: [
      { name: 'Movistar', prefixes: ['609', '610', '616', '619', '620', '629', '630', '639', '646', '649', '650', '659', '660', '669', '670', '679', '680', '689'] },
      { name: 'Vodafone', prefixes: ['607', '610', '617', '647', '667', '677', '687', '697'] },
      { name: 'Orange', prefixes: ['605', '615', '625', '635', '645', '655', '665', '675', '685', '695'] },
    ],
    format: '6XX XX XX XX',
    length: 9
  },

  // 北美地区
  {
    code: 'US',
    name: '美国',
    nameEn: 'United States',
    dialCode: '+1',
    flag: '🇺🇸',
    carriers: [
      { name: 'AT&T', prefixes: ['201', '202', '212', '213', '214', '215', '216', '217', '218', '219', '224', '225', '228', '229', '231'] },
      { name: 'Verizon', prefixes: ['240', '248', '251', '252', '253', '254', '256', '260', '262', '267', '269', '270', '276', '281', '301'] },
      { name: 'T-Mobile', prefixes: ['302', '303', '304', '305', '307', '308', '309', '310', '312', '313', '314', '315', '316', '317', '318'] },
    ],
    format: 'XXX XXX XXXX',
    length: 10
  },
  {
    code: 'CA',
    name: '加拿大',
    nameEn: 'Canada',
    dialCode: '+1',
    flag: '🇨🇦',
    carriers: [
      { name: 'Rogers', prefixes: ['416', '437', '647', '905', '289', '365'] },
      { name: 'Bell', prefixes: ['514', '438', '450', '579', '581', '418', '367', '468', '354'] },
      { name: 'Telus', prefixes: ['604', '778', '236', '250', '672'] },
    ],
    format: 'XXX XXX XXXX',
    length: 10
  },
  {
    code: 'MX',
    name: '墨西哥',
    nameEn: 'Mexico',
    dialCode: '+52',
    flag: '🇲🇽',
    carriers: [
      { name: 'Telcel', prefixes: ['55', '33', '81', '656', '664', '686', '722', '999', '477', '222'] },
      { name: 'Movistar', prefixes: ['55', '33', '81'] },
      { name: 'AT&T', prefixes: ['55', '33', '81'] },
    ],
    format: 'XX XXXX XXXX',
    length: 10
  },

  // 南美地区
  {
    code: 'BR',
    name: '巴西',
    nameEn: 'Brazil',
    dialCode: '+55',
    flag: '🇧🇷',
    carriers: [
      { name: 'Vivo', prefixes: ['11', '21', '31', '41', '51', '61', '71', '81', '91'] },
      { name: 'Claro', prefixes: ['11', '21', '31', '41', '51', '61', '71', '81', '91'] },
      { name: 'TIM', prefixes: ['11', '21', '31', '41', '51', '61', '71', '81', '91'] },
    ],
    format: 'XX 9XXXX XXXX',
    length: 11
  },
  {
    code: 'AR',
    name: '阿根廷',
    nameEn: 'Argentina',
    dialCode: '+54',
    flag: '🇦🇷',
    carriers: [
      { name: 'Movistar', prefixes: ['11', '221', '223', '261', '291', '341', '351', '381'] },
      { name: 'Claro', prefixes: ['11', '221', '223', '261', '291', '341', '351', '381'] },
      { name: 'Personal', prefixes: ['11', '221', '223', '261', '291', '341', '351', '381'] },
    ],
    format: '11 XXXX XXXX',
    length: 10
  },

  // 大洋洲
  {
    code: 'AU',
    name: '澳大利亚',
    nameEn: 'Australia',
    dialCode: '+61',
    flag: '🇦🇺',
    carriers: [
      { name: 'Telstra', prefixes: ['400', '401', '402', '403', '404', '405', '406', '407', '408', '409'] },
      { name: 'Optus', prefixes: ['430', '431', '432', '433', '434', '435', '436', '437', '438', '439'] },
      { name: 'Vodafone', prefixes: ['460', '461', '462', '463', '464', '465', '466', '467', '468', '469'] },
    ],
    format: '4XX XXX XXX',
    length: 9
  },
  {
    code: 'NZ',
    name: '新西兰',
    nameEn: 'New Zealand',
    dialCode: '+64',
    flag: '🇳🇿',
    carriers: [
      { name: 'Spark', prefixes: ['21', '27'] },
      { name: 'Vodafone', prefixes: ['21', '27'] },
      { name: '2degrees', prefixes: ['22', '29'] },
    ],
    format: '2X XXX XXXX',
    length: 9
  },

  // 中东地区
  {
    code: 'SA',
    name: '沙特阿拉伯',
    nameEn: 'Saudi Arabia',
    dialCode: '+966',
    flag: '🇸🇦',
    carriers: [
      { name: 'STC', prefixes: ['50', '53', '55', '58'] },
      { name: 'Mobily', prefixes: ['54', '56', '59'] },
      { name: 'Zain', prefixes: ['51', '57'] },
    ],
    format: '5X XXX XXXX',
    length: 9
  },
  {
    code: 'AE',
    name: '阿联酋',
    nameEn: 'United Arab Emirates',
    dialCode: '+971',
    flag: '🇦🇪',
    carriers: [
      { name: 'Etisalat', prefixes: ['50', '52', '54', '55', '56'] },
      { name: 'du', prefixes: ['50', '52', '55', '56', '58'] },
    ],
    format: '5X XXX XXXX',
    length: 9
  },
  {
    code: 'TR',
    name: '土耳其',
    nameEn: 'Turkey',
    dialCode: '+90',
    flag: '🇹🇷',
    carriers: [
      { name: 'Turkcell', prefixes: ['530', '531', '532', '533', '534', '535', '536', '537', '538', '539'] },
      { name: 'Vodafone', prefixes: ['540', '541', '542', '543', '544', '545', '546', '547', '548', '549'] },
      { name: 'Turk Telekom', prefixes: ['501', '505', '506', '507', '551', '552', '553', '554', '555'] },
    ],
    format: '5XX XXX XXXX',
    length: 10
  },

  // 非洲地区
  {
    code: 'EG',
    name: '埃及',
    nameEn: 'Egypt',
    dialCode: '+20',
    flag: '🇪🇬',
    carriers: [
      { name: 'Vodafone', prefixes: ['10', '11', '12', '15'] },
      { name: 'Orange', prefixes: ['10', '11', '12', '15'] },
      { name: 'Etisalat', prefixes: ['10', '11', '12', '15'] },
    ],
    format: '1X XXXX XXXX',
    length: 10
  },
  {
    code: 'ZA',
    name: '南非',
    nameEn: 'South Africa',
    dialCode: '+27',
    flag: '🇿🇦',
    carriers: [
      { name: 'Vodacom', prefixes: ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69'] },
      { name: 'MTN', prefixes: ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69'] },
      { name: 'Cell C', prefixes: ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69'] },
    ],
    format: '6X XXX XXXX',
    length: 9
  },
];
