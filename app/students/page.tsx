'use client'

import { useState } from 'react'

type Student = {
  id: string | number
  [key: string]: any
}

export default function StudentsPage() {
  const [civil, setCivil] = useState('')
  const [password, setPassword] = useState('')
  const [student, setStudent] = useState<Student | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setErrorMessage('')
    setStudent(null)

    try {
      const response = await fetch('/api/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          civil: civil.trim(),
          password: password.trim(),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setErrorMessage(result.error || 'حدث خطأ')
        return
      }

      setStudent(result.student)
    } catch (error) {
      console.error(error)
      setErrorMessage('حدث خطأ في الاتصال بالخادم')
    } finally {
      setLoading(false)
    }
  }

  const subjects = [
    'الرياضيات',
    'الفيزياء',
    'علم البيئة',
    'الحديث',
    'الكفايات اللغوية',
    'اللغة الإنجليزية',
    'تقنية رقمية',
    'دراسات اجتماعية',
    'التربية المهنية',
    'التربية الصحية',
    'المعرفة المالية',
  ]

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f5f6fa',
        padding: 30,
        fontFamily: 'Arial',
        direction: 'rtl',
        color: '#111827',
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          background: '#ffffff',
          borderRadius: 16,
          padding: 30,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          color: '#111827',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 25 }}>
          <h1 style={{ color: '#111827', fontWeight: 800 }}>
            بوابة الاستعلام عن تقييم الطالبات
          </h1>
          <p style={{ color: '#374151', fontWeight: 600 }}>
            أدخلي السجل المدني وكلمة المرور لعرض بياناتك فقط
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: 25,
          }}
        >
          <input
            value={civil}
            onChange={(e) => setCivil(e.target.value)}
            placeholder="السجل المدني"
            style={{
              padding: 14,
              width: 240,
              border: '2px solid #9ca3af',
              borderRadius: 10,
              fontSize: 16,
              color: '#111827',
              backgroundColor: '#ffffff',
              fontWeight: 600,
            }}
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="كلمة المرور"
            style={{
              padding: 14,
              width: 240,
              border: '2px solid #9ca3af',
              borderRadius: 10,
              fontSize: 16,
              color: '#111827',
              backgroundColor: '#ffffff',
              fontWeight: 600,
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '14px 28px',
              borderRadius: 10,
              border: 'none',
              background: loading ? '#6b7280' : '#1f2937',
              color: '#ffffff',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            {loading ? 'جاري البحث...' : 'عرض النتيجة'}
          </button>
        </form>

        {errorMessage && (
          <div
            style={{
              background: '#fee2e2',
              color: '#991b1b',
              padding: 14,
              borderRadius: 10,
              textAlign: 'center',
              marginBottom: 20,
              fontWeight: 700,
            }}
          >
            {errorMessage}
          </div>
        )}

        {student && (
          <>
            <div
              style={{
                background: '#f9fafb',
                padding: 20,
                borderRadius: 12,
                marginBottom: 20,
                border: '1px solid #d1d5db',
                color: '#111827',
              }}
            >
              <h2 style={{ color: '#111827', fontWeight: 800 }}>
                بيانات الطالبة
              </h2>

              <p style={{ color: '#111827', fontWeight: 600 }}>
                <strong>اسم الطالبة:</strong>{' '}
                {student['اسماء الطالبات'] || '-'}
              </p>

              <p style={{ color: '#111827', fontWeight: 600 }}>
                <strong>السجل المدني:</strong> {student.id || '-'}
              </p>
            </div>

            <h2 style={{ color: '#111827', fontWeight: 800 }}>الدرجات</h2>

            <table
              cellPadding={12}
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: 15,
                color: '#111827',
                backgroundColor: '#ffffff',
              }}
            >
              <tbody>
                {subjects.map((subject) => (
                  <tr key={subject}>
                    <th
                      style={{
                        textAlign: 'right',
                        border: '1px solid #d1d5db',
                        background: '#e5e7eb',
                        color: '#111827',
                        width: '40%',
                        fontWeight: 800,
                      }}
                    >
                      {subject}
                    </th>
                    <td
                      style={{
                        border: '1px solid #d1d5db',
                        textAlign: 'center',
                        fontWeight: 800,
                        color: '#111827',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      {student[subject] ?? '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 style={{ marginTop: 30, color: '#111827', fontWeight: 800 }}>
              الملاحظات والتوصيات
            </h2>

            <table
              cellPadding={12}
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: 15,
                color: '#111827',
                backgroundColor: '#ffffff',
              }}
            >
              <tbody>
                <tr>
                  <th style={noteHeaderStyle}>نقاط الإجادة</th>
                  <td style={noteCellStyle}>
                    {student['نقاط الإجادة'] || '-'}
                  </td>
                </tr>

                <tr>
                  <th style={noteHeaderStyle}>نقاط الضعف</th>
                  <td style={noteCellStyle}>
                    {student['نقاط الضعف'] || '-'}
                  </td>
                </tr>

                <tr>
                  <th style={noteHeaderStyle}>الملاحظات والتوصيات</th>
                  <td style={noteCellStyle}>
                    {student['الملاحظات والتوصيات'] || '-'}
                  </td>
                </tr>

                <tr>
                  <th style={noteHeaderStyle}>مديرة المدرسة</th>
                  <td style={noteCellStyle}>
                    {student['مديرة المدرسة'] || '-'}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        <div style={{ marginTop: 30, textAlign: 'center' }}>
          <a
            href="/"
            style={{
              color: '#1f2937',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            الرجوع للوحة الرئيسية
          </a>
        </div>
      </div>
    </main>
  )
}

const noteHeaderStyle = {
  textAlign: 'right' as const,
  border: '1px solid #d1d5db',
  background: '#e5e7eb',
  color: '#111827',
  width: '30%',
  fontWeight: 800,
}

const noteCellStyle = {
  border: '1px solid #d1d5db',
  color: '#111827',
  backgroundColor: '#ffffff',
  fontWeight: 700,
}
