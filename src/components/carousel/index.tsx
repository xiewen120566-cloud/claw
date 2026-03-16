"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Flex } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  swipeThreshold?: number; // 滑动阈值，默认50px
}

const Carousel: React.FC<CarouselProps> = ({ 
  children, 
  autoPlay = true, 
  interval = 5000,
  swipeThreshold = 50 // 滑动超过这个距离才会翻页
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(0); // 触摸起始X坐标
  const [currentX, setCurrentX] = useState(0); // 当前触摸X坐标
  const [isDragging, setIsDragging] = useState(false); // 是否正在拖动
  const slidesCount = React.Children.count(children);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  // 处理触摸开始
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
    setIsDragging(true);
    
    // 触摸时暂停自动播放
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  // 处理触摸移动
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  // 处理触摸结束
  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const diffX = currentX - startX;
    
    // 判断滑动方向和距离是否超过阈值
    if (diffX > swipeThreshold) {
      prevSlide();
    } else if (diffX < -swipeThreshold) {
      nextSlide();
    }
    
    setIsDragging(false);
    // 恢复自动播放
    if (autoPlay) {
      startAutoPlay();
    }
  };

  // 处理鼠标拖动（为桌面设备添加类似功能）
  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    setIsDragging(true);
    
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const diffX = currentX - startX;
    if (diffX > swipeThreshold) {
      prevSlide();
    } else if (diffX < -swipeThreshold) {
      nextSlide();
    }
    
    setIsDragging(false);
    if (autoPlay) {
      startAutoPlay();
    }
  };

  const startAutoPlay = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    slideInterval.current = setInterval(nextSlide, interval);
  };

  useEffect(() => {
    if (autoPlay) {
      startAutoPlay();
    }
    
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [autoPlay, interval]);

  // 计算滑动偏移量（用于拖动过程中的视觉反馈）
  const getSlideOffset = () => {
    if (!isDragging) return 0;
    return (currentX - startX) / window.innerWidth * 100;
  };

  return (
    <Box
      ref={carouselRef}
      position="relative"
      h={["", "496px", "496px"]}
      width="100%"
      overflow="hidden"
      _hover={{
        '& .carousel-nav-button': {
          opacity: 1,
          transform: 'translateY(-50%) scale(1)'
        }
      }}
      // 添加触摸事件监听
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      // 添加鼠标拖动事件（桌面端支持）
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // 鼠标移出区域时结束拖动
    >
      {/* 导航按钮 */}
      <IconButton
        aria-label="Previous slide"
        icon={<ArrowLeftIcon />}
        position="absolute"
        left="16px"
        top="50%"
        transform="translateY(-50%) scale(0.9)"
        onClick={prevSlide}
        zIndex={20}
        bg="rgba(255, 255, 255, 0.75)"
        color="gray.800"
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor="rgba(0, 0, 0, 0.08)"
        _hover={{ 
          bg: "rgba(255, 255, 255, 0.9)",
          transform: "translateY(-50%) scale(1)"
        }}
        size="md"
        opacity={0}
        transition="all 0.3s ease"
        className="carousel-nav-button"
      />
      
      <IconButton
        aria-label="Next slide"
        icon={<ArrowRightIcon />}
        position="absolute"
        right="16px"
        top="50%"
        transform="translateY(-50%) scale(0.9)"
        onClick={nextSlide}
        zIndex={20}
        bg="rgba(255, 255, 255, 0.75)"
        color="gray.800"
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor="rgba(0, 0, 0, 0.08)"
        _hover={{ 
          bg: "rgba(255, 255, 255, 0.9)",
          transform: "translateY(-50%) scale(1)"
        }}
        size="md"
        opacity={0}
        transition="all 0.3s ease"
        className="carousel-nav-button"
      />

      {/* 幻灯片容器 - 新增拖动时的偏移量计算 */}
      <Flex
        height="100%"
        transform={`translateX(-${currentSlide * 100 - getSlideOffset()}%)`}
        transition={isDragging ? "none" : "transform 0.5s ease-in-out"}
      >
        {React.Children.map(children, (child, index) => (
          <Box
            key={index}
            flex="0 0 100%"
            height="100%"
            position="relative"
          >
            {child}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Carousel;
