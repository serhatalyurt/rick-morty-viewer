import React, { useState } from "react";
import { FunctionComponent, ReactNode } from "react";
import "./styles.css";

type TabProps = {
  title: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
export const Tab: FunctionComponent<TabProps> = () => <></>;

type TabViewProps = {
  children: React.ReactElement<TabProps>[];
  onSelected?: (index: number) => void;
};

export const TabView: FunctionComponent<TabViewProps> = ({
  children,
  onSelected,
}) => {
  // restructure according to children
  const tabList = React.Children.map(children, (child) => {
    //TODO: filter the children if it is not <Tab>. For now, this control accepts other elements
    return {
      title: child.props.title,
      children: child.props.children,
      props: child.props,
    };
  });
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <div className="tab">
      <div className="tab-header">
        {tabList.map((item, index) => (
          <span
            key={index}
            className={"tab-title" + (index === activeIndex ? " active" : "")}
            onClick={() => {
              setActiveIndex(index);
              onSelected?.(index);
            }}
          >
            {item.title}
          </span>
        ))}
      </div>
      <div
        {...tabList[activeIndex].props}
        className={"tab-content " + tabList[activeIndex].props.className!!}
      >
        {tabList[activeIndex].children}
      </div>
    </div>
  );
};
