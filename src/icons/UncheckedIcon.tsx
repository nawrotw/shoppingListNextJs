import { forwardRef, SVGProps } from 'react';
import { IconProps } from "@/icons/IconProps";

const UncheckedIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement> & IconProps>((props, ref) => {
  const { size, ...svgProps } = props;
  const width = size || '22';
  const height = size || '22';
  return <svg width={width} height={height} viewBox="0 0 22 22" fill="none" {...svgProps} ref={ref}>
    <rect
      x="1" y="1" width="20" height="20" rx="3"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
});

UncheckedIcon.displayName = 'UncheckedIcon';
export default UncheckedIcon;
