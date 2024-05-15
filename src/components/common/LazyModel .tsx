import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Loading from '@/components/Loading';

const LoadModelPreview = dynamic(() => import('@/components/model/ModelPreview'), {
  ssr: false,
  loading: () => <Loading />,
});

type LazyModelProps = {
  modelUrl: string;
  active: boolean;
};

const LazyModel = ({ modelUrl, active }: LazyModelProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (active) {
      setShouldLoad(true);
    }
  }, [active]);

  if (!shouldLoad) {
    return null;
  }

  return <LoadModelPreview modelUrl={modelUrl} />;
};

export default LazyModel;
