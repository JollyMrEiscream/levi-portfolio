import { site } from "@/content/site"

/** Credits for the Cayenne clip and the front three-quarter line art. */
export function CayenneCredit({ className }: { className?: string }) {
  const clip = site.cayenneCredit
  const line = site.cayenneLineArt
  return (
    <div className={className}>
      <p>
        {clip.label}: &quot;{clip.work}&quot; trailer by {clip.author},{" "}
        <a href={clip.licenseUrl} target="_blank" rel="noreferrer" className="underline decoration-white/25 underline-offset-2 hover:text-foreground">
          {clip.license}
        </a>
        , via{" "}
        <a href={clip.sourceUrl} target="_blank" rel="noreferrer" className="underline decoration-white/25 underline-offset-2 hover:text-foreground">
          {clip.source}
        </a>
        ; {clip.edit} {clip.disclaimer}
      </p>
      <p className="mt-2">
        Line art based on{" "}
        <a href={line.fileUrl} target="_blank" rel="noreferrer" className="underline decoration-white/25 underline-offset-2 hover:text-foreground">
          &quot;{line.title}&quot;
        </a>{" "}
        by {line.author}, via Wikimedia Commons,{" "}
        <a href={line.licenseUrl} target="_blank" rel="noreferrer" className="underline decoration-white/25 underline-offset-2 hover:text-foreground">
          {line.license}
        </a>
        . This derivative is licensed {line.license}.
      </p>
    </div>
  )
}
