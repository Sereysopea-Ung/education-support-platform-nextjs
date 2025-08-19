// components/ModalLayout.tsx
export default function ModalLayout({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        <div
            className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"
            onClick={onClose}
        />

        <div className="relative z-10 w-full max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md border">
            <div className="-ml-[5px]">
            {/* close button */}
                <svg className="font-bold hover:cursor-pointer" onClick={() => onClose()} aria-label="close modal" role="button" tabIndex={0} width="27" height="27" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.5 1.5L1.5 20.5M1.5 1.5L20.5 20.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
 
            {/* Title */}
            <div className="flex items-center justify-center -mt-[50px] mb-8">
                <h2 className="text-[45px] font-bold">{title}</h2>
            </div>

            {/* Dynamic Content */}
            {children}
            
        </div>
    </div>
  );
}
