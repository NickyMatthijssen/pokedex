import { Tab as HeadlessTab } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import "./Tab.css";

export const TabGroup = ({ children }) => (
  <AnimatePresence exitBeforeEnter>
    <HeadlessTab.Group>{children}</HeadlessTab.Group>
  </AnimatePresence>
);

export const TabList = ({ children }) => {
  return <HeadlessTab.List className="tab-list">{children}</HeadlessTab.List>;
};

export const Tab = ({ children, layoutId, ...props }) => {
  return (
    <HeadlessTab className="tab-list__tab" {...props}>
      {({ selected }) => (
        <>
          <span className="tab-list__label">{children}</span>

          {selected && (
            <motion.div
              className="tab-list__divider"
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
