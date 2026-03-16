"use client";
import useAdDisplay from "@/hooks/useAdDisplay";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";

interface AdTemplateProps {
  id: string;
  className?: string;
  "data-ad-client": string;
  "data-ad-slot": string;
  "data-ad-format": string;
  "data-full-width-responsive"?: boolean | string;
  "data-ad-channel"?: string;
  style?: React.CSSProperties;
  channelId?: string;
}

const ElTemplate = forwardRef<HTMLModElement, AdTemplateProps>(function AdTemplate(props, ref) {
  useAdDisplay(`#${props.id}`);
  const innerRef = useRef<HTMLModElement | null>(null);
  const [isSuppressed, setIsSuppressed] = useState(false);

  const setRefs = useMemo(() => {
    return (node: HTMLModElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };
  }, [ref]);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const syncVisibility = () => {
      const status = el.getAttribute("data-ad-status");
      if (status === "filled") {
        setIsSuppressed(false);
        return;
      }
      if (status === "unfilled") {
        setIsSuppressed(true);
        return;
      }
      setIsSuppressed(false);
    };

    syncVisibility();

    const observer = new MutationObserver(() => {
      syncVisibility();
    });

    observer.observe(el, { attributes: true, childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    let pushed = false;

    const tryPush = () => {
      if (pushed) return;
      if (isSuppressed) return;
      const width = el.getBoundingClientRect().width;
      if (!Number.isFinite(width) || width <= 0) return;
      const w = window as unknown as { adsbygoogle?: unknown[] };
      try {
        const queue = Array.isArray(w.adsbygoogle) ? w.adsbygoogle : [];
        w.adsbygoogle = queue;
        queue.push({});
        pushed = true;
      } catch {
      }
    };

    const ro = new ResizeObserver(() => {
      tryPush();
    });

    ro.observe(el);
    requestAnimationFrame(() => {
      tryPush();
    });

    return () => {
      ro.disconnect();
    };
  }, [isSuppressed]);

  return (
    <div className="ad-placeholder" style={{ textAlign: "center", width: "100%", display: isSuppressed ? "none" : "block" }}>
      <ins 
        ref={setRefs}
        {...props}
        {...process.env.NODE_ENV === 'development' ? { "data-adtest": "on" } : {}}
      />
    </div>
  );
});

export default ElTemplate;
