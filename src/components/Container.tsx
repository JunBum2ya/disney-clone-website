import { Children, ReactNode } from 'react';
import '../scss/Container.scss';

const Container = (props: ContainerProps) => {
  return <div className="container">{props.children}</div>;
};

interface ContainerProps {
  children: ReactNode;
}

export default Container;
