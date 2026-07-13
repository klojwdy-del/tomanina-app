import React, { useState, useEffect } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('large');
  const [seerahSection, setSeerahSection] = useState('lineage'); // القسم الافتراضي للسيرة

  // عدادات الذكر والسبحة
  const [counters, setCounters] = useState(() => {
    const saved = localStorage.getItem('tomanina_counters');
    return saved ? JSON.parse(saved) : { tasbeeh: 0, salawat: 0, istighfar: 0, takbeer: 0, tahmeed: 0, tahleel: 0 };
  });
  const [historyTotal, setHistoryTotal] = useState(() => Number(localStorage.getItem('tomanina_total')) || 0);

  useEffect(() => {
    localStorage.setItem('tomanina_counters', JSON.stringify(counters));
    const total = Object.values(counters).reduce((a, b) => a + b, 0);
    setHistoryTotal(total);
  }, [counters]);

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
    tabButton: (active) => ({
      flex: 1,
      padding: '10px 5px',
      borderRadius: '8px',
      border: `1px solid ${colors.primary}`,
      backgroundColor: active ? colors.primary : colors.cardBg,
      color: active ? colors.white : colors.primary,
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontWeight: '700',
      fontSize: '0.9rem',
      transition: 'all 0.2s ease'
    }),
    infoBlock: {
      padding: '12px',
      borderBottom: `1px solid ${colors.border}`,
      lineHeight: '1.8'
    }
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900' }}>🕌 طُمأنينة</h1>
      </header>

      <div style={styles.container}>
        
        {/* الصفحة الرئيسية */}
        {activeTab === 'home' && (
          <div>
            <div style={{ ...styles.card, textAlign: 'center', background: `linear-gradient(135deg, ${colors.primary}, #2c6b57)`, color: colors.white }}>
              <h2 style={{ margin: '0 0 10px 0' }}>مجموع أذكارك اليومية</h2>
              <div style={{ fontSize: '3.5rem', fontWeight: '900', color: colors.gold }}>{historyTotal}</div>
              <button 
                onClick={() => setActiveTab('seerah')}
                style={{ backgroundColor: colors.gold, color: colors.primary, border: 'none', padding: '10px 20px', borderRadius: '20px', marginTop: '15px', cursor: 'pointer', fontWeight: '700', fontFamily: 'inherit' }}
              >
                ✨ تصفح سيرة الحبيب ﷺ
              </button>
            </div>
            <div style={{ textAlign: 'center', marginTop: '30px', color: colors.subText }}>
              <p style={{ fontWeight: '700', color: colors.text }}>منشئ التطبيق: محمد حمدان</p>
            </div>
          </div>
        )}

        {/* 📚 خانة السيرة النبوية الشريفة المضافة حديثاً */}
        {activeTab === 'seerah' && (
          <div>
            <div style={styles.card}>
              <h2 style={{ color: colors.primary, marginTop: 0, textAlign: 'center', fontSize: '1.4rem' }}>🌸 السيرة النبوية العطرة</h2>
              <p style={{ textAlign: 'center', fontSize: '0.9rem', color: colors.subText, marginBottom: '15px' }}>تعرّف على نبيك وحبيبه المصطفى ﷺ</p>
              
              {/* أزرار التنقل الداخلية بين أقسام السيرة */}
              <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                <button style={styles.tabButton(seerahSection === 'lineage')} onClick={() => setSeerahSection('lineage')}>الاسم والنسب</button>
                <button style={styles.tabButton(seerahSection === 'family')} onClick={() => setSeerahSection('family')}>عائلته وآل بيته</button>
                <button style={styles.tabButton(seerahSection === 'companions')} onClick={() => setSeerahSection('companions')}>أصحابه الكرام</button>
              </div>
            </div>

            {/* عرض البيانات بناءً على القسم المختار */}
            <div style={{ ...styles.card, backgroundImage: 'linear-gradient(to bottom, #fffdf9, #ffffff)' }}>
              
              {/* 1. قسم الاسم والنسب */}
              {seerahSection === 'lineage' && (
                <div>
                  <h3 style={{ color: colors.gold, borderBottom: `2px solid ${colors.gold}`, paddingBottom: '5px' }}>📝 اسمه ونسبه الشريف</h3>
                  <div style={styles.infoBlock}>
                    <strong>الاسم الكامل:</strong> محمد بن عبد الله بن عبد المطلب بن هاشم بن عبد مناف بن قصي بن كلاب بن مرة بن كعب بن لؤي بن غالب بن فهر بن مالك بن النضر بن كنانة بن خزيمة بن مدركة بن إلياس بن مضر بن نزار بن معد بن عدنان. (وينتهي نسبه الشريف إلى النبي إسماعيل بن إبراهيم عليهما السلام).
                  </div>
                  <div style={styles.infoBlock}>
                    <strong>كنيته:</strong> أبو القاسم (على اسم ابنه الأكبر).
                  </div>
                  <div style={styles.infoBlock}>
                    <strong>ولادته:</strong> وُلِد في مكة المكرمة يوم الاثنين 12 ربيع الأول في عام الفيل (الموافق 571 ميلادي تقريباً)، ونشأ يتيماً الأب والأم.
                  </div>
                </div>
              )}

              {/* 2. قسم العائلة وآل البيت */}
              {seerahSection === 'family' && (
                <div>
                  <h3 style={{ color: colors.gold, borderBottom: `2px solid ${colors.gold}`, paddingBottom: '5px' }}>🏡 عائلته وآل بيته</h3>
                  <div style={styles.infoBlock}>
                    <strong>والداه:</strong> أبوه عبد الله بن عبد المطلب (توفي قبل ولادته)، وأمه آمنة بنت وهب (توفيت وعمره 6 سنوات). حضنته أم أيمن بركة الحبشية، وأرضعته حليمة السعدية.
                  </div>
                  <div style={styles.infoBlock}>
                    <strong>زوجاته (أمهات المؤمنين):</strong> خديجة بنت خويلد (الأولى)، سودة بنت زمعة، عائشة بنت أبي بكر، حفصة بنت عمر، زينب بنت خزيمة، أم سلمة، زينب بنت جحش، جويرية بنت الحارث، صفية بنت حيي، أم حبيبة، وميمونة بنت الحارث رضي الله عنهن.
                  </div>
                  <div style={styles.infoBlock}>
                    <strong>أولاده:</strong> له 7 أولاد (3 ذكور و4 إناث)، وكلهم من السيدة خديجة إلا إبراهيم فمن مارية القبطية:
                    <ul>
                      <li>الذكور: القاسم، عبد الله، إبراهيم (توفوا كلهم في صغرهم).</li>
                      <li>الإناث: زينب، رقية، أم كلثوم، وفاطمة الزهراء (رضي الله عنهن جميعاً).</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* 3. قسم أصحابه الكرام */}
              {seerahSection === 'companions' && (
                <div>
                  <h3 style={{ color: colors.gold, borderBottom: `2px solid ${colors.gold}`, paddingBottom: '5px' }}>⚔️ أصحابه الكرام (رضي الله عنهم)</h3>
                  <div style={styles.infoBlock}>
                    <strong>الخلفاء الراشدون:</strong> 
                    <ul>
                      <li>أبو بكر الصديق (صاحبه في الغجرة ورفيقه).</li>
                      <li>عمر بن الخطاب (الفاروق).</li>
                      <li>عثمان بن عفان (ذو النورين).</li>
                      <li>علي بن أبي طالب (ابن عمه وصهره).</li>
                    </ul>
                  </div>
                  <div style={styles.infoBlock}>
                    <strong>المبشرون بالجنة:</strong> بالإضافة للخلفاء الأربعة: طلحة بن عبيد الله، الزبير بن العوام، عبد الرحمن بن عوف، سعد بن أبي وقاص، سعيد بن زيد، وأبو عبيدة عامر بن الجراح.
                  </div>
                  <div style={styles.infoBlock}>
                    <strong>مكانتهم وعلاقتهم:</strong> هم الذين نصروه وآزروه ونقلوا لنا هذا الدين العظيم، وكان يقول فيهم ﷺ: "الله الله في أصحابي، لا تتخذوهم غرضاً بعدي، فمن أحبهم فبحبي أحبهم".
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* باقي الصفحات الافتراضية */}
        {activeTab === 'tasbeeh' && <div style={{textAlign:'center'}}><p>صفحة السبحة الإلكترونية</p></div>}
        {activeTab === 'azkar' && <div><p>صفحة الأذكار اليومية</p></div>}

      </div>

      {/* شريط التنقل السفلي المعدل (القرآن استُبدل بالسيرة) */}
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
