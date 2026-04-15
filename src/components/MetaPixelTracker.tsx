import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MetaPixelTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // @ts-ignore
    if (typeof window.fbq !== 'undefined') {
      // @ts-ignore
      window.fbq('track', 'PageView');
    }
  }, [location]);

  return null;
};

export default MetaPixelTracker;
