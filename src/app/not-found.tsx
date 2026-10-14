import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NotFound() {
  return (
    <PageHeader
      eyebrow="404"
      title="This trail doesn't go anywhere."
      description="The page you're looking for has moved or never existed. Let's get you back on the road."
      className="pb-section"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/destinations" variant="link">
          Browse destinations
        </ButtonLink>
      </div>
    </PageHeader>
  );
}
