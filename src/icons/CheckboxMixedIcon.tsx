import { forwardRef, SVGProps } from 'react';
import { IconProps } from "@/icons/IconProps";

const CheckboxMixedIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement> & IconProps>((props, ref) => {
  const { size, ...svgProps } = props;
  const width = size || '22';
  const height = size || '22';
  return <svg width={width} height={height} viewBox="0 0 22 22" fill="none" {...svgProps} ref={ref}>
    <rect width="22" height="22" rx="4" fill="black" fillOpacity="0.15"/>
    <path d="M5.5 11L9.59794 14.6881C10.0655 15.1089 10.8008 14.9987 11.1244 14.4593L16.5 5.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
});

CheckboxMixedIcon.displayName = 'CheckboxMixedIcon';
export default CheckboxMixedIcon;
