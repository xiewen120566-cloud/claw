'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyLoadProps {
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
  delayMs?: number;
  forceLoad?: boolean; // 新增属性，设为true时页面加载时就渲染内容
  span?: number;
}

/**
 * 懒加载包装组件，用于实现窗口外数据不加载功能
 * 当组件进入视口时才渲染子内容
 */
const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  loadingComponent = <div>Loading...</div>,
  rootMargin = '100px',
  threshold = 0,
  triggerOnce = true,
  delayMs = 0,
  forceLoad = false,
}) => {
  // 使用Intersection Observer监测元素是否在视口中
  const { ref, inView } = useInView({
    rootMargin,
    threshold,
    triggerOnce,
  });

  // 添加延迟以避免过于频繁的渲染
  // 如果forceLoad为true，则初始就设置为true
  const [shouldRender, setShouldRender] = useState(forceLoad);

  useEffect(() => {
    // 如果forceLoad为true，直接渲染内容
    if (forceLoad) {
      setShouldRender(true);
      return;
    }

    if (inView) {
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, delayMs);

      return () => clearTimeout(timer);
    }
  }, [inView, delayMs, forceLoad]);

  return (
    <div ref={ref}>
      {shouldRender ? children : loadingComponent}
    </div>
  );
};

export default LazyLoad;