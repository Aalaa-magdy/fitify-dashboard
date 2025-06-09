// src/components/GradientButton.jsx
export default function GradientButton({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={` py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 
        text-white shadow-lg hover:shadow-xl hover:brightness-105 transition-all duration-300
        gradient-btn ${className}`}
    >
      {children}
    </button>
  );
}
