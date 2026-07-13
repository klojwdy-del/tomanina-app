import React, { useState, useEffect } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('light');

  // 1️⃣ إدارة العدادات وحفظها في الذاكرة المحلية (LocalStorage)
  const [counters, setCounters] = useState(() => {
    const saved = localStorage.getItem('tomanina_counters');
    return saved ? JSON.parse(saved) : { tasbeeh: 0, salawat: 0, istighfar: 0 };
  });
  const [historyTotal, setHistoryTotal] = useState(() => Number(localStorage.getItem('tomanina_total')) || 0);

  useEffect(() => {
    localStorage.setItem('tomanina_counters', JSON.stringify(counters));
    const total = Object.values(counters).reduce((a, b) => a + b, 0);
    setHistoryTotal(total);
    localStorage.setItem('tomanina_total', total.toString());
  }, [counters]);

  // دالة زيادة العداد عند الضغط
  const incrementCounter = (key) => {
    setCounters(prev => ({ ...prev, [key]: prev[key] + 1 }));
  };

  // دالة تصفير عداد معين
  const resetCounter = (key) => {
    setCounters(prev => ({ ...prev, [key]: 0 }));
  };

  // دالة تصفير كل العدادات
  const resetAll = () => {
    if (window.confirm("هل تريد تصفير جميع العدادات؟")) {
      setCounters({ tasbeeh: 0, salawat: 0, istighfar: 0 });
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
    counterBtn: { backgroundColor: colors.primary, color: colors.white, border: 'none', padding: '15px', borderRadius: '12px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', width: '100%', marginTop: '10px', fontFamily: 'inherit' }
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900' }}>🕌 طُمأنينة</h1>
      </header>

      <div style={styles.container}>
        
        {/* 🏠 الشاشة الرئيسية الأصيلة بدون أي أزرار إضافية */}
        {activeTab === 'home' && (
          <div>
            <div style={{ ...styles.card, textAlign: 'center', background: `linear-gradient(135deg, ${colors.primary}, #2c6b57)`, color: colors.white, padding: '40px 20px' }}>
              <h2 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>مجموع أذكارك اليومية</h2>
              <div style={{ fontSize: '4.5rem', fontWeight: '900', color: colors.gold }}>{historyTotal}</div>
            </div>
            
            <div style={styles.card}>
              <h3 style={{ marginTop: 0, color: colors.primary }}>📊 إحصائيات الأذكار الحالية</h3>
              <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>📿 التسبيح:</span> <b>{counters.tasbeeh}</b></p>
              <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>✨ الصلاة على النبي:</span> <b>{counters.salawat}</b></p>
              <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>🍂 الاستغفار:</span> <b>{counters.istighfar}</b></p>
              <button onClick={resetAll} style={{ width: '100%', padding: '12px', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', marginTop: '15px' }}>تصفير كل العدادات</button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px', color: colors.subText }}>
              <p style={{ fontWeight: '700', color: colors.text }}>منشئ التطبيق: محمد حمدان</p>
            </div>
          </div>
        )}

        {/* 📿 شاشة السبحة الإلكترونية الثلاثية */}
        {activeTab === 'tasbeeh' && (
          <div>
            <div style={styles.card}>
              <h2 style={{ textAlign: 'center', color: colors.primary, marginTop: 0 }}>📿 المِسبحة الإلكترونية</h2>
              
              <div style={{ borderBottom: `1px solid ${colors.border}`, paddingBottom: '15px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600' }}>سبحان الله وبحمده</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.gold }}>{counters.tasbeeh}</span>
                </div>
                <button style={styles.counterBtn} onClick={() => incrementCounter('tasbeeh')}>اضغط للتسبيح</button>
                <button onClick={() => resetCounter('tasbeeh')} style={{ background: 'none', border: 'none', color: '#d9534f', cursor: 'pointer', marginTop: '5px', fontFamily: 'inherit' }}>تصفير العداد</button>
              </div>

              <div style={{ borderBottom: `1px solid ${colors.border}`, paddingBottom: '15px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600' }}>اللهم صلِّ وسلم على نبينا محمد</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.gold }}>{counters.salawat}</span>
                </div>
                <button style={styles.counterBtn} onClick={() => incrementCounter('salawat')}>اضغط للصلاة على النبي</button>
                <button onClick={() => resetCounter('salawat')} style={{ background: 'none', border: 'none', color: '#d9534f', cursor: 'pointer', marginTop: '5px', fontFamily: 'inherit' }}>تصفير العداد</button>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600' }}>أستغفر الله وأتوب إليه</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.gold }}>{counters.istighfar}</span>
                </div>
                <button style={styles.counterBtn} onClick={() => incrementCounter('istighfar')}>اضغط للاستغفار</button>
                <button onClick={() => resetCounter('istighfar')} style={{ background: 'none', border: 'none', color: '#d9534f', cursor: 'pointer', marginTop: '5px', fontFamily: 'inherit' }}>تصفير العداد</button>
              </div>
            </div>
          </div>
        )}

        {/* ✨ شاشة الأذكار اليومية */}
        {activeTab === 'azkar' && (
          <div>
            <div style={styles.card}>
              <h2 style={{ color: colors.primary, marginTop: 0, textAlign: 'center' }}>✨ أذكار اليوم والليلة</h2>
              
              <div style={{ borderBottom: `1px solid ${colors.border}`, padding: '15px 0' }}>
                <p style={{ fontWeight: 'bold', margin: '0 0 5px 0', color: colors.gold }}>آية الكرسي:</p>
                <p style={{ color: colors.text, lineHeight: '1.6' }}>"اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ..."</p>
              </div>

              <div style={{ borderBottom: `1px solid ${colors.border}`, padding: '15px 0' }}>
                <p style={{ fontWeight: 'bold', margin: '0 0 5px 0', color: colors.gold }}>سيد الاستغفار:</p>
                <p style={{ color: colors.text, lineHeight: '1.6' }}>"اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت..."</p>
              </div>

              <div style={{ padding: '15px 0' }}>
                <p style={{ fontWeight: 'bold', margin: '0 0 5px 0', color: colors.gold }}>تسبيح وتحميد:</p>
                <p style={{ color: colors.text, lineHeight: '1.6' }}>"سبحان الله وبحمده، عدد خلقه، ورضا نفسه، وزنة عرشه، ومداد كلماته." (3 مرات)</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 🧭 شريط التنقل السفلي الأصلي المريح (الرئيسية - السبحة - الأذكار) */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: colors.cardBg, display: 'flex', justifyContent: 'space-around', padding: '12px 0', borderTop: `1px solid ${colors.border}`, zIndex: 1000 }}>
        <button style={{ background: 'none', border: 'none', color: activeTab === 'home' ? colors.primary : colors.subText, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'inherit', fontWeight: 'bold', fontSize: '1rem' }} onClick={() => setActiveTab('home')}><span>🏠</span>الرئيسية</button>
        <button style={{ background: 'none', border: 'none', color: activeTab === 'tasbeeh' ? colors.primary : colors.subText, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'inherit', fontWeight: 'bold', fontSize: '1rem' }} onClick={() => setActiveTab('tasbeeh')}><span>📿</span>السبحة</button>
        <button style={{ background: 'none', border: 'none', color: activeTab === 'azkar' ? colors.primary : colors.subText, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'inherit', fontWeight: 'bold', fontSize: '1rem' }} onClick={() => setActiveTab('azkar')}><span>✨</span>الأذكار</button>
      </nav>
    </div>
  );
}

export default App;
