# 手机号生成器 - 国家数据维护指南

## 如何添加新国家

要添加新的国家支持，只需在 `lib/phoneData.ts` 文件的 `phoneCountries` 数组中添加新的国家配置对象。

### 配置对象结构

```typescript
{
  code: string;        // ISO 3166-1 alpha-2 国家代码（2位大写字母）
  name: string;        // 中文名称
  nameEn: string;      // 英文名称
  dialCode: string;    // 国际区号（包含+号）
  flag: string;        // 国旗 emoji
  carriers: [          // 运营商列表
    {
      name: string;    // 运营商名称
      prefixes: string[]; // 该运营商的号码前缀列表
    }
  ];
  format: string;      // 显示格式（X代表随机数字）
  length: number;      // 不含国家代码的号码总长度
}
```

### 添加示例

以韩国为例：

```typescript
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
}
```

### 如何查找国家手机号信息

1. **国际区号**：可在 [Wikipedia - List of country calling codes](https://en.wikipedia.org/wiki/List_of_country_calling_codes) 查找

2. **运营商和号段**：
   - 搜索 "[国家名] mobile operators"
   - 搜索 "[国家名] mobile number format"
   - 参考各国电信监管机构网站

3. **号码格式**：
   - 查看该国运营商官网的号码示例
   - 参考 [libphonenumber](https://github.com/google/libphonenumber) 项目

4. **国旗 Emoji**：
   - 使用 [Emojipedia - Flags](https://emojipedia.org/flags/) 查找
   - 格式为 🇦🇧 (国家代码对应的区域指示符号)

### 注意事项

1. **prefixes 必须准确**：确保使用的是真实运营商号段，这样生成的号码才符合该国实际格式

2. **length 计算**：不包含国家代码，只计算号码本身的长度
   - 例如：+86 138 1234 5678 → length = 11 (不含 +86)

3. **format 格式化**：
   - 使用 X 代表随机数字
   - 使用空格分隔号码段，提高可读性
   - 例如：`"7X XXX XXXX"` 表示 9 位数字，首位是7

4. **按字母顺序排列**：建议按国家中文名称的拼音或英文名称排序，便于查找

5. **测试生成**：添加后记得在页面上测试生成功能是否正常

### 快速添加模板

```typescript
{
  code: '',           // 2位国家代码
  name: '',          // 中文名
  nameEn: '',        // 英文名
  dialCode: '+',     // 区号
  flag: '',          // 🇦🇧 格式
  carriers: [
    { name: '', prefixes: [''] },
  ],
  format: 'XX XXX XXXX',  // 根据实际调整
  length: 0          // 数字总长度
}
```

## 搜索功能

系统支持以下搜索方式：
- 中文国家名（如：韩国）
- 英文国家名（如：Korea）
- 国家代码（如：KR）
- 区号（如：+82 或 82）

搜索功能会自动匹配所有相关字段，无需额外配置。

## 性能优化

- 当国家数量增多时，列表渲染已做优化
- 搜索使用 useMemo 缓存结果
- 生成手机号使用 Set 确保唯一性
- 批量生成采用异步处理，避免阻塞 UI

## 未来扩展

当国家数量超过 50 个时，建议：
1. 实现虚拟滚动
2. 添加国家分组（按地区或首字母）
3. 添加常用国家置顶功能
4. 考虑使用数据库存储国家配置
