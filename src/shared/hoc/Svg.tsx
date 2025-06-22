export type SvgPropsI = React.SVGProps<SVGSVGElement>;

export const Svg: React.FC<SvgPropsI> = ({ children, fill, ...props }) => {
  return (
    <svg {...props} fill={fill ?? 'none'} xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
};
