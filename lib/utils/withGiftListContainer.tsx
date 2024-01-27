"use client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export function withGiftListContainer(WrappedComponent: any) {
  const NewComponent = ({ ...props }: any) => {
    const querys = useSelector((state: RootState) => state.filter.querys);

    return <WrappedComponent querys={querys} {...props} />;
  };
  return NewComponent;
}
