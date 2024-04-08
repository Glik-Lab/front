//@ts-ignore
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';

export default function Progress() {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div
      style={{
        height: 'calc(100vh - 710px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div id="progress-bar" style={{ width: '200px', height: '8px', position: 'relative' }} />
    </div>
  );
}