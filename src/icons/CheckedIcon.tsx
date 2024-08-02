import { forwardRef, SVGProps } from 'react';
import { IconProps } from "@/icons/IconProps";

const CheckedIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement> & IconProps>((props, ref) => {
  const { size, ...svgProps } = props;
  const width = size || '22';
  const height = size || '22';
  return <svg width={width} height={height} viewBox="0 0 22 22" fill="none" {...svgProps} ref={ref}>
    <rect
      x="1" y="1" width="20" height="20" rx="3"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M5.5 11L9.59794 14.6881C10.0655 15.1089 10.8008 14.9987 11.1244 14.4593L16.5 5.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
});

CheckedIcon.displayName = 'CheckedIcon';
export default CheckedIcon;
