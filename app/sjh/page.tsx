'use client';

import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { NavigationMenu, MenuButton } from '@/components/NavigationMenu';
import { phoneCountries, searchCountries, CountryPhone } from '@/lib/phoneData';
import { generateMultiplePhoneNumbers, getPlainNumber } from '@/lib/phoneGenerator';

// 图标组件
const ICON_PATHS: Record<string, React.ReactElement> = {
  search: <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>,
  close: <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>,
  phone: <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>,
  copy: <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>,
  check: <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>,
  sparkles: <path d="M7 11v2l-4 1 4 1v2l1-4-1-4zm5-7v4l-3 1 3 1v4l2-5-2-5zm5.66 2.94L15 6.26l.66-2.94L18.34 6l2.66.68-2.66.68-.68 2.58-.66-2.94zM15 18l-2-3 2-3 2 3-2 3z"/>,
  download: <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/>
};

const Icon = memo(({ name, className = "w-6 h-6" }: { name: string; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">{ICON_PATHS[name]}</svg>
));
Icon.displayName = 'Icon';

const haptic = (duration: number = 15) => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(duration);
  }
};

// 国家卡片组件
const CountryCard = memo(({
  country,
  isSelected,
  onClick
}: {
  country: CountryPhone;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between p-4 rounded-[16px] transition-all duration-200 active:scale-[0.98] touch-manipulation border ${
      isSelected
        ? 'bg-white/10 border-white/30 shadow-lg'
        : 'bg-black/30 border-white/20 active:bg-white/10'
    }`}
  >
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <div className="text-3xl shrink-0">{country.flag}</div>
      <div className="flex-1 min-w-0 text-left">
        <h3 className="text-[16px] font-bold text-white tracking-tight drop-shadow-md truncate">
          {country.name}
        </h3>
        <p className="text-[13px] text-white/70 drop-shadow-sm truncate">
          {country.nameEn}
        </p>
      </div>
    </div>
    <div className="shrink-0 ml-3 text-[15px] font-semibold text-white/90 drop-shadow-md">
      {country.dialCode}
    </div>
  </button>
));
CountryCard.displayName = 'CountryCard';

// 生成的手机号卡片
const PhoneNumberCard = memo(({
  number,
  index,
  onCopy
}: {
  number: string;
  index: number;
  onCopy: (num: string) => void;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    haptic(30);
    try {
      await navigator.clipboard.writeText(number);
      setCopied(true);
      onCopy(number);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error('Copy failed:', error);
      haptic(50);
    }
  }, [number, onCopy]);

  return (
    <div className="flex items-center gap-3 p-3 bg-black/30 rounded-[14px] border border-white/20">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-white/60 font-mono">#{index + 1}</span>
          <span className="text-[16px] font-semibold text-white font-mono tracking-tight drop-shadow-md truncate">
            {number}
          </span>
        </div>
      </div>
      <button
        onClick={handleCopy}
        className="shrink-0 p-2 bg-white/10 rounded-[10px] active:bg-white/20 transition-all active:scale-95 touch-manipulation relative overflow-hidden"
      >
        <div className={`transition-all duration-300 ${copied ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
          <Icon name="copy" className="w-4 h-4 text-white/80" />
        </div>
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <Icon name="check" className="w-4 h-4 text-[#34C759]" />
        </div>
      </button>
    </div>
  );
});
PhoneNumberCard.displayName = 'PhoneNumberCard';

export default function PhoneGeneratorPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryPhone>(phoneCountries[0]);
  const [generateCount, setGenerateCount] = useState<number>(10);
  const [generatedNumbers, setGeneratedNumbers] = useState<string[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastCopied, setLastCopied] = useState<string>('');

  const filteredCountries = useMemo(() => {
    return searchCountries(searchQuery);
  }, [searchQuery]);

  const handleCountrySelect = useCallback((country: CountryPhone) => {
    haptic(20);
    setSelectedCountry(country);
    setGeneratedNumbers([]); // 清空之前生成的号码
  }, []);

  const handleGenerate = useCallback(() => {
    haptic(50);
    setIsGenerating(true);

    // 使用 setTimeout 让 UI 有时间更新
    setTimeout(() => {
      const numbers = generateMultiplePhoneNumbers(selectedCountry, generateCount);
      setGeneratedNumbers(numbers);
      setIsGenerating(false);
    }, 100);
  }, [selectedCountry, generateCount]);

  const handleCopyAll = useCallback(async () => {
    haptic(30);
    try {
      const allNumbers = generatedNumbers.join('\n');
      await navigator.clipboard.writeText(allNumbers);
      setLastCopied('all');
      setTimeout(() => setLastCopied(''), 1500);
    } catch (error) {
      console.error('Copy all failed:', error);
      haptic(50);
    }
  }, [generatedNumbers]);

  const handleExport = useCallback(() => {
    haptic(30);
    const allNumbers = generatedNumbers.join('\n');
    const blob = new Blob([allNumbers], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedCountry.code}_phone_numbers_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [generatedNumbers, selectedCountry]);

  const countOptions = [5, 10, 20, 50, 100];

  return (
    <div className="min-h-screen relative font-sans text-white pb-10 selection:bg-blue-400/30 overflow-x-hidden">
      <div className="relative z-10">
        {/* 头部 */}
        <header className="fixed top-0 left-0 right-0 h-[52px] z-40 flex items-center justify-between px-4 pt-2 transition-all duration-300">
          <h1 className="text-[17px] font-semibold text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            随机手机号生成器
          </h1>
          <MenuButton onClick={() => { haptic(20); setShowMenu(true); }} />
        </header>

        <main className="max-w-[420px] mx-auto px-5 pt-20 pb-10 space-y-6">

          {/* 搜索框 */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon name="search" className="w-5 h-5 text-white/40" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索国家或区号..."
              className="w-full pl-11 pr-10 py-3 bg-black/30 border border-white/20 rounded-[16px] text-[16px] text-white placeholder-white/40 focus:ring-2 focus:ring-white/30 focus:bg-black/40 transition-colors caret-[#007AFF] outline-none shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => { haptic(20); setSearchQuery(''); }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center touch-manipulation active:scale-90 transition-transform"
              >
                <div className="bg-white/20 rounded-full p-1">
                  <Icon name="close" className="w-3.5 h-3.5 text-white" />
                </div>
              </button>
            )}
          </div>

          {/* 国家列表 */}
          <section>
            <div className="pl-1 mb-2 text-[13px] font-medium text-white/80 uppercase tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              选择国家 ({filteredCountries.length})
            </div>
            <div className="space-y-2">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <CountryCard
                    key={country.code}
                    country={country}
                    isSelected={selectedCountry.code === country.code}
                    onClick={() => handleCountrySelect(country)}
                  />
                ))
              ) : (
                <div className="text-center py-16 text-white/50 text-[15px]">
                  未找到匹配的国家
                </div>
              )}
            </div>
          </section>

          {/* 生成数量选择 */}
          <section>
            <div className="pl-1 mb-2 text-[13px] font-medium text-white/80 uppercase tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              生成数量
            </div>
            <div className="flex gap-2 flex-wrap">
              {countOptions.map((count) => (
                <button
                  key={count}
                  onClick={() => { haptic(20); setGenerateCount(count); }}
                  className={`flex-1 min-w-[70px] py-3 px-4 rounded-[14px] text-[15px] font-semibold transition-all active:scale-95 touch-manipulation border ${
                    generateCount === count
                      ? 'bg-white/10 border-white/30 text-white shadow-lg'
                      : 'bg-black/30 border-white/20 text-white/80 active:bg-white/10'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </section>

          {/* 生成按钮 */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 rounded-[18px] shadow-[0_0_20px_rgba(0,122,255,0.4)] border border-white/20 flex items-center justify-center gap-2.5 touch-manipulation overflow-hidden relative transition-all duration-200 bg-gradient-to-b from-[#007AFF]/90 to-[#0055b3]/90 active:scale-[0.96] disabled:opacity-50 disabled:active:scale-100"
          >
            <Icon name={isGenerating ? "phone" : "sparkles"} className={`w-5 h-5 text-white/90 drop-shadow-sm ${isGenerating ? 'animate-pulse' : ''}`} />
            <span className="text-[17px] font-semibold tracking-tight text-white drop-shadow-md">
              {isGenerating ? '生成中...' : `生成 ${generateCount} 个手机号`}
            </span>
          </button>

          {/* 生成的手机号列表 */}
          {generatedNumbers.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-3 pl-1">
                <div className="text-[13px] font-medium text-white/80 uppercase tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  生成结果 ({generatedNumbers.length})
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyAll}
                    className="px-3 py-1.5 bg-black/30 border border-white/20 rounded-[10px] text-[13px] font-semibold text-white/90 active:bg-white/10 transition-all active:scale-95 touch-manipulation flex items-center gap-1.5"
                  >
                    <Icon name={lastCopied === 'all' ? "check" : "copy"} className={`w-3.5 h-3.5 ${lastCopied === 'all' ? 'text-[#34C759]' : 'text-white/80'}`} />
                    {lastCopied === 'all' ? '已复制' : '全部复制'}
                  </button>
                  <button
                    onClick={handleExport}
                    className="px-3 py-1.5 bg-black/30 border border-white/20 rounded-[10px] text-[13px] font-semibold text-white/90 active:bg-white/10 transition-all active:scale-95 touch-manipulation flex items-center gap-1.5"
                  >
                    <Icon name="download" className="w-3.5 h-3.5 text-white/80" />
                    导出
                  </button>
                </div>
              </div>
              <div className="space-y-2 max-h-[500px] overflow-y-auto overscroll-contain rounded-[16px] p-3 bg-black/20 border border-white/10">
                {generatedNumbers.map((number, index) => (
                  <PhoneNumberCard
                    key={`${number}-${index}`}
                    number={number}
                    index={index}
                    onCopy={setLastCopied}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 说明 */}
          <section className="pt-4 pb-8">
            <div className="bg-black/30 rounded-[16px] p-4 border border-white/20 space-y-3">
              <div className="flex items-start gap-2">
                <Icon name="phone" className="w-5 h-5 text-[#007AFF] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-[15px] font-semibold text-white mb-1">关于生成的手机号</h3>
                  <p className="text-[13px] text-white/70 leading-relaxed">
                    生成的手机号采用各国真实运营商号段和格式，符合该国手机号规范。这些号码仅用于测试目的，不代表真实存在的电话号码。
                  </p>
                </div>
              </div>
              <div className="h-[0.5px] bg-white/10" />
              <div className="text-[12px] text-white/60 text-center">
                当前支持 {phoneCountries.length} 个国家/地区 • 更多国家即将添加
              </div>
            </div>
          </section>

        </main>
      </div>

      <NavigationMenu isOpen={showMenu} onClose={() => setShowMenu(false)} />
    </div>
  );
}
