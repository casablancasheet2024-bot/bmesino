import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/layout";
import { SiteNav } from "./site-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white">
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
        <Logo priority className="h-9 sm:h-10 lg:h-11" />
        <SiteNav />
      </Container>
    </header>
  );
}
