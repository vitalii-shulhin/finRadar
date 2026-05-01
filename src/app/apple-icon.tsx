import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default async function AppleIcon() {
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
          padding: '16px',
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
              width: '140px',
              height: '140px',
              border: '8px solid #1e3a8a',
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
                gap: '6px',
                height: '68px',
              }}
            >
              <div style={{ width: '18px', height: '32px', background: '#3b82f6', borderRadius: '4px' }} />
              <div style={{ width: '18px', height: '48px', background: '#10b981', borderRadius: '4px' }} />
              <div style={{ width: '18px', height: '64px', background: '#84cc16', borderRadius: '4px' }} />
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
