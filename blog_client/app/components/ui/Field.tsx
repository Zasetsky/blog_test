import * as React from 'react'
export default function Field({ label, error, children }:{
  label?: string; error?: string; children: React.ReactNode
}) {
  return (
    <div>
      {label && <div className="mb-1">{label}</div>}
      {children}
      {error && <div className="err">{error}</div>}
    </div>
  )
}
