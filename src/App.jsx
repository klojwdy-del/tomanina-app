import React, { useState } from 'react';
import './index.css';

function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <div className="app-container">
      <h1 className="title">طُمأنينة</h1>
      <p className="subtitle">أذكارك اليومية بدون إنترنت</p>

      {/* الذكر الأول */}
      <div className="card">
        <p className="dhikr-text">سُبْحَانَ اللَّهِ وَبِحَمْدِهِ</p>
        <span className="dhikr-benefit">حُطَّتْ خَطَايَاهُ وَإِنْ كَانَتْ مِثْلَ زَبَدِ الْبَحْرِ</span>
        <div className="counter-section">
          <button className="counter-btn" onClick={() => setCount1(count1 + 1)}>
            {count1}
          </button>
        </div>
      </div>

      {/* الذكر الثاني */}
      <div className="card">
        <p className="dhikr-text">أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ</p>
        <span className="dhikr-benefit">ممحاة للذنوب ومجلبة للرزق</span>
        <div className="counter-section">
          <button className="counter-btn" onClick={() => setCount2(count2 + 1)}>
            {count2}
          </button>
        </div>
      </div>

      <div className="stats">
        مجموع الأذكار المستغفرة: {count1 + count2}
      </div>
    </div>
  );
}

export default App;
