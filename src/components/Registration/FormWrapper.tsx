import React from "react"
import { ReactNode } from "react"

type FormWrapperProps = {
  title: string
  children: ReactNode
}

const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <>
      <h3 style={{ textAlign: "center", margin: 0, marginBottom: "1rem", fontSize: "1.8rem", marginTop: "1rem"}}>
        {title}
      </h3>
      <div>
        {children}
      </div>
    </>
  )
}

export default FormWrapper;