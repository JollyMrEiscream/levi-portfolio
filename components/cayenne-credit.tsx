import { site } from "@/content/site"

/** CC BY credit for the Cayenne clip. Visible, small, and linked. */
export function CayenneCredit({ className }: { className?: string }) {
  const credit = site.cayenneCredit
  return (
    <p className={className}>
      {credit.label}: &quot;{credit.work}&quot; trailer by {credit.author},{" "}
      <a href={credit.licenseUrl} target="_blank" rel="noreferrer" className="underline decoration-white/25 underline-offset-2 hover:text-foreground">
        {credit.license}
      </a>
      , via{" "}
      <a href={credit.sourceUrl} target="_blank" rel="noreferrer" className="underline decoration-white/25 underline-offset-2 hover:text-foreground">
        {credit.source}
      </a>
      ; {credit.edit} {credit.disclaimer}
    </p>
  )
}
