import React, { useState, useEffect } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('large');
  const [seerahSection, setSeerahSection] = useState('lineage');

  // 1️⃣ استرجاع وحفظ عدادات السبحة والأذكار
  const [counters, setCounters] = useState(() => {
    const saved = localStorage.getItem('tomanina_counters');
    return saved ? JSON.parse(saved) : { tasbeeh: 0, salawat: 0, istighfar: 0, takbeer: 0, tahmeed: 0, tahleel: 0 };
  });
  const [historyTotal, setHistoryTotal] = useState(() => Number(localStorage.getItem('tomanina_total')) || 0);

  useEffect(() => {
    localStorage.setItem('tomanina_counters', JSON.stringify(counters));
    const total = Object.values(counters).reduce((a, b) => a + b, 0);
    setHistoryTotal(total);
    localStorage.setItem('tomanina_total', total.toString());
  }, [counters]);

  // دالة زيادة العداد عند التسبيح
  const incrementCounter = (key) => {
    setCounters(prev => ({ ...prev, [key]: prev[key] + 1 }));
  };

  // دالة تصفير عداد معين
  const resetCounter = (key) => {
    setCounters(prev => ({ ...prev, [key]: 0 }));
  };

  // دالة تصفير كل العدادات
  const resetAll = () => {
    if(window.confirm("هل تريد تصفير جميع العدادات؟")) {
      setCounters({ tasbeeh: 0, salawat: 0, istighfar: 0, takbeer: 0, tahmeed: 0, tahleel: 0 });
    }
  };

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

  const styles = {
    app: { backgroundColor: colors.bg, color: colors.text, minHeight: '100vh', fontFamily: "'Tajawal', sans-serif", direction: 'rtl', paddingBottom: '95px' },
    header: { backgroundColor: colors.primary, color: colors.white, padding: '20px', textAlign: 'center', borderBottom: `4px solid ${colors.gold}` },
    container: { maxWidth: '500px', margin: '0 auto', padding: '15px' },
    card: { backgroundColor: colors.cardBg, borderRadius: '16px', padding: '20px', marginBottom: '15px', border: `1px solid ${colors.border}` },
    counterBtn: { backgroundColor: colors.primary, color: colors.white, border: 'none', padding: '15px', borderRadius: '12px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', width: '100%', marginTop: '10px' },
    tabButton: (active) => ({
      flex: 1, padding: '10px 5px', borderRadius: '8px', border: `1px solid ${colors.primary}`,
      backgroundColor: active ? colors.primary : colors.cardBg, color: active ? colors.white : colors.primary,
      cursor: 'pointer', fontFamily: 'inherit', fontWeight: '700', fontSize: '0.9rem'
    }),
    infoBlock: { padding: '12px', borderBottom: `1px solid ${colors.border}`, lineHeight: '1.8' }
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900' }}>🕌 طُمأنينة</h1>
      </header>

      <div style={styles.container}>
        
        {/* 🏠 الشاشة الرئيسية */}
        {activeTab === 'home' && (
          <div>
            <div style={{ ...styles.card, textAlign: 'center', background: `linear-gradient(135deg, ${colors.primary}, #2c6b57)`, color: colors.white }}>
              <h2 style={{ margin: '0 0 10px 0' }}>مجموع أذكارك اليومية</h2>
              <div style={{ fontSize: '3.5rem', fontWeight: '900', color: colors.gold }}>{historyTotal}</div>
              <button 
                onClick={() => setActiveTab('seerah')}
                style={{ backgroundColor: colors.gold, color: colors.primary, border: 'none', padding: '10px 20px', borderRadius: '20px', marginTop: '15px', cursor: 'pointer', fontWeight: '700', fontFamily: 'inherit' }}
              >
                🌸 تصفح سيرة الحبيب ﷺ
              </button>
            </div>
            
            <div style={styles.card}>
              <h3 style={{ marginTop: 0, color: colors.primary }}>📊 إحصائيات الأذكار الحالية</h3>
              <p>📿 التسبيح: <b>{counters.tasbeeh}</b></p>
              <p>✨ الصلاة على النبي: <b>{counters.salawat}</b></p>
              <p>🍂 الاستغفار: <b>{counters.istighfar}</b></p>
              <button onClick={resetAll} style={{ width: '100%', padding: '10px', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>تصفير كل العدادات</button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px', color: colors.subText }}>
              <p style={{ fontWeight: '700', color: colors.text }}>منشئ التطبيق: محمد حمدان</p>
            </div>
          </div>
        )}

        {/* 📿 شاشة السبحة الإلكترونية المكاملة */}
        {activeTab === 'tasbeeh' && (
          <div>
            <div style={styles.card}>
              <h2 style={{ textAlign: 'center', color: colors.primary, marginTop: 0 }}>📿 المِسبحة الإلكترونية</h2>
              
              <div style={{ borderBottom: `1px solid ${colors.border}`, paddingBottom: '15px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>سبحان الله وبحمده</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.gold }}>{counters.tasbeeh}</span>
                </div>
                <button style={styles.counterBtn} onClick={() => incrementCounter('tasbeeh')}>اضغط للتسبيح</button>
                <button onClick={() => resetCounter('tasbeeh')} style={{ background: 'none', border: 'none', color: '#d9534f', cursor: 'pointer', marginTop: '5px' }}>تصفير</button>
              </div>

              <div style={{ borderBottom: `1px solid ${colors.border}`, paddingBottom: '15px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>اللهم صلِّ وسلم على نبينا محمد</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.gold }}>{counters.salawat}</span>
                </div>
                <button style={styles.counterBtn} onClick={() => incrementCounter('salawat')}>اضغط للصلاة على النبي</button>
                <button onClick={() => resetCounter('salawat')} style={{ background: 'none', border: 'none', color: '#d9534f', cursor: 'pointer', marginTop: '5px' }}>تصفير</button>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>أستغفر الله وأتوب إليه</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.gold }}>{counters.istighfar}</span>
                </div>
                <button style={styles.counterBtn} onClick={() => incrementCounter('istighfar')}>اضغط للاستغفار</button>
                <button onClick={() => resetCounter('istighfar')} style={{ background: 'none', border: 'none', color: '#d9534f', cursor: 'pointer', marginTop: '5px' }}>تصفير</button>
              </div>
            </div>
          </div>
        )}

        {/* 🌸 شاشة السيرة النبوية العطرة */}
        {activeTab === 'seerah' && (
          <div>
            <div style={styles.card}>
              <h2 style={{ color: colors.primary, marginTop: 0, textAlign: 'center', fontSize: '1.4rem' }}>🌸 السيرة النبوية العطرة</h2>
              <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                <button style={styles.tabButton(seerahSection === 'lineage')} onClick={() => setSeerahSection('lineage')}>الاسم والنسب</button>
                <button style={styles.tabButton(seerahSection === 'family')} onClick={() => setSeerahSection('family')}>عائلته وآل بيته</button>
                <button style={styles.tabButton(seerahSection === 'companions')} onClick={() => setSeerahSection('companions')}>أصحابه الكرام</button>
              </div>
            </div>

            <div style={{ ...styles.card, backgroundImage: 'linear-gradient(to bottom, #fffdf9, #ffffff)' }}>
              {seerahSection === 'lineage' && (
                <div>
                  <h3 style={{ color: colors.gold, borderBottom: `2px solid ${colors.gold}`, paddingBottom: '5px' }}>📝 اسمه ونسبه الشريف</h3>
                  <div style={styles.infoBlock}><strong>الاسم الكامل:</strong> محمد بن عبد الله بن عبد المطلب بن هاشم بن عبد مناف بن قصي بن كلاب بن مرة بن كعب.</div>
                  <div style={styles.infoBlock}><strong>ولادته:</strong> ولد في مكة المكرمة يوم الاثنين 12 ربيع الأول في عام الفيل.</div>
                </div>
              )}
              {seerahSection === 'family' && (
                <div>
                  <h3 style={{ color: colors.gold, borderBottom: `2px solid ${colors.gold}`, paddingBottom: '5px' }}>🏡 عائلته وآل بيته</h3>
                  <div style={styles.infoBlock}><strong>زوجاته:</strong> خديجة بنت خويلد، عائشة بنت أبي بكر، حفصة بنت عمر، أم سلمة (رضي الله عنهن).</div>
                  <div style={styles.infoBlock}><strong>أولاده:</strong> الذكور (القاسم، عبد الله، إبراهيم) والإناث (زينب، رقية، أم كلثوم، وفاطمة الزهراء).</div>
                </div>
              )}
              {seerahSection === 'companions' && (
                <div>
                  <h3 style={{ color: colors.gold, borderBottom: `2px solid ${colors.gold}`, paddingBottom: '5px' }}>⚔️ أصحابه الكرام</h3>
                  <div style={styles.infoBlock}><strong>الخلفاء الراشدون:</strong> أبو بكر الصديق، عمر بن الخطاب، عثمان بن عفان، وعلي بن أبي طالب رضي الله عنهم.</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ✨ شاشة الأذكار اليومية */}
        {activeTab === 'azkar' && (
          <div>
            <div style={styles.card}>
              <h2 style={{ color: colors.primary, marginTop: 0, textAlign: 'center' }}>✨ أذكار اليوم والليلة</h2>
              <div style={{ borderBottom: `1px solid ${colors.border}`, padding: '10px 0' }}>
                <p style={{ fontWeight: 'bold' }}>آية الكرسي:</p>
                <p style={{ color: colors.subText }}>"اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ..." (تقرأ بعد كل صلاة وقبل النوم للحفظ).</p>
              </div>
              <div style={{ padding: '10px 0' }}>
                <p style={{ fontWeight: 'bold' }}>سيد الاستغفار:</p>
                <p style={{ color: colors.subText }}>"اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت..."</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 🧭 شريط التنقل السفلي الكامل والمستقر */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: colors.cardBg, display: 'flex', justifyContent: 'space-around', padding: '12px 0', borderTop: `1px solid ${colors.border}`, zIndex: 1000 }}>
        <button style={{ background: 'none', border: 'none', color: activeTab === 'home' ? colors.primary : colors.subText, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'inherit' }} onClick={() => setActiveTab('home')}><span>🏠</span>الرئيسية</button>
        <button style={{ background: 'none', border: 'none', color: activeTab === 'tasbeeh' ? colors.primary : colors.subText, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'inherit' }} onClick={() => setActiveTab('tasbeeh')}><span>📿</span>السبحة</button>
        <button style={{ background: 'none', border: 'none', color: activeTab === 'seerah' ? colors.primary : colors.subText, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'inherit' }} onClick={() => setActiveTab('seerah')}><span>🌸</span>السيرة</button>
        <button style={{ background: 'none', border: 'none', color: activeTab === 'azkar' ? colors.primary : colors.subText, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'inherit' }} onClick={() => setActiveTab('azkar')}><span>✨</span>الأذكار</button>
      </nav>
    </div>
  );
}

export default App;
