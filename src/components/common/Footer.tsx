export default function Footer() {
  return (
    <footer className="w-full border-t border-primary/20 bg-background">
      <div className="container flex flex-col items-center justify-center gap-4 py-8 md:h-24 md:flex-row md:py-0">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} 🦇 GOTHAM ACADEMY OF ETHICAL HACKING 🦇. All Rights Reserved. Stay in the shadows.
        </p>
      </div>
    </footer>
  );
}
