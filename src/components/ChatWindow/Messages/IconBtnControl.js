import React from "react";
import { Badge, Tooltip, Whisper, IconButton, Icon } from "rsuite";

const ConditionalBadge = ({ condition, children }) => {
  return condition ? <Badge content={condition}>{children}</Badge> : children;
};

const IconBtnControl = ({
  isVisible,
  icon,
  tooltip,
  onClick,
  badgeContent,
  ...props
}) => {
  return (
    <div
      className="ml-2"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      <ConditionalBadge condition={badgeContent}>
        <Whisper
          placement="top"
          trigger="hover"
          speaker={<Tooltip>{tooltip}</Tooltip>}
        >
          <IconButton
            {...props}
            onClick={onClick}
            circle
            size="xs"
            icon={<Icon icon={icon} />}
          />
        </Whisper>
      </ConditionalBadge>
    </div>
  );
};

export default IconBtnControl;
