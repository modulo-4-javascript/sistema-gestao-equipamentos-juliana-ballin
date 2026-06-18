interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <div style={{ background: 'red', padding: '1rem', color: 'white' }}>
        {children}
      </div>
    </>
  );
}
