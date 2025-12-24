// 国家手机号配置数据
export interface CountryPhone {
  code: string;
  name: string;
  nameEn: string;
  dialCode: string;
  flag: string;
  carriers: {
    name: string;
    prefixes: string[];
  }[];
  format: string; // 显示格式，X代表随机数字
  length: number; // 不包含国家代码的总长度
}

// 手机号国家配置列表
export const phoneCountries: CountryPhone[] = [
  {
    code: 'AF',
    name: '阿富汗',
    nameEn: 'Afghanistan',
    dialCode: '+93',
    flag: '🇦🇫',
    carriers: [
      { name: 'Roshan', prefixes: ['70', '71', '72', '79'] },
      { name: 'Etisalat', prefixes: ['78'] },
      { name: 'AWCC', prefixes: ['77'] },
      { name: 'Salaam', prefixes: ['76'] },
    ],
    format: '7X XXX XXXX',
    length: 9
  },
  {
    code: 'AL',
    name: '阿尔巴尼亚',
    nameEn: 'Albania',
    dialCode: '+355',
    flag: '🇦🇱',
    carriers: [
      { name: 'Vodafone', prefixes: ['68'] },
      { name: 'Telekom', prefixes: ['69'] },
      { name: 'ALBtelecom', prefixes: ['66', '67'] },
    ],
    format: '6X XXX XXXX',
    length: 9
  },
  {
    code: 'DZ',
    name: '阿尔及利亚',
    nameEn: 'Algeria',
    dialCode: '+213',
    flag: '🇩🇿',
    carriers: [
      { name: 'Djezzy', prefixes: ['55', '56', '57'] },
      { name: 'Ooredoo', prefixes: ['53', '54'] },
      { name: 'Mobilis', prefixes: ['66', '77'] },
    ],
    format: '5X XXX XXXX',
    length: 9
  },
  {
    code: 'AS',
    name: '美属萨摩亚',
    nameEn: 'American Samoa',
    dialCode: '+1',
    flag: '🇦🇸',
    carriers: [
      { name: 'American Samoa Telecommunications', prefixes: ['684'] },
    ],
    format: '684 XXX XXXX',
    length: 10
  },
];

// 获取所有运营商前缀
export function getAllPrefixes(country: CountryPhone): string[] {
  return country.carriers.flatMap(c => c.prefixes);
}

// 搜索国家（支持中文名、英文名、区号搜索）
export function searchCountries(query: string): CountryPhone[] {
  if (!query) return phoneCountries;

  const lowerQuery = query.toLowerCase().trim();

  return phoneCountries.filter(country => {
    return (
      country.name.toLowerCase().includes(lowerQuery) ||
      country.nameEn.toLowerCase().includes(lowerQuery) ||
      country.dialCode.includes(lowerQuery) ||
      country.code.toLowerCase().includes(lowerQuery)
    );
  });
}

// 根据代码获取国家
export function getCountryByCode(code: string): CountryPhone | undefined {
  return phoneCountries.find(c => c.code === code);
}
