import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MetaPixelTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'PageView');
    }
  }, [location]);

  return null;
};

export default MetaPixelTracker;
