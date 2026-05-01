import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 512,
  height: 512,
};

export const contentType = 'image/png';

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          padding: '40px',
        }}
      >
        {/* Magnifying glass circle */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Main circle */}
          <div
            style={{
              width: '380px',
              height: '380px',
              border: '24px solid #1e3a8a',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Chart bars */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '16px',
                height: '180px',
              }}
            >
              <div style={{ width: '48px', height: '80px', background: '#3b82f6', borderRadius: '8px' }} />
              <div style={{ width: '48px', height: '120px', background: '#10b981', borderRadius: '8px' }} />
              <div style={{ width: '48px', height: '160px', background: '#84cc16', borderRadius: '8px' }} />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
