import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'FinRadar - Фінансовий портал України';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          position: 'relative',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '40%',
            height: '80%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: '35%',
            height: '70%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Logo/Icon - Magnifying glass with chart */}
          <div
            style={{
              width: 160,
              height: 160,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 40,
              position: 'relative',
            }}
          >
            {/* Circle */}
            <div
              style={{
                width: 120,
                height: 120,
                border: '8px solid #3B82F6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
                boxShadow: '0 25px 50px rgba(59, 130, 246, 0.4)',
              }}
            >
              {/* Chart bars */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: 6,
                  height: 60,
                }}
              >
                <div style={{ width: 16, height: 28, background: '#3B82F6', borderRadius: 4 }} />
                <div style={{ width: 16, height: 42, background: '#10B981', borderRadius: 4 }} />
                <div style={{ width: 16, height: 56, background: '#84CC16', borderRadius: 4 }} />
              </div>
            </div>
            {/* Handle */}
            <div
              style={{
                position: 'absolute',
                bottom: -10,
                right: 10,
                width: 40,
                height: 12,
                background: '#1E3A8A',
                borderRadius: 6,
                transform: 'rotate(45deg)',
              }}
            />
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: 'white',
              marginBottom: 20,
              textAlign: 'center',
              letterSpacing: '-0.02em',
            }}
          >
             FinRadar
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: '#94A3B8',
              textAlign: 'center',
              letterSpacing: '-0.01em',
            }}
          >
            Фінансовий портал України
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: 30,
              marginTop: 50,
            }}
          >
            {['Новини', 'Валюта', 'Кредити', 'Депозити'].map((item) => (
              <div
                key={item}
                style={{
                  padding: '12px 24px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 12,
                  fontSize: 20,
                  fontWeight: 600,
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
