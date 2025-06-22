import { Svg, type SvgPropsI } from '@/shared/hoc/Svg';

export const IconCancel: React.FC<SvgPropsI> = ({
  width,
  height,
  viewBox,
  ...props
}) => (
  <Svg
    {...props}
    width={width ?? '32'}
    height={height ?? '32'}
    viewBox={viewBox ?? '0 0 32 32'}
  >
    <path
      d="M6.66675 25.3333L16.0001 16M16.0001 16L25.3334 6.66666M16.0001 16L6.66675 6.66666M16.0001 16L25.3334 25.3333"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
