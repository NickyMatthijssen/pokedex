import { Tab as HeadlessTab } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const TabGroup = ({ children }) => (
  <AnimatePresence exitBeforeEnter>
    <HeadlessTab.Group>{children}</HeadlessTab.Group>
  </AnimatePresence>
);

export const TabList = ({ children }) => {
  const draggable = useRef();

  const [maxDrag, setMaxDrag] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setMaxDrag(-(entry.target.scrollWidth - entry.target.clientWidth));
      }
    });

    observer.observe(draggable.current);
  }, [draggable]);

  return (
    <HeadlessTab.List className="bg-gray-200 mb-4 p-0 rounded-xl overflow-x-hidden w-full">
      <motion.div
        ref={draggable}
        className="flex"
        drag="x"
        dragConstraints={{
          right: 0,
          left: maxDrag,
        }}
      >
        {children}
      </motion.div>
    </HeadlessTab.List>
  );
};

export const Tab = ({ children, layoutId, ...props }) => {
  return (
    <HeadlessTab className="flex-shrink-0 relative capitalize" {...props}>
      {({ selected }) => (
        <>
          <span className="py-3 px-4 block">{children}</span>

          {selected && (
            <motion.div
              className="h-1 bg-slate-900 w-full block absolute bottom-0 rounded-full"
              layoutId={layoutId ?? "underline"}
            />
          )}
        </>
      )}
    </HeadlessTab>
  );
};

export const TabPanels = ({ children }) => {
  return <HeadlessTab.Panels>{children}</HeadlessTab.Panels>;
};

export const TabPanel = ({ children }) => {
  return (
    <HeadlessTab.Panel
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </HeadlessTab.Panel>
  );
};
