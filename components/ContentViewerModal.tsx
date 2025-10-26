// ContentViewerModal.tsx
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type ContentType = "pdf" | "video" | "image";

export interface ContentViewerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  contentType: ContentType;
  contentUrl: string;
  downloadUrl?: string;
  certificate?: boolean;
}

export const ContentViewerModal: React.FC<ContentViewerModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  contentType,
  contentUrl,
  downloadUrl,
  certificate = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          {description && <DialogDescription className="mt-1 text-sm text-gray-500">{description}</DialogDescription>}
        </DialogHeader>
        <div className="p-6 pt-0 flex flex-col gap-4">
          <div className="rounded border bg-gray-50 flex items-center justify-center min-h-[300px] max-h-[60vh] overflow-auto">
            {contentType === "pdf" && (
              <iframe
                src={contentUrl}
                title="PDF Viewer"
                className="w-full h-[400px] border-0"
                aria-label="PDF Content"
              />
            )}
            {contentType === "video" && (
              <video controls className="w-full max-h-[400px]" aria-label="Video Content">
                <source src={contentUrl} />
                Your browser does not support the video tag.
              </video>
            )}
            {contentType === "image" && (
              <img src={contentUrl} alt="Content" className="max-h-[400px] w-auto mx-auto" />
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
import { ContentViewerModal, ContentType } from "./ContentViewerModal";

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
