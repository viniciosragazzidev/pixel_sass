"use client";

// ServiceFormContainer.tsx

import React, { FC } from "react";

interface ServiceFormContainerProps {
  isNew: boolean;
  initialValues?: any;
  onSubmit: (data: any) => void;
}

const ServiceFormContainer: FC<ServiceFormContainerProps> = ({
  isNew,
  initialValues,
  onSubmit,
}) => {
  const handleSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Renderização do formulário com base nos dados e na flag isNew */}
    </form>
  );
};

export default ServiceFormContainer;
