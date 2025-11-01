// ContentViewerModal.tsx
import { ReactNode, MouseEvent, useState } from "react";

// Placeholder Dialog component with explicit types
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => (
  open ? (
    <div className="dialog-overlay" onClick={() => onOpenChange(false)}>
      <div className="dialog-content" onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  ) : null
);

interface DialogContentProps {
  children: ReactNode;
  className?: string;
}

export const DialogContent = ({ children, className }: DialogContentProps) => (
  <div className={className}>{children}</div>
);

export const DialogHeader = ({ children, className }: DialogContentProps) => (
  <div className={className}>{children}</div>
);

export const DialogTitle = ({ children, className }: DialogContentProps) => (
  <h2 className={className}>{children}</h2>
);

export const DialogDescription = ({ children, className }: DialogContentProps) => (
  <p className={className}>{children}</p>
);

interface DialogCloseProps {
  asChild?: boolean;
  children?: ReactNode;
}

export const DialogClose = ({ asChild, children }: DialogCloseProps) => (
  asChild ? children : <button onClick={() => {}}>Close</button>
);

// Placeholder Button component with explicit types
interface ButtonProps {
  variant?: string;
  children: ReactNode;
  onClick?: () => void;
}

export const Button = ({ variant, children, ...props }: ButtonProps) => (
  <button className={`btn btn-${variant}`} {...props}>{children}</button>
);

// Ensure proper types for props
export interface ContentViewerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  contentType: "pdf" | "video" | "image";
  contentUrl: string;
  downloadUrl?: string;
  certificate?: boolean;
}

// Ensure proper export for ContentType
export type ContentType = "pdf" | "video" | "image";

// Correct React component type
export const ContentViewerModal = ({
  open,
  onOpenChange,
  title,
  description,
  contentType,
  contentUrl,
  downloadUrl,
  certificate = false,
}: ContentViewerModalProps) => {
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          {description && <DialogDescription className="mt-1 text-sm text-gray-500">{description}</DialogDescription>}
        </DialogHeader>
        <div className="p-6 pt-0 flex flex-col gap-4">
          <div className="rounded border bg-gray-50 flex items-center justify-center min-h-[300px] max-h-[60vh] overflow-auto">
            {!selectedAssignment ? (
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {/* Map through assignments and display titles */}
                {mockData.map((assignment, index) => (
                  <li
                    key={index}
                    style={{
                      padding: '10px',
                      borderBottom: '1px solid #ccc',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedAssignment(assignment)}
                  >
                    {assignment.title}
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <h3>{selectedAssignment.title}</h3>
                <p>{selectedAssignment.description}</p>
                {selectedAssignment.fileUrl && (
                  <a href={selectedAssignment.fileUrl} target="_blank" rel="noopener noreferrer">View Assignment File</a>
                )}
                <button
                  onClick={() => setSelectedAssignment(null)}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    marginTop: '10px',
                  }}
                >
                  Back to List
                </button>
              </div>
            )}
          </div>
          <div className="flex gap-2 justify-end">
            {downloadUrl && (
              <a href={downloadUrl} download target="_blank" rel="noopener noreferrer">
                <Button variant="outline">{certificate ? "View Certificate" : "Download"}</Button>
              </a>
            )}
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Example usage in a page (ContentViewerExample.tsx)
import * as React from "react";

const mockData = [
  {
    title: "GMP Training PDF",
    description: "Good Manufacturing Practices training material.",
    contentType: "pdf" as ContentType,
    contentUrl: "/mock/gmp-training.pdf",
    downloadUrl: "/mock/gmp-training.pdf",
  },
  {
    title: "Lab Safety Video",
    description: "Laboratory safety training video.",
    contentType: "video" as ContentType,
    contentUrl: "/mock/lab-safety.mp4",
  },
  {
    title: "Certificate Preview",
    description: "Your certificate of completion.",
    contentType: "image" as ContentType,
    contentUrl: "/mock/certificate.png",
    downloadUrl: "/mock/certificate.png",
    certificate: true,
  },
];

export default function ContentViewerExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<number | null>(null);

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-xl font-bold">Content Viewer Modal Example</h2>
      <div className="flex gap-4">
        {mockData.map((item, idx) => (
          <Button key={idx} onClick={() => { setSelected(idx); setOpen(true); }}>
            {item.certificate ? "View Certificate" : `View ${item.contentType}`}
          </Button>
        ))}
      </div>
      {selected !== null && (
        <ContentViewerModal
          open={open}
          onOpenChange={setOpen}
          {...mockData[selected]}
        />
      )}
    </div>
  );
}

