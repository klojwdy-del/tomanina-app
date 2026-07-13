import React, { useState, useEffect } from 'react';

function App() {
  // --- 1. إدارة الحالات البرمجية (State Management) ---
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('light');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [fontSize, setFontSize] = useState('medium');
  const [hideName, setHideName] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState(0);

  // عدادات الصفحة الرئيسية والسبحة
  const [counters, setCounters] = useState(() => {
    const saved = localStorage.getItem('tomanina_counters');
    return saved ? JSON.parse(saved) : { tasbeeh: 0, salawat: 0, istighfar: 0, takbeer: 0, tahmeed: 0, tahleel: 0 };
  });

  const [selectedDhikr, setSelectedDhikr] = useState('tasbeeh');
  const [historyTotal, setHistoryTotal] = useState(() => Number(localStorage.getItem('tomanina_total')) || 0);
  const [weeklyChallengeProgress, setWeeklyChallengeProgress] = useState(() => Number(localStorage.getItem('tomanina_challenge')) || 0);

  // حفظ البيانات تلقائياً عند تغير العدادات
  useEffect(() => {
    localStorage.setItem('tomanina_counters', JSON.stringify(counters));
    const total = Object.values(counters).reduce((a, b) => a + b, 0);
    setHistoryTotal(total);
    localStorage.setItem('tomanina_total', total.toString());
  }, [counters]);

  const triggerVibration = () => {
    if (vibrationEnabled && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const incrementCounter = (type) => {
    setCounters(prev => ({ ...prev, [type]: prev[type] + 1 }));
    if (type === 'salawat' || type === selectedDhikr) {
      setWeeklyChallengeProgress(prev => {
        const next = prev + 1;
        localStorage.setItem('tomanina_challenge', next.toString());
        return next;
      });
    }
    triggerVibration();
  };

  const resetCounter = (type) => {
    setCounters(prev => ({ ...prev, [type]: 0 }));
    triggerVibration();
  };

  const dhikrNames = {
    tasbeeh: 'سبحان الله',
    salawat: 'اللهم صلِّ وسلم على نبينا محمد',
    istighfar: 'أستغفر الله وأتوب إليه',
    takbeer: 'الله أكبر',
    tahmeed: 'الحمد لله',
    tahleel: 'لا إله إلا الله'
  };

  // بيانات القرآن الكريم (سور وآيات عظيمة الفضل ومكتوبة بالرسم المريح)
  const quranData = [
    {
      title: "📖 سورة الفاتحة",
      verses: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾"
    },
    {
      title: "✨ آية الكرسي",
      verses: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ"
    },
    {
      title: "🛡️ خواتيم سورة البقرة",
      verses: "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْهِ الْمَصِيرُ ﴿٢٨٥﴾ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ ﴿٢٨٦﴾"
    },
    {
      title: "🕌 سورة الكهف (الأوائل)",
      verses: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا ۜ ﴿١﴾ قَيِّمًا لِّيُنذِرَ بَأْسًا شَدِيدًا مِّن لَّدُنْهُ وَيُبَشِّرَ الْمُؤْمِنِينَ الَّذِينَ يَعْمَلُونَ الصَّالِحَاتِ أَنَّ لَهُمْ أَجْرًا حَسَنًا ﴿٢﴾ مَّاكِثِينَ فِيهِ أَبَدًا ﴿٣﴾ وَيُنذِرَ الَّذِينَ قَالُوا اتَّخَذَ اللَّهُ وَلَدًا ﴿٤﴾ مَّا لَهُم بِهِ مِنْ عِلْمٍ وَلَا لِآبَائِهِمْ ۚ كَبُرَتْ كَلِمَةً تَخْرُjsُ مِنْ أَفْوَاهِهِمْ ۚ إِن يَقُولُونَ إِلَّا كَذِبًا ﴿٥﴾"
    },
    {
      title: "🌌 سورة الملك (مختارات)",
      verses: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ تَبَارَك الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ ﴿١﴾ الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلاً وَهُوَ الْعَزِيزُ الْغَفُورُ ﴿٢﴾ الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقاً مَّا تَرَى فِي خَلْقِ الرَّحْمَنِ مِن تَفَاوُتٍ فَارْجِعِ الْبَصَرَ هَلْ تَرَى مِن فُطُورٍ ﴿٣﴾"
    },
    {
      title: "📿 سورة الإخلاص والمعوذتين",
      verses: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾ \n\n قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِن شَرِّ مَا خَلَقَ ﴿٢﴾ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبُ ﴿٣﴾ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾ \n\n قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ مَلِكِ النَّاسِ ﴿٢﴾ إِلَٰهِ النَّاسِ ﴿٣﴾ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾ مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾"
    }
  ];

  // --- 2. نظام الألوان والتصميم (Theme Styles) ---
  const isDark = theme === 'dark';
  const colors = {
    bg: isDark ? '#121b15' : '#f4f7f5',
    cardBg: isDark ? '#1a261f' : '#ffffff',
    text: isDark ? '#e8ece9' : '#2c3e35',
    subText: isDark ? '#92a399' : '#687c72',
    primary: '#1b4d3e', 
    gold: '#c5a059',    
    white: '#ffffff',
    border: isDark ? '#25352b' : '#e2e8e4'
  };

  const getFontSize = (base) => {
    if (fontSize === 'small') return `${base * 0.85}rem`;
    if (fontSize === 'large') return `${base * 1.3}rem`;
    return `${base}rem`;
  };

  const styles = {
    app: {
      backgroundColor: colors.bg,
      color: colors.text,
      minHeight: '100vh',
      fontFamily: "'Tajawal', 'Cairo', system-ui, -apple-system, sans-serif",
      direction: 'rtl',
      paddingBottom: '95px',
      transition: 'all 0.3s ease'
    },
    header: {
      backgroundColor: colors.primary,
      color: colors.white,
      padding: '20px',
      textAlign: 'center',
      borderBottom: `4px solid ${colors.gold}`,
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    },
    container: { maxWidth: '500px', margin: '0 auto', padding: '15px' },
    card: {
      backgroundColor: colors.cardBg,
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '15px',
      border: `1px solid ${colors.border}`,
      boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
    },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' },
    counterBox: {
      backgroundColor: colors.cardBg,
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      padding: '15px',
      textAlign: 'center'
    },
    btnPrimary: {
      backgroundColor: colors.primary,
      color: colors.white,
      border: 'none',
      padding: '12px 24px',
      borderRadius: '25px',
      fontSize: getFontSize(1.1),
      cursor: 'pointer',
      fontWeight: '700',
      width: '100%',
      fontFamily: "inherit",
      boxShadow: `0 4px 12px rgba(27,77,62,0.2)`
    },
    navBar: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.cardBg,
      display: 'flex',
      justifyContent: 'space-around',
      padding: '12px 0',
      borderTop: `1px solid ${colors.border}`,
      boxShadow: '0 -4px 10px rgba(0,0,0,0.05)',
      zIndex: 1000
    },
    navItem: (tab) => ({
      background: 'none',
      border: 'none',
      color: activeTab === tab ? colors.primary : colors.subText,
      fontWeight: activeTab === tab ? '700' : '500',
      cursor: 'pointer',
      fontSize: '0.85rem',
      fontFamily: "inherit",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2px'
    })
  };

  return (
    <div style={styles.app}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap" rel="stylesheet" />

      <header style={styles.header}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900' }}>🕌 طُمأنينة</h1>
        <p style={{ margin: '5px 0 0 0', opacity: 0.8, fontSize: '0.85rem', fontWeight: '500' }}>مسبحتك الإلكترونية وأذكارك اليومية</p>
      </header>

      <div style={styles.container}>
        
        {/* --- 1. الصفحة الرئيسية --- */}
        {activeTab === 'home' && (
          <div>
            <div style={{ ...styles.card, textAlign: 'center', background: `linear-gradient(135deg, ${colors.primary}, #2c6b57)`, color: colors.white }}>
              <h2 style={{ margin: '0 0 10px 0', fontWeight: '700' }}>مجموع أذكارك اليومية</h2>
              <div style={{ fontSize: '3.5rem', fontWeight: '900', color: colors.gold }}>{historyTotal}</div>
              <button style={{ ...styles.btnPrimary, backgroundColor: colors.gold, color: colors.primary, marginTop: '15px' }} onClick={() => setActiveTab('tasbeeh')}>
                ✨ ابدأ الذكر الآن
              </button>
            </div>

            <h3 style={{ color: colors.primary, marginBottom: '12px', fontWeight: '700' }}>📊 عدادات الأذكار السريعة</h3>
            <div style={styles.grid}>
              {Object.keys(counters).map((key) => (
                <div key={key} style={styles.counterBox}>
                  <div style={{ fontSize: getFontSize(0.95), color: colors.subText, marginBottom: '8px', fontWeight: '500', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{dhikrNames[key]}</div>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: colors.primary, marginBottom: '10px' }}>{counters[key]}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <button style={{ background: 'none', border: 'none', color: colors.primary, cursor: 'pointer', fontWeight: '700', fontSize: '1rem', fontFamily: 'inherit' }} onClick={() => incrementCounter(key)}>انقر</button>
                    <button style={{ background: 'none', border: 'none', color: '#d9534f', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit' }} onClick={() => resetCounter(key)}>تصفير</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px', padding: '15px', color: colors.subText, borderTop: `1px solid ${colors.border}` }}>
              <p style={{ margin: '5px 0', fontWeight: '700', color: colors.text }}>منشئ التطبيق: محمد حمدان</p>
              <p style={{ margin: '5px 0', fontSize: '0.85rem', fontWeight: '500' }}>نسأل الله أن يوفقه ويبارك له ويتقبل منه.</p>
            </div>
          </div>
        )}

        {/* --- 2. صفحة السبحة الإلكترونية --- */}
        {activeTab === 'tasbeeh' && (
          <div style={{ textAlign: 'center' }}>
            <div style={styles.card}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: '700', color: colors.primary }}>اختر الذكر الحالي:</label>
              <select 
                value={selectedDhikr} 
                onChange={(e) => setSelectedDhikr(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: colors.cardBg, color: colors.text, fontFamily: 'inherit', fontWeight: '500', fontSize: '1rem' }}
              >
                {Object.keys(dhikrNames).map(key => <option key={key} value={key}>{dhikrNames[key]}</option>)}
              </select>
            </div>

            <div style={{
              width: '230px', height: '230px', borderRadius: '50%', backgroundColor: colors.cardBg,
              margin: '40px auto', display: 'flex', flexDirection: 'column', justifyContent: 'center',
              alignItems: 'center', border: `8px solid ${colors.primary}`, boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
              cursor: 'pointer'
            }} onClick={() => incrementCounter(selectedDhikr)}>
              <span style={{ fontSize: getFontSize(1), color: colors.subText, fontWeight: '500', padding: '0 10px' }}>{dhikrNames[selectedDhikr]}</span>
              <span style={{ fontSize: '3.8rem', fontWeight: '900', color: colors.primary, margin: '5px 0' }}>{counters[selectedDhikr]}</span>
              <span style={{ fontSize: '0.85rem', color: colors.gold, fontWeight: '700' }}>اضغط للتسبيح</span>
            </div>

            <button style={{ ...styles.btnPrimary, backgroundColor: '#d9534f', maxWidth: '160px', borderRadius: '12px' }} onClick={() => resetCounter(selectedDhikr)}>
              🔄 تصفير العداد
            </button>
          </div>
        )}

        {/* --- خانة القرآن الكريم المضافة حديثاً --- */}
        {activeTab === 'quran' && (
          <div>
            <div style={styles.card}>
              <h3 style={{ color: colors.primary, marginTop: 0, fontWeight: '700' }}>📖 المصحف الشريف (سور وآيات فاضلة)</h3>
              <p style={{ fontSize: '0.85rem', color: colors.subText, marginBottom: '15px' }}>اختر السورة أو الآية للقراءة والتدبر اليومي:</p>
              
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '15px' }}>
                {quranData.map((surah, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedSurah(idx)}
                    style={{
                      padding: '8px 16px', borderRadius: '20px', border: `1px solid ${selectedSurah === idx ? colors.primary : colors.border}`,
                      backgroundColor: selectedSurah === idx ? colors.primary : colors.cardBg,
                      color: selectedSurah === idx ? colors.white : colors.text,
                      whiteSpace: 'nowrap', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '600', fontSize: '0.9rem'
                    }}
                  >
                    {surah.title}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ ...styles.card, textAlign: 'center', backgroundImage: 'linear-gradient(to bottom, #fffdf8, #ffffff)', border: `1px solid ${colors.gold}` }}>
              <h3 style={{ color: colors.gold, marginTop: 0, borderBottom: `1px solid ${colors.border}`, paddingBottom: '10px' }}>
                {quranData[selectedSurah].title}
              </h3>
              <p style={{ 
                fontSize: getFontSize(1.35), 
                lineHeight: '2.2', 
                color: '#1a2520', 
                fontWeight: '600',
                textAlign: 'justify',
                direction: 'rtl',
                padding: '10px 5px',
                whiteSpace: 'pre-line'
              }}>
                {quranData[selectedSurah].verses}
              </p>
            </div>
          </div>
        )}

        {/* --- 7. صفحة الأذكار --- */}
        {activeTab === 'azkar' && (
          <div>
            {[
              { t: "☀️ أذكار الصباح", c: "أعوذ بالله من الشيطان الرجيم (آية الكرسي)، أصبحنا وأصبح الملك لله والحمد لله ولا إله إلا الله." },
              { t: "🌙 أذكار المساء", c: "أمسينَا وأمسى الملك لله، والحمد لله، رضيت بالله رباً وبالإسلام ديناً وبمحمد ﷺ نبياً." },
              { t: "🛌 أذكار النوم", c: "باسمك ربي وضعت جنبي وبك أرفعه، إن أمسكت نفسي فارحمها وإن أرسلتها فاحفظها." },
              { t: "🌅 أذكار الاستيقاظ", c: "الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور." },
              { t: "📿 أذكار بعد الصلاة", c: "أستغفر الله (ثلاثاً)، اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام." },
              { t: "✨ أذكار متنوعة", c: "سبحان الله وبحمده سبحان الله العظيم، لا حول ولا قوة إلا بالله العلي العظيم." }
            ].map((zkr, i) => (
              <div key={i} style={styles.card}>
                <h4 style={{ color: colors.primary, margin: '0 0 10px 0', fontWeight: '700', fontSize: '1.1rem' }}>{zkr.t}</h4>
                <p style={{ fontSize: getFontSize(1.1), lineHeight: '1.7', color: colors.text, fontWeight: '500' }}>{zkr.c}</p>
                <button 
                  style={{ background: 'none', border: 'none', color: colors.gold, cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem', marginTop: '10px', fontFamily: 'inherit' }}
                  onClick={() => { navigator.clipboard.writeText(zkr.c); alert('تم نسخ الذكر المبارك لمشاركته!'); }}
                >
                  🔗 نسخ ومشاركة الذكر
                </button>
              </div>
            ))}
          </div>
        )}

        {/* --- 4 & 5. نظام الإنجازات والتحديات --- */}
        {activeTab === 'achievements' && (
          <div>
            <div style={{ ...styles.card, border: `2px solid ${colors.gold}`, background: `linear-gradient(to right, ${colors.cardBg}, #fffdf7)` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: colors.gold, margin: 0, fontWeight: '700' }}>🏆 التحدي الأسبوعي</h3>
                <span style={{ fontSize: '1.5rem' }}>👑</span>
              </div>
              <p style={{ fontSize: '0.95rem', margin: '10px 0', fontWeight: '500' }}>قم بالإتيان بـ 100 ذكر أو صلاة على النبي ﷺ هذا الأسبوع.</p>
              
              <div style={{ width: '100%', backgroundColor: colors.border, height: '10px', borderRadius: '5px', overflow: 'hidden', margin: '10px 0' }}>
                <div style={{ width: `${Math.min((weeklyChallengeProgress / 100) * 100, 100)}%`, backgroundColor: colors.primary, height: '100%' }}></div>
              </div>
              
              {weeklyChallengeProgress >= 100 ? (
                <div style={{ color: colors.primary, fontWeight: '700', fontSize: '0.95rem', backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                  🎉 تهانينا! أكملت التحدي وحصلت على الكأس الذهبي الافتراضي وشارة الأسبوع النورانية بنجاح!
                </div>
              ) : (
                <div style={{ fontSize: '0.85rem', color: colors.subText, textAlign: 'left', fontWeight: '500' }}>التقدم الحالي: {weeklyChallengeProgress} / 100</div>
              )}
            </div>

            <h3 style={{ color: colors.primary, fontWeight: '700' }}>🏅 الأوسمة والألقاب النورانية</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { t: "بداية الخير", d: "سبّحت أول تسبيحة لك", active: historyTotal > 0 },
                { t: "المواظبة", d: "أتممت 50 ذكراً كلياً", active: historyTotal >= 50 },
                { t: "عاشق النبي ﷺ", d: "صلّيت على النبي 33 مرة", active: counters.salawat >= 33 },
                { t: "الذاكر", d: "أتممت 100 ذكر في التطبيق", active: historyTotal >= 100 },
                { t: "أهل الاستغفار", d: "استغفرت الله 33 مرة", active: counters.istighfar >= 33 },
                { t: "نور القلب", d: "سبّحت وهلّلت بكثرة اليوم", active: counters.tasbeeh >= 20 },
                { t: "ختم 1,000 ذكر", d: "أكملت 1,000 ذكر كلياً", active: historyTotal >= 1000 },
                { t: "ختم 10,000 ذكر", d: "أكملت 10,000 ذكر كلياً", active: historyTotal >= 10000 },
                { t: "الاستمرار 30 يوماً", d: "حافظت على الأذكار شهراً", active: false }
              ].map((badge, idx) => (
                <div key={idx} style={{ ...styles.counterBox, opacity: badge.active ? 1 : 0.5, border: badge.active ? `2px solid ${colors.gold}` : `1px solid ${colors.border}` }}>
                  <div style={{ fontSize: '2rem', marginBottom: '5px' }}>{badge.active ? '⭐' : '🔒'}</div>
                  <div style={{ fontWeight: '700', color: colors.primary }}>وسام {badge.t}</div>
                  <div style={{ fontSize: '0.8rem', color: colors.subText, marginTop: '4px', fontWeight: '500' }}>{badge.d}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 3. صفحة الإحصائيات ولوحة الصدارة دمجت للإعدادات --- */}
        {activeTab === 'settings' && (
          <div>
            <div style={styles.card}>
              <h3 style={{ color: colors.primary, marginTop: 0, fontWeight: '700' }}>⚙️ الإعدادات العامة</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${colors.border}`, fontWeight: '500' }}>
                <span>الوضع الليلي (المظهر الداكن)</span>
                <input type="checkbox" checked={isDark} onChange={() => setTheme(isDark ? 'light' : 'dark')} style={{ width: '20px', height: '20px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${colors.border}`, fontWeight: '500' }}>
                <span>تفعيل الاهتزاز اللطيف</span>
                <input type="checkbox" checked={vibrationEnabled} onChange={() => setVibrationEnabled(!vibrationEnabled)} style={{ width: '20px', height: '20px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${colors.border}`, fontWeight: '500' }}>
                <span>حجم الخط العربي</span>
                <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} style={{ padding: '6px', borderRadius: '6px', fontFamily: 'inherit' }}>
                  <option value="small">صغير</option>
                  <option value="medium">متوسط</option>
                  <option value="large">كبير</option>
                </select>
              </div>
            </div>

            <div style={styles.card}>
              <h3 style={{ color: colors.primary, marginTop: 0, fontWeight: '700' }}>📊 إجمالي أذكارك</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontWeight: '600' }}>
                <span>المجموع الكلي الحالي:</span>
                <span style={{ color: colors.gold, fontSize: '1.2rem' }}>{historyTotal} ذكر</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* شريط التنقل السفلي المطور لتضمين خانة القرآن الكريم */}
      <nav style={styles.navBar}>
        <button style={styles.navItem('home')} onClick={() => setActiveTab('home')}><span>🏠</span>الرئيسية</button>
        <button style={styles.navItem('tasbeeh')} onClick={() => setActiveTab('tasbeeh')}><span>📿</span>السبحة</button>
        <button style={styles.navItem('quran')} onClick={() => setActiveTab('quran')}><span>📖</span>القرآن</button>
        <button style={styles.navItem('azkar')} onClick={() => setActiveTab('azkar')}><span>✨</span>الأذكار</button>
        <button style={styles.navItem('achievements')} onClick={() => setActiveTab('achievements')}><span>🏅</span>الأوسمة</button>
        <button style={styles.navItem('settings')} onClick={() => setActiveTab('settings')}><span>⚙️</span>الإعدادات</button>
      </nav>
    </div>
  );
}

export default App;
