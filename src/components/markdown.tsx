import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      className="space-y-4"
      components={{
        ul: (props) => (
          <ul className="list-outside list-disc space-y-2 pl-6" {...props} />
        ),
        a: (props) => (
          <a
            className="text-purple-600 underline hover:text-purple-800"
            target="_blank"
            {...props}
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
