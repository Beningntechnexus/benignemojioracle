import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#f8f4e8',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#2A303C',
          borderRadius: '50%',
          border: '2px solid #2A303C',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Crystal Ball */}
          <circle cx="50" cy="40" r="38" fill="#FACC15" stroke="#2A303C" strokeWidth="4" />
          {/* Face */}
          <circle cx="38" cy="35" r="5" fill="#2A303C" />
          <circle cx="62" cy="35" r="5" fill="#2A303C" />
          <path d="M35 55 Q 50 65 65 55" stroke="#2A303C" strokeWidth="4" fill="none" />
          {/* Ball Stand */}
          <path
            d="M30 78 C 30 70, 70 70, 70 78 L 75 90 L 25 90 Z"
            fill="#9333EA"
            stroke="#2A303C"
            strokeWidth="4"
          />
          <rect x="20" y="90" width="60" height="8" rx="2" fill="#374151" stroke="#2A303C" strokeWidth="2.5" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
