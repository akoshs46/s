import { CountryPhone, getAllPrefixes } from './phoneData';

// 生成随机数字
function randomDigit(): string {
  return Math.floor(Math.random() * 10).toString();
}

// 生成指定长度的随机数字串
function randomDigits(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomDigit();
  }
  return result;
}

// 随机选择数组中的元素
function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// 生成单个手机号
export function generatePhoneNumber(country: CountryPhone): string {
  const allPrefixes = getAllPrefixes(country);
  const prefix = randomChoice(allPrefixes);

  // 计算需要生成的剩余数字长度
  const remainingLength = country.length - prefix.length;
  const randomPart = randomDigits(remainingLength);

  // 组合完整号码
  const fullNumber = prefix + randomPart;

  // 格式化显示
  return formatPhoneNumber(country.dialCode, fullNumber, country.format);
}

// 批量生成手机号
export function generateMultiplePhoneNumbers(
  country: CountryPhone,
  count: number
): string[] {
  const numbers: string[] = [];
  const uniqueSet = new Set<string>();

  // 生成唯一的手机号
  while (uniqueSet.size < count) {
    const allPrefixes = getAllPrefixes(country);
    const prefix = randomChoice(allPrefixes);
    const remainingLength = country.length - prefix.length;
    const randomPart = randomDigits(remainingLength);
    const fullNumber = prefix + randomPart;

    if (!uniqueSet.has(fullNumber)) {
      uniqueSet.add(fullNumber);
      const formatted = formatPhoneNumber(
        country.dialCode,
        fullNumber,
        country.format
      );
      numbers.push(formatted);
    }

    // 防止无限循环（如果请求数量超过可能的组合数）
    if (numbers.length >= 10000) break;
  }

  return numbers;
}

// 格式化手机号显示
function formatPhoneNumber(
  dialCode: string,
  number: string,
  format: string
): string {
  let formatted = format;
  let digitIndex = 0;

  // 替换格式中的 X 为实际数字
  formatted = formatted.replace(/X/g, () => {
    if (digitIndex < number.length) {
      return number[digitIndex++];
    }
    return 'X';
  });

  // 返回完整格式：区号 + 号码
  return `${dialCode} ${formatted}`;
}

// 导出纯数字格式（无空格和符号）
export function getPlainNumber(formattedNumber: string): string {
  return formattedNumber.replace(/[^0-9+]/g, '');
}

// 验证生成的手机号是否符合格式
export function validatePhoneNumber(
  number: string,
  country: CountryPhone
): boolean {
  // 移除所有非数字字符（保留+号）
  const plainNumber = number.replace(/[^0-9+]/g, '');

  // 检查是否以正确的区号开头
  if (!plainNumber.startsWith(country.dialCode)) {
    return false;
  }

  // 移除区号后检查长度
  const withoutDialCode = plainNumber.replace(country.dialCode, '');
  if (withoutDialCode.length !== country.length) {
    return false;
  }

  // 检查是否以有效的运营商前缀开头
  const allPrefixes = getAllPrefixes(country);
  return allPrefixes.some(prefix => withoutDialCode.startsWith(prefix));
}
