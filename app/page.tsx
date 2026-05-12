export default function Home() {
  return (
    <main style={{ padding: 40, fontFamily: 'Arial', direction: 'rtl' }}>
      <h1>لوحة المدرسة</h1>
      <p>مرحبًا بك في نظام إدارة المدرسة</p>

      <div style={{ display: 'flex', gap: 20, marginTop: 30 }}>
        <div style={{ border: '1px solid #ddd', padding: 20, borderRadius: 12 }}>
          <a href="/students">عرض الطلاب</a>
          <p>إدارة بيانات الطلاب</p>
          <button>عرض الطلاب</button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: 20, borderRadius: 12 }}>
          <h2>المعلمين</h2>
          <p>إدارة بيانات المعلمين</p>
          <button>عرض المعلمين</button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: 20, borderRadius: 12 }}>
          <h2>الفصول</h2>
          <p>إدارة الفصول الدراسية</p>
          <button>عرض الفصول</button>
        </div>
      </div>
    </main>
  )
}